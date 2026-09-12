'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, Sparkles, X } from 'lucide-react';
import { tr, type Locale } from '@/lib/i18n';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LocaleSwitcher } from '../ui/LocaleSwitcher';

export interface NavItem {
  id: string;
  labelKey: string;
  href: string;
}

const primaryItems: NavItem[] = [
  { id: 'about', labelKey: 'nav.about', href: '#about' },
  { id: 'skills', labelKey: 'nav.skills', href: '#skills' },
  { id: 'experience', labelKey: 'nav.experience', href: '#experience' },
  { id: 'projects', labelKey: 'nav.projects', href: '#projects' },
  { id: 'services', labelKey: 'nav.services', href: '#services' },
  { id: 'blog', labelKey: 'nav.blog', href: '#blog' },
  { id: 'pricing', labelKey: 'nav.pricing', href: '#pricing' },
  { id: 'faq', labelKey: 'nav.faq', href: '#faq' },
];

const secondaryItems: NavItem[] = [
  { id: 'now', labelKey: 'nav.now', href: '#now' },
  { id: 'uses', labelKey: 'nav.uses', href: '#uses' },
  { id: 'guestbook', labelKey: 'nav.guestbook', href: '#guestbook' },
  { id: 'changelog', labelKey: 'nav.changelog', href: '#changelog' },
];

export function Navbar({
  locale,
  name,
  initials,
}: {
  locale: Locale;
  name: string;
  initials: string;
}) {
  const pathname = usePathname() || '';
  // Bosh sahifadami? Faqat shu yerda bo'limlarga o'tish va faol bo'lim belgisi mantiqiy
  const onHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Faol bo'limni kuzatish
  useEffect(() => {
    if (!onHome) return;
    const ids = [...primaryItems, ...secondaryItems, { id: 'contact' }].map((i) => i.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const anchor = (hash: string) => (onHome ? hash : `/${locale}${hash}`);

  const labelFor = (key: string) => tr(key, locale);

  const visiblePrimary = onHome ? primaryItems : primaryItems.slice(3);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[68] transition-all duration-300 ${
          scrolled
            ? 'border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between gap-4">
          {/* Logotip */}
          <Link
            href={`/${locale}`}
            className="group flex items-center gap-2.5"
            aria-label={name}
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-[0.8rem] font-bold text-[var(--accent-ink)] transition-transform group-hover:scale-105">
              {initials}
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">{name}</span>
          </Link>

          {/* Asosiy menyu */}
          <div className="hidden items-center gap-0.5 xl:flex">
            {visiblePrimary.map((item) => {
              const isActive = active === item.id;
              return (
                <Link
                  key={item.href}
                  href={anchor(item.href)}
                  className={`relative rounded-lg px-3 py-2 text-[0.82rem] font-medium transition-colors ${
                    isActive
                      ? 'text-[var(--text)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {labelFor(item.labelKey)}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-[var(--accent)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* "Yana" menyusi */}
            <div
              className="relative"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-[0.82rem] font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
              >
                {labelFor('nav.more')}
                <ChevronDown
                  size={13}
                  className={`transition-transform ${moreOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16 }}
                    className="absolute right-0 top-full w-52 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-[var(--shadow-float)]"
                  >
                    {secondaryItems.map((item) => (
                      <Link
                        key={item.href}
                        href={anchor(item.href)}
                        onClick={() => setMoreOpen(false)}
                        className="block rounded-lg px-3 py-2 text-[0.82rem] text-[var(--text-soft)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
                      >
                        {labelFor(item.labelKey)}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* O'ng tomon */}
          <div className="flex items-center gap-2">
            <LocaleSwitcher locale={locale} />
            <ThemeToggle />
            <Link
              href={anchor('#contact')}
              className="hidden items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 py-2 text-[0.8rem] font-semibold text-[var(--accent-ink)] transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              <Sparkles size={13} />
              {tr('nav.contact', locale)}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={tr('nav.menu', locale)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] xl:hidden"
            >
              <Menu size={17} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobil menyu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[69] bg-[var(--bg)]/95 backdrop-blur-xl xl:hidden"
          >
            <div className="container-x flex h-16 items-center justify-between">
              <span className="text-sm font-semibold">{name}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={tr('nav.close', locale)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)]"
              >
                <X size={17} />
              </button>
            </div>
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
              className="container-x mt-4 flex flex-col gap-1 overflow-y-auto pb-16"
            >
              {[...primaryItems, ...secondaryItems].map((item) => (
                <motion.div
                  key={`${item.href}-${item.labelKey}`}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={anchor(item.href)}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-lg font-medium text-[var(--text-soft)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
                  >
                    {labelFor(item.labelKey)}
                  </Link>
                </motion.div>
              ))}
              <Link
                href={anchor('#contact')}
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-3.5 text-base font-semibold text-[var(--accent-ink)]"
              >
                <Sparkles size={15} /> {tr('nav.contact', locale)}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
