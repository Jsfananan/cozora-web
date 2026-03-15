'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

type PageState = 'verifying' | 'error';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [state, setState] = useState<PageState>('verifying');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      setState('error');
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch('/api/verify-purchase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        });

        if (res.ok) {
          const data = await res.json();
          router.replace(`/access/${data.access_token}`);
        } else {
          setState('error');
        }
      } catch {
        setState('error');
      }
    };

    verify();
  }, [sessionId, router]);

  if (state === 'error') {
    return (
      <>
        <h1 className="text-3xl font-display font-bold text-cz-text mb-4">
          Something went wrong
        </h1>
        <p className="text-cz-text-muted mb-8">
          We couldn&apos;t verify your purchase. If you completed payment, your access is still safe &mdash; try recovering it with your email.
        </p>
        <Link
          href="/access"
          className="inline-block px-8 py-3 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-semibold rounded-lg transition-colors"
        >
          Recover My Access
        </Link>
      </>
    );
  }

  return (
    <>
      <div className="inline-flex w-16 h-16 bg-cz-accent/10 rounded-full items-center justify-center mb-6">
        <span className="text-3xl text-cz-accent animate-pulse">&#10003;</span>
      </div>
      <h1 className="text-3xl font-display font-bold text-cz-text mb-3">
        Payment received!
      </h1>
      <p className="text-cz-text-muted">
        Setting up your access...
      </p>
    </>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center pb-16">
        <div className="w-full max-w-md text-center">
          <Suspense
            fallback={
              <>
                <div className="inline-flex w-16 h-16 bg-cz-accent/10 rounded-full items-center justify-center mb-6">
                  <span className="text-3xl text-cz-accent animate-pulse">&#10003;</span>
                </div>
                <h1 className="text-3xl font-display font-bold text-cz-text mb-3">
                  Payment received!
                </h1>
                <p className="text-cz-text-muted">
                  Setting up your access...
                </p>
              </>
            }
          >
            <CheckoutSuccessContent />
          </Suspense>
        </div>
      </main>
    </>
  );
}
