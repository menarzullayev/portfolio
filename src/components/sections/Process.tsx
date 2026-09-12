'use client';

import { motion } from 'framer-motion';
import { t, tr, type Locale } from '@/lib/i18n';
import type { SiteContent } from '@/lib/types';
import { Section, SectionHeading } from '../ui/Section';
import { StaggerGroup, staggerItem } from '../ui/Reveal';

/* ============================================================
   B8 — Ishlash jarayoni
   ============================================================ */
export function Process({ content, locale }: { content: SiteContent; locale: Locale }) {
  return (
    <Section id="process">
      <SectionHeading
        eyebrow="Process"
        title={tr('section.process', locale)}
        subtitle={tr('section.process.sub', locale)}
        align="center"
      />

      <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
        {content.process.map((step, i) => (
          <motion.div key={t(step.title, 'uz')} variants={staggerItem} className="relative">
            <div className="card card-hover h-full p-6">
              <span className="font-mono text-[2rem] leading-none font-semibold text-[var(--accent)] opacity-25">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-[1rem] font-semibold text-[var(--text)]">
                {t(step.title, locale)}
              </h3>
              <p className="mt-2 text-[0.84rem] leading-relaxed text-[var(--text-muted)]">
                {t(step.description, locale)}
              </p>
            </div>
            {/* Bog'lovchi chiziq */}
            {i < content.process.length - 1 && (
              <span
                aria-hidden
                className="absolute top-1/2 -right-3 hidden h-px w-6 bg-gradient-to-r from-[var(--border-strong)] to-transparent lg:block"
              />
            )}
          </motion.div>
        ))}
      </StaggerGroup>
    </Section>
  );
}
