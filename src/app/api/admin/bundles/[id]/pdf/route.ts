import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: bundleId } = await params;
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const supabase = createServiceClient();
    const storagePath = `bundles/${bundleId}/${file.name}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from('bundle-content')
      .upload(storagePath, buffer, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (uploadError) {
      console.error('[POST /api/admin/bundles/pdf] Upload failed:', uploadError.message);
      return NextResponse.json(
        { error: `Upload failed: ${uploadError.message}` },
        { status: 500 }
      );
    }

    const { data: record, error: insertError } = await supabase
      .from('bundle_pdfs')
      .insert({
        bundle_id: bundleId,
        file_name: file.name,
        storage_path: storagePath,
        file_size: file.size,
      })
      .select()
      .single();

    if (insertError) {
      console.error('[POST /api/admin/bundles/pdf] Insert failed:', insertError.message);
      return NextResponse.json(
        { error: `Failed to save PDF record: ${insertError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error('[POST /api/admin/bundles/pdf]', error);
    return NextResponse.json({ error: 'Failed to upload PDF' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  _params: { params: Promise<{ id: string }> }
) {
  try {
    const { pdfId } = await request.json();
    if (!pdfId) {
      return NextResponse.json({ error: 'pdfId required' }, { status: 400 });
    }

    const supabase = createServiceClient();

    const { data: pdf, error: fetchError } = await supabase
      .from('bundle_pdfs')
      .select('storage_path')
      .eq('id', pdfId)
      .maybeSingle();

    if (fetchError || !pdf) {
      return NextResponse.json({ error: 'PDF not found' }, { status: 404 });
    }

    // Delete from storage (log but don't fail)
    const { error: storageError } = await supabase.storage
      .from('bundle-content')
      .remove([pdf.storage_path]);

    if (storageError) {
      console.error('[DELETE /api/admin/bundles/pdf] Storage delete failed:', storageError.message);
    }

    const { error: deleteError } = await supabase
      .from('bundle_pdfs')
      .delete()
      .eq('id', pdfId);

    if (deleteError) {
      return NextResponse.json(
        { error: `Failed to delete PDF record: ${deleteError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE /api/admin/bundles/pdf]', error);
    return NextResponse.json({ error: 'Failed to delete PDF' }, { status: 500 });
  }
}
