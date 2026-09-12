import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { Reveal } from '../ui/Reveal';

/** Ichki sahifalar uchun sarlavha bloki */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  backHref,
  backLabel,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-[var(--border)] pt-28 pb-14">
      <div className="container-x">
        {backHref && backLabel && (
          <Link
            href={backHref}
            className="mb-6 inline-flex items-center gap-2 text-[0.8rem] font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
          >
            <ArrowLeft size={14} />
            {backLabel}
          </Link>
        )}
        <Reveal>
          {eyebrow && (
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[var(--accent)]">
              <span className="h-px w-6 bg-[var(--accent)]" />
              {eyebrow}
            </div>
          )}
          <h1 className="max-w-3xl text-[2.1rem] font-semibold tracking-tight text-balance md:text-[3rem] md:leading-[1.1]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-[var(--text-muted)]">
              {subtitle}
            </p>
          )}
          {children}
        </Reveal>
      </div>
    </header>
  );
}
