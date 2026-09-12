import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { tr, t, type Locale } from '@/lib/i18n';
import type { SiteContent } from '@/lib/types';
import { SocialIcon } from '../ui/SocialIcon';

export function Footer({ content, locale }: { content: SiteContent; locale: Locale }) {
  const { settings, socials } = content;
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: tr('nav.about', locale), href: `/${locale}#about` },
    { label: tr('nav.projects', locale), href: `/${locale}#projects` },
    { label: tr('nav.services', locale), href: `/${locale}#services` },
    { label: tr('nav.blog', locale), href: `/${locale}/blog` },
    { label: tr('nav.pricing', locale), href: `/${locale}#pricing` },
    { label: tr('nav.contact', locale), href: `/${locale}#contact` },
  ];

  const moreLinks = [
    { label: tr('nav.uses', locale), href: `/${locale}/uses` },
    { label: tr('nav.now', locale), href: `/${locale}/now` },
    { label: tr('nav.guestbook', locale), href: `/${locale}/guestbook` },
    { label: tr('nav.changelog', locale), href: `/${locale}/changelog` },
    { label: tr('footer.sitemap', locale), href: `/${locale}/sitemap` },
  ];

  return (
    <footer className="relative mt-10 border-t border-[var(--border)] bg-[var(--bg-soft)]">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brend */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-[0.8rem] font-bold text-[var(--accent-ink)]">
                {settings.initials}
              </span>
              <span className="text-sm font-semibold">{settings.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-[0.85rem] leading-relaxed text-[var(--text-muted)]">
              {t(settings.shortBio, locale)}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <SocialIcon icon={s.icon} size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Tezkor havolalar */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.14em] uppercase text-[var(--text)]">
              {tr('footer.quickLinks', locale)}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.85rem] text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Yana */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.14em] uppercase text-[var(--text)]">
              {tr('nav.more', locale)}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {moreLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.85rem] text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Aloqa */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.14em] uppercase text-[var(--text)]">
              {tr('section.contact', locale)}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="group inline-flex items-start gap-2.5 text-[0.85rem] text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
                >
                  <Mail size={15} className="mt-0.5 shrink-0" />
                  <span className="break-all">{settings.email}</span>
                  <ArrowUpRight
                    size={13}
                    className="mt-0.5 opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[0.85rem] text-[var(--text-muted)]">
                <MapPin size={15} className="mt-0.5 shrink-0" />
                {t(settings.location, locale)}
              </li>
            </ul>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  settings.availability === 'available'
                    ? 'bg-[var(--success)]'
                    : settings.availability === 'busy'
                      ? 'bg-[var(--danger)]'
                      : 'bg-[var(--warning)]'
                }`}
              />
              <span className="text-[0.72rem] font-medium text-[var(--text-soft)]">
                {t(settings.availabilityNote, locale)}
              </span>
            </div>
          </div>
        </div>

        {/* Pastki qator */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-6 md:flex-row">
          <p className="text-[0.78rem] text-[var(--text-muted)]">
            © {year} {settings.name}. {tr('footer.rights', locale)}.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              href={`/${locale}/privacy`}
              className="text-[0.78rem] text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              {tr('footer.privacy', locale)}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-[0.78rem] text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              {tr('footer.terms', locale)}
            </Link>
            <Link
              href={`/${locale}/rss.xml`}
              className="text-[0.78rem] text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              RSS
            </Link>
            <span className="text-[0.78rem] text-[var(--text-muted)]">
              {tr('footer.builtWith', locale)}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
