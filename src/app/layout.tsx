import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ScrollProgress } from '@/components/ui/Chrome';
import { Analytics } from '@/components/ui/Analytics';
import { seedContent } from '@/content/seed';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${seedContent.settings.name} — ${seedContent.settings.role.uz}`,
    template: `%s · ${seedContent.settings.name}`,
  },
  description: seedContent.settings.shortBio.uz,
  keywords: [
    'dasturchi',
    'full-stack',
    'Next.js',
    'React',
    'TypeScript',
    'Toshkent',
    'portfolio',
    'developer',
    'Uzbekistan',
  ],
  authors: [{ name: seedContent.settings.name, url: siteUrl }],
  creator: seedContent.settings.name,
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    alternateLocale: 'en_US',
    url: siteUrl,
    siteName: seedContent.settings.name,
    title: `${seedContent.settings.name} — ${seedContent.settings.role.uz}`,
    description: seedContent.settings.shortBio.uz,
    images: [{ url: '/images/og.svg', width: 1200, height: 630, alt: seedContent.settings.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: seedContent.settings.name,
    description: seedContent.settings.shortBio.uz,
    images: ['/images/og.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: '/',
    languages: {
      uz: '/uz',
      en: '/en',
      'x-default': '/uz',
    },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#07080a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--accent-ink)]"
        >
          Asosiy mazmunga o‘tish
        </a>
        <ThemeProvider>
          <ScrollProgress />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
