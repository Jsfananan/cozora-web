import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact — Cozora',
  description:
    'Get in touch with the Cozora team. Refunds, bundle access, partnerships, and general questions.',
};

const TEAM_EMAIL = 'cozorateam@gmail.com';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cz-bg text-cz-text min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-cz-coral mb-3">
              Say hello
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-cz-text mb-4">
              Contact the Cozora team
            </h1>
            <p className="text-cz-text-muted text-lg max-w-xl mx-auto">
              One inbox, real humans. We usually reply within one business day.
            </p>
          </header>

          {/* Primary email card */}
          <div className="rounded-2xl border border-cz-border-strong bg-cz-bg-card p-8 sm:p-10 mb-10 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-cz-teal mb-4">
              Email us
            </p>
            <a
              href={`mailto:${TEAM_EMAIL}`}
              className="inline-block font-display text-2xl sm:text-3xl font-bold text-cz-accent hover:text-cz-accent-hover transition-colors break-all"
            >
              {TEAM_EMAIL}
            </a>
            <p className="text-cz-text-muted text-sm mt-4">
              The fastest way to reach us for anything below.
            </p>
          </div>

          {/* Reason grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <div className="rounded-xl border border-cz-border bg-cz-bg-card p-5">
              <h3 className="font-display font-semibold text-cz-text mb-1">
                Refunds
              </h3>
              <p className="text-cz-text-muted text-sm leading-relaxed">
                Within 30 days of purchase? Email us and we&apos;ll refund you
                in full. No questions asked.
              </p>
            </div>
            <div className="rounded-xl border border-cz-border bg-cz-bg-card p-5">
              <h3 className="font-display font-semibold text-cz-text mb-1">
                Bundle access
              </h3>
              <p className="text-cz-text-muted text-sm leading-relaxed">
                Lost your login or can&apos;t find a session? Tell us the email
                you used at checkout and we&apos;ll sort it.
              </p>
            </div>
            <div className="rounded-xl border border-cz-border bg-cz-bg-card p-5">
              <h3 className="font-display font-semibold text-cz-text mb-1">
                Creators &amp; partnerships
              </h3>
              <p className="text-cz-text-muted text-sm leading-relaxed">
                Want to share a skill or collaborate with Cozora? Send
                us a quick intro and what you&apos;d cover.
              </p>
            </div>
            <div className="rounded-xl border border-cz-border bg-cz-bg-card p-5">
              <h3 className="font-display font-semibold text-cz-text mb-1">
                Everything else
              </h3>
              <p className="text-cz-text-muted text-sm leading-relaxed">
                Billing, press, technical issues, feedback. One email works for
                all of it.
              </p>
            </div>
          </div>

          {/* Footer note */}
          <div className="text-center text-cz-text-muted text-sm">
            <p>
              Looking for our policies? Read the{' '}
              <Link
                href="/privacy"
                className="text-cz-teal hover:text-cz-accent transition-colors"
              >
                Privacy Policy
              </Link>{' '}
              or{' '}
              <Link
                href="/terms"
                className="text-cz-teal hover:text-cz-accent transition-colors"
              >
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
