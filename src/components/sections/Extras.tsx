'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Bug, Gamepad2, MessageSquare, RotateCcw, Send, Sparkles, Trophy } from 'lucide-react';
import { formatDate, t, tr, type Locale } from '@/lib/i18n';
import type { SiteContent } from '@/lib/types';
import { Section, SectionHeading } from '../ui/Section';
import { Reveal, StaggerGroup, staggerItem } from '../ui/Reveal';

/* ============================================================
   I4 — Ishlatadigan vositalarim ("Uses")
   ============================================================ */
export function Uses({
  content,
  locale,
  heading = true,
}: {
  content: SiteContent;
  locale: Locale;
  heading?: boolean;
}) {
  return (
    <Section id="uses">
      {heading && (
        <SectionHeading
          eyebrow="Uses"
          title={tr('section.uses', locale)}
          subtitle={
            locale === 'uz'
              ? "Har kuni ishlatadigan jihozlar va dasturlar. Savolingiz bo'lsa — so'rang."
              : 'The gear and software I use daily. Ask me anything about them.'
          }
        />
      )}

      <StaggerGroup
        className={`${heading ? 'mt-12' : 'mt-0'} grid gap-4 sm:grid-cols-2 lg:grid-cols-3`}
      >
        {content.uses.map((tool) => (
          <motion.div key={tool.name} variants={staggerItem} className="card card-hover p-5">
            <span className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-[var(--accent)]">
              {t(tool.category, locale)}
            </span>
            <h3 className="mt-2.5 text-[0.95rem] font-semibold text-[var(--text)]">{tool.name}</h3>
            <p className="mt-1.5 text-[0.8rem] text-[var(--text-muted)]">
              {t(tool.description, locale)}
            </p>
          </motion.div>
        ))}
      </StaggerGroup>
    </Section>
  );
}

/* ============================================================
   I5 — Mehmonlar kitobi
   ============================================================ */
export function Guestbook({
  initial,
  locale,
  heading = true,
}: {
  initial: SiteContent['guestbook'];
  locale: Locale;
  heading?: boolean;
}) {
  const [entries, setEntries] = useState(initial);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [city, setCity] = useState('');
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || message.trim().length < 3) return;

    const entry = {
      name: name.trim(),
      message: message.trim(),
      city: city.trim() || undefined,
      date: new Date().toISOString().slice(0, 10),
    };
    setEntries((prev) => [entry, ...prev]);
    setName('');
    setMessage('');
    setCity('');
    setSent(true);
    setTimeout(() => setSent(false), 4000);

    // Bazaga saqlashga urinamiz (sozlanmagan bo'lsa jimgina o'tkazib yuboriladi)
    try {
      await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
    } catch {
      /* e'tiborsiz */
    }
  };

  const inputClass =
    'w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-[0.85rem] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]';

  return (
    <Section id="guestbook">
      {heading && (
        <SectionHeading
          eyebrow="Guestbook"
          title={tr('section.guestbook', locale)}
          subtitle={
            locale === 'uz'
              ? `Saytga kirganlar fikri — hozircha ${entries.length} ta ${tr('guestbook.entries', locale)}.`
              : `What visitors say — ${entries.length} ${tr('guestbook.entries', locale)} so far.`
          }
        />
      )}

      <div className={`${heading ? 'mt-12' : 'mt-0'} grid gap-8 lg:grid-cols-[1fr_1.3fr]`}>
        {/* Forma */}
        <Reveal>
          <form onSubmit={submit} className="card p-6">
            <h3 className="flex items-center gap-2 text-[0.9rem] font-semibold">
              <MessageSquare size={15} className="text-[var(--accent)]" />
              {tr('guestbook.leave', locale)}
            </h3>
            <div className="mt-5 space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={tr('guestbook.namePlaceholder', locale)}
                aria-label={tr('guestbook.namePlaceholder', locale)}
                className={inputClass}
                required
              />
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={tr('guestbook.cityPlaceholder', locale)}
                aria-label={tr('guestbook.cityPlaceholder', locale)}
                className={inputClass}
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder={tr('guestbook.messagePlaceholder', locale)}
                aria-label={tr('guestbook.messagePlaceholder', locale)}
                className={`${inputClass} resize-y`}
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-[0.85rem] font-semibold text-[var(--accent-ink)] transition-transform hover:scale-[1.02]"
            >
              <Send size={14} />
              {tr('common.send', locale)}
            </button>
            {sent && (
              <p className="mt-3 text-[0.78rem] text-[var(--success)]">{tr('guestbook.added', locale)}</p>
            )}
          </form>
        </Reveal>

        {/* Yozuvlar */}
        <div className="space-y-3">
          {entries.slice(0, 8).map((entry, i) => (
            <motion.div
              key={`${entry.name}-${entry.date}-${i}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
              className="card p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[0.85rem] font-semibold text-[var(--text)]">
                  {entry.name}
                  {entry.city && (
                    <span className="ml-2 text-[0.72rem] font-normal text-[var(--text-muted)]">
                      · {entry.city}
                    </span>
                  )}
                </span>
                <span className="font-mono text-[0.7rem] text-[var(--text-muted)]">
                  {formatDate(entry.date, locale)}
                </span>
              </div>
              <p className="mt-2.5 text-[0.85rem] leading-relaxed text-[var(--text-soft)]">
                {entry.message}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   I6 — Sayt yangilanishlari (changelog)
   ============================================================ */
export function Changelog({
  content,
  locale,
  heading = true,
}: {
  content: SiteContent;
  locale: Locale;
  heading?: boolean;
}) {
  return (
    <Section id="changelog">
      {heading && (
        <SectionHeading
          eyebrow="Changelog"
          title={tr('section.changelog', locale)}
          subtitle={
            locale === 'uz'
              ? "Bu saytning o'zi qanday o'zgarib borgani — ochiq va shaffof."
              : 'How this very site evolved — open and transparent.'
          }
        />
      )}

      <div className={`relative ${heading ? 'mt-12' : 'mt-0'}`}>
        <div className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-[var(--accent)] via-[var(--border)] to-transparent" />
        <div className="space-y-8">
          {content.changelog.map((release, i) => (
            <Reveal key={release.version} delay={i * 0.06}>
              <div className="relative pl-9 md:pl-12">
                <span className="absolute top-1.5 left-0 h-[15px] w-[15px] rounded-full border-2 border-[var(--accent)] bg-[var(--surface)]" />
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 font-mono text-[0.72rem] font-semibold text-[var(--accent)]">
                    v{release.version}
                  </span>
                  <span className="font-mono text-[0.74rem] text-[var(--text-muted)]">
                    {formatDate(release.date, locale)}
                  </span>
                </div>
                <ul className="mt-4 space-y-2">
                  {release.changes.map((change, ci) => (
                    <li
                      key={ci}
                      className="flex items-start gap-2.5 text-[0.85rem] leading-relaxed text-[var(--text-soft)]"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                      {t(change, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   I9 — Kichik o'yin: xatoni tuting
   ============================================================ */
export function MiniGame({ locale }: { locale: Locale }) {
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [pos, setPos] = useState({ x: 40, y: 40 });
  const [best, setBest] = useState(0);
  const areaRef = useRef<HTMLDivElement>(null);

  const moveBug = useCallback(() => {
    setPos({ x: 8 + Math.random() * 84, y: 8 + Math.random() * 78 });
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setPlaying(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    if (!playing) setBest((b) => Math.max(b, score));
  }, [playing, score]);

  const start = () => {
    setScore(0);
    setTimeLeft(15);
    setPlaying(true);
    moveBug();
  };

  const hit = () => {
    if (!playing) return;
    setScore((s) => s + 1);
    moveBug();
  };

  return (
    <Section id="game" tight>
      <SectionHeading
        eyebrow="Fun"
        title={tr('section.playground', locale)}
        subtitle={
          locale === 'uz'
            ? "15 sekundda qancha xatoni tuta olasiz? Yaxshi dasturchi xatoni tez topadi."
            : 'How many bugs can you catch in 15 seconds? A good developer finds bugs fast.'
        }
      />

      <Reveal delay={0.08}>
        <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
          {/* Holat qatori */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-5 py-4">
            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-2 text-[0.85rem]">
                <Bug size={15} className="text-[var(--accent)]" />
                <span className="text-[var(--text-muted)]">
                  {locale === 'uz' ? 'Hisob' : 'Score'}:
                </span>
                <span className="font-mono font-semibold tabular-nums">{score}</span>
              </span>
              <span className="inline-flex items-center gap-2 text-[0.85rem]">
                <span className="text-[var(--text-muted)]">
                  {locale === 'uz' ? 'Vaqt' : 'Time'}:
                </span>
                <span className="font-mono font-semibold tabular-nums">{timeLeft}s</span>
              </span>
              <span className="inline-flex items-center gap-2 text-[0.85rem]">
                <Trophy size={14} className="text-[var(--warning)]" />
                <span className="font-mono font-semibold tabular-nums">{best}</span>
              </span>
            </div>
            <button
              type="button"
              onClick={start}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 text-[0.8rem] font-semibold text-[var(--accent-ink)] transition-transform hover:scale-[1.03]"
            >
              {playing ? <RotateCcw size={13} /> : <Gamepad2 size={13} />}
              {playing
                ? locale === 'uz'
                  ? 'Qaytadan'
                  : 'Restart'
                : locale === 'uz'
                  ? 'Boshlash'
                  : 'Start'}
            </button>
          </div>

          {/* O'yin maydoni */}
          <div
            ref={areaRef}
            className="relative h-[300px] grid-bg select-none"
          >
            {playing ? (
              <motion.button
                type="button"
                onClick={hit}
                aria-label="Xatoni tuting"
                animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-[var(--danger)] text-white shadow-[var(--shadow-md)]"
              >
                <Bug size={20} />
              </motion.button>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                <Sparkles size={22} className="text-[var(--accent)]" />
                <p className="text-[0.9rem] text-[var(--text-soft)]">
                  {timeLeft === 0
                    ? locale === 'uz'
                      ? `Vaqt tugadi! Siz ${score} ta xatoni tutdingiz.`
                      : `Time is up! You caught ${score} bugs.`
                    : locale === 'uz'
                      ? 'Boshlash tugmasini bosing'
                      : 'Press start to play'}
                </p>
                {timeLeft === 0 && (
                  <p className="text-[0.78rem] text-[var(--text-muted)]">
                    {score >= 10
                      ? locale === 'uz'
                        ? 'Zo\'r natija! Siz haqiqiy debug ustasisiz.'
                        : 'Great result! You are a true debug master.'
                      : locale === 'uz'
                        ? 'Yana urinib ko\'ring — har safar tezroq bo\'ladi.'
                        : 'Try again — you get faster every time.'}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ============================================================
   D9 — Izohlar / muhokama kanali
   ============================================================ */
export function CommentsCta({ telegram, locale }: { telegram?: string; locale: Locale }) {
  if (!telegram) return null;
  return (
    <Section id="comments" tight>
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-7 md:flex-row md:items-center">
          <div>
            <h3 className="text-[1.05rem] font-semibold">
              {locale === 'uz' ? 'Fikringizni yozing' : 'Share your thoughts'}
            </h3>
            <p className="mt-2 max-w-lg text-[0.85rem] leading-relaxed text-[var(--text-muted)]">
              {locale === 'uz'
                ? "Savol yoki e'tirozingiz bo'lsa — Telegram kanalimda muhokama qilamiz. Har bir xabarni o'qiyman."
                : 'Questions or feedback? Let us discuss in my Telegram channel. I read every message.'}
            </p>
          </div>
          <a
            href={telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-[0.85rem] font-semibold text-[var(--accent-ink)] transition-transform hover:scale-[1.03]"
          >
            <MessageSquare size={15} />
            Telegram
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
