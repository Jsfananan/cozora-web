'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function RecoverAccessPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/recover-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/access/${data.access_token}`);
      } else {
        const data = await res.json();
        setError(data.error || 'No purchase found for this email.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center pb-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-display font-bold text-cz-text mb-3">
              Recover Your Access
            </h1>
            <p className="text-lg text-cz-text-muted">
              Enter the email you used to purchase the Skill Sets and we&apos;ll take you right to your content.
            </p>
          </div>

          <div className="bg-cz-bg-card border border-cz-border rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-cz-text mb-2">
                  Purchase email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-cz-bg border border-cz-border rounded-lg text-cz-text placeholder-cz-text-dim focus:outline-none focus:border-cz-accent transition-colors"
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-cz-coral">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-cz-accent hover:bg-cz-accent-hover disabled:opacity-50 text-cz-bg font-semibold rounded-lg transition-colors"
              >
                {loading ? 'Looking up...' : 'Find My Access'}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-cz-text-dim">
            Haven&apos;t purchased yet?{' '}
            <a
              href="https://buy.stripe.com/5kQ6oHfxd1vG5YNgH04ko00"
              className="text-cz-accent hover:underline"
            >
              Get All 4 Skill Sets &mdash; $99
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
