import Link from 'next/link';
import { Card, CardContent } from './card';
import { cards } from '@/content/linkCards';

export default function CardStack() {
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
    </div>
  );
}
