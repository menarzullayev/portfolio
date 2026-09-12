'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Github, Layers, Star, TrendingUp } from 'lucide-react';
import { t, tr, type Locale } from '@/lib/i18n';
import type { Project } from '@/lib/types';
import { Section, SectionHeading } from '../ui/Section';
import { Reveal } from '../ui/Reveal';

const categories: (Project['category'] | 'all')[] = ['all', 'fullstack', 'frontend', 'backend', 'mobile', 'ai'];

/* ============================================================
   C1 + C3 — Loyihalar galereyasi va kategoriya filtri
   ============================================================ */
export function Projects({
  projects,
  locale,
  limit,
  heading = true,
}: {
  projects: Project[];
  locale: Locale;
  limit?: number;
  heading?: boolean;
}) {
  const [filter, setFilter] = useState<Project['category'] | 'all'>('all');

  const visible = useMemo(() => {
    const list = projects.filter((p) => filter === 'all' || p.category === filter);
    return limit ? list.slice(0, limit) : list;
  }, [projects, filter, limit]);

  return (
    <Section id="projects">
      {heading && (
        <SectionHeading
          eyebrow="Work"
          title={tr('section.projects', locale)}
          subtitle={tr('section.projects.sub', locale)}
        />
      )}

      {/* C3 — Filtr */}
      <Reveal delay={0.05}>
        <div className={`${heading ? 'mt-8' : ''} no-scrollbar flex gap-2 overflow-x-auto pb-1`}>
          {categories.map((cat) => {
            const active = filter === cat;
            const count =
              cat === 'all' ? projects.length : projects.filter((p) => p.category === cat).length;
            if (count === 0) return null;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[0.76rem] font-medium transition-colors ${
                  active
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]'
                    : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]'
                }`}
              >
                {tr(`cat.${cat}`, locale)}
                <span className={`font-mono text-[0.68rem] ${active ? 'opacity-70' : 'opacity-50'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Galereya */}
      <motion.div
        layout
        className={`${heading ? 'mt-9' : 'mt-0'} grid gap-6 md:grid-cols-2 lg:grid-cols-3`}
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <ProjectCard key={project.slug} project={project} locale={locale} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="mt-10 text-center text-sm text-[var(--text-muted)]">
          {tr('projects.empty', locale)}
        </p>
      )}

      {limit && projects.length > limit && (
        <Reveal delay={0.1}>
          <div className="mt-12 text-center">
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {tr('common.viewAll', locale)}
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </Reveal>
      )}
    </Section>
  );
}

/* ============================================================
   Loyiha kartochkasi
   ============================================================ */
function ProjectCard({
  project,
  locale,
  index,
}: {
  project: Project;
  locale: Locale;
  index: number;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.42, delay: Math.min(index * 0.05, 0.25) }}
      className="card card-hover group flex flex-col overflow-hidden"
    >
      {/* Muqova */}
      <Link href={`/${locale}/projects/${project.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-[var(--surface-2)]">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-[var(--surface)]/90 px-2.5 py-1 text-[0.68rem] font-semibold backdrop-blur">
          {tr(`cat.${project.category}`, locale)}
        </span>
        {project.source === 'github' && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-[var(--surface)]/90 px-2.5 py-1 text-[0.68rem] font-medium backdrop-blur">
            <Github size={11} />
            {project.stars ?? 0}
          </span>
        )}
      </Link>

      {/* Tarkib */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[1rem] font-semibold leading-snug text-[var(--text)]">
            <Link href={`/${locale}/projects/${project.slug}`} className="hover:text-[var(--accent)]">
              {project.title}
            </Link>
          </h3>
          <span className="font-mono text-[0.7rem] text-[var(--text-muted)]">{project.year}</span>
        </div>

        <p className="mt-2.5 flex-1 text-[0.84rem] leading-relaxed text-[var(--text-muted)]">
          {t(project.summary, locale)}
        </p>

        {/* C8 — O'lchanadigan natijalar */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--border)] pt-4">
            {project.metrics.map((m, mi) => (
              <div key={mi} className="flex items-center gap-1.5">
                <TrendingUp size={12} className="text-[var(--accent)]" />
                <span className="text-[0.82rem] font-semibold text-[var(--text)]">{m.value}</span>
                <span className="text-[0.72rem] text-[var(--text-muted)]">{t(m.label, locale)}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Link
            href={`/${locale}/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-[var(--accent)] transition-transform hover:translate-x-0.5"
          >
            {tr('common.viewProject', locale)}
            <ArrowUpRight size={13} />
          </Link>
          {project.links.map((link) => (
            <a
              key={link.url + link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.78rem] text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ============================================================
   C9 — Ilova do'konlari havolalari
   ============================================================ */
export function AppLinks({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const apps = projects.filter((p) =>
    p.links.some((l) => /play|app store|appstore/i.test(l.label)),
  );
  if (apps.length === 0) return null;

  return (
    <Section id="apps" tight>
      <SectionHeading eyebrow="Apps" title={tr('section.apps', locale)} />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => (
          <Reveal key={app.slug}>
            <div className="card flex items-center gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Layers size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[0.9rem] font-semibold">{app.title}</h3>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {app.links
                    .filter((l) => /play|app store|appstore/i.test(l.label))
                    .map((l) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[0.74rem] font-medium text-[var(--accent)] hover:underline"
                      >
                        {l.label} <ArrowUpRight size={11} />
                      </a>
                    ))}
                </div>
              </div>
              {app.metrics?.[0] && (
                <div className="shrink-0 text-right">
                  <div className="inline-flex items-center gap-1 text-[0.82rem] font-semibold">
                    <Star size={12} className="text-[var(--warning)]" />
                    {app.metrics[0].value}
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
