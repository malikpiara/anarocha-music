import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { AdminHeader } from './admin-header';
import { Toaster } from '@/components/ui/sonner';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className='min-h-screen bg-background'>
      <AdminHeader userEmail={user.email ?? ''} />
      <main className='max-w-3xl mx-auto px-6 py-6'>{children}</main>
      <Toaster />
    </div>
  );
}
