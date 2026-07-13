import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LibraryBrowser from '@/components/library/LibraryBrowser';
import { getSkillPosts } from '@/lib/substack';

export const revalidate = 1800; // refresh from Substack every 30 min

export const metadata: Metadata = {
  title: 'Premium Library — Cozora',
  description:
    'The Cozora Premium Library — every member skill drop in one place. Browse by Start Here, Apply AI, and Go Deep, search by name, and open the full skill on Substack.',
  openGraph: {
    title: 'Premium Library — Cozora',
    description:
      'Every Cozora member skill drop in one place. Browse, search, and open the full skill on Substack.',
    url: 'https://cozora.org/library',
    siteName: 'Cozora',
    type: 'website',
  },
};

export default async function LibraryPage() {
  const posts = await getSkillPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cz-bg pb-24 pt-32 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mx-auto mb-14 max-w-3xl text-center">
            <p className="animate-fade-up font-mono text-sm uppercase tracking-widest text-cz-coral cz-lib-glow">
              Members Only
            </p>
            <h1 className="animate-fade-up delay-100 mt-3 font-display text-4xl font-bold text-cz-text sm:text-5xl">
              Premium Library
            </h1>
            <p className="animate-fade-up delay-200 mx-auto mt-5 max-w-2xl text-lg text-cz-text-muted">
              Every Cozora skill drop in one place. Pick a card to open the full
              skill on Substack — Premium subscribers see the whole thing, no
              paywall in the way.
            </p>
            <p className="animate-fade-up delay-300 mt-4 text-sm text-cz-text-muted/80">
              Not a member yet?{' '}
              <a
                href="https://cozora.substack.com/subscribe"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-cz-accent underline underline-offset-2 hover:text-cz-accent-hover"
              >
                Join Cozora Premium
              </a>{' '}
              to unlock the full library.
            </p>
          </header>

          {posts.length > 0 ? (
            <LibraryBrowser posts={posts} />
          ) : (
            <div className="py-20 text-center">
              <p className="font-display text-lg text-cz-text">
                The library is loading its latest skills.
              </p>
              <p className="mt-2 text-sm text-cz-text-muted">
                Check back in a moment, or{' '}
                <a
                  href="https://cozora.substack.com/archive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cz-teal underline underline-offset-2"
                >
                  browse on Substack
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
