'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        sessionStorage.setItem('cz-admin-auth', '1');
        onLogin();
      } else {
        setError('Invalid credentials');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cz-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-xs font-mono text-cz-coral bg-cz-coral/10 px-2 py-1 rounded inline-block mb-4">
            ADMIN
          </div>
          <h1 className="text-2xl font-display font-bold text-cz-text">
            Cozora Admin
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-cz-bg-card border border-cz-border rounded-xl p-6 space-y-4">
          <div>
            <label htmlFor="admin-email" className="block text-sm font-semibold text-cz-text mb-2">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-cz-bg border border-cz-border rounded-lg text-cz-text placeholder-cz-text-dim focus:outline-none focus:border-cz-teal transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-sm font-semibold text-cz-text mb-2">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-cz-bg border border-cz-border rounded-lg text-cz-text placeholder-cz-text-dim focus:outline-none focus:border-cz-teal transition-colors"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-cz-coral">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-cz-accent hover:bg-cz-accent-hover disabled:opacity-70 text-cz-bg font-semibold rounded-lg transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem('cz-admin-auth');
    setAuthenticated(auth === '1');
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-cz-bg flex items-center justify-center">
        <p className="text-cz-text-muted font-mono">Loading...</p>
      </div>
    );
  }

  if (!authenticated) {
    return <LoginForm onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-cz-bg text-cz-text">
      <div className="flex">
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 left-0 z-50 w-64 bg-cz-bg-card border-r border-cz-border transition-transform lg:translate-x-0 lg:static`}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-cz-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-xs font-mono text-cz-coral bg-cz-coral/10 px-2 py-1 rounded">
                  ADMIN
                </div>
              </div>
              <h1 className="text-lg font-display font-bold text-cz-text">
                Cozora
              </h1>
            </div>

            <nav className="flex-1 p-6 space-y-2">
              <Link
                href="/admin"
                className="block px-4 py-2 rounded-lg text-sm font-body text-cz-text-muted hover:text-cz-text hover:bg-cz-bg-card-hover transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/bundles"
                className="block px-4 py-2 rounded-lg text-sm font-body text-cz-text-muted hover:text-cz-text hover:bg-cz-bg-card-hover transition-colors"
              >
                Bundles
              </Link>
              <Link
                href="/admin/settings"
                className="block px-4 py-2 rounded-lg text-sm font-body text-cz-text-muted hover:text-cz-text hover:bg-cz-bg-card-hover transition-colors"
              >
                Settings
              </Link>
            </nav>

            <div className="p-6 border-t border-cz-border space-y-3">
              <button
                onClick={() => {
                  sessionStorage.removeItem('cz-admin-auth');
                  setAuthenticated(false);
                }}
                className="block text-xs text-cz-coral hover:text-cz-coral/80 transition-colors"
              >
                Sign Out
              </button>
              <a
                href="/"
                className="block text-xs text-cz-text-muted hover:text-cz-text transition-colors"
              >
                ← Back to site
              </a>
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="bg-cz-bg-card border-b border-cz-border sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 py-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-cz-bg-card-hover transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div className="flex-1" />
              <div className="text-sm text-cz-text-muted">Admin Panel</div>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            <div className="px-6 py-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
