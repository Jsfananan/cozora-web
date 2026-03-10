import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import {
  getAuthenticatedUser,
  hasActivePurchase,
} from "@/lib/supabase/middleware";

export const runtime = "nodejs";

/**
 * GET /api/content/pdf?bundleId=<uuid>
 *
 * Returns a short-lived signed download URL (1 hour) for the PDF associated
 * with a bundle. Only available to users with a completed purchase.
 *
 * The bundle_pdfs lookup and the signed URL generation both use the service
 * client so they can bypass RLS — authorization is enforced here instead.
 */
export async function GET(request: NextRequest) {
  // 1. Authenticate
  const auth = await getAuthenticatedUser(request);
  if (!auth) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  // 2. Verify purchase
  const purchased = await hasActivePurchase(auth.email);
  if (!purchased) {
    return NextResponse.json(
      { error: "Purchase required to access PDF content." },
      { status: 403 }
    );
  }

  // 3. Validate query param
  const { searchParams } = new URL(request.url);
  const bundleId = searchParams.get("bundleId");

  if (!bundleId) {
    return NextResponse.json(
      { error: "Missing required query parameter: bundleId" },
      { status: 400 }
    );
  }

  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidPattern.test(bundleId)) {
    return NextResponse.json(
      { error: "Invalid bundleId format." },
      { status: 400 }
    );
  }

  // 4. Look up the PDF record for this bundle
  const supabase = createServiceClient();
  const { data: pdf, error: pdfError } = await supabase
    .from("bundle_pdfs")
    .select("id, file_name, storage_path")
    .eq("bundle_id", bundleId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (pdfError) {
    console.error("[content/pdf] bundle_pdfs query failed:", pdfError.message);
    return NextResponse.json(
      { error: "Failed to retrieve PDF information." },
      { status: 500 }
    );
  }

  if (!pdf) {
    return NextResponse.json(
      { error: "No PDF found for this bundle." },
      { status: 404 }
    );
  }

  // 5. Generate a signed URL — 1 hour expiry
  const { data: signedData, error: signedError } = await supabase.storage
    .from("bundle-content")
    .createSignedUrl(pdf.storage_path, 3600);

  if (signedError || !signedData?.signedUrl) {
    console.error(
      "[content/pdf] Failed to create signed URL:",
      signedError?.message
    );
    return NextResponse.json(
      { error: "Failed to generate download link. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    pdfId: pdf.id,
    fileName: pdf.file_name,
    url: signedData.signedUrl,
    expiresInSeconds: 3600,
  });
}
