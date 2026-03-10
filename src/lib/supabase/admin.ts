import { createServiceClient } from "./server";

// -------------------------------------------------------
// Types
// -------------------------------------------------------

export interface Bundle {
  id: string;
  slug: string;
  skill_num: string;
  name: string;
  tagline: string | null;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Session {
  id: string;
  bundle_id: string;
  number: number;
  creator: string;
  date: string | null;
  title: string;
  description: string | null;
  video_url: string | null;
  duration: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BundlePdf {
  id: string;
  bundle_id: string;
  file_name: string;
  storage_path: string;
  file_size: number | null;
  created_at: string;
}

export interface BundleWithSessions extends Bundle {
  sessions: Session[];
}

export interface NewBundle {
  slug: string;
  skill_num: string;
  name: string;
  tagline?: string;
  description?: string;
  sort_order?: number;
  is_active?: boolean;
}

export interface NewSession {
  bundle_id: string;
  number: number;
  creator: string;
  date?: string;
  title: string;
  description?: string;
  video_url?: string;
  duration?: string;
  sort_order?: number;
  is_active?: boolean;
}

// -------------------------------------------------------
// Admin guard helpers
// -------------------------------------------------------

/**
 * Returns true if the given auth user ID belongs to a profile with is_admin = true.
 * Uses the service client — must only be called from trusted server contexts.
 */
export async function isAdmin(userId: string): Promise<boolean> {
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("[isAdmin] Query failed:", error.message);
    return false;
  }

  return data?.is_admin === true;
}

/**
 * Throws an error if the given user is not an admin.
 * Designed to be used at the top of admin-only route handlers.
 */
export async function requireAdmin(userId: string): Promise<void> {
  const adminStatus = await isAdmin(userId);
  if (!adminStatus) {
    throw new Error("Forbidden: admin access required.");
  }
}

// -------------------------------------------------------
// Bundle operations
// -------------------------------------------------------

/**
 * Returns all bundles with their sessions, ordered by sort_order.
 * Sessions within each bundle are also ordered by sort_order.
 */
export async function getBundlesWithSessions(): Promise<BundleWithSessions[]> {
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("bundles")
    .select(
      `
      *,
      sessions (*)
    `
    )
    .order("sort_order", { ascending: true })
    .order("sort_order", { ascending: true, referencedTable: "sessions" });

  if (error) {
    console.error("[getBundlesWithSessions] Query failed:", error.message);
    throw new Error(`Failed to fetch bundles: ${error.message}`);
  }

  return (data as BundleWithSessions[]) ?? [];
}

/**
 * Creates a new bundle and returns its generated ID.
 */
export async function createBundle(data: NewBundle): Promise<string> {
  const supabase = createServiceClient();

  const { data: inserted, error } = await supabase
    .from("bundles")
    .insert({
      slug: data.slug,
      skill_num: data.skill_num,
      name: data.name,
      tagline: data.tagline ?? null,
      description: data.description ?? null,
      sort_order: data.sort_order ?? 0,
      is_active: data.is_active ?? true,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[createBundle] Insert failed:", error.message);
    throw new Error(`Failed to create bundle: ${error.message}`);
  }

  return inserted.id;
}

// -------------------------------------------------------
// Session operations
// -------------------------------------------------------

/**
 * Updates a session record. Only the provided fields are changed.
 * Automatically sets updated_at to now().
 */
export async function updateSession(
  sessionId: string,
  updates: Partial<
    Pick<
      Session,
      | "title"
      | "description"
      | "video_url"
      | "duration"
      | "creator"
      | "date"
      | "number"
      | "sort_order"
      | "is_active"
    >
  >
): Promise<void> {
  const supabase = createServiceClient();

  const { error } = await supabase
    .from("sessions")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", sessionId);

  if (error) {
    console.error("[updateSession] Update failed:", error.message);
    throw new Error(`Failed to update session: ${error.message}`);
  }
}

/**
 * Creates a new session inside a bundle and returns its generated ID.
 */
export async function createSession(data: NewSession): Promise<string> {
  const supabase = createServiceClient();

  const { data: inserted, error } = await supabase
    .from("sessions")
    .insert({
      bundle_id: data.bundle_id,
      number: data.number,
      creator: data.creator,
      date: data.date ?? null,
      title: data.title,
      description: data.description ?? null,
      video_url: data.video_url ?? null,
      duration: data.duration ?? null,
      sort_order: data.sort_order ?? 0,
      is_active: data.is_active ?? true,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[createSession] Insert failed:", error.message);
    throw new Error(`Failed to create session: ${error.message}`);
  }

  return inserted.id;
}

// -------------------------------------------------------
// PDF operations
// -------------------------------------------------------

/**
 * Records a PDF upload in the bundle_pdfs table.
 * The file must already exist at storagePath in the 'bundle-content' bucket
 * before calling this — this function only writes the metadata record.
 */
export async function uploadPdf(
  bundleId: string,
  fileName: string,
  storagePath: string,
  fileSize: number
): Promise<void> {
  const supabase = createServiceClient();

  const { error } = await supabase.from("bundle_pdfs").insert({
    bundle_id: bundleId,
    file_name: fileName,
    storage_path: storagePath,
    file_size: fileSize,
  });

  if (error) {
    console.error("[uploadPdf] Insert failed:", error.message);
    throw new Error(`Failed to record PDF upload: ${error.message}`);
  }
}

/**
 * Deletes a PDF record from bundle_pdfs AND removes the file from
 * Supabase Storage. Both operations are attempted; a storage error is
 * logged but does not abort the metadata deletion.
 */
export async function deletePdf(pdfId: string): Promise<void> {
  const supabase = createServiceClient();

  // Fetch the storage path before deleting the record
  const { data: pdf, error: fetchError } = await supabase
    .from("bundle_pdfs")
    .select("storage_path")
    .eq("id", pdfId)
    .maybeSingle();

  if (fetchError) {
    console.error("[deletePdf] Fetch failed:", fetchError.message);
    throw new Error(`Failed to look up PDF: ${fetchError.message}`);
  }

  if (!pdf) {
    throw new Error(`PDF not found: ${pdfId}`);
  }

  // Delete the storage object — log but don't throw on storage errors
  const { error: storageError } = await supabase.storage
    .from("bundle-content")
    .remove([pdf.storage_path]);

  if (storageError) {
    console.error(
      "[deletePdf] Storage deletion failed (proceeding with record deletion):",
      storageError.message
    );
  }

  // Delete the metadata record
  const { error: deleteError } = await supabase
    .from("bundle_pdfs")
    .delete()
    .eq("id", pdfId);

  if (deleteError) {
    console.error("[deletePdf] Record deletion failed:", deleteError.message);
    throw new Error(`Failed to delete PDF record: ${deleteError.message}`);
  }
}
