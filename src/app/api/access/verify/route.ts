import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * POST /api/access/verify
 * Validates an access token and returns the associated email.
 */
export async function POST(request: NextRequest) {
  const { token } = await request.json();

  if (!token || typeof token !== "string") {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("purchases")
    .select("email, status")
    .eq("access_token", token)
    .eq("status", "completed")
    .maybeSingle();

  if (error) {
    console.error("[access/verify] Query failed:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Invalid token" }, { status: 404 });
  }

  return NextResponse.json({ email: data.email });
}
