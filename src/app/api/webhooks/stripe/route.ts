import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

// Next.js App Router streams the body — we must consume it as raw text so that
// Stripe can verify the HMAC signature. Do NOT use request.json() here.
export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 503 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[stripe-webhook] Signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await handleCheckoutCompleted(session);
  }

  // Return 200 for all other event types so Stripe doesn't retry them
  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session
): Promise<void> {
  const email = session.customer_details?.email ?? session.customer_email;

  if (!email) {
    console.error(
      "[stripe-webhook] No email on completed session:",
      session.id
    );
    return;
  }

  const supabase = createServiceClient();

  // Look up an existing profile by email so we can link the purchase
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (profileError) {
    console.error(
      "[stripe-webhook] Error querying profiles:",
      profileError.message
    );
    // Continue — we still want to persist the purchase record
  }

  const { error: insertError } = await supabase.from("purchases").insert({
    email,
    profile_id: profile?.id ?? null,
    stripe_session_id: session.id,
    stripe_customer_id:
      typeof session.customer === "string" ? session.customer : null,
    amount_paid: session.amount_total ?? 9900,
    status: "completed",
  });

  if (insertError) {
    // Duplicate key on stripe_session_id means Stripe retried a previously
    // processed event — safe to ignore.
    if (insertError.code === "23505") {
      console.warn(
        "[stripe-webhook] Duplicate session, skipping:",
        session.id
      );
      return;
    }
    console.error(
      "[stripe-webhook] Failed to insert purchase:",
      insertError.message
    );
    return;
  }

  console.info(
    `[stripe-webhook] Purchase recorded for ${email} (session: ${session.id})`
  );
}
