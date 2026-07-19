'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { usePostHog } from 'posthog-js/react';
import { subscribe, SubscribeState } from '@/app/actions/newsletter';

const initialState: SubscribeState = { status: 'idle', message: '' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
      className='rounded-xl px-7 font-semibold transition-all hover:opacity-85 disabled:opacity-50'
      style={{
        background: '#D1B0F9',
        color: '#0c0a10',
        fontSize: 15,
        paddingTop: 14,
        paddingBottom: 14,
      }}
    >
      {pending ? 'Subscribing…' : 'Subscribe'}
    </button>
  );
}

export default function NewsletterForm() {
  const [state, formAction] = useFormState(subscribe, initialState);
  const posthog = usePostHog();
  const tracked = useRef(false);

  useEffect(() => {
    if (state.status === 'success' && !tracked.current) {
      tracked.current = true;
      posthog?.capture('newsletter_subscribed');
    }
  }, [state.status, posthog]);

  if (state.status === 'success') {
    return (
      <p
        className='text-center font-heading'
        style={{ fontSize: 20, color: '#D1B0F9' }}
      >
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className='flex w-full flex-col gap-3'>
      <div className='flex w-full flex-col gap-3 sm:flex-row'>
        <input
          type='email'
          name='email'
          required
          placeholder='Your email address'
          autoComplete='email'
          className='w-full flex-1 rounded-xl outline-none transition-all placeholder:text-[rgba(237,232,244,0.3)]'
          style={{
            background: 'rgba(209,176,249,0.05)',
            border: '1px solid rgba(209,176,249,0.15)',
            color: '#ede8f4',
            fontSize: 15,
            padding: '14px 18px',
          }}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = 'rgba(209,176,249,0.45)')
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = 'rgba(209,176,249,0.15)')
          }
        />
        <SubmitButton />
      </div>
      {state.status === 'error' && (
        <p className='text-center text-sm' style={{ color: '#f8867e' }}>
          {state.message}
        </p>
      )}
      <p
        className='text-center'
        style={{ fontSize: 12, lineHeight: 1.5, color: 'rgba(237,232,244,0.35)' }}
      >
        We’ll only use your email for Ana’s newsletter, and you can unsubscribe
        anytime. See our{' '}
        <Link
          href='/datenschutz'
          className='underline underline-offset-2 hover:text-lavender'
          style={{ transition: 'color 200ms ease' }}
        >
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
