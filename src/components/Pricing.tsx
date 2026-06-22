import BuyButton from './BuyButton';
import { getBundleStats } from '@/lib/bundles';

const { totalBundles, totalSessions } = getBundleStats();

const features = [
  'Lifetime access to all 4 skill-set bundles',
  '16 recorded expert sessions',
  'Downloadable guides, frameworks & templates',
  'Yours forever — watch anytime',
  'No subscription required',
];

const communityFeatures = [
  'Creator community of 40+ top AI creators',
  'A new Claude skill every week',
  'Each skill: video walkthrough + ready-to-run prompt + the why',
  'Free creator interviews — live for everyone',
  'Full Skill Library archive',
  'Everything in the Skill Sets back-catalog',
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center animate-fade-up">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-cz-text mb-4">
            Two Ways to Learn
          </h2>
          <p className="text-lg text-cz-text-muted max-w-xl mx-auto">
            Own the recorded library forever, or join the creator community and get a new skill every week.
          </p>
        </div>

        <div className="mb-12 flex justify-center animate-fade-up">
          <a
            href="https://cozora.substack.com/p/premium-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-5 py-3 bg-cz-bg-card border border-cz-accent/40 hover:border-cz-accent rounded-full transition-all hover:bg-cz-bg-card-hover"
          >
            <span className="text-xs font-mono font-semibold text-cz-accent uppercase tracking-wider">
              Already a Premium Subscriber?
            </span>
            <span className="text-sm text-cz-text font-medium group-hover:text-cz-accent transition-colors">
              Start Here →
            </span>
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="animate-fade-up">
            <div className="bg-cz-bg-card border border-cz-border rounded-2xl p-8 h-full flex flex-col">
              <h3 className="text-2xl font-display font-bold text-cz-text mb-2">
                The Skill Sets
              </h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-cz-accent">$99</span>
                <span className="text-cz-text-muted ml-2">one-time</span>
              </div>
              <p className="text-sm text-cz-text-muted mb-6">
                Lifetime access to all {totalBundles} bundles &mdash; {totalSessions} sessions of expert content you can watch anytime.
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <svg
                      className="w-5 h-5 text-cz-accent flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-cz-text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <BuyButton className="block w-full px-6 py-3.5 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg rounded-lg transition-colors text-center font-semibold">
                Get the Skill Sets
              </BuyButton>
            </div>
          </div>

          <div className="animate-fade-up delay-200">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-cz-teal/20 to-cz-accent/20 rounded-2xl blur-xl opacity-50" />
              <div className="relative bg-gradient-to-br from-cz-bg-card to-cz-bg-card-hover border border-cz-teal/50 rounded-2xl p-8 h-full flex flex-col">
                <div className="inline-block mb-6 px-3 py-1 bg-cz-teal/20 border border-cz-teal rounded-full text-cz-teal text-sm font-mono font-semibold w-fit">
                  MOST POPULAR
                </div>

                <h3 className="text-2xl font-display font-bold text-cz-text mb-2">
                  The Creator Community
                </h3>
                <div className="mb-6">
                  <div className="mb-1">
                    <span className="text-5xl font-bold text-cz-accent">$75</span>
                    <span className="text-cz-text-muted ml-2">/month</span>
                  </div>
                  <span className="text-sm text-cz-text-muted">
                    or $720/year (save $180)
                  </span>
                </div>
                <p className="text-sm text-cz-text-muted mb-6">
                  Join 40+ of the top Substack AI creators and get a new Claude skill every week &mdash; plus creator interviews, free to all.
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {communityFeatures.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <svg
                        className="w-5 h-5 text-cz-teal flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-cz-text">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://cozora.substack.com/subscribe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3.5 bg-cz-teal hover:bg-cz-teal/90 text-cz-bg rounded-lg transition-colors text-center font-semibold"
                >
                  Subscribe on Substack
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
