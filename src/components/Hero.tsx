export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-cz-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cz-coral/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="px-3 py-2 border border-cz-accent rounded-full text-sm font-mono text-cz-accent">
              Creator Community
            </div>
            <div className="px-3 py-2 border border-cz-teal rounded-full text-sm font-mono text-cz-teal">
              40+ Creators
            </div>
            <div className="px-3 py-2 border border-cz-coral rounded-full text-sm font-mono text-cz-coral">
              New Skill Every Week
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 text-cz-text">
            Learn AI with the creators who are{' '}
            <span className="text-cz-teal italic">building it</span>.
          </h1>

          <p className="text-lg text-cz-text-muted mb-8 leading-relaxed">
            Join a community of 40+ of the top Substack AI creators &mdash; and get a
            new Claude skill every week, with the video walkthrough, the ready-to-run
            prompt, and the thinking behind it. Because you don&apos;t learn AI alone.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://cozora.substack.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-semibold rounded-lg transition-colors text-center text-lg"
            >
              Join for $39/month
            </a>
            <a
              href="/library"
              className="px-8 py-3.5 border border-cz-border hover:border-cz-accent bg-transparent text-cz-text hover:text-cz-accent rounded-lg transition-colors text-center text-lg"
            >
              See the skills first
            </a>
          </div>

          <p className="mt-4 text-sm text-cz-text-muted font-mono">
            $359/year &mdash; nearly 3 months free &middot; Cancel anytime
          </p>
        </div>

        <div className="animate-fade-up delay-200">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cz-teal/20 to-cz-coral/20 rounded-2xl blur opacity-30" />
            <div className="relative bg-cz-bg-card border border-cz-border rounded-2xl overflow-hidden aspect-video">
              <iframe
                src="https://iframe.mediadelivery.net/embed/624658/b9ad6db2-d9f8-4f3b-9423-0150a241690f?autoplay=false&preload=true"
                loading="lazy"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title="Cozora Introduction"
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
