import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, tr } from '@/lib/i18n';
import { getSiteContent } from '@/lib/data';
import { PageHeader } from '@/components/layout/PageHeader';
import { Changelog } from '@/components/sections/Extras';

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
  return { title: tr('section.changelog', lang), alternates: { canonical: `/${lang}/changelog` } };
}

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = await getSiteContent();

  return (
    <>
      <PageHeader
        eyebrow="Changelog"
        title={tr('section.changelog', locale)}
        subtitle={
          locale === 'uz'
            ? "Har bir yangilanish — sana, versiya va nima o'zgargani bilan."
            : 'Every update — with date, version and what changed.'
        }
      />
      <Changelog content={content} locale={locale} heading={false} />
    </>
  );
}
