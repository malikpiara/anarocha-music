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
      icon: '/instagram.svg',
    },
    {
      title: 'Youtube',
      url: 'https://www.youtube.com/@anaofficialmusic',
      icon: '/youtube.svg',
    },
    {
      title: 'Facebook',
      url: 'https://www.facebook.com/anarochamusic',
      icon: '/facebook.svg',
    },
    {
      title: 'Apple Music',
      url: 'https://music.apple.com/de/artist/ana-rocha/1680946999',
      icon: '/apple-music.svg',
    },
    {
      title: 'Spotify',
      url: 'https://open.spotify.com/artist/4ppTNB1xdVMcSdgVXuAILM?si=KtwkehfiSuKswG4MWSySBw',
      icon: '/spotify.svg',
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
            src={social.icon}
            alt={`${social.title} icon`}
            width={24}
            height={24}
          />
          {social.title}
        </Link>
      ))}
    </>
  );
}
