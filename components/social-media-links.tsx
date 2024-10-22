'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePostHog } from 'posthog-js/react';

export default function SocialMediaLinks() {
  const posthog = usePostHog();

  const socialMedia = [
    {
      title: 'Instagram',
      url: 'https://www.instagram.com/anarochamusic',
    },
    {
      title: 'Youtube',
      url: 'https://www.youtube.com/@anaofficialmusic',
    },
    {
      title: 'Facebook',
      url: 'https://www.facebook.com/anarochagaspar',
    },
    {
      title: 'Apple Music',
      url: 'https://www.facebook.com/anarochagaspar',
    },
    {
      title: 'Spotify',
      url: 'https://open.spotify.com/artist/4ppTNB1xdVMcSdgVXuAILM?si=KtwkehfiSuKswG4MWSySBw',
    },
  ];

  return (
    <>
      {socialMedia.map((social) => (
        <Link
          key={social.title}
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href={social.url}
          target='_blank'
          rel='noopener noreferrer'
          onClick={() =>
            posthog?.capture(`click_${social.title.toLowerCase()}_link`)
          }
        >
          <Image
            aria-hidden
            src='https://nextjs.org/icons/file.svg'
            alt='File icon'
            width={16}
            height={16}
          />
          {social.title}
        </Link>
      ))}
    </>
  );
}
