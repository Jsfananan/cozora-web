import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { video_url, notes_title, notes_content } = body;

    const supabase = createServiceClient();

    const { error } = await supabase
      .from('sessions')
      .update({
        video_url: video_url || null,
        notes_title: notes_title || null,
        notes_content: notes_content || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      console.error('[PUT /api/admin/sessions] Update failed:', error.message);
      return NextResponse.json(
        { error: `Failed to update session: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[PUT /api/admin/sessions]', error);
    return NextResponse.json(
      { error: 'Failed to update session' },
      { status: 500 }
    );
  }
}
