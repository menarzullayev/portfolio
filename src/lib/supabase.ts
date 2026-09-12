import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase klientlari.
 * Muhit o'zgaruvchilari bo'lmasa — null qaytadi va sayt namunali kontent bilan ishlaydi.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

/** Ommaviy o'qish uchun klient (RLS: faqat chop etilgan kontent) */
export function getPublicClient(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}

/** Admin amallari uchun klient (RLS ni chetlab o'tadi) */
export function getAdminClient(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

/** Rasm saqlash uchun bucket nomi */
export const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'media';

/**
 * Bazada kerakli jadvallar mavjudligini tekshiradi.
 * Yo'q bo'lsa — sayt namunali kontent bilan ishlashda davom etadi.
 */
export async function isDatabaseReady(): Promise<boolean> {
  const client = getPublicClient();
  if (!client) return false;
  try {
    const { error } = await client.from('site_settings').select('id').limit(1);
    return !error;
  } catch {
    return false;
  }
}
