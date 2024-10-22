import Link from 'next/link';
import { Card, CardContent } from './card';

export default function CardStack() {
  const cards = [
    {
      title: 'Music by Ana Rocha',
      url: 'https://open.spotify.com/artist/4ppTNB1xdVMcSdgVXuAILM?si=KtwkehfiSuKswG4MWSySBw',
    },
    {
      title: 'João dos Jornais - ELAS - Ana Rocha & Rui Salgado Trio',
      url: 'https://youtu.be/warByl0LbLE',
    },
    {
      title: 'Yearn with Diederik Wissels, Nicolas Kummert (Videoclip)',
      url: 'https://www.youtube.com/watch?v=57Tkb90aHTQ',
    },
  ];

  return (
    <div className='container mx-auto p-4 space-y-4'>
      {cards.map((card, index) => (
        <Card
          key={index}
          className='w-full cursor-pointer hover:opacity-80 hover:scale-105 transition-all rounded-xl'
        >
          <CardContent className='p-6 px-20 hover:text-pink-400 transition-all'>
            <Link href={card.url} target='_blank'>
              <h2 className='text-center font-medium'>{card.title}</h2>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
