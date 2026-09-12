'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Target } from 'lucide-react';
import { t, tr, type Locale } from '@/lib/i18n';
import type { SiteContent } from '@/lib/types';
import { Section, SectionHeading } from '../ui/Section';
import { Reveal } from '../ui/Reveal';

/* ============================================================
   C10 — Muvaffaqiyat holatlari (case study)
   ============================================================ */
export function CaseStudies({ content, locale }: { content: SiteContent; locale: Locale }) {
  return (
    <Section id="cases">
      <SectionHeading
        eyebrow="Case study"
        title={tr('section.caseStudies', locale)}
        subtitle={
          locale === 'uz'
            ? "Vazifa qanday qo'yilgani, nima qilganim va qanday natijaga erishganim."
            : 'The brief, what I did, and the result.'
        }
      />

      <div className="mt-12 space-y-8">
        {content.caseStudies.map((study, i) => (
          <Reveal key={study.client + i} delay={i * 0.08}>
            <article className="card overflow-hidden">
              <div className="grid lg:grid-cols-[1.6fr_1fr]">
                {/* Matn */}
                <div className="p-7 md:p-9">
                  <span className="chip">{study.client}</span>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight md:text-2xl">
                    {t(study.title, locale)}
                  </h3>

                  <div className="mt-7 space-y-5">
                    <div>
                      <h4 className="flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-[var(--danger)]">
                        <Target size={12} /> {tr('projects.problem', locale)}
                      </h4>
                      <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--text-soft)]">
                        {t(study.problem, locale)}
                      </p>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-[var(--accent)]">
                        <ArrowRight size={12} /> {tr('projects.solution', locale)}
                      </h4>
                      <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--text-soft)]">
                        {t(study.approach, locale)}
                      </p>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-[var(--success)]">
                        ✓ {tr('projects.result', locale)}
                      </h4>
                      <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--text-soft)]">
                        {t(study.result, locale)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Raqamlar */}
                <div className="flex flex-col justify-center gap-6 border-t border-[var(--border)] bg-[var(--surface-2)] p-7 md:p-9 lg:border-t-0 lg:border-l">
                  {study.metrics.map((m, mi) => (
                    <motion.div
                      key={mi}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.15 + mi * 0.1 }}
                    >
                      <div className="text-3xl font-semibold tracking-tight text-[var(--accent)]">
                        {m.value}
                      </div>
                      <div className="mt-1 text-[0.78rem] text-[var(--text-muted)]">
                        {t(m.label, locale)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
