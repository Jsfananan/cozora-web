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
            development, knowledge systems, and leadership — straight from the
            experts building with AI every day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://leadershipinchange10.substack.com/t/cozora"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-semibold rounded-lg transition-colors text-center"
            >
              Join on Substack
            </a>
            <a
              href="/bundles"
              className="px-8 py-3 border border-cz-border hover:border-cz-border-strong bg-transparent text-cz-text rounded-lg transition-colors text-center"
            >
              Get the Skill Sets — $99
            </a>
          </div>
        </div>

        <div className="animate-fade-up delay-200">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cz-teal/20 to-cz-coral/20 rounded-2xl blur opacity-30" />
            <div className="relative bg-cz-bg-card border border-cz-border rounded-2xl overflow-hidden aspect-video">
              <iframe
                src="https://player.vimeo.com/video/1153686967"
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen; picture-in-picture"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
