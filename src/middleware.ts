import { NextResponse, type NextRequest } from 'next/server';
import { LOCALES, DEFAULT_LOCALE } from '@/lib/i18n';

const PUBLIC_FILE = /\.(.*)$/;

/**
 * Til yo'naltirish:
 * 1) / → /uz (yoki brauzer tiliga qarab /en)
 * 2) /blog → /uz/blog
 * Admin panel, API va statik fayllarga tegmaydi.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Statik fayllar, API va admin panel chetlab o'tiladi
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname === '/favicon.svg' ||
    pathname === '/robots.txt' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  // Brauzer tilini aniqlash
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const preferred = LOCALES.find((locale) => acceptLanguage.toLowerCase().includes(locale));
  const locale = preferred ?? DEFAULT_LOCALE;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
