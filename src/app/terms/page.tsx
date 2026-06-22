import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service — Cozora',
  description:
    'The terms that govern your use of Cozora, including refunds, access, and acceptable use.',
};

const LAST_UPDATED = 'April 24, 2026';

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cz-bg text-cz-text min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12">
            <p className="font-mono text-xs uppercase tracking-widest text-cz-coral mb-3">
              Legal
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-cz-text mb-4">
              Terms of Service
            </h1>
            <p className="text-cz-text-muted text-sm">Last updated: {LAST_UPDATED}</p>
          </header>

          {/* Money-back highlight */}
          <div className="mb-12 rounded-2xl border border-cz-teal/40 bg-gradient-to-br from-cz-deep-teal/40 to-cz-bg-card p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-cz-teal mb-2">
              30-Day Money-Back Guarantee
            </p>
            <p className="text-cz-text text-lg leading-relaxed">
              If Cozora isn&apos;t right for you, email us within 30 days of
              your purchase and we&apos;ll refund you in full.{' '}
              <span className="text-cz-teal font-medium">No questions asked.</span>
            </p>
          </div>

          <div className="space-y-8 text-cz-text-muted leading-relaxed">
            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                1. Agreement to these terms
              </h2>
              <p>
                By accessing or using cozora.org (the &quot;Site&quot;) or
                purchasing a Cozora bundle (the &quot;Services&quot;), you agree
                to these Terms of Service. If you don&apos;t agree, please
                don&apos;t use the Site or Services.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                2. What Cozora provides
              </h2>
              <p>
                Cozora offers AI education content, including live sessions
                (hosted on Substack), recorded sessions, PDFs, and bundle
                purchases. Content is provided for educational and informational
                purposes only.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                3. Eligibility and accounts
              </h2>
              <p>
                You must be at least 18 years old (or the age of majority in
                your jurisdiction) to purchase. You&apos;re responsible for
                keeping your account credentials secure and for all activity
                under your account.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                4. Pricing and payment
              </h2>
              <p>
                Bundle pricing is shown on the purchase page. Payments are
                processed by Stripe. A one-time bundle purchase grants access to
                the bundle content as described at the time of purchase.
                Applicable taxes may be added at checkout.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                5. 30-day money-back guarantee
              </h2>
              <p className="mb-3">
                We stand behind Cozora. If you&apos;re not satisfied for any
                reason, email{' '}
                <a
                  href="mailto:cozorateam@gmail.com"
                  className="text-cz-teal hover:text-cz-accent transition-colors"
                >
                  cozorateam@gmail.com
                </a>{' '}
                within 30 days of your purchase and we&apos;ll issue a full
                refund to your original payment method. No questions asked.
              </p>
              <p>
                Refunds are typically processed within 5–10 business days,
                depending on your bank or card issuer. After the 30-day window,
                purchases are non-refundable except where required by law.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                6. Access to content
              </h2>
              <p>
                Bundle access is tied to the email address used at purchase.
                After your refund window ends, your bundle access continues for
                as long as Cozora maintains the platform. If we ever have to
                remove or change content, we&apos;ll give reasonable notice.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                7. License and your use of content
              </h2>
              <p className="mb-3">
                We grant you a personal, non-transferable, non-exclusive license
                to access and view bundle content for your own learning. You
                may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Share, resell, or redistribute bundle content.</li>
                <li>Upload it to another platform, public or private.</li>
                <li>Use it to train or fine-tune AI models.</li>
                <li>Share your account credentials with anyone else.</li>
              </ul>
              <p className="mt-3">
                All content, branding, and materials on Cozora are owned by
                Cozora or our partner creators and are protected by copyright
                and other laws.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                8. User conduct
              </h2>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Services for anything illegal or harmful.</li>
                <li>Attempt to access accounts or content you didn&apos;t purchase.</li>
                <li>Probe, scan, scrape, or interfere with the Site&apos;s security.</li>
                <li>Impersonate anyone or misrepresent your affiliation.</li>
                <li>Harass, threaten, or abuse other users, creators, or staff.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                9. Third-party services
              </h2>
              <p>
                Some features rely on third parties (Stripe, Supabase, Vercel,
                Substack, video and file hosts). Your use of those services is
                subject to their own terms. We&apos;re not responsible for
                issues caused by third-party outages or changes.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                10. Disclaimers
              </h2>
              <p>
                Cozora is provided &quot;as is&quot; and &quot;as
                available.&quot; Content is educational and not professional,
                legal, financial, or medical advice. Results are not guaranteed
                and will vary. Past performance does not indicate future
                results. We disclaim all warranties to the fullest extent
                permitted by law.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                11. Limitation of liability
              </h2>
              <p>
                To the fullest extent permitted by law, Cozora and its
                affiliates are not liable for indirect, incidental, special,
                consequential, or punitive damages, or for any loss of profits,
                revenue, data, or goodwill. Our total liability to you for any
                claim arising from or related to the Services is limited to the
                amount you paid us in the 12 months before the claim.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                12. Indemnification
              </h2>
              <p>
                You agree to indemnify and hold Cozora harmless from any claims,
                losses, or expenses (including reasonable attorneys&apos; fees)
                arising out of your use of the Services or your violation of
                these Terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                13. Termination
              </h2>
              <p>
                We may suspend or end your access to the Services if you
                violate these Terms. You can stop using Cozora at any time. If
                your account is terminated for violating these Terms, refunds
                outside the 30-day window are not required.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                14. Changes to the Services or Terms
              </h2>
              <p>
                We may update the Services and these Terms from time to time.
                Material changes will be noted here with an updated &quot;Last
                updated&quot; date. Continued use of Cozora after a change
                means you accept the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                15. Governing law
              </h2>
              <p>
                These Terms are governed by the laws of the United States and
                the state in which Cozora is based, without regard to conflict
                of laws rules. Any disputes will be resolved in the state or
                federal courts located there.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                16. Contact
              </h2>
              <p>
                Questions about these Terms? Email{' '}
                <a
                  href="mailto:cozorateam@gmail.com"
                  className="text-cz-teal hover:text-cz-accent transition-colors"
                >
                  cozorateam@gmail.com
                </a>{' '}
                or visit our{' '}
                <Link
                  href="/contact"
                  className="text-cz-teal hover:text-cz-accent transition-colors"
                >
                  contact page
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
