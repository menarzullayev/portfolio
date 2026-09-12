import { notFound } from 'next/navigation';
import { LOCALES, isLocale } from '@/lib/i18n';
import { getSiteContent } from '@/lib/data';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageBackground } from '@/components/ui/Chrome';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { BackToTop, CookieBanner, EasterEgg, FloatingContact } from '@/components/ui/Widgets';
import { LangSetter } from '@/components/ui/LangSetter';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = await getSiteContent();
  const telegram = content.socials.find((s) => s.icon === 'telegram')?.url;

  return (
    <>
      <LangSetter locale={locale} />
      <PageBackground />
      <CursorGlow />
      <Navbar
        locale={locale}
        name={content.settings.name}
        initials={content.settings.initials}
      />
      <main id="main" className="relative">
        {children}
      </main>
      <Footer content={content} locale={locale} />
      <FloatingContact telegram={telegram} />
      <BackToTop label={locale === 'uz' ? 'Yuqoriga' : 'Back to top'} />
      <CookieBanner />
      <EasterEgg />
    </>
  );
}
