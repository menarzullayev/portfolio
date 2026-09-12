import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, tr } from '@/lib/i18n';
import { getPosts, getProjects } from '@/lib/data';
import { PageHeader } from '@/components/layout/PageHeader';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : 'uz';
  return { title: tr('footer.sitemap', lang), alternates: { canonical: `/${lang}/sitemap` } };
}

export default async function SitemapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);

  const groups = [
    {
      title: locale === 'uz' ? 'Asosiy' : 'Main',
      links: [
        { label: tr('nav.home', locale), href: `/${locale}` },
        { label: tr('nav.about', locale), href: `/${locale}#about` },
        { label: tr('nav.projects', locale), href: `/${locale}/projects` },
        { label: tr('nav.services', locale), href: `/${locale}#services` },
        { label: tr('nav.pricing', locale), href: `/${locale}#pricing` },
        { label: tr('nav.contact', locale), href: `/${locale}#contact` },
      ],
    },
    {
      title: locale === 'uz' ? 'Kontent' : 'Content',
      links: [
        { label: tr('blog.allPosts', locale), href: `/${locale}/blog` },
        ...posts.map((p) => ({
          label: p.title[locale],
          href: `/${locale}/blog/${p.slug}`,
        })),
      ],
    },
    {
      title: tr('projects.title', locale),
      links: projects.map((p) => ({
        label: p.title,
        href: `/${locale}/projects/${p.slug}`,
      })),
    },
    {
      title: locale === 'uz' ? 'Boshqa' : 'Other',
      links: [
        { label: tr('nav.uses', locale), href: `/${locale}/uses` },
        { label: tr('nav.now', locale), href: `/${locale}/now` },
        { label: tr('nav.guestbook', locale), href: `/${locale}/guestbook` },
        { label: tr('nav.changelog', locale), href: `/${locale}/changelog` },
        { label: tr('footer.privacy', locale), href: `/${locale}/privacy` },
        { label: tr('footer.terms', locale), href: `/${locale}/terms` },
        { label: 'RSS', href: `/${locale}/rss.xml` },
      ],
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Sitemap"
        title={tr('footer.sitemap', locale)}
        subtitle={
          locale === 'uz'
            ? "Saytdagi barcha sahifalar bir joyda."
            : 'Every page on the site in one place.'
        }
      />
      <section className="py-16">
        <div className="container-x grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-[0.75rem] font-semibold tracking-[0.14em] uppercase text-[var(--text-muted)]">
                {group.title}
              </h2>
              <ul className="mt-5 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.85rem] text-[var(--text-soft)] transition-colors hover:text-[var(--accent)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
