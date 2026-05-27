import Link from 'next/link';
import { ArrowRight, Brain, MessageSquare, Rocket, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

const matches = [
  { name: 'Maya Chen', role: 'AI product lead', score: 94, skills: ['Go-to-market', 'LLM UX', 'B2B SaaS'] },
  { name: 'Jon Bell', role: 'Full-stack engineer', score: 89, skills: ['Next.js', 'Postgres', 'Fintech'] },
  { name: 'Priya Rao', role: 'Growth strategist', score: 86, skills: ['Marketplaces', 'SEO', 'Community'] },
];

const projects = [
  { title: 'RunwayOps', stage: 'Prototype', lookingFor: 'Backend co-founder', stack: 'Next.js, Python, Postgres' },
  { title: 'Mindful Teams', stage: 'Customer discovery', lookingFor: 'Design partner', stack: 'React, Supabase, Stripe' },
  { title: 'Carbon Ledger', stage: 'MVP live', lookingFor: 'Climate domain expert', stack: 'TypeScript, Prisma, Vercel' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="relative overflow-hidden px-6 py-20 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#c7d2fe,transparent_36%),radial-gradient(circle_at_bottom_right,#bbf7d0,transparent_32%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
              <Sparkles size={16} /> AI compatibility for serious founders
            </div>
            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-slate-950 sm:text-7xl">
              Find co-founder fit before cap table regret.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-650">
              CoFounderMatch blends skill overlap, personality signals, location, founder stage, and project intent into clear compatibility scores — then gives matched founders workspace to chat and ship.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/sign-up" className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 font-bold text-white shadow-glow hover:bg-indigo-700">
                Build your founder profile <ArrowRight size={18} />
              </Link>
              <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 font-bold text-slate-900 hover:border-indigo-300">
                View demo dashboard
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white bg-white/80 p-5 shadow-glow backdrop-blur">
            <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
              <p className="text-sm font-semibold text-indigo-200">Top matches this week</p>
              <div className="mt-5 space-y-4">
                {matches.map((match) => (
                  <div key={match.name} className="rounded-2xl bg-white/10 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold">{match.name}</p>
                        <p className="text-sm text-slate-300">{match.role}</p>
                      </div>
                      <span className="rounded-full bg-emerald-400 px-3 py-1 text-sm font-black text-slate-950">{match.score}%</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {match.skills.map((skill) => <span key={skill} className="rounded-full bg-white/10 px-3 py-1 text-xs">{skill}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
          {[
            ['Profile wizard', 'Capture skills, founder goals, location, and personality traits.', Brain],
            ['AI score', 'Rank matches with transparent compatibility factors.', Users],
            ['Founder chat', 'Message promising matches from one shared dashboard.', MessageSquare],
            ['Project showcase', 'Pitch ideas and recruit around real products.', Rocket],
          ].map(([title, text, Icon]) => (
            <div key={String(title)} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <Icon className="text-indigo-600" size={28} />
              <h3 className="mt-5 text-lg font-bold text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="font-bold text-indigo-600">Live idea marketplace</p>
              <h2 className="mt-2 text-4xl font-black text-slate-950">Project showcases built for recruiting.</h2>
            </div>
            <ShieldCheck className="hidden text-emerald-500 sm:block" size={42} />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <article key={project.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-950">{project.title}</h3>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">{project.stage}</span>
                </div>
                <p className="mt-4 font-semibold text-slate-700">Looking for: {project.lookingFor}</p>
                <p className="mt-2 text-sm text-slate-500">Stack: {project.stack}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
