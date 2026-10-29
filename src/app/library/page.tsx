import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LibraryBrowser from '@/components/library/LibraryBrowser';
import JourneyShowcase from '@/components/library/JourneyShowcase';
import WelcomePop from '@/components/library/WelcomePop';
import Reveal from '@/components/library/Reveal';
import { getSkillPosts } from '@/lib/substack';
import { resolveJourneys } from '@/lib/journeys';
import { initialOf } from '@/lib/initial';

export const revalidate = 1800; // refresh from Substack every 30 min

const SUBSCRIBE_URL = 'https://cozora.substack.com/subscribe';

const DESCRIPTION =
  'Your path through AI skills. Claude skills from AI creators on Substack, credited by name and put in order as learning journeys, so you always know what to try next.';

export const metadata: Metadata = {
  title: 'Cozora Library: your path through AI skills',
  description: DESCRIPTION,
  openGraph: {
    title: 'Cozora Library: your path through AI skills',
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
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          {/* Hero */}
          <header className="mx-auto mb-16 max-w-3xl rounded-[2rem] border border-cz-border-strong bg-white/60 px-5 py-12 text-center shadow-[0_30px_70px_-40px_rgba(31,41,55,0.35)] sm:px-10">
            <p className="animate-fade-up inline-flex items-center rounded-full border border-cz-border-strong bg-white px-3 py-1 font-mono text-xs uppercase tracking-widest text-cz-accent">
              Cozora Library
            </p>
            <h1 className="animate-fade-up delay-100 mt-4 font-display text-4xl font-bold leading-tight text-cz-text sm:text-6xl">
              Your path through{' '}
              <span className="bg-gradient-to-r from-[#1F5F5B] via-[#23776F] to-[#A8512C] bg-clip-text text-transparent">AI skills</span>.
            </h1>
            <p className="animate-fade-up delay-200 mx-auto mt-5 max-w-2xl text-lg text-cz-text-muted">
              Hand-picked Claude skills from AI creators on Substack, put in order by goal, so you always know what to try next.
            </p>
            <div className="animate-fade-up delay-300 mt-10 text-left">
              <p className="mb-5 text-center font-display text-lg font-semibold text-cz-text">How do you want to start?</p>
              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                {[
                  { href: '#journeys', title: 'Follow a journey', body: 'Pick a goal and we walk you through the right skills in order.', tone: 'from-[#8FD3C4] to-[#C8EBE2]', glow: 'bg-[#8FD3C4]/40', primary: true },
                  { href: '#browse', title: 'Pick skills a la carte', body: 'Search the whole library and open whichever skill you want.', tone: 'from-[#FFD2B0] to-[#B9A6EE]', glow: 'bg-[#FFD2B0]/40' },
                ].map((o) => (
                  <a
                    key={o.href}
                    href={o.href}
                    className={`group relative flex flex-col items-start overflow-hidden rounded-[28px] border ${o.primary ? 'border-cz-accent bg-cz-deep-teal' : 'border-cz-border-strong bg-white'} p-5 shadow-[0_18px_40px_-28px_rgba(31,41,55,0.4)] transition-all duration-500 hover:-translate-y-2 hover:border-cz-accent hover:shadow-[0_32px_60px_-28px_rgba(31,95,91,0.55)] sm:p-7 ${FOCUS}`}
                  >
                    <span aria-hidden className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-150 ${o.glow}`} />
                    <span className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-cz-text shadow-md transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${o.tone}`}>
                      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d={o.href === '#journeys' ? TRUST[2].icon : 'M21 21l-5.2-5.2M10.5 18a7.5 7.5 0 110-15 7.5 7.5 0 010 15z'} />
                      </svg>
                    </span>
                    <span className="relative mt-5 block font-display text-lg font-bold leading-snug text-cz-text sm:text-xl">{o.title}</span>
                    <span className="relative mt-2 block text-sm leading-relaxed text-cz-text-muted sm:text-[15px]">{o.body}</span>
                    <span
                      className={`relative mt-6 inline-flex items-center gap-1.5 rounded-full px-5 py-2 font-display text-sm font-semibold transition-colors ${
                        o.primary
                          ? 'bg-cz-accent text-white group-hover:bg-cz-accent-hover'
                          : 'border border-cz-border-strong bg-white text-cz-text group-hover:border-cz-accent group-hover:text-cz-accent'
                      }`}
                    >
                      Start
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </span>
                  </a>
                ))}
              </div>
            </div>
            <p className="animate-fade-up delay-300 mt-8 font-mono text-[13px] text-cz-text-muted">
              {skills.length} skills · {creators.length} creators · new skills every week
            </p>
          </header>

          {/* Trust strip */}
          <ul className="animate-fade-up delay-300 mx-auto mb-20 max-w-3xl flex flex-col items-start gap-4 sm:items-center">
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

          {journeys.length > 0 && (
            <Reveal>
              <JourneyShowcase journeys={journeys} />
            </Reveal>
          )}

          {/* Creators */}
          {creators.length > 0 && (
            <Reveal><section aria-label="Creators in the library" className="mx-auto mb-24 max-w-3xl text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-cz-text-muted">Skills in the library come from</p>
              <ul className="mx-auto mt-5 flex flex-wrap justify-center gap-2.5">
                {creators.map((name) => (
                  <li key={name} className="flex items-center gap-2 rounded-full border border-cz-border-strong bg-white py-1 pl-1 pr-3 text-sm text-cz-text">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cz-seafoam font-display text-[11px] font-bold text-cz-text">
                      {initialOf(name)}
                    </span>
                    {name}
                  </li>
                ))}
              </ul>
            </section></Reveal>
          )}

          <Reveal><div id="browse" className="mx-auto mb-10 max-w-3xl scroll-mt-28 text-center">
            <h2 className="font-display text-2xl font-bold text-cz-text sm:text-3xl">Or browse the whole library</h2>
            <p className="mt-2 text-sm text-cz-text-muted">
              {skills.length} skills sorted by level
              {posts.length > skills.length && <>, plus {posts.length - skills.length} older posts from the archive</>}. All are Premium posts on
              Substack. Search by name, topic or creator.
            </p>
          </div></Reveal>

          {posts.length > 0 ? (
            <div className="mx-auto max-w-5xl">
              <LibraryBrowser posts={posts} />
            </div>
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
