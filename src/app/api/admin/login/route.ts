import { NextResponse } from 'next/server';
import { createSessionToken, sessionCookie, verifyPassword } from '@/lib/auth';

export async function POST(request: Request) {
  let payload: { password?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  if (!verifyPassword(payload.password ?? '')) {
    // Kichik kechikish — qo'pol kuch hujumini sekinlashtiradi
    await new Promise((resolve) => setTimeout(resolve, 600));
    return NextResponse.json({ error: 'wrong_password' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(sessionCookie.name, createSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: sessionCookie.maxAge,
  });
  return response;
}
