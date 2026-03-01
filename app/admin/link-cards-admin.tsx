'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import type { LinkCard } from '@/lib/types';
import { createLinkCard, updateLinkCard, deleteLinkCard } from './actions';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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
};

/* ── Icons ───────────────────────────────────────────────── */
function IconPlus() {
  return (
    <svg width={14} height={14} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round'>
      <path d='M12 5v14M5 12h14' />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg width={14} height={14} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'>
      <path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg width={14} height={14} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'>
      <path d='M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2' />
    </svg>
  );
}

function IconExternalLink({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'>
      <path d='M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3' />
    </svg>
  );
}

/* ── Action Button ───────────────────────────────────────── */
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
        width: 32, height: 32, borderRadius: 6, border: 'none',
        background: hovered ? hoverBg : 'transparent',
        color: P.muted, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 150ms ease',
      }}
    >
      {children}
    </button>
  );
}

/* ── Link Card Form (with shadcn Input / Button / Label) ── */
function LinkCardForm({
  linkCard,
  onDone,
  onCancel,
}: {
  linkCard?: LinkCard;
  onDone: () => void;
  onCancel: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = linkCard
        ? await updateLinkCard(linkCard.id, formData)
        : await createLinkCard(formData);

      if (result.success) {
        toast.success(linkCard ? 'Link card updated' : 'Link card added');
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
            Title
          </Label>
          <Input
            type='text'
            name='title'
            defaultValue={linkCard?.title ?? ''}
            placeholder='Link card title'
            required
            className='h-10'
          />
        </div>
        <div className='space-y-2'>
          <Label className='text-xs uppercase tracking-wider text-muted-foreground font-medium'>
            URL
          </Label>
          <Input
            type='url'
            name='url'
            defaultValue={linkCard?.url ?? ''}
            placeholder='https://...'
            required
            className='h-10'
          />
        </div>
        <div className='space-y-2'>
          <Label className='text-xs uppercase tracking-wider text-muted-foreground font-medium'>
            Display Order
          </Label>
          <Input
            type='number'
            name='display_order'
            defaultValue={linkCard?.display_order ?? 0}
            className='h-10'
          />
        </div>
      </div>
      <div className='flex gap-2.5 mt-5'>
        <Button type='submit' size='sm' disabled={isPending}>
          {isPending ? 'Saving...' : linkCard ? 'Save' : 'Add Link Card'}
        </Button>
        <Button type='button' variant='ghost' size='sm' onClick={onCancel} disabled={isPending}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

/* ── Link Card Row ───────────────────────────────────────── */
function LinkCardRow({
  card,
  showDivider,
  isEditing,
  onEdit,
  onCancelEdit,
  onEditDone,
}: {
  card: LinkCard;
  showDivider: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onEditDone: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteLinkCard(card.id);
      if (result.success) {
        toast.success('Link card deleted');
      } else {
        toast.error(result.error);
      }
      setConfirmingDelete(false);
    });
  };

  if (isEditing) {
    return (
      <div style={{
        borderTop: showDivider ? `1px solid ${P.border}` : 'none',
        background: 'rgba(209,176,249,0.02)',
      }}>
        <LinkCardForm linkCard={card} onDone={onEditDone} onCancel={onCancelEdit} />
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '14px 20px',
        borderTop: showDivider ? `1px solid ${P.border}` : 'none',
        background: hovered ? P.surfaceHover : 'transparent',
        transition: 'background 150ms ease',
      }}
    >
      {/* Order badge */}
      <div style={{
        width: 36, height: 36, flexShrink: 0, textAlign: 'center',
        background: P.accentFaint, borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${P.accentBorder}`,
      }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: P.accent }}>
          #{card.display_order}
        </span>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: 15.5, fontWeight: 500, color: P.text }}>
          {card.title}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
          <a
            href={card.url}
            target='_blank'
            rel='noopener noreferrer'
            style={{
              fontSize: 13, color: P.accentDim, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 3,
              transition: 'color 200ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = P.accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = P.accentDim)}
          >
            <IconExternalLink size={10} />
            {card.url.replace(/^https?:\/\//, '').split('/')[0]}
          </a>
        </div>
      </div>

      {/* Actions — visible on hover */}
      <div style={{
        display: 'flex', gap: 2, flexShrink: 0,
        opacity: hovered ? 1 : 0, transition: 'opacity 150ms ease',
      }}>
        {confirmingDelete ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Button
              variant='destructive'
              size='sm'
              onClick={handleDelete}
              disabled={isPending}
              className='h-7 text-xs px-3'
            >
              {isPending ? '...' : 'Delete'}
            </Button>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setConfirmingDelete(false)}
              disabled={isPending}
              className='h-7 text-xs px-2.5'
            >
              Cancel
            </Button>
          </div>
        ) : (
          <>
            <ActionButton onClick={onEdit}><IconEdit /></ActionButton>
            <ActionButton onClick={() => setConfirmingDelete(true)} hoverBg='rgba(244,112,103,0.15)'>
              <IconTrash />
            </ActionButton>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Main Link Cards Admin ───────────────────────────────── */
export function LinkCardsAdmin({ linkCards }: { linkCards: LinkCard[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div>
      {/* Header + Add button */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
            Link Cards
          </h2>
          <span style={{ fontSize: 13, color: P.dimmed }}>
            {linkCards.length} {linkCards.length === 1 ? 'card' : 'cards'}
          </span>
        </div>
        {!isAdding && (
          <Button
            variant='outline'
            size='sm'
            onClick={() => { setIsAdding(true); setEditingId(null); }}
            className='border-[rgba(209,176,249,0.18)] bg-[rgba(209,176,249,0.08)] text-lavender hover:bg-[rgba(209,176,249,0.14)] hover:text-lavender'
          >
            <IconPlus /> Add Link Card
          </Button>
        )}
      </div>

      {/* Add form */}
      {isAdding && (
        <div style={{
          background: P.surface, borderRadius: 12,
          border: `1px solid ${P.accentBorder}`, overflow: 'hidden',
          marginBottom: 24,
        }}>
          <LinkCardForm
            onDone={() => setIsAdding(false)}
            onCancel={() => setIsAdding(false)}
          />
        </div>
      )}

      {/* Empty state */}
      {linkCards.length === 0 && !isAdding && (
        <div style={{
          padding: '56px 24px', textAlign: 'center',
          border: `1px dashed ${P.border}`, borderRadius: 12,
        }}>
          <p style={{ fontSize: 15, color: P.dimmed, margin: 0 }}>
            No link cards yet. Add one above.
          </p>
        </div>
      )}

      {/* Link card rows */}
      {linkCards.length > 0 && (
        <div style={{
          background: P.surface, borderRadius: 12,
          border: `1px solid ${P.border}`, overflow: 'hidden',
        }}>
          {linkCards.map((card, i) => (
            <LinkCardRow
              key={card.id}
              card={card}
              showDivider={i > 0}
              isEditing={editingId === card.id}
              onEdit={() => { setEditingId(card.id); setIsAdding(false); }}
              onCancelEdit={() => setEditingId(null)}
              onEditDone={() => setEditingId(null)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
