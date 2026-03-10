'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Wire up authentication with Supabase
      console.log('Login attempt:', { email, password });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center pb-16">
        <div className="w-full max-w-md">
          <div className="bg-cz-bg-card border border-cz-border rounded-xl p-8">
            <h1 className="text-3xl font-display font-bold text-cz-text mb-2">
              Welcome back
            </h1>
            <p className="text-cz-text-muted mb-8">
              Sign in to access your Skill Sets.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-cz-bg border border-cz-border rounded-lg text-cz-text placeholder-cz-text-dim focus:outline-none focus:border-cz-border-strong transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-cz-accent hover:bg-cz-accent-hover disabled:opacity-50 text-cz-bg font-semibold rounded-lg transition-colors"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-cz-border">
              <p className="text-cz-text-muted text-sm mb-4">
                Don't have an account yet?
              </p>
              <Link
                href="/bundles"
                className="inline-block text-cz-accent hover:text-cz-accent-hover font-semibold transition-colors"
              >
                Purchase the Skill Sets to get started →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
