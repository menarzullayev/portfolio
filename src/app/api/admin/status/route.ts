import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getAdminClient, isSupabaseConfigured, STORAGE_BUCKET } from '@/lib/supabase';

/**
 * Sozlash holati — admin panelga qaysi xizmatlar ulanganini ko'rsatadi.
 * Maxfiy qiymatlar qaytarilmaydi, faqat "bor/yo'q" holati.
 */
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const checks = [];

  /* ── Supabase ───────────────────────────────────────────────── */
  const supabaseUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const supabaseAnon = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const supabaseService = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  let dbReady = false;
  let tables: string[] = [];
  let dbError = '';

  if (isSupabaseConfigured && supabaseService) {
    const admin = getAdminClient();
    if (admin) {
      const { data, error } = await admin
        .from('site_settings')
        .select('id')
        .limit(1);

      if (error) {
        dbError = error.message;
      } else {
        dbReady = true;
      }

      // Jadvallar ro'yxatini olishga urinamiz
      const { data: tableData } = await admin
        .from('projects')
        .select('slug')
        .limit(1);
      if (tableData) tables.push('projects');
    }
  }

  checks.push({
    id: 'supabase',
    label: 'Supabase (ma’lumotlar bazasi)',
    status: dbReady ? 'ok' : supabaseUrl && supabaseAnon && supabaseService ? 'error' : 'missing',
    detail: dbReady
      ? 'Ulangan — kontent bazadan o‘qiladi'
      : supabaseUrl
        ? dbError || 'Kalitlar to‘liq emas yoki jadvallar yaratilmagan'
        : 'Sozlanmagan — sayt namunali kontentdan o‘qiydi',
    action: dbReady
      ? ''
      : 'Supabase → Settings → API bo‘limidan URL, anon va service_role kalitlarini .env.local ga yozing, so‘ng supabase/schema.sql ni SQL Editor’da ishga tushiring',
    vars: [
      { name: 'NEXT_PUBLIC_SUPABASE_URL', set: supabaseUrl },
      { name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', set: supabaseAnon },
      { name: 'SUPABASE_SERVICE_ROLE_KEY', set: supabaseService },
    ],
  });

  /* ── Rasm saqlash ───────────────────────────────────────────── */
  if (dbReady) {
    const admin = getAdminClient();
    const { data: buckets } = await admin!.storage.listBuckets();
    const hasMedia = buckets?.some((b) => b.name === STORAGE_BUCKET) ?? false;
    checks.push({
      id: 'storage',
      label: 'Rasm saqlash',
      status: hasMedia ? 'ok' : 'error',
      detail: hasMedia
        ? `"${STORAGE_BUCKET}" bo‘limi tayyor`
        : `"${STORAGE_BUCKET}" nomli bo‘lim topilmadi`,
      action: hasMedia
        ? ''
        : `Supabase → Storage → New bucket → nomi "${STORAGE_BUCKET}", Public yoqilgan bo‘lsin`,
      vars: [],
    });
  }

  /* ── GitHub ─────────────────────────────────────────────────── */
  const githubUser = process.env.GITHUB_USERNAME;
  checks.push({
    id: 'github',
    label: 'GitHub integratsiyasi',
    status: githubUser ? 'ok' : 'missing',
    detail: githubUser
      ? `@${githubUser} — repolar avtomatik tortiladi`
      : 'Sozlanmagan — GitHub bo‘limi statik ko‘rinishda',
    action: githubUser ? '' : '.env.local ga GITHUB_USERNAME yozing',
    vars: [{ name: 'GITHUB_USERNAME', set: Boolean(githubUser) }],
  });

  /* ── Email bildirishnoma ────────────────────────────────────── */
  const resendKey = Boolean(process.env.RESEND_API_KEY);
  const contactEmail = Boolean(process.env.CONTACT_EMAIL);
  checks.push({
    id: 'email',
    label: 'Email bildirishnoma',
    status: resendKey && contactEmail ? 'ok' : 'missing',
    detail:
      resendKey && contactEmail
        ? 'Aloqa formasi xabarlari emailga ham keladi'
        : 'Sozlanmagan — xabarlar faqat bazaga saqlanadi',
    action:
      resendKey && contactEmail
        ? ''
        : 'resend.com dan kalit olib, RESEND_API_KEY va CONTACT_EMAIL ni .env.local ga yozing',
    vars: [
      { name: 'RESEND_API_KEY', set: resendKey },
      { name: 'CONTACT_EMAIL', set: contactEmail },
    ],
  });

  /* ── Analitika ──────────────────────────────────────────────── */
  const analyticsId = Boolean(process.env.NEXT_PUBLIC_ANALYTICS_ID);
  checks.push({
    id: 'analytics',
    label: 'Analitika',
    status: analyticsId ? 'ok' : 'missing',
    detail: analyticsId
      ? 'Tashrif statistikasi yig‘iladi'
      : 'Sozlanmagan — statistika yig‘ilmaydi',
    action: analyticsId
      ? ''
      : 'cloud.umami.is yoki plausible.io dan ID olib, NEXT_PUBLIC_ANALYTICS_ID ga yozing',
    vars: [{ name: 'NEXT_PUBLIC_ANALYTICS_ID', set: analyticsId }],
  });

  /* ── Admin paroli ───────────────────────────────────────────── */
  const usingDefaultPassword = (process.env.ADMIN_PASSWORD || 'admin123') === 'admin123';
  const usingDefaultSecret = !process.env.ADMIN_SECRET;
  checks.push({
    id: 'security',
    label: 'Admin xavfsizligi',
    status: usingDefaultPassword || usingDefaultSecret ? 'warning' : 'ok',
    detail: usingDefaultPassword
      ? 'Diqqat: parol hali standart holatda (admin123)'
      : usingDefaultSecret
        ? 'Diqqat: ADMIN_SECRET o‘rnatilmagan'
        : 'Parol va maxfiy kalit o‘zgartirilgan',
    action:
      usingDefaultPassword || usingDefaultSecret
        ? 'ADMIN_PASSWORD ni kuchli parolga o‘zgartiring va ADMIN_SECRET uchun tasodifiy qiymat qo‘ying'
        : '',
    vars: [
      { name: 'ADMIN_PASSWORD', set: !usingDefaultPassword },
      { name: 'ADMIN_SECRET', set: !usingDefaultSecret },
    ],
  });

  /* ── Sayt manzili ───────────────────────────────────────────── */
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const isLocalhost = siteUrl.includes('localhost');
  checks.push({
    id: 'siteurl',
    label: 'Sayt manzili',
    status: isLocalhost ? 'warning' : 'ok',
    detail: siteUrl || 'Belgilanmagan',
    action: isLocalhost
      ? 'Vercel’ga joylaganda NEXT_PUBLIC_SITE_URL ni haqiqiy domenga o‘zgartiring'
      : '',
    vars: [{ name: 'NEXT_PUBLIC_SITE_URL', set: Boolean(siteUrl) }],
  });

  const summary = {
    ok: checks.filter((c) => c.status === 'ok').length,
    warning: checks.filter((c) => c.status === 'warning').length,
    error: checks.filter((c) => c.status === 'error').length,
    missing: checks.filter((c) => c.status === 'missing').length,
    total: checks.length,
  };

  return NextResponse.json({ checks, summary, tables });
}

export const dynamic = 'force-dynamic';
