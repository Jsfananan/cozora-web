import { bundles, getBundleStats } from '@/lib/bundles';
import Navbar from '@/components/Navbar';
import BuyButton from '@/components/BuyButton';

const { totalBundles, totalSessions } = getBundleStats();

const skillColorMap = {
  Create: { text: 'text-cz-coral', bg: 'bg-cz-coral/10' },
  Build: { text: 'text-cz-teal', bg: 'bg-cz-teal/10' },
  Think: { text: 'text-cz-teal', bg: 'bg-cz-teal/10' },
  Lead: { text: 'text-cz-accent', bg: 'bg-cz-accent/10' },
};

export default function BundlesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="mt-12 mb-12">
            <div className="text-sm font-mono text-cz-coral mb-4">
              The Skill Sets
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 text-cz-text">
              Master AI in 4 Practical Skill Sets
            </h1>
            <p className="text-lg text-cz-text-muted max-w-2xl leading-relaxed">
              Get all {totalBundles} skill bundles — content creation, development,
              knowledge systems, and leadership — with one purchase. Lifetime
              access to {totalSessions} sessions with the creators building with AI every
              day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {bundles.map((bundle) => {
              const colors = skillColorMap[
                bundle.skillNum as keyof typeof skillColorMap
              ] || { text: 'text-cz-teal', bg: 'bg-cz-teal/10' };
              return (
                <div
                  key={bundle.slug}
                >
                  <div className="h-full bg-cz-bg-card border border-cz-border rounded-xl p-6">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-mono ${colors.text} ${colors.bg} mb-4`}>
                      {bundle.skillNum}
                    </div>

                    <h2 className="text-2xl font-display font-bold text-cz-text mb-2">
                      {bundle.name}
                    </h2>

                    <p className="text-sm text-cz-text-muted mb-4">
                      {bundle.tagline}
                    </p>

                    <p className="text-cz-text-muted leading-relaxed">
                      {bundle.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center py-12 border-t border-cz-border">
            <BuyButton className="inline-block px-8 py-3 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-semibold rounded-lg transition-colors">
              Get All Skill Sets — $99
            </BuyButton>
            <p className="mt-4 text-cz-text-muted font-mono text-sm">
              One payment. Lifetime access.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
