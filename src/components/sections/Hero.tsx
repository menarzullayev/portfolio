'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, Download, MapPin, MousePointerClick, Play, Volume2 } from 'lucide-react';
import { t, tr, type Locale } from '@/lib/i18n';
import type { SiteContent } from '@/lib/types';

/* ============================================================
   A1 — Hero (asosiy taqdimot)
   ============================================================ */
export function Hero({ content, locale }: { content: SiteContent; locale: Locale }) {
  const { settings, stats, socials } = content;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const words = t(settings.role, locale).split(' ');

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16"
    >
      <motion.div style={{ y, opacity }} className="container-x relative z-10 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr]">
          {/* Chap ustun */}
          <div>
            {/* Holat belgisi (A6) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--surface)] py-1.5 pl-2 pr-4"
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                    settings.availability === 'busy' ? 'bg-[var(--danger)]' : 'bg-[var(--success)]'
                  }`}
                />
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${
                    settings.availability === 'busy' ? 'bg-[var(--danger)]' : 'bg-[var(--success)]'
                  }`}
                />
              </span>
              <span className="text-[0.75rem] font-medium text-[var(--text-soft)]">
                {tr(`status.${settings.availability}`, locale)}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-[0.95rem] font-medium text-[var(--text-muted)]"
            >
              {tr('hero.greeting', locale)}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-2 text-[2.6rem] leading-[1.05] font-semibold tracking-tight sm:text-[3.4rem] lg:text-[4.2rem]"
            >
              <span className="gradient-text">{settings.name}</span>
            </motion.h1>

            {/* Kasb — so'zma-so'z paydo bo'ladi */}
            <h2 className="mt-4 flex flex-wrap items-baseline gap-x-2.5 text-xl font-medium text-[var(--text-soft)] sm:text-2xl">
              {words.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 max-w-xl text-[1.15rem] font-medium leading-snug text-[var(--text-soft)]"
            >
              {t(settings.tagline, locale)}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.56 }}
              className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-[var(--text-muted)]"
            >
              {t(settings.shortBio, locale)}
            </motion.p>

            {/* Tugmalar */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-[var(--accent-ink)] shadow-[var(--shadow-md)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                {tr('hero.cta.work', locale)}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-6 py-3.5 text-sm font-semibold text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {tr('hero.cta.contact', locale)}
              </Link>
              <a
                href={settings.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
              >
                <Download size={15} />
                CV
              </a>
            </motion.div>

            {/* Manzil va ijtimoiy tarmoqlar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.8rem] text-[var(--text-muted)]"
            >
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} /> {t(settings.location, locale)}
              </span>
              <a
                href={settings.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-[var(--accent)]"
              >
                <Calendar size={14} /> {tr('contact.bookCall', locale)}
              </a>
              <VoiceIntro url={settings.voiceIntroUrl} locale={locale} />
            </motion.div>
          </div>

          {/* O'ng ustun — statistika kartasi */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[var(--shadow-float)]">
              <div
                aria-hidden
                className="absolute -top-20 -right-16 h-52 w-52 rounded-full"
                style={{ background: 'radial-gradient(circle, var(--glow-1), transparent 70%)' }}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-[0.7rem] font-semibold tracking-[0.16em] uppercase text-[var(--text-muted)]">
                    {tr('section.stats', locale)}
                  </span>
                  <span className="font-mono text-[0.7rem] text-[var(--text-muted)]">
                    {settings.heroBadge
                      ? t(settings.heroBadge, locale)
                      : `${settings.yearsExperience}+ yil`}
                  </span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-6">
                  {stats.slice(0, 4).map((s, i) => (
                    <motion.div
                      key={s.value}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.55 + i * 0.08 }}
                    >
                      <div className="text-2xl font-semibold tracking-tight text-[var(--text)]">
                        {s.value}
                      </div>
                      <div className="mt-1 text-[0.75rem] leading-snug text-[var(--text-muted)]">
                        {t(s.label, locale)}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-2 border-t border-[var(--border)] pt-6">
                  {socials.slice(0, 5).map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chip transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Suzuvchi kichik karta */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute -bottom-16 -left-6 hidden items-center gap-2.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 shadow-[var(--shadow-md)] sm:flex"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <MousePointerClick size={15} />
              </span>
              <div>
                <div className="text-[0.7rem] font-semibold">{tr('section.terminal', locale)}</div>
                <div className="font-mono text-[0.65rem] text-[var(--text-muted)]">→ #terminal</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Pastga suring belgisi */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-16 hidden items-center gap-3 text-[0.72rem] tracking-[0.16em] uppercase text-[var(--text-muted)] lg:flex"
        >
          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block h-8 w-px bg-gradient-to-b from-[var(--accent)] to-transparent"
          />
          {tr('hero.scroll', locale)}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   A3 — Aylanuvchi texnologiya tasmasi
   ============================================================ */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="marquee-mask border-y border-[var(--border)] bg-[var(--bg-soft)] py-5">
      <div className="marquee-track items-center gap-10">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-10 text-[0.95rem] font-medium whitespace-nowrap text-[var(--text-muted)]"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-[var(--accent)] opacity-60" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   A5 — Qisqa tanishtiruv videosi
   ============================================================ */
export function IntroVideo({ url, locale }: { url?: string; locale: Locale }) {
  const [playing, setPlaying] = useState(false);
  if (!url) return null;

  return (
    <section className="container-x py-10">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
        {playing ? (
          <video
            src={url}
            controls
            autoPlay
            className="aspect-video w-full bg-black"
            poster="/images/video-poster.svg"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative flex aspect-video w-full items-center justify-center bg-[var(--surface-2)]"
            aria-label="Videoni ochish"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)] transition-transform group-hover:scale-110">
              <Play size={22} className="ml-0.5" />
            </span>
            <span className="absolute bottom-6 left-6 text-left">
              <span className="block text-[0.7rem] tracking-[0.16em] uppercase text-[var(--text-muted)]">
                {locale === 'uz' ? '60 soniyada tanishuv' : 'Intro in 60 seconds'}
              </span>
            </span>
          </button>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   I8 — Ovozli tanishtiruv
   ============================================================ */
export function VoiceIntro({ url, locale }: { url?: string; locale: Locale }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnd = () => setPlaying(false);
    audio.addEventListener('ended', onEnd);
    return () => audio.removeEventListener('ended', onEnd);
  }, []);

  if (!url) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      void audio.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={url} preload="none" />
      <button
        type="button"
        onClick={toggle}
        className="inline-flex items-center gap-2 transition-colors hover:text-[var(--accent)]"
      >
        <Volume2 size={14} className={playing ? 'text-[var(--accent)]' : ''} />
        {locale === 'uz' ? 'Ovozimni eshiting' : 'Hear my voice'}
      </button>
    </>
  );
}
