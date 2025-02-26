import Link from 'next/link';
import { Card, CardContent } from './card';
import { cards } from '@/content/linkCards';

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

type EventItemProps = {
  date: string;
  venue: string;
  band: string;
};

export function EventItem({ date, venue, band }: EventItemProps) {
  return (
    <Link
      className='flex items-center  border rounded-lg overflow-hidden w-full'
      href={'https://moonwith.com/'}
    >
      <div className='bg-gray-50 p-4 text-center'>
        <div className='text-sm font-medium text-gray-600'>Apr {date}</div>
        <div className='text-2xl font-bold'>2</div>
      </div>
      <div className='p-4'>
        <h2 className='text-xl font-bold'>Berlin, Deutschland {venue}</h2>
        <p className='text-gray-600'>Kai Tak Stadium {band}</p>
      </div>
    </Link>
  );
}

export default function CardStack() {
  const data = [
    {
      id: 1,
      date: '30/04/2025',
      venue: 'Trifolion Echternach (Luxemburg)',
      band: 'Boris Schmidt Band',
    },
    {
      id: 2,
      date: '02/05/2025',
      venue: 'Centre Culturel Ans (Belgium)',
      band: 'Boris Schmidt Band',
    },
    {
      id: 3,
      date: '10/05/2025',
      venue: 'Jazz Station (Brussels, BE)',
      band: 'Boris Schmidt Band',
    },
    {
      id: 4,
      date: '14/06/2025',
      venue: 'Bouillon Blanc (Bouillon, BE)',
      band: 'Ana & the Duorkestra',
    },
    {
      id: 5,
      date: '15/06/2025',
      venue: 'Magie du Pommier (Manhay)',
      band: 'Ana & the Duorkestra',
    },
  ];
  return (
    <div className='container mx-auto p-4 space-y-4'>
      {cards.map((card, index) => (
        <Card
          key={index}
          className='w-full cursor-pointer hover:opacity-80 hover:scale-105 transition-all rounded-xl'
        >
          <CardContent className='p-6 px-20 hover:text-[#D1B0F9] transition-all'>
            <Link href={card.url} target='_blank'>
              <h2 className='text-center font-medium'>{card.title}</h2>
            </Link>
          </CardContent>
        </Card>
      ))}
      <Drawer>
        <DrawerTrigger>Upcoming Concerts</DrawerTrigger>
        <DrawerContent className='p-4 gap-y-4 overflow-y-auto'>
          <DrawerTitle className='text-3xl font-semibold text-center tracking-tighter'>
            Upcoming Concerts
          </DrawerTitle>

          {data.map((event) => (
            <EventItem
              key={event.id}
              date={event.date}
              venue={event.venue}
              band={event.band}
            />
          ))}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
