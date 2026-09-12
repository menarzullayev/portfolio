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

  // Faqat mazmuni bor bo'limlar menyuda ko'rinadi
  const sectionAvailability: Record<string, boolean> = {
    about: true,
    skills: content.skills.length > 0,
    experience: content.experience.length > 0,
    projects: content.projects.length > 0,
    services: content.services.length > 0,
    blog: content.posts.length > 0,
    pricing: content.pricing.length > 0,
    faq: content.faq.length > 0,
    now: content.now.length > 0,
    uses: content.uses.length > 0,
    guestbook: true,
    changelog: content.changelog.length > 0,
  };
  const enabledSections = Object.entries(sectionAvailability)
    .filter(([, ok]) => ok)
    .map(([id]) => id);

  return (
    <>
      <LangSetter locale={locale} />
      <PageBackground />
      <CursorGlow />
      <Navbar
        locale={locale}
        name={content.settings.name}
        initials={content.settings.initials}
        enabled={enabledSections}
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
