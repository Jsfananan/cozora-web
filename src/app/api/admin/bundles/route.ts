import { NextResponse } from 'next/server';
import { getBundlesWithSessions } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const bundles = await getBundlesWithSessions();
    return NextResponse.json(bundles);
  } catch (error) {
    console.error('[GET /api/admin/bundles]', error);
    return NextResponse.json(
      { error: 'Failed to fetch bundles' },
      { status: 500 }
    );
  }
}
