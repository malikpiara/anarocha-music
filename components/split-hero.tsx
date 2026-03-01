import Image from 'next/image';
import Link from 'next/link';
import profilePic from '@/public/ana.jpg';
import type { Concert, LinkCard } from '@/lib/types';
import { groupByMonth, monthLabelStyle } from '@/lib/concerts';
import { socialMedia } from '@/content/socialMedia';
import { EventItem } from '@/components/ui/stacked-cards';

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

/* ── Shared card classes ──────────────────────────────────── */
const cardClasses =
  'rounded-xl cursor-pointer bg-[rgba(209,176,249,0.03)] border border-[rgba(209,176,249,0.10)] hover:bg-[rgba(209,176,249,0.07)] hover:border-[rgba(209,176,249,0.25)]';

/* ── Spotify SVG icon ─────────────────────────────────────── */
function SpotifyIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor'>
      <path d='M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z' />
    </svg>
  );
}

/* ── Chevron up icon (signals bottom drawer) ─────────────── */
function ChevronUp({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m18 15-6-6-6 6' />
    </svg>
  );
}

/* ── Play button icon (circle + triangle) ─────────────────── */
function PlayIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox='0 0 44 44' fill='none'>
      <circle
        cx='22'
        cy='22'
        r='21'
        stroke='rgba(209,176,249,0.20)'
        strokeWidth='1.5'
      />
      <path
        d='M18 14.5L30 22L18 29.5V14.5Z'
        fill='rgba(209,176,249,0.35)'
      />
    </svg>
  );
}

type SplitHeroProps = {
  concerts: Concert[];
  linkCards: LinkCard[];
};

export default function SplitHero({ concerts, linkCards }: SplitHeroProps) {
  return (
    <div className='min-h-screen flex flex-col items-center animate-in'>
      {/* ── Hero section ─────────────────────────────────── */}
      <section
        className='w-full'
        style={{ maxWidth: 760, padding: '96px 28px 0' }}
      >
        {/* Desktop: side-by-side with rectangular photo */}
        <div
          className='hidden md:grid'
          style={{ gridTemplateColumns: '280px 1fr', gap: 48 }}
        >
          {/* Photo */}
          <div
            className='overflow-hidden border border-[rgba(209,176,249,0.10)]'
            style={{
              borderRadius: 14,
              aspectRatio: '3/4',
            }}
          >
            <Image
              src={profilePic}
              placeholder='blur'
              alt='Ana Rocha'
              className='object-cover w-full h-full'
              width={280}
              height={373}
              priority
            />
          </div>

          {/* Text content */}
          <div className='flex flex-col justify-center'>
            <div
              className='uppercase tracking-widest text-lavender/40 mb-4'
              style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em' }}
            >
              Artist
            </div>
            <h1
              className='font-heading text-lavender leading-none mb-5'
              style={{ fontSize: 52, fontWeight: 500 }}
            >
              Ana
              <br />
              Rocha
            </h1>
            <p
              className='leading-relaxed mb-8'
              style={{
                fontSize: 17,
                fontWeight: 300,
                color: 'rgba(237,232,244,0.45)',
                maxWidth: 300,
              }}
            >
              Singer, lyricist and composer with German and Portuguese roots.
            </p>

            {/* Divider */}
            <div
              className='mb-6'
              style={{
                height: 1,
                background: 'rgba(209,176,249,0.08)',
                maxWidth: 200,
              }}
            />

            {/* Social links */}
            <div className='flex flex-wrap' style={{ gap: '8px 20px' }}>
              {socialMedia.map((social) => (
                <Link
                  key={social.title}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white/30 hover:text-lavender'
                  style={{ fontSize: 15, fontWeight: 300, transition: 'color 200ms ease' }}
                >
                  {social.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: full-bleed photo with gradient overlay */}
        <div className='md:hidden' style={{ margin: '-96px -28px 0' }}>
          <div className='relative'>
            <div
              className='relative w-full'
              style={{ aspectRatio: '3/4', maxHeight: '75vh' }}
            >
              <Image
                src={profilePic}
                placeholder='blur'
                alt='Ana Rocha'
                className='object-cover w-full h-full'
                fill
                sizes='100vw'
                priority
              />
            </div>
            {/* Gradient overlay */}
            <div
              className='absolute inset-0'
              style={{
                background:
                  'linear-gradient(to bottom, transparent 30%, #0c0a10 95%)',
              }}
            />
            {/* Text overlaid on image */}
            <div className='absolute bottom-0 left-0 right-0 px-7 pb-8'>
              <div
                className='uppercase tracking-widest text-lavender/40 mb-2'
                style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em' }}
              >
                Artist
              </div>
              <h1
                className='font-heading text-lavender leading-none mb-4'
                style={{ fontSize: 44, fontWeight: 500 }}
              >
                Ana
                <br />
                Rocha
              </h1>
              <p
                className='leading-relaxed'
                style={{
                  fontSize: 17,
                  fontWeight: 300,
                  color: 'rgba(237,232,244,0.45)',
                }}
              >
                Singer, lyricist and composer
                <br />
                with German and Portuguese roots.
              </p>
            </div>
          </div>

          {/* Mobile social links */}
          <div className='px-7 pt-5 pb-2'>
            <div className='flex flex-wrap' style={{ gap: '8px 20px' }}>
              {socialMedia.map((social) => (
                <Link
                  key={social.title}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white/30 hover:text-lavender'
                  style={{ fontSize: 15, fontWeight: 300, transition: 'color 200ms ease' }}
                >
                  {social.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Card grid section ─────────────────────────────── */}
      <section
        className='w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 stagger-children'
        style={{ maxWidth: 760, padding: '48px 28px 96px' }}
      >
        {/* Spotify card — FULL WIDTH */}
        <Link
          href='https://open.spotify.com/artist/4ppTNB1xdVMcSdgVXuAILM?si=KtwkehfiSuKswG4MWSySBw'
          target='_blank'
          className={`group sm:col-span-2 flex items-center justify-between w-full ${cardClasses}`}
          style={{ padding: '28px 32px', transition: 'background-color 200ms ease, border-color 200ms ease' }}
        >
          <div>
            <div
              className='text-white/30 uppercase tracking-wider mb-2'
              style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em' }}
            >
              Spotify
            </div>
            <div
              className='font-heading text-white/80 group-hover:text-lavender'
              style={{ fontSize: 22, transition: 'color 200ms ease' }}
            >
              Music by Ana Rocha
            </div>
          </div>
          <div className='text-white/20 group-hover:text-lavender' style={{ transition: 'color 200ms ease' }}>
            <SpotifyIcon size={28} />
          </div>
        </Link>

        {/* Dynamic link cards — 2-column with play icon */}
        {linkCards.map((card) => (
          <Link
            key={card.id}
            href={card.url}
            target='_blank'
            className={`group flex flex-col justify-between w-full ${cardClasses}`}
            style={{ padding: '28px 32px 32px', transition: 'background-color 200ms ease, border-color 200ms ease' }}
          >
            <div className='mb-6'>
              <PlayIcon size={44} />
            </div>
            <div
              className='font-heading group-hover:text-lavender'
              style={{ fontSize: 24, color: 'rgba(209,176,249,0.8)', transition: 'color 200ms ease' }}
            >
              {card.title}
            </div>
          </Link>
        ))}

        {/* Upcoming Concerts — FULL WIDTH with upward chevron */}
        <Drawer>
          <DrawerTrigger className='w-full text-left sm:col-span-2'>
            <div
              className={`group flex items-center justify-between w-full ${cardClasses}`}
              style={{ padding: '28px 32px', transition: 'background-color 200ms ease, border-color 200ms ease' }}
            >
              <div
                className='font-heading text-white/80 group-hover:text-lavender'
                style={{ fontSize: 22, transition: 'color 200ms ease' }}
              >
                Upcoming Concerts
              </div>
              <div className='text-white/20 group-hover:text-lavender' style={{ transition: 'color 200ms ease' }}>
                <ChevronUp size={20} />
              </div>
            </div>
          </DrawerTrigger>
          <DrawerContent className='bg-card border-white/10'>
            <DrawerTitle className='text-3xl font-heading font-semibold text-lavender text-center tracking-tighter mb-6'>
              Upcoming Concerts
            </DrawerTitle>
            <div className='px-6 pb-6 flex-1 overflow-y-auto max-h-[70vh]'>
              {concerts.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-16 text-center'>
                  <p style={{ fontSize: 17, color: 'rgba(237,232,244,0.45)' }}>
                    No upcoming concerts at the moment.
                  </p>
                  <p style={{ fontSize: 14, color: 'rgba(237,232,244,0.3)', marginTop: 6 }}>
                    Check back soon for new dates!
                  </p>
                </div>
              ) : (
                <div className='max-w-4xl mx-auto space-y-6'>
                  {groupByMonth(concerts).map((group) => (
                    <div key={group.key}>
                      <div style={monthLabelStyle}>{group.label}</div>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                        {group.concerts.map((event) => (
                          <EventItem
                            key={event.id}
                            date={event.date}
                            venue={event.venue}
                            band={event.band}
                            url={event.url}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </section>
    </div>
  );
}
