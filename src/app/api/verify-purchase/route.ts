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
  try {
    const { session_id } = await request.json();

    if (!session_id || typeof session_id !== "string") {
      return NextResponse.json(
        { error: "Missing session_id", step: "validate" },
        { status: 400 }
      );
    }

    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured", step: "stripe_check" },
        { status: 503 }
      );
    }

    // Retrieve the session from Stripe to verify payment
    let session;
    try {
      session = await stripe.checkout.sessions.retrieve(session_id);
    } catch (stripeErr) {
      return NextResponse.json(
        { error: "Invalid session_id", step: "stripe_retrieve", detail: String(stripeErr) },
        { status: 400 }
      );
    }

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed", step: "payment_check", payment_status: session.payment_status },
        { status: 402 }
      );
    }

    const email = session.customer_details?.email ?? session.customer_email;
    if (!email) {
      return NextResponse.json(
        { error: "No email found on session", step: "email_check" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Check if the webhook already created this purchase
    const { data: existing, error: selectError } = await supabase
      .from("purchases")
      .select("access_token")
      .eq("stripe_session_id", session_id)
      .maybeSingle();

    if (selectError) {
      console.error("[verify-purchase] Select failed:", selectError.message);
      return NextResponse.json(
        { error: "Database query failed", step: "select_existing", detail: selectError.message, code: selectError.code },
        { status: 500 }
      );
    }

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
        { error: "Failed to record purchase", step: "insert", detail: insertError.message, code: insertError.code },
        { status: 500 }
      );
    }

    return NextResponse.json({ access_token: accessToken });
  } catch (err) {
    console.error("[verify-purchase] Unexpected error:", err);
    return NextResponse.json(
      { error: "Unexpected server error", detail: String(err) },
      { status: 500 }
    );
  }
}
