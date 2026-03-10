export default function Footer() {
  return (
    <footer className="bg-cz-bg-card border-t border-cz-border py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-display font-bold text-cz-text mb-2">
              cozora
            </h3>
            <p className="text-cz-text-muted text-sm leading-relaxed">
              Stay ahead in AI — learn from the experts who are building it
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-cz-text mb-4">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#skill-sets"
                  className="text-cz-text-muted hover:text-cz-text transition-colors text-sm"
                >
                  Skill Sets
                </a>
              </li>
              <li>
                <a
                  href="/bundles"
                  className="text-cz-text-muted hover:text-cz-text transition-colors text-sm"
                >
                  Bundles
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-cz-text-muted hover:text-cz-text transition-colors text-sm"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-cz-text mb-4">
              Community
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://leadershipinchange10.substack.com/t/cozora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cz-text-muted hover:text-cz-text transition-colors text-sm"
                >
                  Substack
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-cz-text-muted hover:text-cz-text transition-colors text-sm"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@cozora.org"
                  className="text-cz-text-muted hover:text-cz-text transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-cz-text mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/privacy"
                  className="text-cz-text-muted hover:text-cz-text transition-colors text-sm"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-cz-text-muted hover:text-cz-text transition-colors text-sm"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cz-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-cz-text-dim text-sm">
            © {new Date().getFullYear()} Cozora. All rights reserved.
          </p>
          <p className="text-cz-text-dim text-xs text-center">
            This platform is for educational purposes. Results are not
            guaranteed. Past performance does not indicate future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
