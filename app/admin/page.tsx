import { createClient } from '@/lib/supabase/server';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConcertsAdmin } from './concerts-admin';
import { LinkCardsAdmin } from './link-cards-admin';

export default async function AdminPage() {
  const supabase = createClient();

  const [concertsResult, linkCardsResult] = await Promise.all([
    supabase.from('concerts').select('*').order('date', { ascending: true }),
    supabase
      .from('link_cards')
      .select('*')
      .order('display_order', { ascending: true }),
  ]);

  return (
    <div>
      <Tabs defaultValue='concerts'>
        <TabsList className='mb-8 bg-transparent p-0 h-auto gap-0'>
          <TabsTrigger
            value='concerts'
            className='rounded-l-lg rounded-r-none border border-r-0 px-5 py-2.5 text-[14px] data-[state=active]:bg-[rgba(209,176,249,0.08)] data-[state=active]:border-[rgba(209,176,249,0.18)] data-[state=active]:text-lavender data-[state=active]:font-semibold data-[state=inactive]:border-[rgba(255,255,255,0.06)] data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:shadow-none'
          >
            Concerts ({concertsResult.data?.length ?? 0})
          </TabsTrigger>
          <TabsTrigger
            value='link-cards'
            className='rounded-r-lg rounded-l-none border px-5 py-2.5 text-[14px] data-[state=active]:bg-[rgba(209,176,249,0.08)] data-[state=active]:border-[rgba(209,176,249,0.18)] data-[state=active]:text-lavender data-[state=active]:font-semibold data-[state=inactive]:border-[rgba(255,255,255,0.06)] data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:shadow-none'
          >
            Link Cards ({linkCardsResult.data?.length ?? 0})
          </TabsTrigger>
        </TabsList>
        <TabsContent value='concerts' className='mt-0'>
          <ConcertsAdmin concerts={concertsResult.data ?? []} />
        </TabsContent>
        <TabsContent value='link-cards' className='mt-0'>
          <LinkCardsAdmin linkCards={linkCardsResult.data ?? []} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
