import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, tr } from '@/lib/i18n';
import { getSiteContent } from '@/lib/data';
import { PageHeader } from '@/components/layout/PageHeader';
import { Guestbook } from '@/components/sections/Extras';

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
  return { title: tr('section.guestbook', lang), alternates: { canonical: `/${lang}/guestbook` } };
}

export default async function GuestbookPage({
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
        eyebrow="Guestbook"
        title={tr('section.guestbook', locale)}
        subtitle={
          locale === 'uz'
            ? "Bir og'iz so'z qoldiring — kim o'qiganini bilish har doim yoqimli."
            : 'Leave a few words — it is always nice to know who stopped by.'
        }
      />
      <Guestbook initial={content.guestbook} locale={locale} heading={false} />
    </>
  );
}
