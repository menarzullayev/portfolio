'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, Globe2, Newspaper, Quote, Star } from 'lucide-react';
import { formatDate, t, tr, type Locale } from '@/lib/i18n';
import type { SiteContent } from '@/lib/types';
import { Section, SectionHeading } from '../ui/Section';
import { Reveal, StaggerGroup, staggerItem } from '../ui/Reveal';

/* ============================================================
   E1 — Mijozlar fikri
   ============================================================ */
export function Testimonials({ content, locale }: { content: SiteContent; locale: Locale }) {
  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Testimonials"
        title={tr('section.testimonials', locale)}
        subtitle={
          locale === 'uz'
            ? "Men bilan ishlagan odamlarning fikri — o'zim aytgandan ko'ra ishonchliroq."
            : 'Words from people I worked with — more convincing than my own claims.'
        }
      />

      <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-2">
        {content.testimonials.map((item) => (
          <motion.figure key={item.name} variants={staggerItem} className="card card-hover flex flex-col p-6">
            <Quote size={20} className="text-[var(--accent)] opacity-40" />
            <blockquote className="mt-4 flex-1 text-[0.93rem] leading-relaxed text-[var(--text-soft)]">
              {t(item.quote, locale)}
            </blockquote>

            <div className="mt-4 flex gap-0.5">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} size={13} className="fill-[var(--warning)] text-[var(--warning)]" />
              ))}
            </div>

            <figcaption className="mt-5 flex items-center gap-3 border-t border-[var(--border)] pt-5">
              {item.avatar ? (
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[var(--surface-2)]">
                  <Image src={item.avatar} alt={item.name} fill sizes="40px" className="object-cover" />
                </span>
              ) : (
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[0.78rem] font-semibold text-[var(--accent)]"
                  aria-hidden
                >
                  {item.name
                    .split(' ')
                    .slice(0, 2)
                    .map((part) => part.charAt(0).toUpperCase())
                    .join('')}
                </span>
              )}
              <span className="min-w-0">
                <span className="block truncate text-[0.88rem] font-semibold">{item.name}</span>
                <span className="block truncate text-[0.76rem] text-[var(--text-muted)]">
                  {t(item.position, locale)} · {item.company}
                </span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </StaggerGroup>
    </Section>
  );
}

/* ============================================================
   E2 — Hamkorlar logotiplari (aylanuvchi tasma)
   ============================================================ */
export function Partners({ content, locale }: { content: SiteContent; locale: Locale }) {
  const row = [...content.partners, ...content.partners];
  return (
    <Section id="partners" tight>
      <Reveal>
        <p className="text-center text-[0.75rem] font-semibold tracking-[0.16em] uppercase text-[var(--text-muted)]">
          {tr('section.partners', locale)}
        </p>
      </Reveal>
      <div className="marquee-mask mt-7">
        <div className="marquee-track items-center gap-12">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 text-[1.05rem] font-semibold whitespace-nowrap text-[var(--text-muted)] opacity-60 transition-opacity hover:opacity-100"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   E3 — Umumiy statistika
   ============================================================ */
export function Stats({ content, locale }: { content: SiteContent; locale: Locale }) {
  return (
    <Section id="stats" tight>
      <StaggerGroup className="grid gap-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:grid-cols-2 lg:grid-cols-4 md:p-10">
        {content.stats.map((stat) => (
          <motion.div key={stat.value} variants={staggerItem} className="text-center">
            <div className="text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
              {stat.value}
            </div>
            <div className="mt-2 text-[0.8rem] leading-snug text-[var(--text-muted)]">
              {t(stat.label, locale)}
            </div>
          </motion.div>
        ))}
      </StaggerGroup>
    </Section>
  );
}

/* ============================================================
   E4 — Mukofotlar  |  E5 — Matbuot
   ============================================================ */
export function AwardsAndPress({ content, locale }: { content: SiteContent; locale: Locale }) {
  return (
    <Section id="awards" tight>
      <div className="grid gap-12 lg:grid-cols-2">
        {/* E4 */}
        <div>
          <h2 className="flex items-center gap-2 text-sm font-semibold tracking-[0.12em] uppercase text-[var(--text-muted)]">
            <Award size={15} className="text-[var(--accent)]" />
            {tr('section.awards', locale)}
          </h2>
          <StaggerGroup className="mt-6 space-y-3">
            {content.awards.map((award) => (
              <motion.div key={t(award.title, 'uz')} variants={staggerItem} className="card flex items-start gap-4 p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Award size={15} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[0.9rem] font-medium leading-snug">{t(award.title, locale)}</h3>
                  <p className="mt-1 text-[0.76rem] text-[var(--text-muted)]">
                    {award.org} · {award.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>

        {/* E5 */}
        <div>
          <h2 className="flex items-center gap-2 text-sm font-semibold tracking-[0.12em] uppercase text-[var(--text-muted)]">
            <Newspaper size={15} className="text-[var(--accent)]" />
            {tr('section.press', locale)}
          </h2>
          <StaggerGroup className="mt-6 space-y-3">
            {content.press.map((item) => (
              <motion.a
                key={item.url + item.outlet}
                variants={staggerItem}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover block p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[0.9rem] font-medium leading-snug">{t(item.title, locale)}</h3>
                  <span className="shrink-0 font-mono text-[0.7rem] text-[var(--text-muted)]">
                    {formatDate(item.date, locale)}
                  </span>
                </div>
                <p className="mt-2 text-[0.76rem] font-semibold text-[var(--accent)]">{item.outlet}</p>
              </motion.a>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   E6 — Xizmat ko'rsatgan mijozlar xaritasi
   ============================================================ */
const clientCountries = [
  { name: { uz: "O'zbekiston", en: 'Uzbekistan' }, clients: 14, flag: '🇺🇿' },
  { name: { uz: 'Qozog‘iston', en: 'Kazakhstan' }, clients: 5, flag: '🇰🇿' },
  { name: { uz: 'Turkiya', en: 'Türkiye' }, clients: 4, flag: '🇹🇷' },
  { name: { uz: 'AQSH', en: 'USA' }, clients: 3, flag: '🇺🇸' },
  { name: { uz: 'Germaniya', en: 'Germany' }, clients: 2, flag: '🇩🇪' },
  { name: { uz: 'BAA', en: 'UAE' }, clients: 2, flag: '🇦🇪' },
];

export function ClientMap({ locale }: { locale: Locale }) {
  const max = Math.max(...clientCountries.map((c) => c.clients));

  return (
    <Section id="map" tight>
      <SectionHeading
        eyebrow="Global"
        title={tr('section.map', locale)}
        subtitle={
          locale === 'uz'
            ? "Masofadan ishlash chegarani bilmaydi — 6 davlatda mijozlarim bor."
            : 'Remote work knows no borders — clients in 6 countries.'
        }
      />

      <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clientCountries.map((country) => (
          <motion.div key={country.flag} variants={staggerItem} className="card p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2.5">
                <span className="text-lg" aria-hidden>
                  {country.flag}
                </span>
                <span className="text-[0.88rem] font-medium">{t(country.name, locale)}</span>
              </span>
              <span className="font-mono text-[0.78rem] text-[var(--accent)]">
                {country.clients}
              </span>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(country.clients / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="h-full rounded-full bg-[var(--accent)]"
              />
            </div>
          </motion.div>
        ))}
      </StaggerGroup>

      <Reveal delay={0.2}>
        <p className="mt-6 inline-flex items-center gap-2 text-[0.8rem] text-[var(--text-muted)]">
          <Globe2 size={14} className="text-[var(--accent)]" />
          {locale === 'uz'
            ? "Jami 30 ta mijoz, 6 ta davlat, 4 ta vaqt mintaqasi"
            : '30 clients total, 6 countries, 4 time zones'}
        </p>
      </Reveal>
    </Section>
  );
}
