import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, tr } from '@/lib/i18n';
import { getSiteContent } from '@/lib/data';
import { PageHeader } from '@/components/layout/PageHeader';
import { Uses } from '@/components/sections/Extras';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : 'uz';
  return { title: tr('section.uses', lang), alternates: { canonical: `/${lang}/uses` } };
}

export default async function UsesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = await getSiteContent();

  return (
    <>
      <PageHeader
        eyebrow="Uses"
        title={tr('section.uses', locale)}
        subtitle={
          locale === 'uz'
            ? "Mening ish stolim: jihozlar, dasturlar va kundalik vositalar."
            : 'My desk: gear, software and daily tools.'
        }
      />
      <Uses content={content} locale={locale} heading={false} />
    </>
  );
}
