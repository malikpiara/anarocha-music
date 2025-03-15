// Do not change anything in this file.
// To change the social media links and add new links go to the folder 'content'.

'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePostHog } from 'posthog-js/react';
import { socialMedia } from '@/content/socialMedia';

export default function SocialMediaLinks() {
  const posthog = usePostHog();

  return (
    <>
      {socialMedia.map((social) => (
        <Link
          key={social.title}
          className='flex items-center gap-2 hover:underline hover:underline-offset-4 transition-all hover:bg-slate-100 hover:text-[#0348B6] px-2 rounded-md'
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
