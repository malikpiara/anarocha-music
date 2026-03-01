import SplitHero from '@/components/split-hero';
import { getConcerts, getLinkCards } from '@/lib/data';

export default async function SplitHeroPage() {
  const [concerts, linkCards] = await Promise.all([
    getConcerts(),
    getLinkCards(),
  ]);

  return <SplitHero concerts={concerts} linkCards={linkCards} />;
}
