'use client';

import { useState, useTransition } from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import type { Subscriber } from '@/lib/types';
import { deleteSubscriber } from './actions';

/* ── Design tokens (shared with concerts-admin) ──────────── */
const P = {
  accent: '#D1B0F9',
  accentFaint: 'rgba(209,176,249,0.08)',
  accentBorder: 'rgba(209,176,249,0.18)',
  text: '#ede8f4',
  muted: 'rgba(237,232,244,0.45)',
  dimmed: 'rgba(237,232,244,0.22)',
  border: 'rgba(255,255,255,0.06)',
};

function downloadCsv(subscribers: Subscriber[]) {
  const rows = subscribers.map((s) => `${s.email},${s.created_at}`);
  const csv = ['email,subscribed_at', ...rows].join('\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'subscribers.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export function NewsletterAdmin({ subscribers }: { subscribers: Subscriber[] }) {
  const [isPending, startTransition] = useTransition();
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recentCount = subscribers.filter(
    (s) => new Date(s.created_at).getTime() > thirtyDaysAgo
  ).length;

  const handleDelete = (id: string) => {
    setConfirmingId(null);
    startTransition(async () => {
      const result = await deleteSubscriber(id);
      if (result.success) {
        toast.success('Subscriber removed');
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <div>
      {/* ── Stats + export ─────────────────────────────────── */}
      <div className='flex items-end justify-between mb-6'>
        <div className='flex gap-8'>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: P.accent }}>
              {subscribers.length}
            </div>
            <div style={{ fontSize: 13, color: P.muted }}>Subscribers</div>
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: P.text }}>
              {recentCount}
            </div>
            <div style={{ fontSize: 13, color: P.muted }}>Last 30 days</div>
          </div>
        </div>
        {subscribers.length > 0 && (
          <button
            onClick={() => downloadCsv(subscribers)}
            className='rounded-lg px-4 py-2 transition-colors hover:text-lavender'
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: P.muted,
              border: `1px solid ${P.border}`,
            }}
          >
            Download CSV
          </button>
        )}
      </div>

      {/* ── List ───────────────────────────────────────────── */}
      {subscribers.length === 0 ? (
        <div
          className='rounded-xl text-center py-16'
          style={{ border: `1px dashed ${P.border}`, color: P.muted }}
        >
          No subscribers yet.
        </div>
      ) : (
        <div
          className='rounded-xl overflow-hidden'
          style={{ border: `1px solid ${P.border}` }}
        >
          {subscribers.map((s, i) => (
            <div
              key={s.id}
              className='flex items-center justify-between gap-4 px-5 py-3.5'
              style={{
                borderTop: i === 0 ? 'none' : `1px solid ${P.border}`,
              }}
            >
              <div className='min-w-0'>
                <div
                  className='truncate'
                  style={{ fontSize: 14, fontWeight: 500, color: P.text }}
                >
                  {s.email}
                </div>
                <div style={{ fontSize: 12, color: P.dimmed }}>
                  {format(new Date(s.created_at), 'd MMM yyyy')}
                </div>
              </div>
              {confirmingId === s.id ? (
                <div className='flex items-center gap-2 shrink-0'>
                  <button
                    onClick={() => handleDelete(s.id)}
                    disabled={isPending}
                    className='rounded-md px-3 py-1.5'
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#f8867e',
                      border: '1px solid rgba(248,134,126,0.3)',
                    }}
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => setConfirmingId(null)}
                    className='rounded-md px-3 py-1.5'
                    style={{
                      fontSize: 12,
                      color: P.muted,
                      border: `1px solid ${P.border}`,
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmingId(s.id)}
                  disabled={isPending}
                  className='shrink-0 transition-colors hover:text-[#f8867e]'
                  style={{ fontSize: 12, color: P.dimmed }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
