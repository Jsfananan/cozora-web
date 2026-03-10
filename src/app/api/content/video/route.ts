import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import {
  getAuthenticatedUser,
  hasActivePurchase,
} from "@/lib/supabase/middleware";

export const runtime = "nodejs";

/**
 * GET /api/content/video?sessionId=<uuid>
 *
 * Returns the video_url for a session only when the requester has a completed
 * purchase. The sessions lookup uses the service client to bypass RLS —
 * authorization is enforced here in the route handler instead.
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
      { error: "Purchase required to access video content." },
      { status: 403 }
    );
  }

  // 3. Validate query param
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Missing required query parameter: sessionId" },
      { status: 400 }
    );
  }

  // Basic UUID format guard — prevents obviously malformed inputs from hitting DB
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidPattern.test(sessionId)) {
    return NextResponse.json(
      { error: "Invalid sessionId format." },
      { status: 400 }
    );
  }

  // 4. Fetch session — service client bypasses RLS (auth already verified above)
  const supabase = createServiceClient();
  const { data: session, error } = await supabase
    .from("sessions")
    .select("id, title, video_url")
    .eq("id", sessionId)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("[content/video] Session query failed:", error.message);
    return NextResponse.json(
      { error: "Failed to retrieve session." },
      { status: 500 }
    );
  }

  if (!session) {
    return NextResponse.json({ error: "Session not found." }, { status: 404 });
  }

  if (!session.video_url) {
    return NextResponse.json(
      { error: "Video not yet available for this session." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    sessionId: session.id,
    title: session.title,
    videoUrl: session.video_url,
  });
}
