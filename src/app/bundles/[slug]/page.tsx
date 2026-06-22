import Link from 'next/link';
import Navbar from '@/components/Navbar';
import BuyButton from '@/components/BuyButton';
import { getBundlesWithSessions } from '@/lib/supabase/admin';

const skillColorMap = {
  Create: { text: 'text-cz-coral', bg: 'bg-cz-coral/10' },
  Build: { text: 'text-cz-teal', bg: 'bg-cz-teal/10' },
  Think: { text: 'text-cz-teal', bg: 'bg-cz-teal/10' },
  Lead: { text: 'text-cz-accent', bg: 'bg-cz-accent/10' },
};

export const revalidate = 60;

export async function generateStaticParams() {
  const bundles = await getBundlesWithSessions();
  return bundles
    .filter((b) => b.is_active)
    .map((bundle) => ({ slug: bundle.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const bundles = await getBundlesWithSessions();
  const bundle = bundles.find((b) => b.slug === params.slug);
  return {
    title: bundle ? `${bundle.name} | Cozora` : 'Bundle | Cozora',
    description: bundle?.description || 'Learn AI with the creators building it.',
  };
}

export default async function BundleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const allBundles = await getBundlesWithSessions();
  const activeBundles = allBundles.filter((b) => b.is_active);
  const bundle = activeBundles.find((b) => b.slug === params.slug);
  const totalSessions = activeBundles.reduce(
    (sum, b) => sum + b.sessions.filter((s) => s.is_active).length,
    0
  );

  if (!bundle) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl font-display font-bold text-cz-text mb-4">
              Bundle not found
            </h1>
            <Link href="/bundles" className="text-cz-accent hover:text-cz-accent-hover">
              Back to Skill Sets
            </Link>
          </div>
        </main>
      </>
    );
  }

  const colors =
    skillColorMap[bundle.skill_num as keyof typeof skillColorMap] || {
      text: 'text-cz-teal',
      bg: 'bg-cz-teal/10',
    };
  const sessions = bundle.sessions
    .filter((s) => s.is_active)
    .sort((a, b) => a.sort_order - b.sort_order || a.number - b.number);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/bundles"
            className="text-cz-text-muted hover:text-cz-text transition-colors flex items-center gap-2 mb-8"
          >
            <span>&larr;</span> Back to Skill Sets
          </Link>

          <div className="mb-8">
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-mono ${colors.text} ${colors.bg} mb-4`}>
              {bundle.skill_num}
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-cz-text mb-4">
              {bundle.name}
            </h1>
            {bundle.description && (
              <p className="text-lg text-cz-text-muted leading-relaxed">
                {bundle.description}
              </p>
            )}
          </div>

          <div className="bg-cz-bg-card border border-cz-border rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-display font-bold text-cz-text mb-6">
              Sessions
            </h2>
            <div className="space-y-6">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="pb-6 border-b border-cz-border last:border-b-0 last:pb-0"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cz-accent/20 flex items-center justify-center">
                      <span className="font-mono text-sm text-cz-accent font-semibold">
                        {session.number}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-cz-text mb-2">
                        {session.title}
                      </h3>
                      {session.description && (
                        <p className="text-cz-text-muted mb-3">
                          {session.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-4 text-sm text-cz-text-muted font-mono">
                        <span>with {session.creator}</span>
                        {session.date && <span>{session.date}</span>}
                        {session.duration && <span>{session.duration}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center border-t border-cz-border pt-8">
            <div className="mb-6">
              <p className="text-cz-text-muted mb-4">
                This skill set is part of the complete collection.
              </p>
              <BuyButton className="inline-block px-8 py-3 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-semibold rounded-lg transition-colors">
                Get All Skill Sets &mdash; $99
              </BuyButton>
            </div>
            <p className="text-cz-text-muted font-mono text-sm">
              One payment. Lifetime access to all {totalSessions} sessions.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
