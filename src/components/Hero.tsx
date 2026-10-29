import { getSkillPosts } from '@/lib/substack';
import { resolveJourneys } from '@/lib/journeys';

// Single place for the headline so a slogan change is one edit.
const HEADLINE = 'Your path through AI skills, from the creators building them.';

const SUBSCRIBE_URL = 'https://cozora.substack.com/subscribe';

export default async function Hero() {
  let skillCount = 0;
  let goals: { id: string; label: string }[] = [];
  try {
    const posts = await getSkillPosts();
    // Same rule as the library page: only depth-tagged posts count as skills.
    skillCount = posts.filter((p) => p.tier).length;
    goals = resolveJourneys(posts).map((j) => ({ id: j.id, label: j.intent }));
  } catch {
    /* page still renders without the live numbers */
  }

  const gets = [
    {
      title: skillCount > 0 ? `${skillCount} ready-made AI skills` : 'Ready-made AI skills',
      body: 'Copy, install, use. Our install guide walks you through the first one.',
      tone: 'bg-cz-seafoam',
    },
    {
      title: 'A clear order to follow',
      body: 'Pick a goal, like writing better or growing your Substack. We tell you what to try first, second and third.',
      tone: 'bg-cz-lilac',
    },
    {
      title: '2 new skills every week',
      body: 'From AI creators who built them for their own work, credited by name.',
      tone: 'bg-cz-peach',
    },
  ];

  return (
    <section className="relative mx-auto max-w-3xl px-5 pb-8 pt-36 sm:px-6 sm:pt-44">
      <div aria-hidden className="cz-jny-drift pointer-events-none absolute -left-24 top-24 -z-10 h-72 w-72 rounded-full bg-cz-seafoam/30 blur-3xl" />
      <div aria-hidden className="cz-jny-drift-slow pointer-events-none absolute -right-24 top-64 -z-10 h-72 w-72 rounded-full bg-cz-lilac/30 blur-3xl" />

      <div className="animate-fade-up text-center">
        <p className="inline-flex items-center rounded-full bg-cz-deep-teal px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cz-accent">
          The Cozora skill library
        </p>
        <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] text-cz-text sm:text-6xl">{HEADLINE}</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cz-text-muted">
          Ready-made AI skills you can copy, install and use. Hand-picked and grouped by goal, so you always know what to try next.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={SUBSCRIBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] items-center rounded-full bg-cz-accent px-8 font-display text-base font-semibold text-white shadow-lg shadow-cz-accent/20 transition-all hover:-translate-y-0.5 hover:bg-cz-accent-hover"
          >
            Join Cozora
          </a>
          <a
            href="/library"
            className="inline-flex min-h-[52px] items-center rounded-full border border-cz-border-strong bg-white px-8 font-display text-base font-semibold text-cz-text transition-all hover:-translate-y-0.5 hover:border-cz-accent"
          >
            Browse the library
          </a>
        </div>
        <p className="mt-4 text-sm text-cz-text-muted">$19/month or $99/year. Cancel anytime.</p>
      </div>

      <div className="animate-fade-up delay-200 mt-16 rounded-3xl border border-cz-border bg-cz-deep-teal/70 p-7 sm:p-9">
        <h2 className="font-display text-xl font-bold text-cz-text">What&apos;s a skill?</h2>
        <p className="mt-3 leading-relaxed text-cz-text-muted">
          A saved set of instructions that teaches your AI assistant to do one job well, like writing your Notes or preparing a hard conversation. The skills in our library are made for Claude.
        </p>
      </div>

      <div className="mt-20">
        <h2 className="text-center font-display text-3xl font-bold text-cz-text">What you get</h2>
        <ol className="mt-10 flex flex-col gap-5">
          {gets.map((g, i) => (
            <li
              key={g.title}
              className="group flex items-start gap-5 rounded-3xl border border-cz-border bg-white p-6 shadow-[0_18px_40px_-30px_rgba(34,48,58,0.35)] transition-all duration-500 hover:-translate-y-1 hover:border-cz-accent/40"
            >
              <span className={`flex h-12 w-12 flex-none items-center justify-center rounded-2xl font-display text-lg font-bold text-cz-text transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${g.tone}`}>
                {i + 1}
              </span>
              <span>
                <span className="block font-display text-xl font-bold text-cz-text">{g.title}</span>
                <span className="mt-1 block leading-relaxed text-cz-text-muted">{g.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      {goals.length > 0 && (
        <div className="mt-20 text-center">
          <h2 className="font-display text-3xl font-bold text-cz-text">Pick a goal</h2>
          <p className="mx-auto mt-3 max-w-md text-cz-text-muted">We&apos;ll open the right path for it in the library.</p>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {goals.map((g) => (
              <li key={g.id}>
                <a
                  href={`/library#journey-${g.id}`}
                  className="inline-flex min-h-[48px] items-center rounded-full border border-cz-border-strong bg-white px-6 font-display text-[15px] font-semibold text-cz-text transition-all hover:-translate-y-1 hover:border-cz-accent hover:bg-cz-deep-teal"
                >
                  {g.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
