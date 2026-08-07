const communityFeatures = [
  'A new Claude skill every week — yours to run that night',
  'Every skill: video walkthrough + ready-to-run prompt + the why',
  'The full Skill Library, searchable by topic',
  'The creator community — 40+ of the top Substack AI creators',
  'New creators added regularly across writing, code, video & strategy',
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center animate-fade-up">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-cz-text mb-4">
            Join the Creator Community
          </h2>
          <p className="text-lg text-cz-text-muted max-w-xl mx-auto">
            40+ of the top Substack AI creators, and a new Claude skill every week you can run the night it drops.
          </p>
        </div>

        <div className="animate-fade-up delay-200">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-cz-teal/30 to-cz-accent/25 rounded-2xl blur-xl opacity-100" />
            <div className="relative bg-gradient-to-br from-[#1D5C5E]/30 to-cz-bg-card border-2 border-cz-teal/70 rounded-2xl p-8 sm:p-10">
              <p className="text-xs font-mono text-cz-coral uppercase tracking-wider mb-2">
                Membership
              </p>
              <h3 className="text-2xl font-display font-bold text-cz-text mb-6">
                The Creator Community
              </h3>

              <div className="grid sm:grid-cols-2 gap-8 items-start">
                <ul className="space-y-3">
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
                      <span className="text-cz-text text-[0.95rem] leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="sm:border-l sm:border-cz-border sm:pl-8">
                  <div className="mb-1 flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-cz-accent">$359</span>
                    <span className="text-cz-text-muted">/year</span>
                  </div>
                  <p className="text-sm text-cz-teal font-medium mb-6">
                    Nearly 3 months free
                  </p>

                  <a
                    href="https://cozora.substack.com/subscribe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-6 py-4 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg rounded-lg transition-colors text-center font-semibold text-lg"
                  >
                    Join for $359/year
                  </a>

                  <a
                    href="https://cozora.substack.com/subscribe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full mt-3 px-6 py-3 border border-cz-border hover:border-cz-accent text-cz-text hover:text-cz-accent rounded-lg transition-colors text-center font-medium"
                  >
                    Or $39/month
                  </a>

                  <div className="mt-5 flex items-center gap-2 text-cz-teal">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span className="text-sm font-semibold">
                      Cancel anytime &mdash; no contract, no lock-in
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-cz-text-dim">
          Creator interviews are free for everyone —{' '}
          <a
            href="https://cozora.substack.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cz-text-muted hover:text-cz-accent underline underline-offset-4 transition-colors"
          >
            follow free
          </a>{' '}
          to catch those. Already a member?{' '}
          <a
            href="https://cozora.substack.com/p/premium-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cz-text-muted hover:text-cz-accent underline underline-offset-4 transition-colors"
          >
            Start here
          </a>
          .
        </p>
      </div>
    </section>
  );
}
