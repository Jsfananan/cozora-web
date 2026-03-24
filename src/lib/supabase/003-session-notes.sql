-- ============================================================
-- Migration 003: Add session notes (title + content below video)
-- Run this in Supabase SQL Editor after 002-admin-and-content.sql
-- ============================================================

alter table public.sessions add column if not exists notes_title text;
alter table public.sessions add column if not exists notes_content text;
