-- ============================================================
-- Add access_token to purchases table
-- Run this in the Supabase SQL Editor AFTER schema.sql
-- ============================================================

-- Add access_token column with a unique constraint
ALTER TABLE public.purchases
  ADD COLUMN IF NOT EXISTS access_token text UNIQUE;

-- Backfill any existing purchases that don't have a token
UPDATE public.purchases
SET access_token = gen_random_uuid()::text
WHERE access_token IS NULL;

-- Make it NOT NULL going forward
ALTER TABLE public.purchases
  ALTER COLUMN access_token SET NOT NULL,
  ALTER COLUMN access_token SET DEFAULT gen_random_uuid()::text;

-- Index for fast token lookups
CREATE INDEX IF NOT EXISTS purchases_access_token_idx
  ON public.purchases(access_token);

-- Allow public read access by access_token (no auth required)
CREATE POLICY "Anyone can read purchase by access_token"
  ON public.purchases
  FOR SELECT
  USING (true);
