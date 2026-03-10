import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

/**
 * Server client using the anon key — respects RLS.
 * Use for server components and route handlers that act on behalf of a user.
 */
export function createServerClient() {
  return createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}

/**
 * Service-role client — bypasses RLS entirely.
 * Use ONLY in trusted server contexts (e.g. webhook handlers, migrations).
 * Never expose this client to the browser.
 */
export function createServiceClient() {
  return createClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        // Prevent the service client from persisting any session state
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
