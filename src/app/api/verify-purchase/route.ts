import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * POST /api/verify-purchase
 * Takes a Stripe Checkout session_id, verifies payment, creates or finds the
 * purchase record, and returns the access_token for redirect.
 *
 * This handles the race condition where the user lands on the success page
 * before the Stripe webhook has fired.
 */
export async function POST(request: NextRequest) {
  const { session_id } = await request.json();

  if (!session_id || typeof session_id !== "string") {
    return NextResponse.json(
      { error: "Missing session_id" },
      { status: 400 }
    );
  }

  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 503 }
    );
  }

  // Retrieve the session from Stripe to verify payment
  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id);
  } catch {
    return NextResponse.json(
      { error: "Invalid session_id" },
      { status: 400 }
    );
  }

  if (session.payment_status !== "paid") {
    return NextResponse.json(
      { error: "Payment not completed" },
      { status: 402 }
    );
  }

  const email = session.customer_details?.email ?? session.customer_email;
  if (!email) {
    return NextResponse.json(
      { error: "No email found on session" },
      { status: 400 }
    );
  }

  const supabase = createServiceClient();

  // Check if the webhook already created this purchase
  const { data: existing } = await supabase
    .from("purchases")
    .select("access_token")
    .eq("stripe_session_id", session_id)
    .maybeSingle();

  if (existing?.access_token) {
    return NextResponse.json({ access_token: existing.access_token });
  }

  // Webhook hasn't fired yet — create the purchase ourselves
  const accessToken = crypto.randomUUID();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  const { error: insertError } = await supabase.from("purchases").insert({
    email,
    profile_id: profile?.id ?? null,
    stripe_session_id: session_id,
    stripe_customer_id:
      typeof session.customer === "string" ? session.customer : null,
    amount_paid: session.amount_total ?? 9900,
    status: "completed",
    access_token: accessToken,
  });

  if (insertError) {
    // Duplicate key = webhook beat us to it, fetch the existing token
    if (insertError.code === "23505") {
      const { data: retry } = await supabase
        .from("purchases")
        .select("access_token")
        .eq("stripe_session_id", session_id)
        .maybeSingle();
      return NextResponse.json({ access_token: retry?.access_token });
    }

    console.error("[verify-purchase] Insert failed:", insertError.message);
    return NextResponse.json(
      { error: "Failed to record purchase" },
      { status: 500 }
    );
  }

  return NextResponse.json({ access_token: accessToken });
}
