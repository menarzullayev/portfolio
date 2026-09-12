import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';

/**
 * Admin sessiyasi: parol + imzolangan cookie.
 * Tashqi kutubxona kerak emas — Node crypto yetarli.
 */

const COOKIE_NAME = 'portfolio_admin';
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 soat

function secret(): string {
  return process.env.ADMIN_SECRET || 'change-me-in-production-please';
}

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'admin123';
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

/** Vaqtga chidamli parol solishtirish */
export function verifyPassword(input: string): boolean {
  const expected = Buffer.from(adminPassword());
  const actual = Buffer.from(input ?? '');
  if (expected.length !== actual.length) return false;
  return timingSafeEqual(expected, actual);
}

export function createSessionToken(): string {
  const payload = JSON.stringify({ exp: Date.now() + SESSION_TTL_MS, n: randomBytes(8).toString('hex') });
  const encoded = Buffer.from(payload).toString('base64url');
  return `${encoded}.${sign(encoded)}`;
}

export function isValidToken(token: string | undefined): boolean {
  if (!token) return false;
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return false;
  const expected = sign(encoded);
  if (expected.length !== signature.length) return false;
  if (!timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return false;
  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString()) as { exp: number };
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return isValidToken(store.get(COOKIE_NAME)?.value);
}

export const sessionCookie = {
  name: COOKIE_NAME,
  maxAge: SESSION_TTL_MS / 1000,
};
