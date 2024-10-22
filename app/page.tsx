import SocialMediaLinks from '@/components/social-media-links';
import Header from '@/components/ui/header';
import CardStack from '@/components/ui/stacked-cards';

export default function Home() {
  return (
    <div className='grid items-center justify-items-center min-h-screen p-2 md:p-8 pb-20 gap-16 sm:p-20 '>
      <main className='flex flex-col gap-8 row-start-2 items-center '>
        <Header />
        <CardStack />
      </main>
      <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'>
        <SocialMediaLinks />
      </footer>
    </div>
  );
}
