'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Languages } from 'lucide-react';
import { LOCALES, localeShort, type Locale } from '@/lib/i18n';

/** Til almashtirgich — joriy sahifani saqlab qoladi */
export function LocaleSwitcher({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const pathname = usePathname() || `/${locale}`;

  const hrefFor = (next: Locale) => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return `/${next}`;
    segments[0] = next;
    return `/${segments.join('/')}`;
  };

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-0.5"
      role="group"
      aria-label="Til tanlash"
    >
      {!compact && <Languages size={13} className="ml-1.5 text-[var(--text-muted)]" aria-hidden />}
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={hrefFor(code)}
            prefetch={false}
            aria-current={active ? 'true' : undefined}
            className={`rounded-full px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide transition-colors ${
              active
                ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            {localeShort[code]}
          </Link>
        );
      })}
    </div>
  );
}
