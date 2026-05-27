import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Sparkles } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-950">
          <span className="rounded-xl bg-indigo-600 p-2 text-white"><Sparkles size={18} /></span>
          CoFounderMatch
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
          <Link href="/#projects" className="hidden hover:text-indigo-600 sm:inline">Projects</Link>
          <SignedIn>
            <Link href="/dashboard" className="rounded-full bg-slate-950 px-4 py-2 text-white hover:bg-indigo-700">Dashboard</Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className="hover:text-indigo-600">Sign in</Link>
            <Link href="/sign-up" className="rounded-full bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Join free</Link>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
