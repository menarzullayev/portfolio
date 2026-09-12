import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';

export async function POST(request: Request) {
  let payload: { name?: string; message?: string; city?: string; date?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const name = (payload.name ?? '').trim().slice(0, 60);
  const message = (payload.message ?? '').trim().slice(0, 500);

  if (!name || message.length < 3) {
    return NextResponse.json({ error: 'validation_failed' }, { status: 422 });
  }

  const record = {
    name,
    message,
    city: (payload.city ?? '').trim().slice(0, 60) || null,
    date: payload.date ?? new Date().toISOString().slice(0, 10),
  };

  const admin = getAdminClient();
  if (admin) {
    try {
      await admin.from('guestbook').insert(record);
    } catch {
      // Baza bo'lmasa ham izoh sahifada ko'rinadi
    }
  }

  return NextResponse.json({ ok: true, entry: record });
}
