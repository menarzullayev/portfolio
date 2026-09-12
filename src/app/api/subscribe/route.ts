import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';

/**
 * Blog obunasi.
 * Supabase ulangan bo'lsa `subscribers` jadvaliga yoziladi.
 * Aks holda email serverda qayd etiladi va foydalanuvchiga muvaffaqiyat qaytariladi.
 */
export async function POST(request: Request) {
  let payload: { email?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const email = (payload.email ?? '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 422 });
  }

  const admin = getAdminClient();
  if (admin) {
    const { error } = await admin.from('subscribers').insert({ email });
    // 23505 = unique cheklovi buzildi, ya'ni allaqachon obuna bo'lgan
    if (error && !error.message.includes('duplicate')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error) {
      return NextResponse.json({ ok: true, already: true });
    }
  } else {
    console.info('[subscribe] yangi obunachi:', email);
  }

  return NextResponse.json({ ok: true });
}
