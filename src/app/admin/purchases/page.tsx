'use client';

import { useState, useEffect, useCallback } from 'react';

interface Purchase {
  id: string;
  email: string;
  profile_id: string | null;
  stripe_session_id: string;
  stripe_customer_id: string | null;
  amount_paid: number;
  status: string;
  access_token: string | null;
  created_at: string;
  source: 'manual' | 'stripe_live' | 'stripe_test' | 'unknown';
}

const SITE_URL =
  typeof window !== 'undefined' ? window.location.origin : 'https://cozora.org';

function sourceBadge(source: Purchase['source']) {
  if (source === 'manual') {
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cz-coral/10 text-cz-coral uppercase tracking-wider">
        Manual
      </span>
    );
  }
  if (source === 'stripe_live') {
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cz-teal/10 text-cz-teal uppercase tracking-wider">
        Stripe
      </span>
    );
  }
  if (source === 'stripe_test') {
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cz-accent/10 text-cz-accent uppercase tracking-wider">
        Test
      </span>
    );
  }
  return (
    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cz-text-dim/10 text-cz-text-dim uppercase tracking-wider">
      Unknown
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const handle = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };
  return (
    <button
      onClick={handle}
      className="text-xs font-mono px-2 py-1 rounded border border-cz-border hover:border-cz-teal hover:text-cz-teal text-cz-text-muted transition-colors"
    >
      {copied ? 'Copied!' : 'Copy link'}
    </button>
  );
}

function BackfillForm({ onCreated }: { onCreated: (accessUrl: string) => void }) {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('99');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastLink, setLastLink] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setLastLink(null);

    try {
      const res = await fetch('/api/admin/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          amount_paid: Math.round(Number(amount) * 100),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create purchase');
      setLastLink(data.access_url);
      onCreated(data.access_url);
      setEmail('');
      setAmount('99');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-cz-bg-card border border-cz-border rounded-lg p-6 space-y-4"
    >
      <div>
        <h3 className="text-lg font-display font-bold text-cz-text">
          Backfill a purchase
        </h3>
        <p className="text-sm text-cz-text-muted mt-1">
          Use this for customers who paid through a pre-Supabase processor or whose webhook
          failed. Creates a tokenized access link.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <label className="block text-xs font-mono text-cz-text-muted mb-1">
            Customer email *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="customer@example.com"
            className="w-full bg-cz-bg border border-cz-border text-cz-text rounded-lg px-3 py-2 text-sm focus:border-cz-teal focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-cz-text-muted mb-1">
            Amount (USD)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-cz-bg border border-cz-border text-cz-text rounded-lg px-3 py-2 text-sm focus:border-cz-teal focus:outline-none"
          />
        </div>
      </div>

      {error && <p className="text-sm text-cz-coral">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting || !email.trim()}
          className="px-5 py-2 bg-cz-accent hover:bg-cz-accent-hover disabled:opacity-50 text-cz-bg font-semibold rounded-lg text-sm transition-colors"
        >
          {submitting ? 'Creating...' : 'Create + generate access link'}
        </button>
        {lastLink && (
          <div className="flex items-center gap-2 text-xs text-cz-teal font-mono truncate max-w-md">
            <span className="truncate">{lastLink}</span>
            <CopyLinkButton url={lastLink} />
          </div>
        )}
      </div>
    </form>
  );
}

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchPurchases = useCallback(async (q: string) => {
    setLoading(true);
    setError(null);
    try {
      const url = q ? `/api/admin/purchases?q=${encodeURIComponent(q)}` : '/api/admin/purchases';
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load');
      setPurchases(data.purchases);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPurchases('');
  }, [fetchPurchases]);

  useEffect(() => {
    const t = setTimeout(() => fetchPurchases(query), 250);
    return () => clearTimeout(t);
  }, [query, fetchPurchases]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold text-cz-text mb-2">Purchases</h1>
        <p className="text-cz-text-muted">
          {total} {total === 1 ? 'record' : 'records'} in Supabase. Use search to find a customer
          or backfill a missing payment.
        </p>
      </div>

      <BackfillForm onCreated={() => fetchPurchases(query)} />

      <div className="bg-cz-bg-card border border-cz-border rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by email..."
            className="flex-1 max-w-md bg-cz-bg border border-cz-border text-cz-text rounded-lg px-3 py-2 text-sm focus:border-cz-teal focus:outline-none"
          />
          <button
            onClick={() => fetchPurchases(query)}
            className="px-4 py-2 border border-cz-border hover:border-cz-teal text-cz-text-muted hover:text-cz-teal rounded-lg text-sm font-mono transition-colors"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="bg-cz-coral/10 border border-cz-coral/30 rounded-lg px-4 py-3">
            <p className="text-sm text-cz-coral">{error}</p>
          </div>
        )}

        {loading ? (
          <p className="text-sm text-cz-text-muted">Loading...</p>
        ) : purchases.length === 0 ? (
          <p className="text-sm text-cz-text-muted">
            {query ? 'No purchases match that search.' : 'No purchases yet.'}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-mono text-cz-text-muted uppercase tracking-wider border-b border-cz-border">
                  <th className="py-3 pr-4">Email</th>
                  <th className="py-3 pr-4">Date</th>
                  <th className="py-3 pr-4">Amount</th>
                  <th className="py-3 pr-4">Source</th>
                  <th className="py-3 pr-4">Linked</th>
                  <th className="py-3 pr-4">Access link</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((p) => {
                  const url = p.access_token ? `${SITE_URL}/access/${p.access_token}` : null;
                  return (
                    <tr key={p.id} className="border-b border-cz-border/40">
                      <td className="py-3 pr-4 text-cz-text">{p.email}</td>
                      <td className="py-3 pr-4 text-cz-text-muted">{formatDate(p.created_at)}</td>
                      <td className="py-3 pr-4 text-cz-text">
                        ${(p.amount_paid / 100).toFixed(2)}
                      </td>
                      <td className="py-3 pr-4">{sourceBadge(p.source)}</td>
                      <td className="py-3 pr-4">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            p.profile_id ? 'bg-cz-teal' : 'bg-cz-text-dim'
                          }`}
                          title={p.profile_id ? 'Linked to account' : 'No account yet'}
                        />
                      </td>
                      <td className="py-3 pr-4">
                        {url ? (
                          <div className="flex items-center gap-2">
                            <a
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-mono text-cz-teal hover:underline truncate max-w-[180px] inline-block"
                            >
                              /access/{p.access_token?.slice(0, 8)}…
                            </a>
                            <CopyLinkButton url={url} />
                          </div>
                        ) : (
                          <span className="text-xs text-cz-text-dim font-mono">no token</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
