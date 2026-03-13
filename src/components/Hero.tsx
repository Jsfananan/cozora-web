export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-cz-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cz-coral/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="px-3 py-2 border border-cz-accent rounded-full text-sm font-mono text-cz-accent">
              Live Sessions
            </div>
            <div className="px-3 py-2 border border-cz-teal rounded-full text-sm font-mono text-cz-teal">
              30+ Experts
            </div>
            <div className="px-3 py-2 border border-cz-coral rounded-full text-sm font-mono text-cz-coral">
              New Creators Every Week
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 text-cz-text">
            Learn AI with the creators who are{' '}
            <span className="text-cz-teal italic">building it</span>.
          </h1>

          <p className="text-lg text-cz-text-muted mb-8 leading-relaxed">
            Weekly live sessions with AI practitioners. Master content creation,
            development, knowledge systems, and leadership &mdash; straight from the
            experts building with AI every day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://cozora.substack.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-semibold rounded-lg transition-colors text-center text-lg"
            >
              Subscribe on Substack
            </a>
            <a
              href="https://buy.stripe.com/5kQ6oHfxd1vG5YNgH04ko00"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 border border-cz-border hover:border-cz-accent bg-transparent text-cz-text hover:text-cz-accent rounded-lg transition-colors text-center text-lg"
            >
              Get Skill Sets &mdash; $99
            </a>
          </div>

          <p className="mt-4 text-sm text-cz-text-dim font-mono">
            Free to subscribe &middot; $75/mo for full access
          </p>
        </div>

        <div className="animate-fade-up delay-200">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cz-teal/20 to-cz-coral/20 rounded-2xl blur opacity-30" />
            <div className="relative bg-cz-bg-card border border-cz-border rounded-2xl overflow-hidden" style={{ padding: '75% 0 0 0', position: 'relative' }}>
              <iframe
                src="https://player.vimeo.com/video/1173388069?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0&sidedock=0&fun=0"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Cozora"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
