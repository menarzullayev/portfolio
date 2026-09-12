'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from 'lucide-react';
import { t, tr, type Locale } from '@/lib/i18n';
import type { SiteContent } from '@/lib/types';
import { Section, SectionHeading } from '../ui/Section';
import { Reveal, StaggerGroup, staggerItem } from '../ui/Reveal';
import { SocialIcon } from '../ui/SocialIcon';

type FormState = 'idle' | 'sending' | 'success' | 'error';

/* ============================================================
   G1 + G3 + G5 + G8 + G9 — Aloqa bo'limi
   ============================================================ */
export function Contact({ content, locale }: { content: SiteContent; locale: Locale }) {
  const { settings, socials, contactSubjects } = content;
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const nextErrors: Record<string, string> = {};
    if (!data.name?.trim()) nextErrors.name = tr('common.required', locale);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? '')) {
      nextErrors.email = tr('form.invalidEmail', locale);
    }
    if ((data.message ?? '').trim().length < 10) nextErrors.message = tr('form.tooShort', locale);

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('failed');
      setState('success');
      form.reset();
      setTimeout(() => setState('idle'), 6000);
    } catch {
      setState('error');
    }
  };

  const inputClass =
    'w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[0.88rem] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]';

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title={tr('section.contact', locale)}
        subtitle={tr('section.contact.sub', locale)}
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        {/* Forma */}
        <Reveal>
          <form onSubmit={handleSubmit} className="card p-6 md:p-8" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-[0.78rem] font-medium text-[var(--text-soft)]">
                  {tr('form.name', locale)} <span className="text-[var(--danger)]">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={tr('form.namePlaceholder', locale)}
                  className={inputClass}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <FieldError text={errors.name} />}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-[0.78rem] font-medium text-[var(--text-soft)]">
                  {tr('form.email', locale)} <span className="text-[var(--danger)]">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={tr('form.emailPlaceholder', locale)}
                  className={inputClass}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <FieldError text={errors.email} />}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="subject" className="mb-2 block text-[0.78rem] font-medium text-[var(--text-soft)]">
                {tr('form.subject', locale)}
              </label>
              <select id="subject" name="subject" className={inputClass} defaultValue={t(contactSubjects[0], locale)}>
                {contactSubjects.map((s) => (
                  <option key={t(s, 'uz')} value={t(s, locale)}>
                    {t(s, locale)}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block text-[0.78rem] font-medium text-[var(--text-soft)]">
                {tr('form.message', locale)} <span className="text-[var(--danger)]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder={tr('form.messagePlaceholder', locale)}
                className={`${inputClass} resize-y`}
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message && <FieldError text={errors.message} />}
            </div>

            {/* Spam himoyasi (oddiy tuzoq) */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="pointer-events-none absolute h-0 w-0 opacity-0"
            />

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={state === 'sending'}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-[0.88rem] font-semibold text-[var(--accent-ink)] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={15} />
                {state === 'sending' ? tr('common.sending', locale) : tr('common.send', locale)}
              </button>

              <span className="inline-flex items-center gap-2 text-[0.76rem] text-[var(--text-muted)]">
                <Clock size={13} /> {tr('form.responseTime', locale)}
              </span>
            </div>

            {/* Natija */}
            {state === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 flex items-start gap-2.5 rounded-xl border border-[var(--success)] bg-[var(--surface-2)] p-4"
                role="status"
              >
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--success)]" />
                <p className="text-[0.85rem] text-[var(--text-soft)]">{tr('form.success', locale)}</p>
              </motion.div>
            )}

            {state === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 flex items-start gap-2.5 rounded-xl border border-[var(--danger)] bg-[var(--surface-2)] p-4"
                role="alert"
              >
                <AlertCircle size={16} className="mt-0.5 shrink-0 text-[var(--danger)]" />
                <p className="text-[0.85rem] text-[var(--text-soft)]">{tr('form.error', locale)}</p>
              </motion.div>
            )}
          </form>
        </Reveal>

        {/* Yon panel */}
        <div className="space-y-5">
          {/* G3 + G4 + G5 */}
          <StaggerGroup className="space-y-3">
            <motion.a
              variants={staggerItem}
              href={`mailto:${settings.email}`}
              className="card card-hover flex items-center gap-4 p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Mail size={17} />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.72rem] text-[var(--text-muted)]">
                  {tr('contact.emailMe', locale)}
                </span>
                <span className="block truncate text-[0.88rem] font-medium">{settings.email}</span>
              </span>
            </motion.a>

            <motion.a
              variants={staggerItem}
              href={settings.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover flex items-center gap-4 p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Calendar size={17} />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.72rem] text-[var(--text-muted)]">
                  {locale === 'uz' ? '30 daqiqalik bepul suhbat' : 'Free 30-minute call'}
                </span>
                <span className="block truncate text-[0.88rem] font-medium">
                  {tr('contact.bookCall', locale)}
                </span>
              </span>
            </motion.a>

            <motion.a
              variants={staggerItem}
              href={settings.resumeUrl}
              download
              className="card card-hover flex items-center gap-4 p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Download size={17} />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.72rem] text-[var(--text-muted)]">PDF</span>
                <span className="block truncate text-[0.88rem] font-medium">
                  {locale === 'uz' ? 'Rezyumeni yuklab olish' : 'Download resume'}
                </span>
              </span>
            </motion.a>
          </StaggerGroup>

          {/* G2 — Ijtimoiy tarmoqlar */}
          <Reveal delay={0.15}>
            <div className="card p-6">
              <h3 className="text-[0.78rem] font-semibold tracking-[0.12em] uppercase text-[var(--text-muted)]">
                {tr('contact.followMe', locale)}
              </h3>
              <div className="mt-4 grid gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[var(--surface-2)]"
                  >
                    <SocialIcon icon={s.icon} size={15} className="text-[var(--accent)]" />
                    <span className="flex-1 text-[0.85rem] font-medium text-[var(--text-soft)]">
                      {s.label}
                    </span>
                    <span className="font-mono text-[0.72rem] text-[var(--text-muted)]">{s.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* G9 — Javob va'dasi */}
          <Reveal delay={0.2}>
            <div className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-5">
              <Sparkles size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
              <p className="text-[0.83rem] leading-relaxed text-[var(--text-soft)]">
                {t(settings.responseTime, locale)}. {locale === 'uz'
                  ? "Loyihangiz haqida qancha ko'p yozsangiz, taklif shuncha aniq bo'ladi."
                  : 'The more you write about your project, the more precise my quote will be.'}
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* G8 — Manzil / xarita */}
      {settings.mapEmbedUrl && (
        <Reveal delay={0.1}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-5 py-3.5">
              <span className="inline-flex items-center gap-2 text-[0.85rem] font-medium">
                <MapPin size={14} className="text-[var(--accent)]" />
                {t(settings.location, locale)}
              </span>
              <span className="text-[0.75rem] text-[var(--text-muted)]">
                {locale === 'uz' ? 'Masofadan ishlashga tayyor' : 'Ready to work remotely'}
              </span>
            </div>
            <iframe
              src={settings.mapEmbedUrl}
              title="Map"
              loading="lazy"
              className="h-[280px] w-full border-0 grayscale-[0.35] transition-all hover:grayscale-0"
            />
          </div>
        </Reveal>
      )}
    </Section>
  );
}

function FieldError({ text }: { text: string }) {
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-[0.74rem] text-[var(--danger)]">
      <AlertCircle size={11} /> {text}
    </p>
  );
}

/* ============================================================
   G7 — Chaqiruv banneri
   ============================================================ */
export function CtaBanner({ content, locale }: { content: SiteContent; locale: Locale }) {
  const { settings } = content;
  return (
    <Section id="cta" tight>
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-9 text-center md:p-14">
          <div
            aria-hidden
            className="absolute inset-x-0 -top-32 mx-auto h-64 w-[70%] rounded-full"
            style={{ background: 'radial-gradient(ellipse, var(--glow-1), transparent 70%)' }}
          />
          <div className="relative">
            <h2 className="text-2xl font-semibold tracking-tight text-balance md:text-[2.1rem]">
              {tr('section.cta', locale)}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-[var(--text-muted)]">
              {tr('section.cta.sub', locale)}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-[var(--accent-ink)] transition-transform hover:scale-[1.03]"
              >
                <Send size={15} />
                {tr('hero.cta.contact', locale)}
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-7 py-3.5 text-sm font-semibold transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {settings.email}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
