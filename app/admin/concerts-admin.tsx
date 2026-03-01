'use client';

import { useState, useMemo, useTransition } from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import type { Concert } from '@/lib/types';
import { groupByMonth, monthLabelStyle } from '@/lib/concerts';
import { createConcert, updateConcert, deleteConcert } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ── Design tokens ───────────────────────────────────────── */
const P = {
  accent: '#D1B0F9',
  accentDim: 'rgba(209,176,249,0.5)',
  accentFaint: 'rgba(209,176,249,0.08)',
  accentBorder: 'rgba(209,176,249,0.18)',
  surface: '#13111a',
  surfaceHover: 'rgba(255,255,255,0.02)',
  text: '#ede8f4',
  muted: 'rgba(237,232,244,0.45)',
  dimmed: 'rgba(237,232,244,0.22)',
  border: 'rgba(255,255,255,0.06)',
  green: '#7ee787',
  greenFaint: 'rgba(126,231,135,0.08)',
  greenBorder: 'rgba(126,231,135,0.2)',
};

/* ── Helpers ──────────────────────────────────────────────── */
function isPast(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return d < now;
}

function daysUntil(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

/* ── Date badge (consistent with public site) ────────────── */
function DateBadge({
  dateStr,
  highlight,
}: {
  dateStr: string;
  highlight?: boolean;
}) {
  const d = new Date(dateStr + 'T00:00:00');
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return (
    <div
      style={{
        width: 52,
        minHeight: 56,
        flexShrink: 0,
        textAlign: 'center',
        background: highlight ? P.accentFaint : 'rgba(209,176,249,0.06)',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: highlight
          ? `1px solid ${P.accentBorder}`
          : '1px solid rgba(209,176,249,0.12)',
        padding: '6px 0',
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: highlight ? P.accent : 'rgba(209,176,249,0.6)',
        }}
      >
        {months[d.getMonth()]}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          lineHeight: 1.15,
          color: highlight ? P.accent : P.text,
        }}
      >
        {d.getDate()}
      </div>
    </div>
  );
}

/* ── Inline SVG Icons ────────────────────────────────────── */
function IconExternalLink({ size = 11 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3' />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg
      width={14}
      height={14}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg
      width={14}
      height={14}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2' />
    </svg>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      width={12}
      height={12}
      viewBox='0 0 24 24'
      fill='none'
      stroke={P.muted}
      strokeWidth={2}
      strokeLinecap='round'
      style={{
        transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
        transition: 'transform 200ms cubic-bezier(0.23,1,0.32,1)',
      }}
    >
      <path d='M9 18l6-6-6-6' />
    </svg>
  );
}

/* ── Action Button (hover state) ─────────────────────────── */
function ActionButton({
  children,
  onClick,
  hoverBg = 'rgba(255,255,255,0.06)',
}: {
  children: React.ReactNode;
  onClick: () => void;
  hoverBg?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 32,
        height: 32,
        borderRadius: 6,
        border: 'none',
        background: hovered ? hoverBg : 'transparent',
        color: P.muted,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 150ms ease',
      }}
    >
      {children}
    </button>
  );
}

/* ── 2-Column Edit Form (shadcn components) ──────────────── */
function ConcertForm({
  concert,
  onDone,
  onCancel,
}: {
  concert?: Concert;
  onDone: () => void;
  onCancel: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    concert?.date ? new Date(concert.date + 'T00:00:00') : undefined,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }
    const formData = new FormData(e.currentTarget);
    formData.set('date', format(selectedDate, 'yyyy-MM-dd'));

    startTransition(async () => {
      const result = concert
        ? await updateConcert(concert.id, formData)
        : await createConcert(formData);
      if (result.success) {
        toast.success(concert ? 'Concert updated' : 'Concert added');
        onDone();
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className='p-6'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label className='text-xs uppercase tracking-wider text-muted-foreground font-medium'>
            Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                type='button'
                className={cn(
                  'w-full justify-start text-left font-normal h-10',
                  !selectedDate && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={selectedDate}
                onSelect={setSelectedDate}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className='space-y-2'>
          <Label className='text-xs uppercase tracking-wider text-muted-foreground font-medium'>
            Venue
          </Label>
          <Input
            name='venue'
            defaultValue={concert?.venue ?? ''}
            placeholder='Venue name (City)'
            required
          />
        </div>
        <div className='space-y-2'>
          <Label className='text-xs uppercase tracking-wider text-muted-foreground font-medium'>
            Band / Lineup
          </Label>
          <Input
            name='band'
            defaultValue={concert?.band ?? ''}
            placeholder='Artist names'
            required
          />
        </div>
        <div className='space-y-2'>
          <Label className='text-xs uppercase tracking-wider text-muted-foreground font-medium'>
            Event URL
          </Label>
          <Input
            name='url'
            type='url'
            defaultValue={concert?.url ?? ''}
            placeholder='https://...'
          />
        </div>
      </div>
      <div className='flex gap-2.5 mt-5'>
        <Button type='submit' size='sm' disabled={isPending}>
          {isPending ? 'Saving...' : concert ? 'Save' : 'Add Concert'}
        </Button>
        <Button
          type='button'
          variant='ghost'
          size='sm'
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

/* ── Concert Row ─────────────────────────────────────────── */
function ConcertRow({
  concert,
  isFirst,
  showDivider,
  isEditing,
  onEdit,
  onCancelEdit,
  onEditDone,
}: {
  concert: Concert;
  isFirst: boolean;
  showDivider: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onEditDone: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [isPending, startTransition] = useTransition();
  const days = daysUntil(concert.date);

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteConcert(concert.id);
      if (result.success) toast.success('Concert deleted');
      else toast.error(result.error);
      setConfirmingDelete(false);
    });
  };

  if (isEditing) {
    return (
      <div
        style={{
          borderTop: showDivider ? `1px solid ${P.border}` : 'none',
          background: 'rgba(209,176,249,0.02)',
        }}
      >
        <ConcertForm
          concert={concert}
          onDone={onEditDone}
          onCancel={onCancelEdit}
        />
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '14px 20px',
        borderTop: showDivider ? `1px solid ${P.border}` : 'none',
        background: hovered ? P.surfaceHover : 'transparent',
        transition: 'background 150ms ease',
      }}
    >
      <DateBadge dateStr={concert.date} highlight={isFirst} />

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 8,
            marginBottom: 3,
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontSize: 15.5,
              fontWeight: 500,
              color: P.text,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {concert.venue}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, color: P.muted }}>{concert.band}</span>
          {concert.url && (
            <a
              href={concert.url}
              target='_blank'
              rel='noopener noreferrer'
              style={{
                fontSize: 12,
                color: P.accentDim,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 3,
                transition: 'color 150ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = P.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = P.accentDim)}
            >
              <IconExternalLink size={11} /> Link
            </a>
          )}
        </div>
      </div>

      {/* Green "in X days" badge */}
      {days >= 0 && days <= 14 && (
        <span
          style={{
            fontSize: 12,
            color: P.green,
            fontWeight: 500,
            padding: '3px 10px',
            borderRadius: 6,
            background: P.greenFaint,
            border: `1px solid ${P.greenBorder}`,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `in ${days} days`}
        </span>
      )}

      {/* Actions — visible on hover */}
      <div
        style={{
          display: 'flex',
          gap: 2,
          flexShrink: 0,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 150ms ease',
        }}
      >
        {confirmingDelete ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              onClick={handleDelete}
              disabled={isPending}
              style={{
                padding: '5px 12px',
                borderRadius: 6,
                border: 'none',
                background: 'rgba(244,112,103,0.15)',
                color: '#f47067',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {isPending ? '...' : 'Delete'}
            </button>
            <button
              onClick={() => setConfirmingDelete(false)}
              disabled={isPending}
              style={{
                padding: '5px 10px',
                borderRadius: 6,
                border: 'none',
                background: 'transparent',
                color: P.muted,
                fontSize: 13,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <ActionButton onClick={onEdit}>
              <IconEdit />
            </ActionButton>
            <ActionButton
              onClick={() => setConfirmingDelete(true)}
              hoverBg='rgba(244,112,103,0.15)'
            >
              <IconTrash />
            </ActionButton>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Main Concerts Admin ─────────────────────────────────── */
export function ConcertsAdmin({ concerts }: { concerts: Concert[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showPast, setShowPast] = useState(false);

  const upcoming = useMemo(
    () =>
      concerts
        .filter((c) => !isPast(c.date))
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        ),
    [concerts],
  );

  const past = useMemo(
    () =>
      concerts
        .filter((c) => isPast(c.date))
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        ),
    [concerts],
  );

  const upcomingGroups = useMemo(() => groupByMonth(upcoming), [upcoming]);
  const pastGroups = useMemo(() => groupByMonth(past), [past]);
  const firstUpcomingId = upcoming.length > 0 ? upcoming[0].id : null;

  return (
    <div>
      {/* Section header + Add button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: P.green,
              boxShadow: `0 0 8px ${P.green}44`,
            }}
          />
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Upcoming</h2>
          <span style={{ fontSize: 13, color: P.dimmed }}>
            {upcoming.length} {upcoming.length === 1 ? 'concert' : 'concerts'}
          </span>
        </div>
        {!isAdding && (
          <Button
            size='sm'
            variant='outline'
            onClick={() => {
              setIsAdding(true);
              setEditingId(null);
            }}
            className='border-[rgba(209,176,249,0.18)] bg-[rgba(209,176,249,0.08)] text-lavender hover:bg-[rgba(209,176,249,0.14)] font-semibold'
          >
            <svg
              width={14}
              height={14}
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
              strokeLinecap='round'
              className='mr-1.5'
            >
              <path d='M12 5v14M5 12h14' />
            </svg>
            Add Concert
          </Button>
        )}
      </div>

      {/* Add form */}
      {isAdding && (
        <div
          style={{
            background: P.surface,
            borderRadius: 12,
            border: `1px solid ${P.accentBorder}`,
            overflow: 'hidden',
            marginBottom: 24,
          }}
        >
          <ConcertForm
            onDone={() => setIsAdding(false)}
            onCancel={() => setIsAdding(false)}
          />
        </div>
      )}

      {/* Upcoming grouped by month */}
      {upcomingGroups.map((group) => (
        <div key={group.key} style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: 12,
              color: P.muted,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 8,
              paddingLeft: 4,
            }}
          >
            {group.label}
          </div>
          <div
            style={{
              background: P.surface,
              borderRadius: 12,
              border: `1px solid ${P.border}`,
              overflow: 'hidden',
            }}
          >
            {group.concerts.map((c, ci) => (
              <ConcertRow
                key={c.id}
                concert={c}
                isFirst={c.id === firstUpcomingId}
                showDivider={ci > 0}
                isEditing={editingId === c.id}
                onEdit={() => {
                  setEditingId(c.id);
                  setIsAdding(false);
                }}
                onCancelEdit={() => setEditingId(null)}
                onEditDone={() => setEditingId(null)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Empty state */}
      {upcoming.length === 0 && !isAdding && (
        <div
          style={{
            padding: '56px 24px',
            textAlign: 'center',
            border: `1px dashed ${P.border}`,
            borderRadius: 12,
            marginBottom: 32,
          }}
        >
          <p style={{ fontSize: 15, color: P.dimmed, margin: 0 }}>
            No upcoming concerts. Add one above.
          </p>
        </div>
      )}

      {/* Past concerts (collapsible) */}
      {past.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <button
            onClick={() => setShowPast(!showPast)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '10px 4px',
              fontFamily: 'inherit',
              marginBottom: showPast ? 16 : 0,
            }}
          >
            <IconChevron open={showPast} />
            <span style={{ fontSize: 14, color: P.muted, fontWeight: 500 }}>
              Past Concerts
            </span>
            <span style={{ fontSize: 13, color: P.dimmed }}>{past.length}</span>
          </button>
          {showPast && (
            <div style={{ opacity: 0.5 }}>
              {pastGroups.map((group) => (
                <div key={group.key} style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      fontSize: 12,
                      color: P.muted,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: 8,
                      paddingLeft: 4,
                    }}
                  >
                    {group.label}
                  </div>
                  <div
                    style={{
                      background: P.surface,
                      borderRadius: 12,
                      border: `1px solid ${P.border}`,
                      overflow: 'hidden',
                    }}
                  >
                    {group.concerts.map((c, ci) => (
                      <ConcertRow
                        key={c.id}
                        concert={c}
                        isFirst={false}
                        showDivider={ci > 0}
                        isEditing={editingId === c.id}
                        onEdit={() => {
                          setEditingId(c.id);
                          setIsAdding(false);
                        }}
                        onCancelEdit={() => setEditingId(null)}
                        onEditDone={() => setEditingId(null)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
