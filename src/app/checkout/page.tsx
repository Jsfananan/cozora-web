'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function CheckoutPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    router.push('/checkout/success?session_id=demo_session');
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center pb-16">
        <div className="w-full max-w-lg">
          {/* Order Summary */}
          <div className="bg-cz-bg-card border border-cz-border rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-mono text-cz-text-muted uppercase tracking-wider">
                Order Summary
              </h2>
              <span className="text-xs font-mono text-cz-teal px-2 py-1 bg-cz-teal/10 rounded-full">
                Secure Checkout
              </span>
            </div>
            <div className="flex items-start justify-between pb-4 border-b border-cz-border">
              <div>
                <h3 className="text-lg font-display font-bold text-cz-text">
                  Cozora Skill Sets — All 4 Bundles
                </h3>
                <p className="text-sm text-cz-text-muted mt-1">
                  Lifetime access to 16 sessions across Create, Build, Think, and Lead
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <span className="text-cz-text-muted">Total</span>
              <span className="text-2xl font-display font-bold text-cz-text">$99.00</span>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-cz-bg-card border border-cz-border rounded-xl p-6">
            <h2 className="text-xl font-display font-bold text-cz-text mb-6">
              Payment Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-cz-text mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-cz-bg border border-cz-border rounded-lg text-cz-text placeholder-cz-text-dim focus:outline-none focus:border-cz-teal transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-cz-text mb-2">
                  Name on card
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full px-4 py-3 bg-cz-bg border border-cz-border rounded-lg text-cz-text placeholder-cz-text-dim focus:outline-none focus:border-cz-teal transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="card" className="block text-sm font-semibold text-cz-text mb-2">
                  Card number
                </label>
                <input
                  id="card"
                  type="text"
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="4242 4242 4242 4242"
                  className="w-full px-4 py-3 bg-cz-bg border border-cz-border rounded-lg text-cz-text placeholder-cz-text-dim focus:outline-none focus:border-cz-teal transition-colors font-mono tracking-wider"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-semibold text-cz-text mb-2">
                    Expiry
                  </label>
                  <input
                    id="expiry"
                    type="text"
                    inputMode="numeric"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 bg-cz-bg border border-cz-border rounded-lg text-cz-text placeholder-cz-text-dim focus:outline-none focus:border-cz-teal transition-colors font-mono"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className="block text-sm font-semibold text-cz-text mb-2">
                    CVC
                  </label>
                  <input
                    id="cvc"
                    type="text"
                    inputMode="numeric"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="123"
                    className="w-full px-4 py-3 bg-cz-bg border border-cz-border rounded-lg text-cz-text placeholder-cz-text-dim focus:outline-none focus:border-cz-teal transition-colors font-mono"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-2 px-6 py-4 bg-cz-accent hover:bg-cz-accent-hover disabled:opacity-70 text-cz-bg font-semibold rounded-lg transition-all text-lg relative overflow-hidden"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing payment...
                  </span>
                ) : (
                  'Pay $99.00'
                )}
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-cz-text-dim">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secured with 256-bit SSL encryption</span>
            </div>

            {/* Demo mode banner */}
            <div className="mt-6 p-3 bg-cz-coral/10 border border-cz-coral/30 rounded-lg text-center">
              <p className="text-xs font-mono text-cz-coral">
                DEMO MODE — No real payment will be processed. Enter any values.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
