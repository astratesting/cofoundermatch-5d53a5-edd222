from datetime import datetime
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy import or_
from sqlalchemy.orm import Session

from database import get_db
from models import Match, Message, Project, User
from routers.auth import UserResponse, get_current_user

router = APIRouter()


class ProfileUpdate(BaseModel):
    name: str | None = None
    skills: str | None = None
    assessment_results: str | None = None
    location: str | None = None
    bio: str | None = None
    avatar_url: str | None = None


class ProjectCreate(BaseModel):
    title: str = Field(min_length=2, max_length=255)
    description: str = Field(min_length=10)
    tech_stack: str = ""
    looking_for: str = ""
    stage: str = "Idea"


class ProjectResponse(ProjectCreate):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class MatchResponse(BaseModel):
    id: int
    user1_id: int
    user2_id: int
    compatibility_score: float
    status: str
    user: UserResponse


class MessageCreate(BaseModel):
    receiver_id: int
    content: str = Field(min_length=1, max_length=2000)


class MessageResponse(BaseModel):
    id: int
    sender_id: int
    receiver_id: int
    content: str
    timestamp: datetime

    class Config:
        from_attributes = True


def split_terms(value: str) -> set[str]:
    return {term.strip().lower() for term in value.replace(";", ",").split(",") if term.strip()}


def compatibility_score(a: User, b: User) -> float:
    a_skills = split_terms(a.skills)
    b_skills = split_terms(b.skills)
    a_traits = split_terms(a.assessment_results)
    b_traits = split_terms(b.assessment_results)
    shared_skills = len(a_skills & b_skills)
    complementary = len(a_skills ^ b_skills)
    trait_overlap = len(a_traits & b_traits)
    location_bonus = 10 if a.location and a.location.lower() == b.location.lower() else 0
    bio_bonus = 8 if a.bio and b.bio and any(word in b.bio.lower() for word in a.bio.lower().split()[:10]) else 0
    raw = 35 + shared_skills * 8 + min(complementary, 8) * 4 + trait_overlap * 7 + location_bonus + bio_bonus
    return float(min(98, max(40, raw)))


@router.put("/profile", response_model=UserResponse)
def update_profile(payload: ProfileUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(current_user, field, value)
    db.commit()
    db.refresh(current_user)
    return current_user


@router.get("/users", response_model=List[UserResponse])
def list_users(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(User).filter(User.id != current_user.id).all()


@router.post("/matches/generate", response_model=List[MatchResponse])
def generate_matches(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    candidates = db.query(User).filter(User.id != current_user.id).all()
    responses: list[MatchResponse] = []
    for candidate in candidates:
        existing = db.query(Match).filter(
            or_(
                (Match.user1_id == current_user.id) & (Match.user2_id == candidate.id),
                (Match.user1_id == candidate.id) & (Match.user2_id == current_user.id),
            )
        ).first()
        if existing:
            match = existing
            match.compatibility_score = compatibility_score(current_user, candidate)
        else:
            match = Match(
                user1_id=current_user.id,
                user2_id=candidate.id,
                compatibility_score=compatibility_score(current_user, candidate),
                status="suggested",
            )
            db.add(match)
        db.commit()
        db.refresh(match)
        responses.append(MatchResponse(
            id=match.id,
            user1_id=match.user1_id,
            user2_id=match.user2_id,
            compatibility_score=match.compatibility_score,
            status=match.status,
            user=candidate,
        ))
    return sorted(responses, key=lambda item: item.compatibility_score, reverse=True)


@router.get("/matches", response_model=List[MatchResponse])
def list_matches(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    matches = db.query(Match).filter(or_(Match.user1_id == current_user.id, Match.user2_id == current_user.id)).all()
    responses = []
    for match in matches:
        other_id = match.user2_id if match.user1_id == current_user.id else match.user1_id
        other = db.query(User).filter(User.id == other_id).first()
        if other:
            responses.append(MatchResponse(
                id=match.id,
                user1_id=match.user1_id,
                user2_id=match.user2_id,
                compatibility_score=match.compatibility_score,
                status=match.status,
                user=other,
            ))
    return sorted(responses, key=lambda item: item.compatibility_score, reverse=True)


@router.patch("/matches/{match_id}/status", response_model=MatchResponse)
def update_match_status(match_id: int, status: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    match = db.query(Match).filter(Match.id == match_id).first()
    if not match or current_user.id not in [match.user1_id, match.user2_id]:
        raise HTTPException(status_code=404, detail="Match not found")
    match.status = status
    db.commit()
    db.refresh(match)
    other_id = match.user2_id if match.user1_id == current_user.id else match.user1_id
    other = db.query(User).filter(User.id == other_id).first()
    return MatchResponse(id=match.id, user1_id=match.user1_id, user2_id=match.user2_id, compatibility_score=match.compatibility_score, status=match.status, user=other)


@router.post("/messages", response_model=MessageResponse)
def send_message(payload: MessageCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    receiver = db.query(User).filter(User.id == payload.receiver_id).first()
    if not receiver:
        raise HTTPException(status_code=404, detail="Receiver not found")
    message = Message(sender_id=current_user.id, receiver_id=payload.receiver_id, content=payload.content)
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


@router.get("/messages/{user_id}", response_model=List[MessageResponse])
def conversation(user_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Message).filter(
        or_(
            (Message.sender_id == current_user.id) & (Message.receiver_id == user_id),
            (Message.sender_id == user_id) & (Message.receiver_id == current_user.id),
        )
    ).order_by(Message.timestamp.asc()).all()


@router.post("/projects", response_model=ProjectResponse)
def create_project(payload: ProjectCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    project = Project(user_id=current_user.id, **payload.model_dump())
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


@router.get("/projects", response_model=List[ProjectResponse])
def list_projects(db: Session = Depends(get_db)):
    return db.query(Project).order_by(Project.id.desc()).all()


@router.get("/projects/mine", response_model=List[ProjectResponse])
def my_projects(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Project).filter(Project.user_id == current_user.id).order_by(Project.id.desc()).all()
