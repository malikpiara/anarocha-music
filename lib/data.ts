import { createClient } from '@/lib/supabase/server';
import type { Concert, LinkCard } from '@/lib/types';

const fallbackConcerts: Concert[] = [
  { id: 'f1', date: '2025-09-27', venue: 'Relais Jazz - Festival "Feminin Singulier" (Tourinnes-la-Grosse)', band: 'Ana Rocha (Solo)', url: 'https://relaisjazz.be', created_at: '' },
  { id: 'f2', date: '2025-09-27', venue: "Diln'foss (Rixensart)", band: 'Boris Schmidt Band', url: 'https://www.facebook.com/dinlfoss?locale=fr_FR', created_at: '' },
  { id: 'f3', date: '2025-09-30', venue: 'Maison de la Creation (Bruxelles)', band: 'ELAS with Rui Salgado Trio', url: 'https://www.maisondelacreation.org/fr/evenements', created_at: '' },
  { id: 'f4', date: '2025-10-11', venue: 'Jazz im Parkcafé (Berlin)', band: 'Ana Rocha with Stefan Grütter, Tino Derado...', url: 'https://jazz-im-park-cafe.jimdosite.com', created_at: '' },
  { id: 'f5', date: '2025-11-06', venue: "Tournée des Lundis D'Hortense: Café Trotinette / Triangel (Saint-Vith)", band: 'Diederik Wissels, Ana Rocha, Nicolas Kummert', url: 'https://www.triangel.com/veranstaltungen/', created_at: '' },
  { id: 'f6', date: '2025-11-07', venue: "Tournée des Lundis D'Hortense: Espace Senghor (Bruxelles)", band: 'Diederik Wissels, Ana Rocha, Nicolas Kummert', url: 'https://www.senghor.be/project/wissels-rocha-kummert/', created_at: '' },
  { id: 'f7', date: '2025-11-08', venue: "Tournée des Lundis D'Hortense: Jünglingshaus (Eupen)", band: 'Diederik Wissels, Ana Rocha, Nicolas Kummert', url: 'https://www.kultkom.be/veranstaltungen/jazz-im-foyer-_-wissels-rocha-kummert/', created_at: '' },
  { id: 'f8', date: '2025-11-09', venue: "Tournée des Lundis D'Hortense: Relais Jazz (Tourinnes-la-Grosse)", band: 'Diederik Wissels, Ana Rocha, Nicolas Kummert', url: 'https://relaisjazz.be/', created_at: '' },
  { id: 'f9', date: '2025-11-19', venue: "Tournée des Lundis D'Hortense: Rideau Rouge (Lasne))", band: 'Diederik Wissels, Ana Rocha, Nicolas Kummert', url: 'https://www.lerideaurouge.be/agenda', created_at: '' },
  { id: 'f10', date: '2025-11-20', venue: "Tournée des Lundis D'Hortense: Arsonic (Mons)", band: 'Diederik Wissels, Ana Rocha, Nicolas Kummert', url: 'https://surmars.be/agenda/2025-11/musique/wissels-rocha-kummert', created_at: '' },
  { id: 'f11', date: '2025-11-21', venue: "Tournée des Lundis D'Hortense: Jazz9 (Mazy)", band: 'Diederik Wissels, Ana Rocha, Nicolas Kummert', url: 'https://jazz9-mazy.org/archives/', created_at: '' },
  { id: 'f12', date: '2025-11-22', venue: "Tournée des Lundis D'Hortense: Centre Culturel de Mouscron", band: 'Diederik Wissels, Ana Rocha, Nicolas Kummert', url: 'https://www.centrecultureldemouscron.be/project/wissels-rocha-kummert-25-26/', created_at: '' },
  { id: 'f13', date: '2026-01-30', venue: 'Art Base (Bruxelles)', band: 'ELAS with Rui Salgado Trio', url: 'https://www.art-base.be/index.php?option=com_eventlist&view=categoryevents&id=1&Itemid=2', created_at: '' },
];

const fallbackLinkCards: LinkCard[] = [
  { id: 'fl1', title: 'Yearn with Diederik Wissels, Nicolas Kummert (Videoclip)', url: 'https://www.youtube.com/watch?v=57Tkb90aHTQ', display_order: 1, created_at: '' },
  { id: 'fl2', title: 'Not So Far with Diederik Wissels, Nicolas Kummert (Videoclip)', url: 'https://youtu.be/_71CyGZiFs8', display_order: 2, created_at: '' },
];

export async function getConcerts(): Promise<Concert[]> {
  const today = new Date().toISOString().split('T')[0];
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('concerts')
      .select('*')
      .gte('date', today)
      .order('date', { ascending: true });

    if (error) throw error;
    return data ?? fallbackConcerts.filter((c) => c.date >= today);
  } catch {
    console.error('Failed to fetch concerts from Supabase');
    return fallbackConcerts.filter((c) => c.date >= today);
  }
}

export async function getLinkCards(): Promise<LinkCard[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('link_cards')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data ?? fallbackLinkCards;
  } catch {
    console.error('Failed to fetch link cards from Supabase');
    return fallbackLinkCards;
  }
}
