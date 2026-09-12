'use client';

import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Languages as LanguagesIcon, MapPin } from 'lucide-react';
import { t, tr, type Locale } from '@/lib/i18n';
import type { SiteContent } from '@/lib/types';
import { Section, SectionHeading } from '../ui/Section';
import { Reveal, StaggerGroup, staggerItem } from '../ui/Reveal';

/* ============================================================
   B2 — Tajriba yo'li (timeline)
   ============================================================ */
export function Experience({ content, locale }: { content: SiteContent; locale: Locale }) {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Career"
        title={tr('section.experience', locale)}
        subtitle={tr('section.experience.sub', locale)}
      />

      <div className="relative mt-12">
        {/* Vertikal chiziq */}
        <div className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-[var(--accent)] via-[var(--border)] to-transparent md:left-[9px]" />

        <div className="space-y-10">
          {content.experience.map((job, i) => (
            <Reveal key={`${job.company}-${job.period}`} delay={i * 0.08}>
              <div className="relative pl-9 md:pl-12">
                {/* Nuqta */}
                <span
                  className={`absolute top-1.5 left-0 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 md:h-[19px] md:w-[19px] ${
                    job.current
                      ? 'border-[var(--accent)] bg-[var(--accent)]'
                      : 'border-[var(--border-strong)] bg-[var(--surface)]'
                  }`}
                >
                  {job.current && (
                    <span className="absolute h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                  )}
                </span>

                <div className="card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-[1.05rem] font-semibold text-[var(--text)]">
                        {t(job.role, locale)}
                      </h3>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.8rem] text-[var(--text-muted)]">
                        <span className="inline-flex items-center gap-1.5 font-medium text-[var(--accent)]">
                          <Briefcase size={13} /> {job.company}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={13} /> {job.location}
                        </span>
                      </div>
                    </div>
                    <span className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1 font-mono text-[0.7rem] text-[var(--text-muted)]">
                      {job.period}
                    </span>
                  </div>

                  <p className="mt-4 text-[0.88rem] leading-relaxed text-[var(--text-muted)]">
                    {t(job.summary, locale)}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {job.highlights.map((h, hi) => (
                      <motion.li
                        key={hi}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 + hi * 0.07 }}
                        className="flex items-start gap-2.5 text-[0.85rem] leading-relaxed text-[var(--text-soft)]"
                      >
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                        {t(h, locale)}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   B5 — Ta'lim  |  B6 — Sertifikatlar  |  B7 — Tillar
   ============================================================ */
export function EducationBlock({
  content,
  locale,
  showCertificates = true,
}: {
  content: SiteContent;
  locale: Locale;
  showCertificates?: boolean;
}) {
  const { education, certificates, languages } = content;
  const hasCertificates = showCertificates && certificates.length > 0;

  return (
    <Section id="education" tight>
      <div className={`grid gap-12 ${hasCertificates ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
        {/* B5 */}
        <div>
          <h2 className="flex items-center gap-2 text-sm font-semibold tracking-[0.12em] uppercase text-[var(--text-muted)]">
            <GraduationCap size={15} className="text-[var(--accent)]" />
            {tr('section.education', locale)}
          </h2>
          <StaggerGroup className="mt-6 space-y-4">
            {education.map((item) => (
              <motion.div key={item.school} variants={staggerItem} className="card p-5">
                <h3 className="text-[0.92rem] font-semibold leading-snug">{item.school}</h3>
                <p className="mt-1.5 text-[0.82rem] text-[var(--accent)]">{t(item.degree, locale)}</p>
                <p className="mt-1 font-mono text-[0.72rem] text-[var(--text-muted)]">{item.period}</p>
                {item.note && (
                  <p className="mt-2.5 text-[0.8rem] leading-relaxed text-[var(--text-muted)]">
                    {t(item.note, locale)}
                  </p>
                )}
              </motion.div>
            ))}
          </StaggerGroup>
        </div>

        {/* B6 */}
        {hasCertificates && (
        <div>
          <h2 className="flex items-center gap-2 text-sm font-semibold tracking-[0.12em] uppercase text-[var(--text-muted)]">
            <Award size={15} className="text-[var(--accent)]" />
            {tr('section.certificates', locale)}
          </h2>
          <StaggerGroup className="mt-6 space-y-3">
            {certificates.map((cert) => (
              <motion.a
                key={cert.name}
                variants={staggerItem}
                href={cert.url ?? '#'}
                target={cert.url ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="card card-hover block p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[0.85rem] font-medium leading-snug">{cert.name}</h3>
                    <p className="mt-1 text-[0.75rem] text-[var(--text-muted)]">{cert.issuer}</p>
                  </div>
                  <span className="font-mono text-[0.7rem] text-[var(--text-muted)]">{cert.year}</span>
                </div>
              </motion.a>
            ))}
          </StaggerGroup>
        </div>
        )}

        {/* B7 */}
        <div>
          <h2 className="flex items-center gap-2 text-sm font-semibold tracking-[0.12em] uppercase text-[var(--text-muted)]">
            <LanguagesIcon size={15} className="text-[var(--accent)]" />
            {tr('section.languages', locale)}
          </h2>
          <StaggerGroup className="mt-6 space-y-3">
            {languages.map((lang) => (
              <motion.div key={t(lang.name, 'uz')} variants={staggerItem} className="card p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[0.88rem] font-medium">{t(lang.name, locale)}</h3>
                  <span className="rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-2 py-0.5 font-mono text-[0.7rem] text-[var(--accent)]">
                    {lang.level}
                  </span>
                </div>
                <p className="mt-1.5 text-[0.78rem] text-[var(--text-muted)]">
                  {t(lang.note, locale)}
                </p>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </Section>
  );
}
