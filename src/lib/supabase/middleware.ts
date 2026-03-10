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

/**
 * Extracts the authenticated user from the current Supabase session.
 *
 * Checks the Authorization header first (Bearer token), then falls back to
 * the server client's cookie-based session. Returns null if the user is not
 * authenticated or the token is invalid.
 */
export async function getAuthenticatedUser(
  request?: Request
): Promise<{ user: { id: string; email: string }; email: string } | null> {
  try {
    // Prefer an explicit Bearer token from the Authorization header.
    // This supports both server-side calls and clients that pass the session
    // token explicitly (e.g. mobile or API consumers).
    if (request) {
      const authHeader = request.headers.get("authorization");
      if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.slice(7);
        const supabase = createServiceClient();
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser(token);

        if (!error && user?.email) {
          return { user: { id: user.id, email: user.email }, email: user.email };
        }
      }
    }

    // Fall back to the cookie-based session via the server (anon) client.
    const supabase = createServerClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user?.email) {
      return null;
    }

    return { user: { id: user.id, email: user.email }, email: user.email };
  } catch (err) {
    console.error("[getAuthenticatedUser] Unexpected error:", err);
    return null;
  }
}
