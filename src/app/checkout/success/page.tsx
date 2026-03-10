'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function CheckoutSuccessPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAccountForm, setShowAccountForm] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      // TODO: Wire up account creation with Supabase
      console.log('Create account:', { email, password });
    } catch (error) {
      console.error('Account creation error:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center pb-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-block w-16 h-16 bg-cz-accent/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl">✓</span>
            </div>
            <h1 className="text-4xl font-display font-bold text-cz-text mb-3">
              You're in!
            </h1>
            <p className="text-lg text-cz-text-muted">
              All 4 Skill Sets are now unlocked.
            </p>
          </div>

          {showAccountForm && (
            <div className="bg-cz-bg-card border border-cz-border rounded-xl p-8 mb-6">
              <h2 className="text-xl font-display font-bold text-cz-text mb-4">
                Create your account
              </h2>
              <p className="text-sm text-cz-text-muted mb-6">
                Set up your account to claim your purchase and start accessing
                your sessions.
              </p>

              <form onSubmit={handleCreateAccount} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-cz-text mb-2">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-cz-bg border border-cz-border rounded-lg text-cz-text placeholder-cz-text-dim focus:outline-none focus:border-cz-border-strong transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-cz-text mb-2">
                    Create a password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="w-full px-4 py-3 bg-cz-bg border border-cz-border rounded-lg text-cz-text placeholder-cz-text-dim focus:outline-none focus:border-cz-border-strong transition-colors"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isCreating}
                  className="w-full px-6 py-3 bg-cz-accent hover:bg-cz-accent-hover disabled:opacity-50 text-cz-bg font-semibold rounded-lg transition-colors"
                >
                  {isCreating ? 'Creating account...' : 'Create account'}
                </button>
              </form>

              <button
                onClick={() => setShowAccountForm(false)}
                className="w-full mt-4 text-sm text-cz-text-muted hover:text-cz-text transition-colors"
              >
                Skip for now
              </button>
            </div>
          )}

          <Link
            href="/dashboard"
            className="block w-full px-8 py-3 bg-cz-deep-teal hover:bg-cz-deep-teal-hover text-cz-text font-semibold rounded-lg transition-colors text-center"
          >
            Go to Your Dashboard
          </Link>
        </div>
      </main>
    </>
  );
}
