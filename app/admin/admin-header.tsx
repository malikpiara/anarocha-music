'use client';

import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function AdminHeader({ userEmail }: { userEmail: string }) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <header
      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className='max-w-3xl mx-auto px-6 py-4 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <span className='text-base font-bold'>Admin</span>
          <Link
            href='/'
            target='_blank'
            className='inline-flex items-center gap-1.5 transition-colors'
            style={{ fontSize: 13, color: 'rgba(237,232,244,0.45)' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = '#D1B0F9')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = 'rgba(237,232,244,0.45)')
            }
          >
            <svg
              width={13}
              height={13}
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3' />
            </svg>
            View Website
          </Link>
        </div>
        <div className='flex items-center gap-4'>
          <span
            className='hidden sm:inline'
            style={{ fontSize: 13, color: 'rgba(237,232,244,0.45)' }}
          >
            {userEmail}
          </span>
          <button
            onClick={handleSignOut}
            className='transition-colors'
            style={{
              padding: '7px 16px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'transparent',
              color: 'rgba(237,232,244,0.45)',
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = 'rgba(209,176,249,0.18)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')
            }
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
