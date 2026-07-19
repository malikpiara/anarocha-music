import Link from 'next/link';
import SocialMediaLinksText from '@/components/social-media-links-text';
import Header from '@/components/ui/header';
import CardStack from '@/components/ui/stacked-cards';
import { getConcerts, getLinkCards } from '@/lib/data';

export default async function Home() {
  const [concerts, linkCards] = await Promise.all([
    getConcerts(),
    getLinkCards(),
  ]);

  return (
    <div className='flex flex-col items-center min-h-screen pt-20 pb-12 md:pt-32 md:pb-16 px-6 animate-in'>
      <main
        className='flex flex-col items-center gap-14 md:gap-16 w-full'
        style={{ maxWidth: 720 }}
      >
        <Header />
        <CardStack concerts={concerts} linkCards={linkCards} />
      </main>
      <footer
        className='mt-auto pt-20 pb-10 animate-in flex flex-col items-center gap-5'
        style={{ animationDelay: '500ms' }}
      >
        <SocialMediaLinksText />
        <div className='flex items-center gap-4 text-[13px] font-light'>
          <Link
            href='/impressum'
            className='text-[rgba(237,232,244,0.25)] hover:text-lavender transition-colors'
          >
            Impressum
          </Link>
          <span
            aria-hidden
            style={{ color: 'rgba(237,232,244,0.15)' }}
          >
            ·
          </span>
          <Link
            href='/datenschutz'
            className='text-[rgba(237,232,244,0.25)] hover:text-lavender transition-colors'
          >
            Datenschutz
          </Link>
        </div>
      </footer>
    </div>
  );
}
