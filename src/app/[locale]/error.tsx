'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

/**
 * Xato chegarasi.
 * Sahifa renderida kutilmagan xato bo'lsa foydalanuvchi bo'sh ekran emas,
 * tushunarli xabar va chiqish yo'lini ko'radi.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Xatoni kuzatuv tizimiga yuborish mumkin (Sentry va h.k.)
    console.error('[sahifa xatosi]', error);
  }, [error]);

  return (
    <div className="flex min-h-[70svh] items-center py-24">
      <div className="container-x">
        <div className="mx-auto max-w-lg text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--danger)]/12 text-[var(--danger)]">
            <AlertTriangle size={24} />
          </span>

          <h1 className="mt-6 text-2xl font-semibold tracking-tight md:text-3xl">
            Nimadir xato ketdi
          </h1>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--text-muted)]">
            Sahifani yuklashda kutilmagan xatolik yuz berdi. Bu vaqtinchalik bo‘lishi mumkin —
            qayta urinib ko‘ring.
          </p>

          {error.digest && (
            <p className="mt-4 font-mono text-[0.72rem] text-[var(--text-muted)]">
              Xato kodi: {error.digest}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-ink)] transition-transform hover:scale-[1.03]"
            >
              <RefreshCw size={15} />
              Qayta urinish
            </button>
            <Link
              href="/uz"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-6 py-3 text-sm font-semibold transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <Home size={15} />
              Bosh sahifa
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
