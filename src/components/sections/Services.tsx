'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CalendarCheck,
  Camera,
  Check,
  ChevronDown,
  Code2,
  Cpu,
  Gauge,
  LayoutGrid,
  Minus,
  Plus,
  Server,
  Shield,
  Smartphone,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { t, tr, type Locale } from '@/lib/i18n';
import type { SiteContent } from '@/lib/types';
import { Section, SectionHeading } from '../ui/Section';
import { Reveal, StaggerGroup, staggerItem } from '../ui/Reveal';

const serviceIcons: Record<string, LucideIcon> = {
  code: Code2,
  smartphone: Smartphone,
  server: Server,
  gauge: Gauge,
  shield: Shield,
  users: Users,
  camera: Camera,
  cpu: Cpu,
  layout: LayoutGrid,
};

/* ============================================================
   F1 — Xizmatlar
   ============================================================ */
export function Services({ content, locale }: { content: SiteContent; locale: Locale }) {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title={tr('section.services', locale)}
        subtitle={tr('section.services.sub', locale)}
      />

      <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {content.services.map((service) => {
          const Icon = serviceIcons[service.icon] ?? Code2;
          return (
            <motion.div key={t(service.title, 'uz')} variants={staggerItem} className="card card-hover flex flex-col p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Icon size={19} />
              </span>
              <h3 className="mt-5 text-[1.05rem] font-semibold text-[var(--text)]">
                {t(service.title, locale)}
              </h3>
              <p className="mt-2.5 flex-1 text-[0.86rem] leading-relaxed text-[var(--text-muted)]">
                {t(service.description, locale)}
              </p>

              <ul className="mt-5 space-y-2">
                {service.features.map((f) => (
                  <li key={t(f, 'uz')} className="flex items-center gap-2.5 text-[0.82rem] text-[var(--text-soft)]">
                    <Check size={13} className="shrink-0 text-[var(--accent)]" />
                    {t(f, locale)}
                  </li>
                ))}
              </ul>

              {service.priceFrom && (
                <div className="mt-6 flex items-baseline gap-2 border-t border-[var(--border)] pt-5">
                  <span className="text-[0.72rem] text-[var(--text-muted)]">
                    {locale === 'uz' ? 'dan boshlab' : 'from'}
                  </span>
                  <span className="text-lg font-semibold text-[var(--text)]">{service.priceFrom}</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}

/* ============================================================
   F2 — Narx paketlari
   ============================================================ */
export function Pricing({ content, locale }: { content: SiteContent; locale: Locale }) {
  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title={tr('section.pricing', locale)}
        subtitle={tr('section.pricing.sub', locale)}
        align="center"
      />

      <StaggerGroup className="mt-14 grid gap-6 lg:grid-cols-3">
        {content.pricing.map((plan) => (
          <motion.div
            key={t(plan.name, 'uz')}
            variants={staggerItem}
            className={`relative flex flex-col rounded-3xl border p-7 ${
              plan.highlighted
                ? 'border-[var(--accent)] bg-[var(--surface)] shadow-[var(--shadow-float)] lg:-mt-4 lg:mb-4'
                : 'border-[var(--border)] bg-[var(--surface)]'
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--accent)] px-3.5 py-1 text-[0.68rem] font-semibold tracking-wide text-[var(--accent-ink)]">
                {t(plan.cta, locale)}
              </span>
            )}

            <h3 className="text-[0.82rem] font-semibold tracking-[0.14em] uppercase text-[var(--text-muted)]">
              {t(plan.name, locale)}
            </h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight">{plan.price}</span>
              <span className="text-[0.8rem] text-[var(--text-muted)]">{t(plan.period, locale)}</span>
            </div>
            <p className="mt-3 text-[0.85rem] leading-relaxed text-[var(--text-muted)]">
              {t(plan.description, locale)}
            </p>

            <ul className="mt-7 flex-1 space-y-3">
              {plan.features.map((f) => (
                <li key={t(f, 'uz')} className="flex items-start gap-2.5 text-[0.85rem] text-[var(--text-soft)]">
                  <Check size={14} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                  {t(f, locale)}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className={`mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[0.85rem] font-semibold transition-transform hover:scale-[1.02] ${
                plan.highlighted
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                  : 'border border-[var(--border-strong)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
              }`}
            >
              <Sparkles size={14} />
              {t(plan.cta, locale)}
            </a>
          </motion.div>
        ))}
      </StaggerGroup>
    </Section>
  );
}

/* ============================================================
   F3 — Narx kalkulyatori
   ============================================================ */
const baseOptions = [
  { key: 'landing', label: { uz: 'Landing sahifa', en: 'Landing page' }, price: 1200 },
  { key: 'corporate', label: { uz: 'Korporativ sayt', en: 'Corporate site' }, price: 2500 },
  { key: 'ecommerce', label: { uz: 'Onlayn do‘kon', en: 'E-commerce' }, price: 4500 },
  { key: 'platform', label: { uz: 'Murakkab platforma', en: 'Complex platform' }, price: 8000 },
];

const extras = [
  { key: 'admin', label: { uz: 'Admin panel', en: 'Admin panel' }, price: 700 },
  { key: 'i18n', label: { uz: 'Ko‘p tilli (UZ/EN/RU)', en: 'Multi-language (UZ/EN/RU)' }, price: 500 },
  { key: 'payment', label: { uz: 'To‘lov integratsiyasi', en: 'Payment integration' }, price: 900 },
  { key: 'mobile', label: { uz: 'Mobil ilova', en: 'Mobile app' }, price: 2500 },
  { key: 'design', label: { uz: 'Maxsus dizayn', en: 'Custom design' }, price: 800 },
  { key: 'seo', label: { uz: 'SEO paketi', en: 'SEO package' }, price: 400 },
];

export function PriceCalculator({ locale }: { locale: Locale }) {
  const [base, setBase] = useState(baseOptions[0].key);
  const [selected, setSelected] = useState<string[]>(['admin']);
  const [weeks, setWeeks] = useState(4);

  const total = useMemo(() => {
    const basePrice = baseOptions.find((o) => o.key === base)?.price ?? 0;
    const extrasPrice = extras
      .filter((e) => selected.includes(e.key))
      .reduce((sum, e) => sum + e.price, 0);
    // Shoshilinch muddat uchun ustama
    const urgency = weeks <= 2 ? 1.35 : weeks <= 4 ? 1.12 : 1;
    return Math.round((basePrice + extrasPrice) * urgency);
  }, [base, selected, weeks]);

  const toggle = (key: string) =>
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const format = (n: number) => `$${n.toLocaleString('en-US')}`;

  return (
    <Section id="calculator" tight>
      <SectionHeading
        eyebrow="Calculator"
        title={locale === 'uz' ? 'Narxni o‘zingiz hisoblang' : 'Estimate the price yourself'}
        subtitle={
          locale === 'uz'
            ? "Loyiha turini tanlang, qo'shimchalarni belgilang — taxminiy narx darhol chiqadi."
            : 'Pick a project type, tick the extras — the estimate appears instantly.'
        }
      />

      <Reveal delay={0.08}>
        <div className="mt-10 grid gap-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-7 md:p-9 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-8">
            {/* Loyiha turi */}
            <div>
              <h3 className="text-[0.78rem] font-semibold tracking-[0.12em] uppercase text-[var(--text-muted)]">
                {locale === 'uz' ? '1. Loyiha turi' : '1. Project type'}
              </h3>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {baseOptions.map((option) => {
                  const active = base === option.key;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => setBase(option.key)}
                      className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                        active
                          ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                          : 'border-[var(--border)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <span className={`text-[0.85rem] font-medium ${active ? 'text-[var(--accent)]' : 'text-[var(--text-soft)]'}`}>
                        {t(option.label, locale)}
                      </span>
                      <span className="font-mono text-[0.72rem] text-[var(--text-muted)]">
                        {format(option.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Qo'shimchalar */}
            <div>
              <h3 className="text-[0.78rem] font-semibold tracking-[0.12em] uppercase text-[var(--text-muted)]">
                {locale === 'uz' ? '2. Qo‘shimchalar' : '2. Extras'}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {extras.map((extra) => {
                  const active = selected.includes(extra.key);
                  return (
                    <button
                      key={extra.key}
                      type="button"
                      onClick={() => toggle(extra.key)}
                      aria-pressed={active}
                      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[0.8rem] font-medium transition-colors ${
                        active
                          ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]'
                          : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]'
                      }`}
                    >
                      {active ? <Check size={12} /> : <Plus size={12} />}
                      {t(extra.label, locale)}
                      <span className="font-mono text-[0.68rem] opacity-70">+{format(extra.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Muddat */}
            <div>
              <h3 className="text-[0.78rem] font-semibold tracking-[0.12em] uppercase text-[var(--text-muted)]">
                {locale === 'uz' ? '3. Muddat' : '3. Timeline'}
              </h3>
              <div className="mt-4 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setWeeks((w) => Math.max(1, w - 1))}
                  aria-label="-1 hafta"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <Minus size={14} />
                </button>
                <div className="min-w-[110px] text-center">
                  <div className="text-xl font-semibold tabular-nums">{weeks}</div>
                  <div className="text-[0.7rem] text-[var(--text-muted)]">
                    {locale === 'uz' ? 'hafta' : 'weeks'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setWeeks((w) => Math.min(24, w + 1))}
                  aria-label="+1 hafta"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <Plus size={14} />
                </button>
                {weeks <= 2 && (
                  <span className="text-[0.72rem] text-[var(--warning)]">
                    {locale === 'uz' ? 'Shoshilinch — +35%' : 'Rush — +35%'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Natija */}
          <div className="flex flex-col justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-6">
            <span className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-[var(--text-muted)]">
              {locale === 'uz' ? 'Taxminiy narx' : 'Estimated price'}
            </span>
            <motion.div
              key={total}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 text-4xl font-semibold tracking-tight text-[var(--accent)] tabular-nums"
            >
              {format(total)}
            </motion.div>
            <p className="mt-3 text-[0.78rem] leading-relaxed text-[var(--text-muted)]">
              {locale === 'uz'
                ? "Bu taxminiy hisob. Aniq taklif texnik topshiriqdan keyin beriladi."
                : 'This is a rough estimate. The exact quote comes after the spec.'}
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-[0.85rem] font-semibold text-[var(--accent-ink)] transition-transform hover:scale-[1.02]"
            >
              {locale === 'uz' ? 'Aniq taklif olish' : 'Get an exact quote'}
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ============================================================
   F4 — Ko'p so'raladigan savollar
   ============================================================ */
export function Faq({ content, locale }: { content: SiteContent; locale: Locale }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title={tr('section.faq', locale)}
        align="center"
      />

      <div className="mx-auto mt-12 max-w-3xl space-y-2.5">
        {content.faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={i} delay={Math.min(i * 0.04, 0.2)}>
              <div
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen ? 'border-[var(--accent)] bg-[var(--surface)]' : 'border-[var(--border)] bg-[var(--surface)]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-[0.93rem] font-medium text-[var(--text)]">
                    {t(item.question, locale)}
                  </span>
                  <ChevronDown
                    size={17}
                    className={`shrink-0 text-[var(--text-muted)] transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[var(--accent)]' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
                    >
                      <p className="px-5 pb-5 text-[0.88rem] leading-relaxed text-[var(--text-muted)]">
                        {t(item.answer, locale)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ============================================================
   F5 — Ish shartlari  |  F6 — Bo'sh vaqtlar
   ============================================================ */
export function TermsAndSlots({ content, locale }: { content: SiteContent; locale: Locale }) {
  return (
    <Section id="terms" tight>
      <div className="grid gap-12 lg:grid-cols-2">
        {/* F5 */}
        <div>
          <h2 className="text-sm font-semibold tracking-[0.12em] uppercase text-[var(--text-muted)]">
            {tr('section.terms', locale)}
          </h2>
          <StaggerGroup className="mt-6 space-y-3">
            {content.workTerms.map((term) => (
              <motion.div
                key={t(term, 'uz')}
                variants={staggerItem}
                className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <Check size={15} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <span className="text-[0.86rem] leading-relaxed text-[var(--text-soft)]">
                  {t(term, locale)}
                </span>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>

        {/* F6 */}
        <div>
          <h2 className="flex items-center gap-2 text-sm font-semibold tracking-[0.12em] uppercase text-[var(--text-muted)]">
            <CalendarCheck size={15} className="text-[var(--accent)]" />
            {tr('section.availability', locale)}
          </h2>
          <StaggerGroup className="mt-6 space-y-3">
            {content.slots.map((slot) => (
              <motion.div
                key={slot.period}
                variants={staggerItem}
                className="flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <span className="font-mono text-[0.85rem] text-[var(--text)]">{slot.period}</span>
                <span
                  className={`inline-flex items-center gap-2 text-[0.8rem] font-medium ${
                    slot.state === 'free' ? 'text-[var(--success)]' : 'text-[var(--danger)]'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      slot.state === 'free' ? 'bg-[var(--success)]' : 'bg-[var(--danger)]'
                    }`}
                  />
                  {t(slot.status, locale)}
                </span>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </Section>
  );
}
