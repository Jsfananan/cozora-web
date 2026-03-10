-- ============================================================
-- Cozora Web — Supabase Schema Migration
-- Run this in the Supabase SQL editor or via the CLI:
--   supabase db push
-- ============================================================

-- -------------------------------------------------------
-- Profiles (extends auth.users 1-to-1)
-- -------------------------------------------------------
create table if not exists public.profiles (
  id          uuid        primary key references auth.users(id) on delete cascade,
  email       text        unique not null,
  full_name   text,
  created_at  timestamptz default now() not null
);

-- Index on email for webhook lookups
create index if not exists profiles_email_idx on public.profiles(email);

-- -------------------------------------------------------
-- Purchases
-- -------------------------------------------------------
create table if not exists public.purchases (
  id                  uuid        primary key default gen_random_uuid(),
  email               text        not null,
  profile_id          uuid        references public.profiles(id) on delete set null,
  stripe_session_id   text        unique not null,
  stripe_customer_id  text,
  amount_paid         integer     not null default 9900, -- stored in cents
  status              text        not null default 'completed',
  created_at          timestamptz default now() not null
);

-- Index on email so hasActivePurchase() is fast
create index if not exists purchases_email_idx      on public.purchases(email);
-- Index on profile_id for getUserPurchase() lookups
create index if not exists purchases_profile_id_idx on public.purchases(profile_id);

-- -------------------------------------------------------
-- Row Level Security
-- -------------------------------------------------------
alter table public.profiles  enable row level security;
alter table public.purchases enable row level security;

-- Users can read their own profile
create policy "Users can read own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

-- Users can update their own profile (e.g. full_name)
create policy "Users can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Users can read their own purchases
create policy "Users can read own purchases"
  on public.purchases
  for select
  using (auth.uid() = profile_id);

-- Service role (webhook) can insert purchases — bypasses RLS automatically
-- when using the service role key, but this policy keeps things explicit
-- for any future anon/service contexts that might need it.
create policy "Service can insert purchases"
  on public.purchases
  for insert
  with check (true);

-- -------------------------------------------------------
-- Trigger: auto-create profile on auth signup
-- and link any pre-existing purchases by email
-- -------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name'
  )
  on conflict (id) do nothing;

  -- Link any purchases that arrived before the user signed up
  update public.purchases
  set    profile_id = new.id
  where  email      = new.email
    and  profile_id is null;

  return new;
end;
$$;

-- Drop and recreate so re-running this migration is idempotent
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
