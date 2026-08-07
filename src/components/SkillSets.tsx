import { getSkillPosts } from '@/lib/substack';

const skillSets = [
  {
    label: 'Create',
    color: 'text-cz-teal',
    title: 'Content & Creation',
    description:
      'Skills for newsletters, blogs, video, and viral content — the exact workflows our creators use to turn expertise into work that ships.',
  },
  {
    label: 'Build',
    color: 'text-cz-accent',
    title: 'Building with AI',
    description:
      'From prompt engineering to Claude Code and full-stack apps. Real skills from builders shipping AI products every day.',
  },
  {
    label: 'Think',
    color: 'text-cz-coral',
    title: 'Knowledge & Reasoning',
    description:
      'Skills for structured thinking with AI — knowledge bases, mental models, and reasoning systems that actually work.',
  },
  {
    label: 'Lead',
    color: 'text-cz-deep-teal',
    title: 'Leading the Change',
    description:
      'Skills for embedding AI across a team or business — strategy, culture, and the decisions that come with it.',
  },
];

const skillIncludes = [
  {
    title: 'A video walkthrough',
    description: 'Watch a creator run the skill end to end, in 15–20 focused minutes.',
  },
  {
    title: 'The skill, ready to run',
    description: 'The complete prompt or a downloadable skill you drop straight into Claude.',
  },
  {
    title: 'The why behind it',
    description: 'The problem it solves and when to reach for it — so you actually use it.',
  },
];

export default async function SkillSets() {
  let recent: Awaited<ReturnType<typeof getSkillPosts>> = [];
  try {
    recent = (await getSkillPosts()).slice(0, 3);
  } catch {
    recent = [];
  }

  return (
    <section
      id="skill-sets"
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center animate-fade-up">
          <p className="text-sm font-mono text-cz-coral mb-4 tracking-wide">
            THE SKILL LIBRARY
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-cz-text mb-4">
            A new Claude skill every week.
          </h2>
          <p className="text-lg text-cz-text-muted max-w-2xl mx-auto">
            Each week, one of our creators drops a real skill they actually use &mdash;
            something they&apos;ve refined over months. Ready to run that night.
          </p>
        </div>

        {recent.length > 0 && (
          <div className="mb-16 animate-fade-up">
            <p className="text-xs font-mono text-cz-teal uppercase tracking-wider mb-5 text-center">
              Recent drops
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {recent.map((post) => (
                <a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-cz-bg-card border border-cz-border rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cz-teal"
                >
                  <div className="flex items-center gap-2 mb-3">
                    {post.tier && (
                      <span className="font-mono text-[0.7rem] text-cz-coral uppercase tracking-wider">
                        {post.tier}
                      </span>
                    )}
                    <span className="font-mono text-[0.7rem] text-cz-text-dim">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-cz-text mb-2 leading-snug group-hover:text-cz-teal transition-colors">
                    {post.title}
                  </h3>
                  {post.subtitle && (
                    <p className="text-sm text-cz-text-muted leading-relaxed line-clamp-3">
                      {post.subtitle}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {skillSets.map((set, index) => (
            <div
              key={set.label}
              className="animate-fade-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-cz-bg-card border border-cz-border rounded-2xl p-8 h-full transition-all duration-300 hover:-translate-y-1 hover:border-cz-teal hover:shadow-lg hover:shadow-cz-teal/10">
                <div className={`font-mono text-sm mb-3 ${set.color}`}>
                  {set.label}
                </div>
                <h3 className="text-2xl font-display font-bold text-cz-text mb-4">
                  {set.title}
                </h3>
                <p className="text-cz-text-muted mb-6 leading-relaxed">
                  {set.description}
                </p>
                <div className="flex items-center gap-2 text-cz-teal text-sm font-mono">
                  <span>Updated Weekly</span>
                  <div className="w-2 h-2 bg-cz-teal rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-cz-bg-card border border-cz-border rounded-2xl p-8 sm:p-10 animate-fade-up">
          <h3 className="text-xl font-display font-bold text-cz-text mb-8 text-center">
            Every skill comes with three things
          </h3>
          <div className="grid sm:grid-cols-3 gap-8">
            {skillIncludes.map((item, index) => (
              <div key={item.title} className="text-center sm:text-left">
                <div className="font-mono text-sm text-cz-teal mb-2">
                  0{index + 1}
                </div>
                <h4 className="font-display font-semibold text-cz-text mb-1.5">
                  {item.title}
                </h4>
                <p className="text-sm text-cz-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center animate-fade-up">
          <a
            href="https://cozora.substack.com/archive"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cz-teal hover:text-cz-accent font-medium transition-colors"
          >
            See the latest skills on Substack
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
