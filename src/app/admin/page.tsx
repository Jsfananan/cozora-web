'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getBundleStats } from '@/lib/bundles';

interface RecentRow {
  email: string;
  amount_paid: number;
  created_at: string;
  source: 'manual' | 'stripe_live' | 'stripe_test' | 'unknown';
}

interface Stats {
  totalPurchasesAll: number;
  totalPurchasesReal: number;
  totalRevenueCents: number;
  recent: RecentRow[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function AdminDashboard() {
  const { totalBundles, totalSessions } = getBundleStats();
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load stats');
        setStats(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  const totalPurchases = stats?.totalPurchasesReal ?? 0;
  const totalRevenue = stats ? (stats.totalRevenueCents / 100).toFixed(0) : '0';

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-display font-bold text-cz-text mb-2">
          Dashboard
        </h1>
        <p className="text-cz-text-muted">
          Overview of all bundles, sessions, and purchases
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-cz-bg-card border border-cz-border rounded-lg p-6">
          <div className="text-xs font-mono text-cz-text-muted uppercase tracking-wider mb-2">
            Total Bundles
          </div>
          <div className="text-3xl font-display font-bold text-cz-text">
            {totalBundles}
          </div>
        </div>

        <div className="bg-cz-bg-card border border-cz-border rounded-lg p-6">
          <div className="text-xs font-mono text-cz-text-muted uppercase tracking-wider mb-2">
            Total Sessions
          </div>
          <div className="text-3xl font-display font-bold text-cz-text">
            {totalSessions}
          </div>
        </div>

        <div className="bg-cz-bg-card border border-cz-border rounded-lg p-6">
          <div className="text-xs font-mono text-cz-text-muted uppercase tracking-wider mb-2">
            Purchases (real)
          </div>
          <div className="text-3xl font-display font-bold text-cz-text">
            {totalPurchases}
          </div>
          {stats && stats.totalPurchasesAll !== stats.totalPurchasesReal && (
            <div className="text-xs text-cz-text-dim font-mono mt-1">
              {stats.totalPurchasesAll} total incl. tests/backfills
            </div>
          )}
        </div>

        <div className="bg-cz-bg-card border border-cz-border rounded-lg p-6">
          <div className="text-xs font-mono text-cz-text-muted uppercase tracking-wider mb-2">
            Revenue
          </div>
          <div className="text-3xl font-display font-bold text-cz-text">
            ${totalRevenue}
          </div>
          <div className="text-xs text-cz-text-dim font-mono mt-1">
            excludes manual + test
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-cz-coral/10 border border-cz-coral/30 rounded-lg px-4 py-3">
          <p className="text-sm text-cz-coral">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-cz-bg-card border border-cz-border rounded-lg p-6">
          <h2 className="text-lg font-display font-bold text-cz-text mb-4">
            Quick Links
          </h2>
          <div className="space-y-3">
            <Link
              href="/admin/bundles"
              className="flex items-center justify-between p-3 rounded-lg bg-cz-bg hover:bg-cz-bg-card-hover transition-colors"
            >
              <span className="text-cz-text-muted">Manage Bundles</span>
              <span className="text-cz-teal">→</span>
            </Link>
            <Link
              href="/admin/purchases"
              className="flex items-center justify-between p-3 rounded-lg bg-cz-bg hover:bg-cz-bg-card-hover transition-colors"
            >
              <span className="text-cz-text-muted">View Purchases</span>
              <span className="text-cz-teal">→</span>
            </Link>
          </div>
        </div>

        <div className="bg-cz-bg-card border border-cz-border rounded-lg p-6">
          <h2 className="text-lg font-display font-bold text-cz-text mb-4">
            Recent Activity
          </h2>
          <div className="space-y-2">
            {!stats ? (
              <p className="text-sm text-cz-text-muted">Loading...</p>
            ) : stats.recent.length === 0 ? (
              <div className="p-3 rounded-lg bg-cz-bg text-sm text-cz-text-muted">
                No recent activity yet.
              </div>
            ) : (
              stats.recent.map((r, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-cz-bg flex items-center justify-between text-sm"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-cz-text truncate">{r.email}</div>
                    <div className="text-xs text-cz-text-muted font-mono">
                      {formatDate(r.created_at)} · ${(r.amount_paid / 100).toFixed(0)}
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                      r.source === 'stripe_live'
                        ? 'bg-cz-teal/10 text-cz-teal'
                        : r.source === 'manual'
                        ? 'bg-cz-coral/10 text-cz-coral'
                        : 'bg-cz-accent/10 text-cz-accent'
                    }`}
                  >
                    {r.source === 'stripe_live'
                      ? 'Stripe'
                      : r.source === 'manual'
                      ? 'Manual'
                      : r.source === 'stripe_test'
                      ? 'Test'
                      : '?'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
