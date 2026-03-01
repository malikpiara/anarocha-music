'use client';
import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';
import { socialMedia } from '@/content/socialMedia';

export default function SocialMediaLinksText() {
  const posthog = usePostHog();

  return (
    <div
      className='flex flex-wrap items-center justify-center'
      style={{ gap: '8px 28px' }}
    >
      {socialMedia.map((social) => (
        <Link
          key={social.title}
          className='hover:text-lavender'
          style={{
            fontSize: 15,
            fontWeight: 300,
            color: 'rgba(237,232,244,0.4)',
            transition: 'color 200ms ease',
          }}
          href={social.url}
          target='_blank'
          rel='noopener noreferrer'
          onClick={() =>
            posthog?.capture(`click_${social.title.toLowerCase()}_link`)
          }
        >
          {social.title}
        </Link>
      ))}
    </div>
  );
}
