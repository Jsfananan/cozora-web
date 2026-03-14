import { getBundleStats } from '@/lib/bundles';

const { totalBundles } = getBundleStats();

const skillSets = [
  {
    label: 'Create',
    color: 'text-cz-teal',
    title: 'Content Creation Mastery',
    description:
      'Learn how top AI practitioners craft newsletters, blogs, and viral content. Get frameworks for turning your expertise into engaging material.',
  },
  {
    label: 'Build',
    color: 'text-cz-accent',
    title: 'AI Application Development',
    description:
      'From prompt engineering to full-stack AI apps. See real code, real workflows, and real problems solved by builders shipping AI products.',
  },
  {
    label: 'Think',
    color: 'text-cz-coral',
    title: 'Knowledge & Reasoning Systems',
    description:
      'Master structured thinking with AI. Discover how to build knowledge bases, vector stores, and reasoning pipelines that actually work.',
  },
  {
    label: 'Lead',
    color: 'text-cz-deep-teal',
    title: 'Leadership in AI Transformation',
    description:
      'Navigate organizational change as AI becomes embedded in your business. Learn from leaders managing teams, strategy, and culture.',
  },
];

export default function SkillSets() {
  return (
    <section
      id="skill-sets"
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center animate-fade-up">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-cz-text mb-4">
            The Skill Sets
          </h2>
          <p className="text-lg text-cz-text-muted">
            Master {totalBundles} essential skills. Updated every week with fresh
            expert-led sessions.
          </p>
        </div>

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
      </div>
    </section>
  );
}
