'use client';

import { motion } from 'framer-motion';
import {
  Book,
  Camera,
  CheckCircle2,
  Dumbbell,
  Music,
  Plane,
  Sparkles,
  Target,
  Clock,
  type LucideIcon,
} from 'lucide-react';
import { t, tr, type Locale } from '@/lib/i18n';
import type { SiteContent } from '@/lib/types';
import { Section, SectionHeading } from '../ui/Section';
import { Reveal, StaggerGroup, staggerItem } from '../ui/Reveal';

const interestIcons: Record<string, LucideIcon> = {
  book: Book,
  dumbbell: Dumbbell,
  music: Music,
  camera: Camera,
  plane: Plane,
  chess: Target,
};

/* ============================================================
   B1 — Men haqimda + B9 qiziqishlar
   ============================================================ */
export function About({ content, locale }: { content: SiteContent; locale: Locale }) {
  const { settings, interests, principles, routine } = content;
  const bio = settings.bio;
  const hasSidebar = interests.length > 0 || routine.length > 0;

  return (
    <Section id="about">
      <SectionHeading
        eyebrow={tr('section.about', locale)}
        title={t(settings.role, locale)}
        subtitle={tr('section.about.sub', locale)}
      />

      <div
        className={`mt-12 grid gap-12 ${hasSidebar ? 'lg:grid-cols-[1.4fr_1fr]' : ''}`}
      >
        {/* Matn */}
        <div>
          <div className="space-y-5">
            {bio.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-[1.02rem] leading-[1.85] text-[var(--text-soft)]">
                  {t(paragraph, locale)}
                </p>
              </Reveal>
            ))}
          </div>

          {/* B11 — Tamoyillar */}
          <div className="mt-12">
            <h3 className="flex items-center gap-2 text-sm font-semibold tracking-[0.1em] uppercase text-[var(--text-muted)]">
              <Sparkles size={14} className="text-[var(--accent)]" />
              {tr('section.principles', locale)}
            </h3>
            <StaggerGroup className="mt-6 grid gap-4 sm:grid-cols-2">
              {principles.map((p) => (
                <motion.div key={t(p.title, 'uz')} variants={staggerItem} className="card card-hover p-5">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                    <div>
                      <h4 className="text-[0.92rem] font-semibold text-[var(--text)]">
                        {t(p.title, locale)}
                      </h4>
                      <p className="mt-1.5 text-[0.83rem] leading-relaxed text-[var(--text-muted)]">
                        {t(p.description, locale)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </StaggerGroup>
          </div>
        </div>

        {/* Yon panel */}
        {hasSidebar && (
        <div className="space-y-6">
          {/* B9 — Qiziqishlar */}
          {interests.length > 0 && (
          <Reveal delay={0.15}>
            <div className="card p-6">
              <h3 className="text-sm font-semibold tracking-[0.1em] uppercase text-[var(--text-muted)]">
                {tr('section.interests', locale)}
              </h3>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {interests.map((item) => {
                  const Icon = interestIcons[item.icon] ?? Target;
                  return (
                    <div
                      key={item.icon}
                      className="flex items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2.5"
                    >
                      <Icon size={14} className="shrink-0 text-[var(--accent)]" />
                      <span className="text-[0.8rem] font-medium text-[var(--text-soft)]">
                        {t(item.title, locale)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
          )}

          {/* B12 — Bir kunim */}
          {routine.length > 0 && (
          <Reveal delay={0.2}>
            <div className="card p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold tracking-[0.1em] uppercase text-[var(--text-muted)]">
                <Clock size={14} className="text-[var(--accent)]" />
                {tr('section.routine', locale)}
              </h3>
              <ol className="mt-5 space-y-3.5">
                {content.routine.map((item, i) => (
                  <li key={item.time} className="flex items-start gap-3.5">
                    <span className="font-mono text-[0.72rem] font-medium text-[var(--accent)] tabular-nums">
                      {item.time}
                    </span>
                    <span className="relative flex-1 pb-0.5 text-[0.83rem] leading-snug text-[var(--text-soft)]">
                      {t(item.activity, locale)}
                      {i < routine.length - 1 && (
                        <span className="absolute -bottom-1.5 left-0 h-px w-full bg-[var(--border)]" />
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
          )}
        </div>
        )}
      </div>
    </Section>
  );
}

/* ============================================================
   B10 — Hozir nima bilan shug'ullanyapman ("Now")
   ============================================================ */
export function NowSection({
  content,
  locale,
  heading = true,
}: {
  content: SiteContent;
  locale: Locale;
  heading?: boolean;
}) {
  return (
    <Section id="now" tight>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
        {heading && (
          <SectionHeading
            eyebrow="Now"
            title={tr('section.now', locale)}
            subtitle={
              locale === 'uz'
                ? "Bu ro'yxat har oy yangilanadi. Nima o'qiyapman, nima o'rganyapman va nima ustida ishlayapman."
                : 'This list is updated monthly. What I read, learn and build.'
            }
          />
        )}
        <StaggerGroup className={`space-y-3 ${heading ? '' : 'lg:col-span-2'}`}>
          {content.now.map((item) => (
            <motion.div
              key={t(item, 'uz')}
              variants={staggerItem}
              className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
              <p className="text-[0.92rem] leading-relaxed text-[var(--text-soft)]">
                {t(item, locale)}
              </p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}
