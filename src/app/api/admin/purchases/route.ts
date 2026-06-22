import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

interface PurchaseRow {
  id: string;
  email: string;
  profile_id: string | null;
  stripe_session_id: string;
  stripe_customer_id: string | null;
  amount_paid: number;
  status: string;
  access_token: string | null;
  created_at: string;
}

function deriveSource(stripe_session_id: string): 'manual' | 'stripe_live' | 'stripe_test' | 'unknown' {
  if (stripe_session_id.startsWith('manual_backfill_')) return 'manual';
  if (stripe_session_id.startsWith('cs_live_')) return 'stripe_live';
  if (stripe_session_id.startsWith('cs_test_')) return 'stripe_test';
  return 'unknown';
}

export async function GET(request: NextRequest) {
  const supabase = createServiceClient();
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim() ?? '';
  const limit = Math.min(Number(searchParams.get('limit') ?? 100), 500);

  let query = supabase
    .from('purchases')
    .select(
      'id,email,profile_id,stripe_session_id,stripe_customer_id,amount_paid,status,access_token,created_at',
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })
    .limit(limit);

  if (q) {
    query = query.ilike('email', `%${q}%`);
  }

  const { data, count, error } = await query;

  if (error) {
    console.error('[GET /api/admin/purchases]', error.message);
    return NextResponse.json({ error: 'Failed to fetch purchases' }, { status: 500 });
  }

  const rows = (data ?? []) as PurchaseRow[];
  const enriched = rows.map((r) => ({
    ...r,
    source: deriveSource(r.stripe_session_id),
  }));

  return NextResponse.json({ purchases: enriched, total: count ?? rows.length });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null) as
    | { email?: string; amount_paid?: number }
    | null;

  const email = body?.email?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }

  const amount_paid = Number.isFinite(body?.amount_paid) ? Number(body!.amount_paid) : 9900;
  const accessToken = crypto.randomUUID();
  const stripeSessionId = `manual_backfill_${crypto.randomUUID()}`;

  const supabase = createServiceClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  const { data, error } = await supabase
    .from('purchases')
    .insert({
      email,
      profile_id: profile?.id ?? null,
      stripe_session_id: stripeSessionId,
      amount_paid,
      status: 'completed',
      access_token: accessToken,
    })
    .select('id,email,access_token,created_at')
    .single();

  if (error) {
    console.error('[POST /api/admin/purchases]', error.message);
    return NextResponse.json(
      { error: `Failed to create purchase: ${error.message}` },
      { status: 500 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cozora.org';
  return NextResponse.json({
    purchase: data,
    access_url: `${siteUrl}/access/${data.access_token}`,
  });
}
