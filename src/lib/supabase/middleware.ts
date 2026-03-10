import { createServerClient, createServiceClient } from "./server";

export interface Purchase {
  id: string;
  email: string;
  profile_id: string | null;
  stripe_session_id: string;
  stripe_customer_id: string | null;
  amount_paid: number;
  status: string;
  created_at: string;
}

/**
 * Returns true if the given email has at least one completed purchase.
 *
 * This is intentionally called with an email rather than a profile ID so it
 * also covers buyers who paid before creating an account. Uses the service
 * client so the lookup is not blocked by RLS.
 */
export async function hasActivePurchase(email: string): Promise<boolean> {
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("purchases")
    .select("id")
    .eq("email", email)
    .eq("status", "completed")
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[hasActivePurchase] Query failed:", error.message);
    return false;
  }

  return data !== null;
}

/**
 * Returns the purchase record for the given profile ID, or null if none exists.
 *
 * Uses the server (anon) client — safe to call from route handlers that already
 * have a verified session, as the RLS policy will enforce ownership.
 */
export async function getUserPurchase(
  profileId: string
): Promise<Purchase | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("purchases")
    .select("*")
    .eq("profile_id", profileId)
    .eq("status", "completed")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[getUserPurchase] Query failed:", error.message);
    return null;
  }

  return data as Purchase | null;
}
