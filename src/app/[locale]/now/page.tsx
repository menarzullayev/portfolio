import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, tr } from '@/lib/i18n';
import { getSiteContent } from '@/lib/data';
import { PageHeader } from '@/components/layout/PageHeader';
import { NowSection } from '@/components/sections/About';

// Kontent admin panelda boshqariladi — har sorovda yangi malumot olinadi.
// Statik keshlash admin ozgarishlarini korinmas qilib qoyadi.
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : 'uz';
  return { title: tr('section.now', lang), alternates: { canonical: `/${lang}/now` } };
}

export default async function NowPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = await getSiteContent();

  return (
    <>
      <PageHeader
        eyebrow="Now"
        title={tr('section.now', locale)}
        subtitle={
          locale === 'uz'
            ? "Bu sahifa har oy yangilanadi — nima ustida ishlayotganimni ochiq ko'rsatadi."
            : 'Updated monthly — an open view of what I am working on.'
        }
      />
      <NowSection content={content} locale={locale} heading={false} />
    </>
  );
}
