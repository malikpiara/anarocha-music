-- ============================================
-- Ana Rocha Music CMS - Database Setup
-- Run this in Supabase Dashboard > SQL Editor
-- ============================================

-- Table: concerts
create table public.concerts (
  id uuid default gen_random_uuid() primary key,
  date date not null,
  venue text not null,
  band text not null,
  url text not null default '',
  created_at timestamptz default now() not null
);

alter table public.concerts enable row level security;

create policy "Anyone can read concerts"
  on public.concerts for select using (true);

create policy "Authenticated users can insert concerts"
  on public.concerts for insert to authenticated with check (true);

create policy "Authenticated users can update concerts"
  on public.concerts for update to authenticated using (true) with check (true);

create policy "Authenticated users can delete concerts"
  on public.concerts for delete to authenticated using (true);

-- Table: link_cards
create table public.link_cards (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  url text not null,
  display_order integer not null default 0,
  created_at timestamptz default now() not null
);

alter table public.link_cards enable row level security;

create policy "Anyone can read link_cards"
  on public.link_cards for select using (true);

create policy "Authenticated users can insert link_cards"
  on public.link_cards for insert to authenticated with check (true);

create policy "Authenticated users can update link_cards"
  on public.link_cards for update to authenticated using (true) with check (true);

create policy "Authenticated users can delete link_cards"
  on public.link_cards for delete to authenticated using (true);

-- ============================================
-- Seed data (existing concerts + link cards)
-- ============================================

insert into public.concerts (date, venue, band, url) values
  ('2025-09-27', 'Relais Jazz - Festival "Feminin Singulier" (Tourinnes-la-Grosse)', 'Ana Rocha (Solo)', 'https://relaisjazz.be'),
  ('2025-09-27', 'Diln''foss (Rixensart)', 'Boris Schmidt Band', 'https://www.facebook.com/dinlfoss?locale=fr_FR'),
  ('2025-09-30', 'Maison de la Creation (Bruxelles)', 'ELAS with Rui Salgado Trio', 'https://www.maisondelacreation.org/fr/evenements'),
  ('2025-10-11', 'Jazz im Parkcafé (Berlin)', 'Ana Rocha with Stefan Grütter, Tino Derado...', 'https://jazz-im-park-cafe.jimdosite.com'),
  ('2025-11-06', 'Tournée des Lundis D''Hortense: Café Trotinette / Triangel (Saint-Vith)', 'Diederik Wissels, Ana Rocha, Nicolas Kummert', 'https://www.triangel.com/veranstaltungen/'),
  ('2025-11-07', 'Tournée des Lundis D''Hortense: Espace Senghor (Bruxelles)', 'Diederik Wissels, Ana Rocha, Nicolas Kummert', 'https://www.senghor.be/project/wissels-rocha-kummert/'),
  ('2025-11-08', 'Tournée des Lundis D''Hortense: Jünglingshaus (Eupen)', 'Diederik Wissels, Ana Rocha, Nicolas Kummert', 'https://www.kultkom.be/veranstaltungen/jazz-im-foyer-_-wissels-rocha-kummert/'),
  ('2025-11-09', 'Tournée des Lundis D''Hortense: Relais Jazz (Tourinnes-la-Grosse)', 'Diederik Wissels, Ana Rocha, Nicolas Kummert', 'https://relaisjazz.be/'),
  ('2025-11-19', 'Tournée des Lundis D''Hortense: Rideau Rouge (Lasne))', 'Diederik Wissels, Ana Rocha, Nicolas Kummert', 'https://www.lerideaurouge.be/agenda'),
  ('2025-11-20', 'Tournée des Lundis D''Hortense: Arsonic (Mons)', 'Diederik Wissels, Ana Rocha, Nicolas Kummert', 'https://surmars.be/agenda/2025-11/musique/wissels-rocha-kummert'),
  ('2025-11-21', 'Tournée des Lundis D''Hortense: Jazz9 (Mazy)', 'Diederik Wissels, Ana Rocha, Nicolas Kummert', 'https://jazz9-mazy.org/archives/'),
  ('2025-11-22', 'Tournée des Lundis D''Hortense: Centre Culturel de Mouscron', 'Diederik Wissels, Ana Rocha, Nicolas Kummert', 'https://www.centrecultureldemouscron.be/project/wissels-rocha-kummert-25-26/'),
  ('2026-01-30', 'Art Base (Bruxelles)', 'ELAS with Rui Salgado Trio', 'https://www.art-base.be/index.php?option=com_eventlist&view=categoryevents&id=1&Itemid=2');

insert into public.link_cards (title, url, display_order) values
  ('Yearn with Diederik Wissels, Nicolas Kummert (Videoclip)', 'https://www.youtube.com/watch?v=57Tkb90aHTQ', 1),
  ('Not So Far with Diederik Wissels, Nicolas Kummert (Videoclip)', 'https://youtu.be/_71CyGZiFs8', 2);
