import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — Cozora',
  description:
    'How Cozora collects, uses, and protects your information.',
};

const LAST_UPDATED = 'April 24, 2026';

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-cz-text-muted text-sm">Last updated: {LAST_UPDATED}</p>
          </header>

          <div className="space-y-8 text-cz-text-muted leading-relaxed">
            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                1. Who we are
              </h2>
              <p>
                Cozora (&quot;Cozora,&quot; &quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot;) operates cozora.org and provides AI education
                content, live sessions, and bundle purchases. This policy
                explains what we collect, how we use it, and the choices you
                have.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                2. Information we collect
              </h2>
              <p className="mb-3">We collect the following categories of information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="text-cz-text font-medium">Account and purchase data.</span>{' '}
                  Name, email address, and purchase records when you buy a
                  bundle or create an account.
                </li>
                <li>
                  <span className="text-cz-text font-medium">Payment data.</span>{' '}
                  Payments are processed by Stripe. We do not store your full
                  card number. Stripe shares limited metadata (last 4 digits,
                  card brand, billing country) with us for reconciliation.
                </li>
                <li>
                  <span className="text-cz-text font-medium">Usage data.</span>{' '}
                  Basic analytics such as pages viewed, referral source, device
                  type, and approximate location (from IP), used to improve the
                  site.
                </li>
                <li>
                  <span className="text-cz-text font-medium">Communications.</span>{' '}
                  Messages you send us (email, contact form, support replies).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                3. How we use your information
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To deliver bundle access, videos, and PDFs you purchased.</li>
                <li>To send transactional emails (receipts, account access, refunds).</li>
                <li>To respond to your questions and support requests.</li>
                <li>To improve the site, content, and customer experience.</li>
                <li>To comply with legal obligations and prevent fraud.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                4. How we share information
              </h2>
              <p className="mb-3">
                We do not sell your personal information. We share data only
                with service providers who help us run Cozora, under appropriate
                agreements:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="text-cz-text font-medium">Stripe</span> for payments.
                </li>
                <li>
                  <span className="text-cz-text font-medium">Supabase</span> for account and purchase storage.
                </li>
                <li>
                  <span className="text-cz-text font-medium">Vercel</span> for website hosting.
                </li>
                <li>
                  <span className="text-cz-text font-medium">Email providers</span> for sending transactional messages.
                </li>
                <li>
                  <span className="text-cz-text font-medium">Video and file hosts</span> to deliver bundle content you purchased.
                </li>
              </ul>
              <p className="mt-3">
                We may also disclose information if required by law, to protect
                our rights, or in connection with a merger or sale of the
                business.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                5. Cookies and analytics
              </h2>
              <p>
                We use essential cookies to keep you signed in and process
                purchases, and we may use privacy-respecting analytics to
                understand aggregate site usage. You can clear cookies in your
                browser at any time, though some parts of the site may stop
                working.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                6. Data retention
              </h2>
              <p>
                We keep account and purchase records for as long as your account
                is active and for a reasonable period afterward to handle
                refunds, taxes, and legal requirements. You can request deletion
                at any time (see Section 8).
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                7. Security
              </h2>
              <p>
                We use industry-standard practices to protect your information,
                including encryption in transit (HTTPS) and at rest where
                supported by our providers. No online service is perfectly
                secure, so we can&apos;t guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                8. Your rights
              </h2>
              <p className="mb-3">
                Depending on where you live, you may have rights to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you.</li>
                <li>Correct inaccurate information.</li>
                <li>Delete your information (subject to legal retention rules).</li>
                <li>Object to or restrict certain processing.</li>
                <li>Request a portable copy of your data.</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, email{' '}
                <a
                  href="mailto:cozorateam@gmail.com"
                  className="text-cz-teal hover:text-cz-accent transition-colors"
                >
                  cozorateam@gmail.com
                </a>
                . We&apos;ll respond within a reasonable time.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                9. Children
              </h2>
              <p>
                Cozora is intended for adults. We do not knowingly collect
                personal information from children under 13 (or the minimum age
                required by your jurisdiction). If you believe a child has given
                us information, please contact us and we&apos;ll remove it.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                10. International users
              </h2>
              <p>
                Cozora is operated from the United States. If you access the
                site from outside the U.S., your information may be transferred
                to and processed in the U.S., where data protection laws may
                differ from those in your country.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                11. Changes to this policy
              </h2>
              <p>
                We may update this policy from time to time. When we do,
                we&apos;ll update the &quot;Last updated&quot; date at the top
                and, for material changes, notify you by email or with a notice
                on the site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-cz-text mb-3">
                12. Contact
              </h2>
              <p>
                Questions about this policy or your data? Email{' '}
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
