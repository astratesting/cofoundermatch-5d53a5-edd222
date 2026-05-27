import { Brain, CheckCircle2, MessageCircle, Plus, Rocket, Send, SlidersHorizontal, Users } from 'lucide-react';

const profileSteps = [
  { label: 'Skills', value: 'Product strategy, Next.js, fundraising' },
  { label: 'Personality', value: 'High ownership, low ego, fast iteration' },
  { label: 'Founder intent', value: 'B2B SaaS, seed-stage, remote-first' },
];

const matches = [
  { name: 'Maya Chen', score: 94, role: 'AI product lead', why: 'Strong GTM + technical balance, same market pace, shared remote preference.' },
  { name: 'Jon Bell', score: 89, role: 'Full-stack engineer', why: 'Complementary engineering depth, aligned risk profile, fintech interest.' },
  { name: 'Priya Rao', score: 86, role: 'Growth strategist', why: 'Marketplace experience, high communication match, nearby timezone.' },
];

const messages = [
  ['Maya', 'Loved your project brief. Want to compare founder goals this week?'],
  ['You', 'Yes — I can share traction and what I need from GTM.'],
  ['Maya', 'Great. Compatibility notes look accurate: fast tests, clear roles, no co-CEO ambiguity.'],
];

const projects = [
  { title: 'RunwayOps', stage: 'Prototype', lookingFor: 'Backend co-founder', stack: ['Next.js', 'Python', 'Postgres'] },
  { title: 'Carbon Ledger', stage: 'MVP live', lookingFor: 'Climate domain expert', stack: ['TypeScript', 'Prisma', 'Vercel'] },
];

export default function DashboardPage() {
  return (
    <section className="px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-bold text-indigo-600">Founder command center</p>
            <h1 className="mt-2 text-4xl font-black text-slate-950">Match, message, and recruit from one dashboard.</h1>
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-5 py-3 font-bold text-white hover:bg-indigo-700">
            <Plus size={18} /> Add project
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.2fr]">
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-950">Profile wizard</h2>
                <Brain className="text-indigo-600" />
              </div>
              <div className="mt-5 space-y-4">
                {profileSteps.map((step) => (
                  <div key={step.label} className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 font-bold text-slate-900"><CheckCircle2 className="text-emerald-500" size={18} /> {step.label}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{step.value}</p>
                  </div>
                ))}
              </div>
              <button className="mt-5 w-full rounded-full border border-slate-300 px-4 py-3 font-bold text-slate-800 hover:border-indigo-300">
                Continue assessment
              </button>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="text-indigo-600" />
                <h2 className="text-xl font-black text-slate-950">Match factors</h2>
              </div>
              <div className="mt-5 space-y-3 text-sm font-semibold text-slate-700">
                {['Skill complement: 38%', 'Personality fit: 27%', 'Stage alignment: 20%', 'Location/timezone: 15%'].map((factor) => <p key={factor}>{factor}</p>)}
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Users className="text-indigo-600" />
                <h2 className="text-xl font-black text-slate-950">Top compatibility matches</h2>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {matches.map((match) => (
                  <article key={match.name} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-black text-slate-950">{match.name}</h3>
                        <p className="text-sm text-slate-500">{match.role}</p>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-black text-emerald-700">{match.score}%</span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-600">{match.why}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.9fr_1fr]">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <MessageCircle className="text-indigo-600" />
                  <h2 className="text-xl font-black text-slate-950">Chat with Maya</h2>
                </div>
                <div className="mt-5 space-y-3">
                  {messages.map(([sender, body]) => (
                    <div key={body} className={`rounded-2xl p-3 text-sm leading-6 ${sender === 'You' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                      <span className="font-bold">{sender}: </span>{body}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <input className="flex-1 rounded-full border-slate-300" placeholder="Write a message" />
                  <button className="rounded-full bg-slate-950 p-3 text-white"><Send size={18} /></button>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <Rocket className="text-indigo-600" />
                  <h2 className="text-xl font-black text-slate-950">Project showcase</h2>
                </div>
                <div className="mt-5 space-y-4">
                  {projects.map((project) => (
                    <article key={project.title} className="rounded-2xl bg-slate-50 p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-black text-slate-950">{project.title}</h3>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-indigo-700">{project.stage}</span>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-slate-700">Looking for: {project.lookingFor}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.stack.map((tech) => <span key={tech} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">{tech}</span>)}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
