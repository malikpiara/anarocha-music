import Link from 'next/link';
import { Card, CardContent } from './card';
import { cards } from '@/content/linkCards';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';

import {
  Drawer,
  DrawerContent,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

type EventItemProps = {
  date: string;
  venue: string;
  band: string;
  url?: string;
};

function formatDate(dateStr: string) {
  const [day, month, year] = dateStr.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  const monthAbbr = date.toLocaleString('en-US', { month: 'short' });
  return { monthAbbr, day };
}

export function EventItem({ date, venue, band }: EventItemProps) {
  const { monthAbbr, day } = formatDate(date);
  return (
    <Link
      className='flex items-center border rounded-lg overflow-hidden w-full hover:opacity-60 transition-all'
      href={'#'}
    >
      <div className='bg-gray-50 p-4 text-center rounded-lg m-2'>
        <div className='text-sm font-medium text-[#0348B6]'>{monthAbbr}</div>
        <div className='text-2xl font-bold text-[#0348B6]'>{day}</div>
      </div>
      <div className='p-4'>
        <h2 className='text-xl font-medium text-[#0348B6]'>{venue}</h2>
        <p className='text-gray-600'>{band}</p>
      </div>
    </Link>
  );
}

export default function CardStack() {
  const data = [
    {
      id: 0,
      date: '26/04/2025',
      venue: 'Sala Anexa (Lisboa)',
      band: 'Ana Rocha & Filipe Duarte',
      url: '#',
    },
    {
      id: 1,
      date: '02/04/2025',
      venue: 'Klick Kino (Berlin)',
      band: 'Ana Rocha & Naoufal Montassere',
      url: '#',
    },
    {
      id: 2,
      date: '30/04/2025',
      venue: 'Trifolion Echternach (Luxemburg)',
      band: 'Boris Schmidt Band',
      url: '#',
    },
    {
      id: 3,
      date: '10/05/2025',
      venue: 'Jazz Station (Brussels)',
      band: 'Boris Schmidt Band',
      url: '#',
    },
    {
      id: 4,
      date: '08/06/2025',
      venue: 'Le Baixu (Brussels)',
      band: 'Boris Schmidt Band',
      url: '#',
    },
    {
      id: 5,
      date: '14/06/2025',
      venue: 'Bouillon Blanc (Bouillon, BE)',
      band: 'Ana & the Duorkestra',
      url: '#',
    },
    {
      id: 6,
      date: '15/06/2025',
      venue: 'Magie du Pommier (Manhay)',
      band: 'Ana & the Duorkestra',
      url: '#',
    },
    {
      id: 7,
      date: '22/06/2025',
      venue: 'Abbey Neumünster (LUX)',
      band: 'Boris Schmidt Band',
      url: '#',
    },
    {
      id: 8,
      date: '01/10/2025',
      venue: 'Brussels',
      band: 'ELAS',
      url: '#',
    },
    {
      id: 9,
      date: '01/11/2025',
      venue: 'Belgian Tour',
      band: 'Ana Rocha, Diederik Wissels, Nicolas Kummert',
      url: '#',
    },
    {
      id: 10,
      date: '05/11/2025',
      venue: 'Le Rideau Rouge (Lasne, BE)',
      band: 'Diederik Wissels, Ana Rocha & Nicolas Kummert',
      url: '#',
    },
    {
      id: 11,
      date: '09/11/2025',
      venue: 'Relais Jazz (Tourinnes-la-Grosse, BE)',
      band: 'Diederik Wissels, Ana Rocha & Nicolas Kummert',
      url: '#',
    },
    {
      id: 12,
      date: '21/11/2025',
      venue: 'Jazz9 (Mazy, BE)',
      band: 'Diederik Wissels, Ana Rocha & Nicolas Kummert',
      url: '#',
    },
    {
      id: 13,
      date: '22/11/2025',
      venue: 'Centre Culturel Mouscron (Mouscron, BE)',
      band: 'Diederik Wissels, Ana Rocha & Nicolas Kummert',
      url: '#',
    },
  ];
  return (
    <div className='container mx-auto p-4 space-y-4'>
      <div className='max-sm:hidden relative'>
        <Sheet>
          <SheetTrigger className='w-full'>
            <Card className='w-full cursor-pointer hover:opacity-80 hover:scale-105 transition-all rounded-xl p-6 px-20 text-slate-700 hover:text-[#0348B6]'>
              Music by Ana Rocha
            </Card>
          </SheetTrigger>
          <SheetContent
            side={'right'}
            className='fixed bottom-2 right-2 top-2 max-w-[50vw] rounded-lg outline-none'
            style={{
              maxWidth: '50vw',
            }}
          >
            <iframe
              style={{ borderRadius: '12px' }}
              src='https://open.spotify.com/embed/playlist/4MY9AhEX0B3aKaethxyxiW?utm_source=generator'
              width='100%'
              height='852'
              allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
              loading='lazy'
            />
            <SheetHeader>
              <SheetDescription></SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className='sm:block md:hidden'>
        <Card className='w-full cursor-pointer hover:opacity-80 hover:scale-105 transition-all rounded-xl p-6 px-20 text-slate-700 hover:text-[#0348B6] text-center'>
          <Link
            href={
              'https://open.spotify.com/artist/4ppTNB1xdVMcSdgVXuAILM?si=KtwkehfiSuKswG4MWSySBw'
            }
            target='_blank'
          >
            {' '}
            Music by Ana Rocha
          </Link>
        </Card>
      </div>

      {cards.map((card, index) => (
        <Card
          key={index}
          className='w-full cursor-pointer hover:opacity-80 hover:scale-105 transition-all rounded-xl text-slate-700'
        >
          <CardContent className='p-6 px-20 hover:text-[#0348B6] transition-all'>
            <Link href={card.url} target='_blank'>
              <h2 className='text-center font-medium'>{card.title}</h2>
            </Link>
          </CardContent>
        </Card>
      ))}

      <Drawer>
        <DrawerTrigger className='w-full'>
          <Card className='w-full cursor-pointer hover:opacity-80 hover:scale-105 transition-all rounded-xl p-6 px-20 text-slate-700 hover:text-[#0348B6]'>
            Upcoming Concerts
          </Card>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerContent className='flex flex-col rounded-t-[10px] mt-24 h-[80%] lg:h-[520px] fixed bottom-0 left-0 right-0 outline-none'>
            <DrawerTitle className='text-3xl font-medium text-[#0348B6] text-center tracking-tighter mb-4'>
              Upcoming Concerts
            </DrawerTitle>
            <div className='p-4 bg-white rounded-t-[10px] flex-1 overflow-y-auto'>
              <div className='max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4'>
                {data.map((event) => (
                  <EventItem
                    key={event.id}
                    date={event.date}
                    venue={event.venue}
                    band={event.band}
                    url={event.url || '#'}
                  />
                ))}
              </div>
            </div>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </div>
  );
}
