'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

/** Qorong'i / yorqin rejim almashtirgichi */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Yorqin rejimga o‘tish' : 'Qorong‘i rejimga o‘tish'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-soft)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text)] ${className}`}
    >
      {mounted && (
        <span className="relative block h-4 w-4">
          <Sun
            size={16}
            className={`absolute inset-0 transition-all duration-300 ${
              isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
            }`}
          />
          <Moon
            size={16}
            className={`absolute inset-0 transition-all duration-300 ${
              isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
            }`}
          />
        </span>
      )}
    </button>
  );
}
