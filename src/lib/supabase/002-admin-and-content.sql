-- ============================================================
-- Migration 002: Admin roles + content management tables
-- Run this in Supabase SQL Editor after schema.sql
-- ============================================================

-- -------------------------------------------------------
-- Add admin flag to profiles
-- -------------------------------------------------------
alter table public.profiles add column if not exists is_admin boolean default false not null;

-- Set initial admins
update public.profiles set is_admin = true where email in (
  'leadershipinchangellc@gmail.com',
  'cozorateam@gmail.com'
);

-- -------------------------------------------------------
-- Bundles table (managed by admins)
-- -------------------------------------------------------
create table if not exists public.bundles (
  id          uuid        primary key default gen_random_uuid(),
  slug        text        unique not null,
  skill_num   text        not null, -- Create, Build, Think, Lead
  name        text        not null,
  tagline     text,
  description text,
  sort_order  integer     default 0,
  is_active   boolean     default true not null,
  created_at  timestamptz default now() not null,
  updated_at  timestamptz default now() not null
);

-- -------------------------------------------------------
-- Sessions table (belongs to a bundle)
-- -------------------------------------------------------
create table if not exists public.sessions (
  id          uuid        primary key default gen_random_uuid(),
  bundle_id   uuid        not null references public.bundles(id) on delete cascade,
  number      integer     not null,
  creator     text        not null,
  date        text,
  title       text        not null,
  description text,
  video_url   text,       -- Bunny.net or other video embed URL
  duration    text,
  sort_order  integer     default 0,
  is_active   boolean     default true not null,
  created_at  timestamptz default now() not null,
  updated_at  timestamptz default now() not null
);

create index if not exists sessions_bundle_id_idx on public.sessions(bundle_id);

-- -------------------------------------------------------
-- Bundle PDFs (stored in Supabase Storage)
-- -------------------------------------------------------
create table if not exists public.bundle_pdfs (
  id          uuid        primary key default gen_random_uuid(),
  bundle_id   uuid        not null references public.bundles(id) on delete cascade,
  file_name   text        not null,
  storage_path text       not null, -- path in Supabase Storage bucket
  file_size   integer,
  created_at  timestamptz default now() not null
);

create index if not exists bundle_pdfs_bundle_id_idx on public.bundle_pdfs(bundle_id);

-- -------------------------------------------------------
-- RLS for new tables
-- -------------------------------------------------------
alter table public.bundles    enable row level security;
alter table public.sessions   enable row level security;
alter table public.bundle_pdfs enable row level security;

-- Anyone can read active bundles (public storefront)
create policy "Public can read active bundles"
  on public.bundles for select
  using (is_active = true);

-- Anyone can read active sessions (titles visible on storefront)
create policy "Public can read active sessions"
  on public.sessions for select
  using (is_active = true);

-- Purchased users can read PDFs
create policy "Purchased users can read PDFs"
  on public.bundle_pdfs for select
  using (
    exists (
      select 1 from public.purchases p
      join public.profiles pr on pr.id = p.profile_id
      where pr.id = auth.uid()
      and p.status = 'completed'
    )
  );

-- Admins can do everything on bundles, sessions, and PDFs
create policy "Admins can manage bundles"
  on public.bundles for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create policy "Admins can manage sessions"
  on public.sessions for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create policy "Admins can manage PDFs"
  on public.bundle_pdfs for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- -------------------------------------------------------
-- Seed the 4 bundles from existing static data
-- -------------------------------------------------------
insert into public.bundles (slug, skill_num, name, tagline, description, sort_order) values
  ('ai-content-growth', 'Create', 'AI Content & Growth Machine',
   'Create, publish, grow — writing, video, design, audience.',
   'Master the complete AI content pipeline. From building your AI second brain to automating content repurposing across 8+ platforms, these sessions give you the exact workflows, prompts, and tools the experts use to create and grow.',
   1),
  ('ai-powered-development', 'Build', 'AI-Powered Development',
   'Build, automate, ship — coding, agents, apps, workflows.',
   'Learn to build real applications with AI. From vibe-coding to deploying production agents, these sessions cover the practical side of AI development — straight from builders who ship every day.',
   2),
  ('ai-knowledge-system', 'Think', 'Your AI Knowledge System',
   'Think, research, organize — second brain, insights, deep thinking.',
   'Build your personal AI knowledge system. These sessions teach you to capture, organize, and leverage information using AI — turning scattered notes into a powerful thinking tool.',
   3),
  ('ai-business-leadership', 'Lead', 'AI for Business & Leadership',
   'Lead, transform, strategize — adoption, roadmaps, organizations.',
   'Navigate AI transformation as a leader. From building adoption roadmaps to managing AI-augmented teams, these sessions prepare you to lead your organization through the AI revolution.',
   4)
on conflict (slug) do nothing;

-- Seed sessions for each bundle
-- (We need the bundle IDs, so use a DO block)
do $$
declare
  v_content_id uuid;
  v_build_id uuid;
  v_think_id uuid;
  v_lead_id uuid;
begin
  select id into v_content_id from public.bundles where slug = 'ai-content-growth';
  select id into v_build_id from public.bundles where slug = 'ai-powered-development';
  select id into v_think_id from public.bundles where slug = 'ai-knowledge-system';
  select id into v_lead_id from public.bundles where slug = 'ai-business-leadership';

  -- Content & Growth sessions
  insert into public.sessions (bundle_id, number, creator, date, title, description, sort_order) values
    (v_content_id, 1, 'Joel', 'Nov 3 2025', 'Second Brain Blueprint: AI content creation pipeline for newsletters', 'Building your AI 2nd brain — the foundation for every content workflow that follows.', 1),
    (v_content_id, 2, 'Joel', 'Nov 20 2025', 'Content creation Q&A: live demos of full pipeline', 'Live walkthrough of the complete AI content creation pipeline with real-time demos.', 2),
    (v_content_id, 3, 'Yana G.Y.', 'Dec 17 2025', 'Automated content repurposing across 8+ social platforms', 'AI automation for newsletter growth — building systems that repurpose one piece of content everywhere.', 3),
    (v_content_id, 4, 'Jeremy Caplan', 'Feb 12 2026', 'A Day in My Life with AI: 10 daily productivity tools', 'Wonder Tools creator shares 10 AI tools he uses daily for content creation and productivity.', 4)
  on conflict do nothing;

  -- Build sessions
  insert into public.sessions (bundle_id, number, creator, date, title, description, sort_order) values
    (v_build_id, 1, 'Joel', 'Nov 6 2025', 'Vibe-coding: building apps with AI from scratch', 'Live demonstration of building a complete app using AI-assisted development.', 1),
    (v_build_id, 2, 'Joel', 'Dec 5 2025', 'AI agents and automation workflows', 'Building practical AI agents that automate real business workflows.', 2),
    (v_build_id, 3, 'Joel', 'Jan 9 2026', 'Deploying AI apps: from prototype to production', 'Taking AI projects from local demos to live production — hosting, APIs, and scaling.', 3),
    (v_build_id, 4, 'Joel', 'Feb 6 2026', 'Advanced prompt engineering for developers', 'Deep dive into prompt patterns that make AI coding assistants dramatically more effective.', 4)
  on conflict do nothing;

  -- Think sessions
  insert into public.sessions (bundle_id, number, creator, date, title, description, sort_order) values
    (v_think_id, 1, 'Joel', 'Nov 13 2025', 'Building your AI second brain from scratch', 'Step-by-step setup of a personal knowledge management system powered by AI.', 1),
    (v_think_id, 2, 'Joel', 'Dec 12 2025', 'AI-powered research workflows', 'Using AI to accelerate research, synthesize findings, and generate insights.', 2),
    (v_think_id, 3, 'Joel', 'Jan 16 2026', 'Deep thinking with AI: analysis and decision frameworks', 'Leveraging AI as a thinking partner for complex analysis and strategic decisions.', 3),
    (v_think_id, 4, 'Joel', 'Feb 20 2026', 'Connecting the dots: knowledge graphs and AI', 'Advanced techniques for linking ideas and discovering patterns across your knowledge base.', 4)
  on conflict do nothing;

  -- Lead sessions
  insert into public.sessions (bundle_id, number, creator, date, title, description, sort_order) values
    (v_lead_id, 1, 'Joel', 'Nov 20 2025', 'AI adoption roadmap for your organization', 'Creating a practical, phased plan for bringing AI into your team or company.', 1),
    (v_lead_id, 2, 'Joel', 'Dec 19 2025', 'Leading AI-augmented teams', 'Management frameworks for teams where AI is a daily tool — culture, expectations, and workflows.', 2),
    (v_lead_id, 3, 'Joel', 'Jan 23 2026', 'AI strategy for business leaders', 'Strategic thinking about AI investments, build vs. buy decisions, and competitive positioning.', 3),
    (v_lead_id, 4, 'Joel', 'Feb 27 2026', 'Measuring AI impact: ROI and transformation metrics', 'Frameworks for measuring the real business impact of AI initiatives.', 4)
  on conflict do nothing;
end;
$$;

-- -------------------------------------------------------
-- Create storage bucket for bundle PDFs (private)
-- -------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('bundle-content', 'bundle-content', false)
on conflict (id) do nothing;

-- Only authenticated users with a purchase can download
create policy "Purchased users can download content"
  on storage.objects for select
  using (
    bucket_id = 'bundle-content'
    and auth.role() = 'authenticated'
    and exists (
      select 1 from public.purchases p
      join public.profiles pr on pr.id = p.profile_id
      where pr.id = auth.uid()
      and p.status = 'completed'
    )
  );

-- Admins can upload/manage content
create policy "Admins can upload content"
  on storage.objects for insert
  with check (
    bucket_id = 'bundle-content'
    and exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create policy "Admins can update content"
  on storage.objects for update
  using (
    bucket_id = 'bundle-content'
    and exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create policy "Admins can delete content"
  on storage.objects for delete
  using (
    bucket_id = 'bundle-content'
    and exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );
