import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, tr } from '@/lib/i18n';
import { getSiteContent } from '@/lib/data';
import { PageHeader } from '@/components/layout/PageHeader';
import { TermsAndSlots } from '@/components/sections/Services';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : 'uz';
  return { title: tr('footer.terms', lang), alternates: { canonical: `/${lang}/terms` } };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = await getSiteContent();

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={tr('footer.terms', locale)}
        subtitle={
          locale === 'uz'
            ? 'Hamkorlik qoidalari: to‘lov, muddat, huquqlar va kafolatlar.'
            : 'Rules of cooperation: payment, deadlines, rights and guarantees.'
        }
      />
      <TermsAndSlots content={content} locale={locale} />
      <section className="pb-16">
        <div className="container-x max-w-3xl space-y-6 text-[0.95rem] leading-[1.8] text-[var(--text-muted)]">
          <p>
            {locale === 'uz'
              ? "Har bir loyiha yozma texnik topshiriq asosida boshlanadi. Topshiriqda ish hajmi, muddati va natijasi aniq ko'rsatiladi."
              : 'Every project starts from a written technical specification. Scope, deadline and deliverables are stated explicitly.'}
          </p>
          <p>
            {locale === 'uz'
              ? "Topshiriqdan tashqari qo'shimcha ishlar alohida kelishiladi va narxga qo'shiladi. Bu ikkala tomon uchun ham tushunarli bo'lishi uchun shunday."
              : 'Work outside the specification is agreed separately and added to the price. This keeps things clear for both sides.'}
          </p>
          <p>
            {locale === 'uz'
              ? "Manba kodi to'liq to'lovdan keyin sizning repongizga o'tkaziladi. Uchinchi shaxslarga ko'rsatilmaydi."
              : 'Source code is transferred to your repository after full payment. It is never shared with third parties.'}
          </p>
        </div>
      </section>
    </>
  );
}
