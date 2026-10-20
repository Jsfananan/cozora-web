import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LibraryBrowser from '@/components/library/LibraryBrowser';
import JourneyShowcase from '@/components/library/JourneyShowcase';
import WelcomePop from '@/components/library/WelcomePop';
import { getSkillPosts } from '@/lib/substack';
import { resolveJourneys } from '@/lib/journeys';

export const revalidate = 1800; // refresh from Substack every 30 min

const SUBSCRIBE_URL = 'https://cozora.substack.com/subscribe';

const DESCRIPTION =
  'The AI skill library you can trust. Claude skills from AI creators on Substack, credited by name and put in order as learning journeys, so you always know what to try next.';

export const metadata: Metadata = {
  title: 'Cozora Library: the AI skill library you can trust',
  description: DESCRIPTION,
  openGraph: {
    title: 'Cozora Library: the AI skill library you can trust',
    description: DESCRIPTION,
    url: 'https://cozora.org/library',
    siteName: 'Cozora',
    type: 'website',
  },
};

// Only claims that are true today. A testing promise ("we test every skill") stays off
// the page until the written standard in docs/TESTING-STANDARD-DRAFT.md is approved.
const TRUST = [
  { text: 'Curated from AI creators on Substack', icon: 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12' },
  {
    text: 'Every skill credited to its creator',
    icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
  },
  {
    text: 'Put in order as learning journeys',
    icon: 'M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z',
  },
];

const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cz-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cz-bg';

export default async function LibraryPage() {
  const posts = await getSkillPosts();
  const journeys = resolveJourneys(posts);

  // Real counts from the live archive, never typed by hand. Only depth-tagged posts count
  // as skills: some older untagged posts are Q&A or class recordings, not skill drops.
  const skills = posts.filter((p) => p.tier);
  const creatorCounts = new Map<string, number>();
  for (const p of skills) {
    for (const name of (p.creator ?? '').split(' & ').map((s) => s.trim())) {
      if (!name || name === 'Cozora') continue;
      creatorCounts.set(name, (creatorCounts.get(name) ?? 0) + 1);
    }
  }
  const creators = [...creatorCounts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([name]) => name);

  return (
    <div className="cz-light min-h-screen">
      <Navbar banner={{ lead: 'Not a Cozora member? ', short: 'Not a member? ', linkText: 'Sign up here →', href: SUBSCRIBE_URL }} />
      <main className="pb-24 pt-32 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <header className="mx-auto mb-10 max-w-3xl text-center">
            <p className="animate-fade-up inline-flex items-center rounded-full border border-cz-border-strong bg-white px-3 py-1 font-mono text-xs uppercase tracking-widest text-cz-accent">
              Cozora Library
            </p>
            <h1 className="animate-fade-up delay-100 mt-4 font-display text-4xl font-bold leading-tight text-cz-text sm:text-6xl">
              The AI skill library{' '}
              <span className="bg-gradient-to-r from-[#1D5C5E] via-[#2A8C80] to-[#B02E86] bg-clip-text text-transparent">you can trust</span>.
            </h1>
            <p className="animate-fade-up delay-200 mx-auto mt-5 max-w-2xl text-lg text-cz-text-muted">
              We curate the best Claude skills from AI creators on Substack and put them in order, so you always know what to try next.
            </p>
            <div className="animate-fade-up delay-300 mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#journeys"
                className={`inline-flex min-h-[52px] items-center gap-2 rounded-full bg-cz-accent px-7 font-display text-base font-semibold text-white shadow-lg shadow-cz-accent/25 transition-all hover:-translate-y-0.5 hover:bg-cz-accent-hover ${FOCUS}`}
              >
                Pick your journey
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
            <p className="animate-fade-up delay-300 mt-4 font-mono text-[13px] text-cz-text-muted">
              {skills.length} skills · {creators.length} creators · new skills every week
            </p>
          </header>

          {/* Trust strip */}
          <ul className="animate-fade-up delay-300 mx-auto mb-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {TRUST.map((t) => (
              <li key={t.text} className="flex items-center gap-2 text-sm font-medium text-cz-text">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cz-deep-teal text-cz-teal">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
                  </svg>
                </span>
                {t.text}
              </li>
            ))}
          </ul>

          {journeys.length > 0 && <JourneyShowcase journeys={journeys} />}

          {/* Creators */}
          {creators.length > 0 && (
            <section aria-label="Creators in the library" className="mb-16 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-cz-text-muted">Skills in the library come from</p>
              <ul className="mx-auto mt-4 flex max-w-5xl flex-wrap justify-center gap-2">
                {creators.map((name) => (
                  <li key={name} className="flex items-center gap-2 rounded-full border border-cz-border-strong bg-white py-1 pl-1 pr-3 text-sm text-cz-text">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#7ED3C0] to-[#1D5C5E] font-display text-[11px] font-bold text-white">
                      {name.charAt(0).toUpperCase()}
                    </span>
                    {name}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mb-8 text-center">
            <h2 className="font-display text-2xl font-bold text-cz-text sm:text-3xl">Or browse the whole library</h2>
            <p className="mt-2 text-sm text-cz-text-muted">
              {skills.length} skills sorted by level
              {posts.length > skills.length && <>, plus {posts.length - skills.length} older posts from the archive</>}. All are Premium posts on
              Substack. Search by name, topic or creator.
            </p>
          </div>

          {posts.length > 0 ? (
            <LibraryBrowser posts={posts} />
          ) : (
            <div className="py-20 text-center">
              <p className="font-display text-lg text-cz-text">The library is loading its latest skills.</p>
              <p className="mt-2 text-sm text-cz-text-muted">
                Check back in a moment, or{' '}
                <a
                  href="https://cozora.substack.com/archive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cz-teal underline underline-offset-2"
                >
                  browse on Substack
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WelcomePop />
    </div>
  );
}
