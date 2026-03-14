import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createServerClient } from "@/lib/supabase/server";
import { getBundleStats } from "@/lib/bundles";

const { totalBundles, totalSessions } = getBundleStats();

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured." },
      { status: 503 }
    );
  }

  try {
    const supabase = createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const origin = request.headers.get("origin") || request.headers.get("x-forwarded-host");
    const protocol = request.headers.get("x-forwarded-proto") || "https";
    const host = request.headers.get("host") || "localhost:3000";
    const siteUrl = origin || `${protocol}://${host}`;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Cozora Skill Sets — All ${totalBundles} Bundles`,
              description:
                `Lifetime access to ${totalSessions} sessions across ${totalBundles} skill sets: AI Content & Growth, AI-Powered Development, AI Knowledge System, and AI for Business & Leadership.`,
            },
            unit_amount: 9900,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/bundles`,
      allow_promotion_codes: true,
    };

    if (user?.email) {
      sessionParams.customer_email = user.email;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[checkout] Failed to create Stripe session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session. Please try again." },
      { status: 500 }
    );
  }
}
