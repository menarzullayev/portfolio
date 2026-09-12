import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, t, type Locale } from '@/lib/i18n';
import { getSiteContent } from '@/lib/data';
import { getGitHubStats } from '@/lib/github';

import { Hero, IntroVideo, Marquee } from '@/components/sections/Hero';
import { About, NowSection } from '@/components/sections/About';
import { Skills, TechStack } from '@/components/sections/Skills';
import { EducationBlock, Experience } from '@/components/sections/Experience';
import { Process } from '@/components/sections/Process';
import { AppLinks, Projects } from '@/components/sections/Projects';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { GitHubActivity, OpenSource } from '@/components/sections/GitHub';
import { CodeSnippets, TerminalSection } from '@/components/sections/CodeShowcase';
import { BlogList, Newsletter } from '@/components/sections/Blog';
import {
  AwardsAndPress,
  Partners,
  Stats,
  Testimonials,
} from '@/components/sections/Social';
import { Faq, Pricing, Services, TermsAndSlots } from '@/components/sections/Services';
import { Contact, CtaBanner } from '@/components/sections/Contact';
import {
  Changelog,
  CommentsCta,
  Guestbook,
  MiniGame,
  Uses,
} from '@/components/sections/Extras';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = await getSiteContent();
  const { settings } = content;
  const lang: Locale = isLocale(locale) ? locale : 'uz';

  return {
    // absolute — shablon qo'shilmasin, ism ikki marta takrorlanmasin
    title: { absolute: `${settings.name} — ${t(settings.role, lang)}` },
    description: t(settings.shortBio, lang),
    alternates: {
      canonical: `/${lang}`,
      languages: { uz: '/uz', en: '/en', 'x-default': '/uz' },
    },
    openGraph: {
      title: `${settings.name} — ${t(settings.role, lang)}`,
      description: t(settings.shortBio, lang),
      locale: lang === 'uz' ? 'uz_UZ' : 'en_US',
      type: 'profile',
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [content, githubStats] = await Promise.all([getSiteContent(), getGitHubStats()]);

  const techItems = content.stack.flatMap((group) => group.items);
  const telegram = content.socials.find((s) => s.icon === 'telegram')?.url;
  const githubUser = process.env.GITHUB_USERNAME;

  // Bo'sh bo'limlar ko'rsatilmaydi — soxta ma'lumot chiqmasligi uchun
  const hasTestimonials = content.testimonials.length > 0;
  const hasPartners = content.partners.length > 0;
  const hasAwardsOrPress = content.awards.length > 0 || content.press.length > 0;
  const hasCaseStudies = content.caseStudies.length > 0;
  const hasOpenSource = content.openSource.length > 0;
  const hasPricing = content.pricing.length > 0;
  const hasTerms = content.workTerms.length > 0 || content.slots.length > 0;
  const hasUses = content.uses.length > 0;
  const hasCertificates = content.certificates.length > 0;

  // JSON-LD — qidiruv tizimlari uchun
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: content.settings.name,
    jobTitle: t(content.settings.role, locale),
    description: t(content.settings.shortBio, locale),
    email: `mailto:${content.settings.email}`,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    worksFor: { '@type': 'Organization', name: 'TASS Vision' },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: content.education[0]?.school ?? '',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: content.settings.city,
      addressCountry: content.settings.country,
    },
    sameAs: content.socials.filter((s) => !s.url.startsWith('mailto:')).map((s) => s.url),
    knowsAbout: content.stack.flatMap((group) => group.items),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* A1 — Hero, A6 — bandlik holati */}
      <Hero content={content} locale={locale} />

      {/* A3 — texnologiya tasmasi */}
      <Marquee items={techItems} />

      {/* A5 — tanishtiruv videosi (URL bo'lsa) */}
      <IntroVideo url={content.settings.heroVideoUrl} locale={locale} />

      {/* B1, B9, B11, B12 */}
      <About content={content} locale={locale} />

      {/* B3 — ko'nikmalar */}
      <Skills content={content} locale={locale} />

      {/* B4 — texnologiyalar to'plami */}
      <TechStack content={content} locale={locale} />

      {/* B2 — tajriba yo'li */}
      <Experience content={content} locale={locale} />

      {/* B5, B6, B7 — ta'lim, sertifikatlar, tillar */}
      <EducationBlock content={content} locale={locale} showCertificates={hasCertificates} />

      {/* B8 — ish jarayoni */}
      <Process content={content} locale={locale} />

      {/* C1, C3, C8 — loyihalar */}
      <Projects projects={content.projects} locale={locale} limit={6} />

      {/* C10 — muvaffaqiyat holatlari */}
      {hasCaseStudies && <CaseStudies content={content} locale={locale} />}

      {/* C9 — ilova havolalari */}
      <AppLinks projects={content.projects} locale={locale} />

      {/* C4 — GitHub faoliyati */}
      <GitHubActivity stats={githubStats} username={githubUser} locale={locale} />

      {/* C5 — ochiq kod hissasi */}
      {hasOpenSource && <OpenSource content={content} locale={locale} />}

      {/* C6 — kod namunalari */}
      <CodeSnippets snippets={content.snippets} locale={locale} />

      {/* C7 + I1 — interaktiv terminal */}
      <TerminalSection content={content} locale={locale} />

      {/* E3 — raqamlar */}
      <Stats content={content} locale={locale} />

      {/* E1 — mijozlar fikri */}
      {hasTestimonials && <Testimonials content={content} locale={locale} />}

      {/* E2 — hamkorlar */}
      {hasPartners && <Partners content={content} locale={locale} />}

      {/* E4, E5 — mukofotlar va matbuot */}
      {hasAwardsOrPress && <AwardsAndPress content={content} locale={locale} />}

      {/* D1-D5, D8 — blog */}
      <BlogList posts={content.posts} locale={locale} limit={3} />

      {/* D7 — obuna */}
      <Newsletter locale={locale} />

      {/* B10 — hozir */}
      <NowSection content={content} locale={locale} />

      {/* F1 — xizmatlar */}
      <Services content={content} locale={locale} />

      {/* F2 — narx paketlari */}
      {hasPricing && <Pricing content={content} locale={locale} />}

      {/* F5, F6 — ish shartlari va bo'sh vaqtlar */}
      {hasTerms && <TermsAndSlots content={content} locale={locale} />}

      {/* F4 — savol-javob */}
      <Faq content={content} locale={locale} />

      {/* D9 — muhokama kanali */}
      <CommentsCta telegram={telegram} locale={locale} />

      {/* I4 — vositalarim */}
      {hasUses && <Uses content={content} locale={locale} />}

      {/* I5 — mehmonlar kitobi */}
      <Guestbook initial={content.guestbook} locale={locale} />

      {/* I6 — yangilanishlar */}
      <Changelog content={content} locale={locale} />

      {/* I9 — kichik o'yin */}
      <MiniGame locale={locale} />

      {/* G1-G9 — aloqa */}
      <Contact content={content} locale={locale} />

      {/* G7 — chaqiruv banneri */}
      <CtaBanner content={content} locale={locale} />
    </>
  );
}
