import Header from '@/components/ui/header';
import CardStack from '@/components/ui/stacked-cards';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='grid items-center justify-items-center min-h-screen p-2 md:p-8 pb-20 gap-16 sm:p-20 '>
      <main className='flex flex-col gap-8 row-start-2 items-center '>
        <Header />
        <CardStack />
      </main>
      <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'>
        <Link
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://www.instagram.com/anarochamusic'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='https://nextjs.org/icons/file.svg'
            alt='File icon'
            width={16}
            height={16}
          />
          Instagram
        </Link>
        <Link
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://www.youtube.com/@anaofficialmusic'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='https://nextjs.org/icons/window.svg'
            alt='Window icon'
            width={16}
            height={16}
          />
          Youtube
        </Link>
        <Link
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://www.facebook.com/anarochagaspar'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='https://nextjs.org/icons/globe.svg'
            alt='Globe icon'
            width={16}
            height={16}
          />
          Facebook
        </Link>
        <Link
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://music.apple.com/de/artist/ana-rocha/1680946999'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='https://nextjs.org/icons/globe.svg'
            alt='Globe icon'
            width={16}
            height={16}
          />
          Apple Music
        </Link>
        <Link
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://open.spotify.com/artist/4ppTNB1xdVMcSdgVXuAILM?si=KtwkehfiSuKswG4MWSySBw'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='https://nextjs.org/icons/globe.svg'
            alt='Globe icon'
            width={16}
            height={16}
          />
          Spotify
        </Link>
      </footer>
    </div>
  );
}
