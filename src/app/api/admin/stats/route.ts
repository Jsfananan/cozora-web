import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from('purchases')
    .select('amount_paid,stripe_session_id,email,created_at')
    .eq('status', 'completed')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[GET /api/admin/stats]', error.message);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }

  const rows = data ?? [];

  const realPurchases = rows.filter(
    (r) =>
      !r.stripe_session_id.startsWith('cs_test_') &&
      !r.stripe_session_id.startsWith('manual_backfill_')
  );
  const totalPurchasesAll = rows.length;
  const totalPurchasesReal = realPurchases.length;
  const totalRevenueCents = realPurchases.reduce((sum, r) => sum + (r.amount_paid ?? 0), 0);

  const recent = rows.slice(0, 5).map((r) => ({
    email: r.email,
    amount_paid: r.amount_paid,
    created_at: r.created_at,
    source: r.stripe_session_id.startsWith('manual_backfill_')
      ? 'manual'
      : r.stripe_session_id.startsWith('cs_test_')
      ? 'stripe_test'
      : r.stripe_session_id.startsWith('cs_live_')
      ? 'stripe_live'
      : 'unknown',
  }));

  return NextResponse.json({
    totalPurchasesAll,
    totalPurchasesReal,
    totalRevenueCents,
    recent,
  });
}
