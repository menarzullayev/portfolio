import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Github, Star, TrendingUp } from 'lucide-react';
import { isLocale, t, tr } from '@/lib/i18n';
import { getProject, getProjects } from '@/lib/data';
import { Reveal } from '@/components/ui/Reveal';

// Kontent admin panelda boshqariladi — har sorovda yangi malumot olinadi.
// Statik keshlash admin ozgarishlarini korinmas qilib qoyadi.
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang = isLocale(locale) ? locale : 'uz';
  const project = await getProject(slug);
  if (!project) return { title: '404' };

  // Ijtimoiy tarmoq kartasi (Telegram, LinkedIn uchun PNG)
  const ogImage = `/images/og/loyiha-${project.slug}.png`;

  return {
    title: project.title,
    description: t(project.summary, lang),
    alternates: {
      canonical: `/${lang}/projects/${project.slug}`,
      languages: { uz: `/uz/projects/${project.slug}`, en: `/en/projects/${project.slug}` },
    },
    openGraph: {
      type: 'article',
      title: project.title,
      description: t(project.summary, lang),
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: t(project.summary, lang),
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const project = await getProject(slug);
  if (!project) notFound();

  const all = await getProjects();
  const others = all.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <article className="pt-28 pb-16">
        <div className="container-x">
          <Link
            href={`/${locale}/projects`}
            className="mb-8 inline-flex items-center gap-2 text-[0.8rem] font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
          >
            <ArrowLeft size={14} />
            {tr('projects.title', locale)}
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <div>
              <span className="chip">{tr(`cat.${project.category}`, locale)}</span>
              <h1 className="mt-4 text-[2rem] font-semibold tracking-tight text-balance md:text-[2.7rem] md:leading-[1.1]">
                {project.title}
              </h1>
              <p className="mt-5 text-[1rem] leading-relaxed text-[var(--text-muted)]">
                {t(project.summary, locale)}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.links.map((link) => (
                  <a
                    key={link.url + link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-[0.83rem] font-semibold text-[var(--accent-ink)] transition-transform hover:scale-[1.03]"
                  >
                    {link.label}
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Yon panel */}
            <div className="card p-6">
              <dl className="space-y-5">
                <div>
                  <dt className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-[var(--text-muted)]">
                    {tr('common.year', locale)}
                  </dt>
                  <dd className="mt-1.5 font-mono text-[0.9rem]">{project.year}</dd>
                </div>
                <div>
                  <dt className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-[var(--text-muted)]">
                    {tr('projects.tech', locale)}
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </dd>
                </div>
                {project.repo && (
                  <div>
                    <dt className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-[var(--text-muted)]">
                      Repo
                    </dt>
                    <dd className="mt-1.5 flex items-center gap-3 text-[0.85rem]">
                      <a
                        href={`https://github.com/${project.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline"
                      >
                        <Github size={13} /> {project.repo}
                      </a>
                      {typeof project.stars === 'number' && (
                        <span className="inline-flex items-center gap-1 text-[var(--text-muted)]">
                          <Star size={12} /> {project.stars}
                        </span>
                      )}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          {/* Muqova */}
          <Reveal delay={0.1}>
            <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Tavsif */}
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 className="text-[0.75rem] font-semibold tracking-[0.14em] uppercase text-[var(--text-muted)]">
                {tr('projects.solution', locale)}
              </h2>
              <p className="mt-4 text-[1rem] leading-[1.85] text-[var(--text-soft)]">
                {t(project.description, locale)}
              </p>
            </div>

            {project.metrics && project.metrics.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-[0.75rem] font-semibold tracking-[0.14em] uppercase text-[var(--text-muted)]">
                  {tr('projects.result', locale)}
                </h2>
                {project.metrics.map((m, i) => (
                  <div key={i} className="card p-5">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={14} className="text-[var(--accent)]" />
                      <span className="text-xl font-semibold tracking-tight">{m.value}</span>
                    </div>
                    <div className="mt-1.5 text-[0.78rem] text-[var(--text-muted)]">
                      {t(m.label, locale)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Boshqa loyihalar */}
      {others.length > 0 && (
        <section className="border-t border-[var(--border)] py-16">
          <div className="container-x">
            <h2 className="text-sm font-semibold tracking-[0.12em] uppercase text-[var(--text-muted)]">
              {tr('section.projects', locale)}
            </h2>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {others.map((item) => (
                <Reveal key={item.slug}>
                  <Link href={`/${locale}/projects/${item.slug}`} className="card card-hover block h-full p-6">
                    <span className="chip">{tr(`cat.${item.category}`, locale)}</span>
                    <h3 className="mt-3 text-[1rem] font-semibold hover:text-[var(--accent)]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[0.84rem] leading-relaxed text-[var(--text-muted)]">
                      {t(item.summary, locale)}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
