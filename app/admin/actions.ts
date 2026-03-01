'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

type ActionResult = { success: true } | { success: false; error: string };

// ---- CONCERTS ----

export async function createConcert(formData: FormData): Promise<ActionResult> {
  const supabase = createClient();
  const { error } = await supabase.from('concerts').insert({
    date: formData.get('date') as string,
    venue: formData.get('venue') as string,
    band: formData.get('band') as string,
    url: (formData.get('url') as string) || '',
  });

  if (error) return { success: false, error: error.message };
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}

export async function updateConcert(id: string, formData: FormData): Promise<ActionResult> {
  const supabase = createClient();
  const { error } = await supabase
    .from('concerts')
    .update({
      date: formData.get('date') as string,
      venue: formData.get('venue') as string,
      band: formData.get('band') as string,
      url: (formData.get('url') as string) || '',
    })
    .eq('id', id);

  if (error) return { success: false, error: error.message };
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}

export async function deleteConcert(id: string): Promise<ActionResult> {
  const supabase = createClient();
  const { error } = await supabase.from('concerts').delete().eq('id', id);

  if (error) return { success: false, error: error.message };
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}

// ---- LINK CARDS ----

export async function createLinkCard(formData: FormData): Promise<ActionResult> {
  const supabase = createClient();
  const { error } = await supabase.from('link_cards').insert({
    title: formData.get('title') as string,
    url: formData.get('url') as string,
    display_order: Number(formData.get('display_order') ?? 0),
  });

  if (error) return { success: false, error: error.message };
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}

export async function updateLinkCard(id: string, formData: FormData): Promise<ActionResult> {
  const supabase = createClient();
  const { error } = await supabase
    .from('link_cards')
    .update({
      title: formData.get('title') as string,
      url: formData.get('url') as string,
      display_order: Number(formData.get('display_order') ?? 0),
    })
    .eq('id', id);

  if (error) return { success: false, error: error.message };
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}

export async function deleteLinkCard(id: string): Promise<ActionResult> {
  const supabase = createClient();
  const { error } = await supabase.from('link_cards').delete().eq('id', id);

  if (error) return { success: false, error: error.message };
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}
