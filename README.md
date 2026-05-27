# CoFounderMatch

AI-powered co-founder matching MVP with profile creation, personality assessment signals, compatibility scoring, founder chat, and project showcase.

## Stack

- Frontend: Next.js 14 App Router, TypeScript, Tailwind CSS, Clerk auth UI
- Backend: FastAPI, SQLAlchemy, JWT auth, PostgreSQL-ready models
- Database: PostgreSQL through `DATABASE_URL`; SQLite fallback for local backend demos

## Quick start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

API runs at `http://localhost:8000`.

### PostgreSQL

```bash
docker compose up postgres
```

Set `DATABASE_URL` from `.env.example` before starting backend.

## Core flows

- Landing page explains AI co-founder matching value props.
- Clerk sign-in and sign-up pages support email and OAuth providers configured in Clerk/Auth0-equivalent identity provider settings.
- Dashboard shows profile wizard state, personality assessment summary, compatibility matches, chat, and projects.
- Backend exposes `/auth/register`, `/auth/login`, `/auth/me`, profile updates, match generation, message threads, and project CRUD.

## Environment

Copy `.env.example` into `.env.local` for frontend and `.env` for backend, then replace placeholder keys.

## API highlights

- `POST /auth/register` creates user and returns JWT.
- `POST /auth/login` returns JWT.
- `GET /auth/me` returns current user.
- `PUT /api/profile` updates founder profile and assessment results.
- `POST /api/matches/generate` computes compatibility scores from skills, assessment results, location, and bio overlap.
- `POST /api/messages` sends message.
- `GET /api/messages/{user_id}` lists conversation.
- `POST /api/projects` creates project showcase.
- `GET /api/projects` lists public projects.
