/**
 * Legacy shape kept for admin form typing. Live customer-facing pages read
 * from Supabase via src/lib/supabase/admin.ts (getBundlesWithSessions).
 * Counts below reflect current Supabase data — update when content changes.
 */
export interface Session {
  number: number;
  creator: string;
  date: string;
  title: string;
  description: string;
  videoId?: string;
  duration?: string;
  notesTitle?: string;
  notesContent?: string;
}

export interface Bundle {
  slug: string;
  skillNum: string;
  name: string;
  tagline: string;
  description: string;
  sessions: Session[];
  pdfUrl?: string;
}

export function getBundleStats() {
  return { totalBundles: 4, totalSessions: 15 };
}
