'use client';

import Link from 'next/link';
import { bundles } from '@/lib/bundles';

export default function AdminDashboard() {
  const totalBundles = bundles.length;
  const totalSessions = bundles.reduce((sum, b) => sum + b.sessions.length, 0);
  const totalPurchases = 0;
  const totalRevenue = 0;

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
            Total Purchases
          </div>
          <div className="text-3xl font-display font-bold text-cz-text">
            {totalPurchases}
          </div>
        </div>

        <div className="bg-cz-bg-card border border-cz-border rounded-lg p-6">
          <div className="text-xs font-mono text-cz-text-muted uppercase tracking-wider mb-2">
            Total Revenue
          </div>
          <div className="text-3xl font-display font-bold text-cz-text">
            ${totalRevenue}
          </div>
        </div>
      </div>

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
            <a
              href="#"
              className="flex items-center justify-between p-3 rounded-lg bg-cz-bg hover:bg-cz-bg-card-hover transition-colors"
            >
              <span className="text-cz-text-muted">View Purchases</span>
              <span className="text-cz-teal">→</span>
            </a>
          </div>
        </div>

        <div className="bg-cz-bg-card border border-cz-border rounded-lg p-6">
          <h2 className="text-lg font-display font-bold text-cz-text mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3 text-sm text-cz-text-muted">
            <div className="p-3 rounded-lg bg-cz-bg">
              No recent activity yet.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
