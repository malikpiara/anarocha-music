-- ============================================
-- Ana Rocha Music - Newsletter Setup
-- Run this in Supabase Dashboard > SQL Editor
-- (on the production project used by Vercel)
-- ============================================

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'website',
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

-- Anyone may subscribe — logged out (anon) or logged in (authenticated) —
-- but never read, update, or delete through this policy.
create policy "Anyone can subscribe"
  on public.newsletter_subscribers
  for insert to anon, authenticated with check (true);

-- Admins (logged in via /login) can view and remove subscribers.
create policy "Authenticated users can read newsletter_subscribers"
  on public.newsletter_subscribers
  for select to authenticated using (true);

create policy "Authenticated users can delete newsletter_subscribers"
  on public.newsletter_subscribers
  for delete to authenticated using (true);
