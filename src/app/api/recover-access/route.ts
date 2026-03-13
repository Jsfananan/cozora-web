import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * POST /api/recover-access
 * Takes an email, looks up the most recent purchase, returns the access_token.
 */
export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "Missing email" },
      { status: 400 }
    );
  }

  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("purchases")
    .select("access_token")
    .eq("email", email.toLowerCase().trim())
    .eq("status", "completed")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[recover-access] Query failed:", error.message);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json(
      { error: "No purchase found for this email" },
      { status: 404 }
    );
  }

  return NextResponse.json({ access_token: data.access_token });
}
