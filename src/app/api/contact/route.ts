import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string; // spam tuzoq
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  // Spam tuzog'i to'ldirilgan bo'lsa — jimgina muvaffaqiyat qaytaramiz
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const name = payload.name?.trim() ?? '';
  const email = payload.email?.trim() ?? '';
  const message = payload.message?.trim() ?? '';

  if (!name || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'validation_failed' }, { status: 422 });
  }

  const record = {
    name,
    email,
    subject: payload.subject ?? '—',
    message,
    created_at: new Date().toISOString(),
    read: false,
  };

  // 1) Bazaga saqlash (sozlangan bo'lsa)
  const admin = getAdminClient();
  if (admin) {
    try {
      await admin.from('messages').insert(record);
    } catch {
      // Baza xatosi xabar yuborishni to'xtatmasin
    }
  }

  // 2) Email orqali xabar berish (RESEND_API_KEY bo'lsa)
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;
  if (resendKey && toEmail) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'onboarding@resend.dev',
          to: [toEmail],
          reply_to: email,
          subject: `Yangi xabar: ${record.subject}`,
          text: `Ism: ${name}\nEmail: ${email}\nMavzu: ${record.subject}\n\n${message}`,
        }),
      });
    } catch {
      // Email yuborilmasa ham xabar bazada saqlangan
    }
  }

  // Baza ham, email ham sozlanmagan bo'lsa — serverda qayd etamiz
  if (!admin && !resendKey) {
    console.info('[contact] yangi xabar:', record);
  }

  return NextResponse.json({ ok: true });
}
