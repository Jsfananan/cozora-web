import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { video_url, notes_title, notes_content, title, creator, date, description } = body;

    const supabase = createServiceClient();

    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if ('video_url' in body) updates.video_url = video_url || null;
    if ('notes_title' in body) updates.notes_title = notes_title || null;
    if ('notes_content' in body) updates.notes_content = notes_content || null;
    if ('title' in body) updates.title = title;
    if ('creator' in body) updates.creator = creator;
    if ('date' in body) updates.date = date || null;
    if ('description' in body) updates.description = description || null;

    const { error } = await supabase
      .from('sessions')
      .update(updates)
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

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createServiceClient();

    const { error } = await supabase
      .from('sessions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[DELETE /api/admin/sessions] Delete failed:', error.message);
      return NextResponse.json(
        { error: `Failed to delete session: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE /api/admin/sessions]', error);
    return NextResponse.json(
      { error: 'Failed to delete session' },
      { status: 500 }
    );
  }
}
