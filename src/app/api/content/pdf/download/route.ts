import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

/**
 * GET /api/content/pdf/download?path=bundles/xxx/file.pdf
 *
 * Generates a signed URL and redirects to it for immediate download.
 * TODO: Add auth + purchase verification once Supabase auth is wired.
 */
export async function GET(request: NextRequest) {
  const storagePath = request.nextUrl.searchParams.get('path');

  if (!storagePath) {
    return NextResponse.json({ error: 'path parameter required' }, { status: 400 });
  }

  const supabase = createServiceClient();

  const { data, error } = await supabase.storage
    .from('bundle-content')
    .createSignedUrl(storagePath, 300);

  if (error || !data?.signedUrl) {
    console.error('[GET /api/content/pdf/download] Signed URL failed:', error?.message);
    return NextResponse.json({ error: 'Failed to generate download link' }, { status: 500 });
  }

  return NextResponse.redirect(data.signedUrl);
}
