'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { t, tr, type Locale } from '@/lib/i18n';
import type { SiteContent, Skill } from '@/lib/types';
import { Section, SectionHeading } from '../ui/Section';
import { Reveal, StaggerGroup, staggerItem } from '../ui/Reveal';

const categories: (Skill['category'] | 'all')[] = [
  'all',
  'embedded',
  'data',
  'backend',
  'frontend',
  'mobile',
  'devops',
  'design',
];

/* ============================================================
   B3 — Ko'nikmalar (daraja ko'rsatkichi va filtr bilan)
   ============================================================ */
export function Skills({ content, locale }: { content: SiteContent; locale: Locale }) {
  const [filter, setFilter] = useState<Skill['category'] | 'all'>('all');
  const visible = content.skills.filter((s) => filter === 'all' || s.category === filter);

  return (
    <Section id="skills">
      <SectionHeading
        eyebrow={tr('section.skills', locale)}
        title={tr('section.skills', locale)}
        subtitle={tr('section.skills.sub', locale)}
      />

      {/* Kategoriya filtri */}
      <Reveal delay={0.05}>
        <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`relative shrink-0 rounded-full border px-3.5 py-1.5 text-[0.76rem] font-medium transition-colors ${
                  active
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]'
                    : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]'
                }`}
              >
                {tr(`cat.${cat}`, locale)}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Ko'nikmalar ro'yxati */}
      <div className="mt-9 grid gap-x-10 gap-y-5 md:grid-cols-2">
        {visible.map((skill, i) => (
          <motion.div
            key={skill.name}
            layout
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: Math.min(i * 0.035, 0.3) }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[0.9rem] font-medium text-[var(--text)]">{skill.name}</span>
              <span className="font-mono text-[0.72rem] text-[var(--text-muted)] tabular-nums">
                {skill.level}%
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1 + Math.min(i * 0.03, 0.25), ease: [0.21, 0.47, 0.32, 0.98] }}
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
   B4 — Texnologiyalar to'plami
   ============================================================ */
export function TechStack({ content, locale }: { content: SiteContent; locale: Locale }) {
  return (
    <Section id="stack" tight>
      <SectionHeading
        eyebrow="Stack"
        title={tr('section.stack', locale)}
        subtitle={tr('section.stack.sub', locale)}
      />
      <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {content.stack.map((group) => (
          <motion.div key={t(group.title, 'uz')} variants={staggerItem} className="card card-hover p-6">
            <h3 className="text-[0.82rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent)]">
              {t(group.title, locale)}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 font-mono text-[0.72rem] text-[var(--text-soft)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </StaggerGroup>
    </Section>
  );
}
