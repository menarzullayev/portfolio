import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  tight?: boolean;
}

/** Sahifa bo'limi uchun umumiy o'ram */
export function Section({ id, children, className = '', tight = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative ${tight ? 'py-12 md:py-16' : 'py-16 md:py-24'} ${className}`}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}

interface HeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'left', children }: HeadingProps) {
  const centered = align === 'center';
  return (
    <Reveal className={centered ? 'text-center' : ''}>
      {eyebrow && (
        <div
          className={`mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[var(--accent)] ${
            centered ? 'justify-center' : ''
          }`}
        >
          <span className="h-px w-6 bg-[var(--accent)]" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-[2.5rem] md:leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 max-w-2xl text-[0.975rem] leading-relaxed text-[var(--text-muted)] ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
      {children}
    </Reveal>
  );
}
