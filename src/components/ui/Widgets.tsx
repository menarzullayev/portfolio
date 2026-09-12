'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Cookie, MessageCircle, Send, X } from 'lucide-react';

/* ============================================================
   Yuqoriga qaytish tugmasi
   ============================================================ */
export function BackToTop({ label }: { label: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={label}
          title={label}
          className="fixed bottom-6 left-6 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-soft)] shadow-[var(--shadow-md)] transition-colors hover:text-[var(--accent)]"
        >
          <ArrowUp size={17} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   Suzuvchi aloqa tugmasi (Telegram / WhatsApp)
   ============================================================ */
export function FloatingContact({ telegram, whatsapp }: { telegram?: string; whatsapp?: string }) {
  const [open, setOpen] = useState(false);
  if (!telegram && !whatsapp) return null;

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-2.5">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.94 }}
            className="flex flex-col items-end gap-2"
          >
            {telegram && (
              <a
                href={telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-xs font-medium shadow-[var(--shadow-md)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <Send size={13} /> Telegram
              </a>
            )}
            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-xs font-medium shadow-[var(--shadow-md)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <MessageCircle size={13} /> WhatsApp
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Aloqa"
        aria-expanded={open}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)] shadow-[var(--shadow-float)] transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X size={19} /> : <MessageCircle size={19} />}
      </button>
    </div>
  );
}

/* ============================================================
   Cookie ogohlantirishi
   ============================================================ */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem('cookie-consent')) {
        const timer = setTimeout(() => setVisible(true), 1400);
        return () => clearTimeout(timer);
      }
    } catch {
      /* localStorage mavjud bo'lmasa — ko'rsatmaymiz */
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem('cookie-consent', new Date().toISOString());
    } catch {
      /* e'tiborsiz */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className="fixed inset-x-4 bottom-4 z-[65] mx-auto max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-float)] md:left-1/2 md:-translate-x-1/2"
          role="dialog"
          aria-label="Cookie"
        >
          <div className="flex items-start gap-3">
            <Cookie size={18} className="mt-0.5 shrink-0 text-[var(--accent)]" />
            <div className="flex-1">
              <p className="text-sm leading-relaxed text-[var(--text-soft)]">
                Sayt ishlashini yaxshilash uchun cookie fayllardan foydalanadi. Davom etsangiz,
                bunga rozilik bildirasiz.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={accept}
                  className="rounded-lg bg-[var(--accent)] px-3.5 py-1.5 text-xs font-semibold text-[var(--accent-ink)]"
                >
                  Roziman
                </button>
                <Link
                  href="/uz/privacy"
                  className="text-xs text-[var(--text-muted)] underline underline-offset-4 hover:text-[var(--text)]"
                >
                  Batafsil
                </Link>
              </div>
            </div>
            <button
              type="button"
              onClick={accept}
              aria-label="Yopish"
              className="text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   Yashirin hazil (Easter egg) — "↑↑↓↓←→←→BA" kodi
   ============================================================ */
export function EasterEgg() {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const code = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a',
    ];
    let index = 0;

    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === code[index]) {
        index += 1;
        if (index === code.length) {
          index = 0;
          setTriggered(true);
          setTimeout(() => setTriggered(false), 5200);
        }
      } else {
        index = key === code[0] ? 1 : 0;
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <AnimatePresence>
      {triggered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setTriggered(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="mx-4 max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center"
          >
            <div className="text-4xl">🎉</div>
            <h3 className="mt-3 text-lg font-semibold">Konami kodini topdingiz!</h3>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Diqqatingiz uchun rahmat. Siz haqiqiy izlanuvchisiz — kod ham, odam ham shunday
              bo'lishi kerak.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
