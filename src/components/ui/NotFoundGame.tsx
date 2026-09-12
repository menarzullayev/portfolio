'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Ghost, RotateCcw, Trophy } from 'lucide-react';

/**
 * I3 — 404 sahifasidagi kichik o'yin.
 * "Yo'qolgan sahifani top" — kursor ostidagi yashirin havola.
 */
export function NotFoundGame() {
  const [found, setFound] = useState(false);
  const [score, setScore] = useState(0);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [started, setStarted] = useState(false);

  const move = useCallback(() => {
    setPos({ x: 10 + Math.random() * 80, y: 12 + Math.random() * 72 });
  }, []);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => setStarted(false), 12000);
    return () => clearTimeout(timer);
  }, [started]);

  const catchIt = () => {
    setScore((s) => s + 1);
    if (score + 1 >= 3) {
      setFound(true);
      setStarted(false);
    } else {
      move();
    }
  };

  if (found) {
    return (
      <div className="rounded-2xl border border-[var(--success)] bg-[var(--surface-2)] p-6 text-center">
        <Trophy size={20} className="mx-auto text-[var(--warning)]" />
        <p className="mt-3 text-[0.9rem] font-medium">
          Topdingiz! Sahifa yo'qolgan, lekin siz izlanishdan to'xtamadingiz.
        </p>
        <p className="mt-2 text-[0.8rem] text-[var(--text-muted)]">
          Xuddi kodda xato izlagandek — sabr qilgan yutadi.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[0.85rem] text-[var(--text-soft)]">
          Xato sahifada o‘yin o‘ynaysizmi? <span className="text-[var(--text-muted)]">3 ta yo‘qolgan sahifani tuting.</span>
        </p>
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.8rem] tabular-nums">
          <Ghost size={13} className="text-[var(--accent)]" /> {score}/3
        </span>
      </div>

      <div className="relative mt-5 h-[200px] overflow-hidden rounded-xl border border-[var(--border)] grid-bg">
        {started ? (
          <motion.button
            type="button"
            onClick={catchIt}
            aria-label="Sahifani tuting"
            animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--accent-ink)]"
          >
            <Ghost size={17} />
          </motion.button>
        ) : (
          <div className="flex h-full items-center justify-center">
            <button
              type="button"
              onClick={() => {
                setScore(0);
                setStarted(true);
                move();
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-[0.82rem] font-semibold text-[var(--accent-ink)]"
            >
              <RotateCcw size={13} /> O‘ynash
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
