import { bundles, getBundleStats } from '@/lib/bundles';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BuyButton from '@/components/BuyButton';
import type { Metadata } from 'next';

const { totalBundles, totalSessions } = getBundleStats();

export const metadata: Metadata = {
  title: `AI Skill Set Bundles — ${totalSessions} Expert Sessions for $99 | Cozora`,
  description:
    `Get lifetime access to ${totalSessions} expert-led AI sessions across content creation, development, knowledge systems, and leadership. One payment, no subscription.`,
  openGraph: {
    title: `AI Skill Set Bundles — ${totalSessions} Expert Sessions for $99 | Cozora`,
    description:
      `Get lifetime access to ${totalSessions} expert-led AI sessions across content creation, development, knowledge systems, and leadership.`,
    url: 'https://cozora.org/ai-bundles',
    siteName: 'Cozora',
    type: 'website',
  },
};

const skillColorMap = {
  Create: { text: 'text-cz-coral', bg: 'bg-cz-coral/10', border: 'border-cz-coral/30' },
  Build: { text: 'text-cz-teal', bg: 'bg-cz-teal/10', border: 'border-cz-teal/30' },
  Think: { text: 'text-cz-teal', bg: 'bg-cz-teal/10', border: 'border-cz-teal/30' },
  Lead: { text: 'text-cz-accent', bg: 'bg-cz-accent/10', border: 'border-cz-accent/30' },
};

const highlights = [
  { num: String(totalSessions), label: 'Expert Sessions' },
  { num: String(totalBundles), label: 'Skill Sets' },
  { num: '$99', label: 'One-Time Payment' },
  { num: '∞', label: 'Lifetime Access' },
];

const bundleFaqs = [
  {
    q: 'What do I get for $99?',
    a: `Lifetime access to all ${totalBundles} skill set bundles — ${totalSessions} recorded sessions covering AI content creation, development, knowledge systems, and leadership. Each session includes video recordings and downloadable guides.`,
  },
  {
    q: 'Is this a subscription?',
    a: 'No. One payment of $99 and the content is yours forever. No recurring charges, no expiration dates.',
  },
  {
    q: 'Do I need technical experience?',
    a: 'No. Sessions range from beginner-friendly (content creation, leadership) to more technical (development, knowledge systems). Each skill set is designed for practical implementation, not theory.',
  },
  {
    q: 'Who teaches the sessions?',
    a: 'Real practitioners — not influencers. Our creators are actively building with AI: shipping products, running agencies, creating content, and leading teams. They teach what they use daily.',
  },
  {
    q: 'Can I watch at my own pace?',
    a: 'Yes. All sessions are pre-recorded and available on-demand. Watch whenever and wherever works for you.',
  },
  {
    q: 'What if I want live sessions and community too?',
    a: 'We offer a Substack membership ($75/month) that includes everything in the bundles plus weekly live sessions, community access, and direct interaction with expert creators.',
  },
];

export default function AIBundlesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        {/* Hero */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-cz-teal/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cz-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-1.5 bg-cz-accent/10 border border-cz-accent/30 rounded-full text-cz-accent text-sm font-mono mb-8">
              One-Time Purchase &mdash; No Subscription Required
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 text-cz-text">
              Master AI with{' '}
              <span className="text-cz-teal italic">{totalSessions} expert-led sessions</span>
            </h1>

            <p className="text-lg sm:text-xl text-cz-text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
              {totalBundles} skill set bundles covering content creation, development, knowledge systems, and leadership — taught by the practitioners building with AI every day.
            </p>

            <BuyButton className="px-10 py-4 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-semibold rounded-lg transition-colors text-lg">
              Get All Skill Sets &mdash; $99
            </BuyButton>

            <p className="mt-4 text-sm text-cz-text-dim font-mono">
              One payment &middot; Lifetime access &middot; No recurring fees
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-y border-cz-border py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {highlights.map((h) => (
              <div key={h.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-display font-bold text-cz-accent mb-1">
                  {h.num}
                </div>
                <div className="text-sm text-cz-text-muted font-mono">{h.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-mono text-cz-coral mb-4">WHAT&apos;S INCLUDED</p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-cz-text mb-4">
                All Skill Sets. One Purchase.
              </h2>
              <p className="text-lg text-cz-text-muted max-w-xl mx-auto">
                Each bundle contains 4 sessions with video recordings and downloadable guides from expert AI practitioners.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {bundles.map((bundle) => {
                const colors = skillColorMap[bundle.skillNum as keyof typeof skillColorMap] || {
                  text: 'text-cz-teal',
                  bg: 'bg-cz-teal/10',
                  border: 'border-cz-teal/30',
                };
                return (
                  <div
                    key={bundle.slug}
                    className="bg-cz-bg-card border border-cz-border rounded-xl p-6 hover:border-cz-teal/50 transition-colors"
                  >
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-mono ${colors.text} ${colors.bg} mb-4`}>
                      {bundle.skillNum}
                    </div>
                    <h3 className="text-xl font-display font-bold text-cz-text mb-2">
                      {bundle.name}
                    </h3>
                    <p className="text-sm text-cz-text-muted mb-5 leading-relaxed">
                      {bundle.description}
                    </p>

                    <div className="space-y-3">
                      {bundle.sessions.map((session) => (
                        <div
                          key={session.number}
                          className="flex items-start gap-3 text-sm"
                        >
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cz-accent/20 flex items-center justify-center mt-0.5">
                            <span className="font-mono text-xs text-cz-accent font-semibold">
                              {session.number}
                            </span>
                          </div>
                          <div>
                            <p className="text-cz-text font-medium">{session.title}</p>
                            <p className="text-cz-text-dim text-xs font-mono mt-0.5">
                              with {session.creator}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mid-Page CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-cz-bg-card to-cz-bg-card-hover border border-cz-teal/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-cz-text mb-4">
              All {totalSessions} sessions. One payment. Yours forever.
            </h2>
            <p className="text-cz-text-muted mb-8 max-w-lg mx-auto">
              No subscriptions, no upsells, no expiration. Pay once and get lifetime access to every session across all skill sets.
            </p>
            <BuyButton className="px-10 py-4 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-semibold rounded-lg transition-colors text-lg">
              Get the Skill Sets &mdash; $99
            </BuyButton>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-mono text-cz-coral mb-4">FAQ</p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-cz-text">
                Common Questions
              </h2>
            </div>

            <div className="space-y-0 divide-y divide-cz-border border-t border-b border-cz-border">
              {bundleFaqs.map((faq, i) => (
                <details key={i} className="group">
                  <summary className="flex items-center justify-between gap-4 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span className="font-display font-semibold text-cz-text group-hover:text-cz-teal transition-colors">
                      {faq.q}
                    </span>
                    <span className="w-7 h-7 rounded-full border border-cz-border group-open:border-cz-teal group-open:bg-cz-teal/10 flex items-center justify-center text-cz-teal text-lg shrink-0 transition-all group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pb-6 text-cz-text-muted text-[0.95rem] leading-relaxed max-w-[680px]">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-cz-border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-cz-text mb-4">
              Start learning from the experts today
            </h2>
            <p className="text-lg text-cz-text-muted mb-10 max-w-xl mx-auto">
              {totalSessions} sessions. {totalBundles} skill sets. Practitioners who build with AI every day. All yours for a single payment.
            </p>
            <BuyButton className="px-10 py-4 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-semibold rounded-lg transition-colors text-lg">
              Get All Skill Sets &mdash; $99
            </BuyButton>
            <p className="mt-6 text-sm text-cz-text-dim">
              Secure checkout powered by Stripe
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
