'use server';

import { createClient } from '@/lib/supabase/server';

export type SubscribeState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(
  _prevState: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase();

  if (!EMAIL_PATTERN.test(email)) {
    return {
      status: 'error',
      message: 'Please enter a valid email address.',
    };
  }

  const supabase = createClient();
  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email, source: 'website' });

  // 23505 = unique violation: already subscribed, which is a success
  // from the visitor's point of view.
  if (error && error.code !== '23505') {
    return {
      status: 'error',
      message: 'Something went wrong. Please try again.',
    };
  }

  return {
    status: 'success',
    message: 'Thank you! You’ll hear from Ana soon.',
  };
}
