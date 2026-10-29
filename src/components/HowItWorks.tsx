import { getSkillPosts } from '@/lib/substack';

export default async function HowItWorks() {
  let recent: Awaited<ReturnType<typeof getSkillPosts>> = [];
  try {
    recent = (await getSkillPosts()).slice(0, 3);
  } catch {
    recent = [];
  }

  return (
    <section id="how-it-works" className="mx-auto max-w-3xl scroll-mt-28 px-5 py-24 sm:px-6">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-cz-coral">How it works</p>
        <h2 className="mt-3 font-display text-4xl font-bold text-cz-text sm:text-5xl">New Claude skills every week.</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-cz-text-muted">
          Our creators share the skills they actually use, often ones they&apos;ve refined over months. Ready to run that night.
        </p>
      </div>

      {recent.length > 0 && (
        <div className="mt-16">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-cz-teal">Recent drops</p>
          <div className="flex flex-col gap-5">
            {recent.map((post) => (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-3xl border border-cz-border bg-white p-7 shadow-[0_18px_40px_-32px_rgba(34,48,58,0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:border-cz-accent/40"
              >
                <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
                  {post.tier && <span className="rounded-full bg-cz-peach/50 px-2.5 py-1 text-cz-text">{post.tier}</span>}
                  <span className="font-medium normal-case tracking-normal text-cz-text-dim">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold leading-snug text-cz-text transition-colors group-hover:text-cz-accent">{post.title}</h3>
                {post.creator && <p className="mt-1 text-sm text-cz-teal">by {post.creator}</p>}
                {post.subtitle && <p className="mt-3 line-clamp-3 leading-relaxed text-cz-text-muted">{post.subtitle}</p>}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="https://cozora.substack.com/subscribe"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[52px] items-center rounded-full bg-cz-accent px-8 font-display text-base font-semibold text-white shadow-lg shadow-cz-accent/20 transition-all hover:-translate-y-0.5 hover:bg-cz-accent-hover"
        >
          Join Cozora
        </a>
        <a href="/library" className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-cz-border-strong bg-white px-8 font-display text-base font-semibold text-cz-text transition-all hover:-translate-y-0.5 hover:border-cz-accent">
          See the whole library <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </section>
  );
}
