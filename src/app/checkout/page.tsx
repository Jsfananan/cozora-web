'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

export default function CheckoutPage() {
  const [error, setError] = useState(false);

  useEffect(() => {
    const redirectToStripe = async () => {
      try {
        const res = await fetch('/api/checkout', { method: 'POST' });
        const data = await res.json();

        if (data.url) {
          window.location.href = data.url;
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      }
    };

    redirectToStripe();
  }, []);

  if (error) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center pb-16">
          <div className="w-full max-w-md text-center">
            <h1 className="text-3xl font-display font-bold text-cz-text mb-4">
              Something went wrong
            </h1>
            <p className="text-cz-text-muted mb-8">
              We couldn&apos;t connect to our payment processor. Please try again.
            </p>
            <a
              href="/bundles"
              className="inline-block px-8 py-3 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-semibold rounded-lg transition-colors"
            >
              Back to Bundles
            </a>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center pb-16">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex w-16 h-16 bg-cz-accent/10 rounded-full items-center justify-center mb-6">
            <svg className="animate-spin h-8 w-8 text-cz-accent" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <h1 className="text-2xl font-display font-bold text-cz-text mb-3">
            Redirecting to checkout...
          </h1>
          <p className="text-cz-text-muted">
            You&apos;ll be taken to our secure payment page in a moment.
          </p>
        </div>
      </main>
    </>
  );
}
