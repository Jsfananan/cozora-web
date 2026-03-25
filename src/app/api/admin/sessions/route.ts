import { NextRequest, NextResponse } from 'next/server';
import { createSession, getBundlesWithSessions } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bundle_id, number, title, creator, date, description } = body;

    if (!bundle_id || !title || !creator) {
      return NextResponse.json(
        { error: 'bundle_id, title, and creator are required' },
        { status: 400 }
      );
    }

    const id = await createSession({
      bundle_id,
      number: number ?? 1,
      title,
      creator,
      date: date || null,
      description: description || null,
      sort_order: number ?? 1,
      is_active: true,
    });

    return NextResponse.json({ id });
  } catch (error) {
    console.error('[POST /api/admin/sessions]', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}
