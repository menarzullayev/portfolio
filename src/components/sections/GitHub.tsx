'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, GitFork, Star } from 'lucide-react';
import { t, tr, type Locale } from '@/lib/i18n';
import type { GitHubStats } from '@/lib/github';
import type { SiteContent } from '@/lib/types';
import { Section, SectionHeading } from '../ui/Section';
import { Reveal, StaggerGroup, staggerItem } from '../ui/Reveal';

/**
 * C4 — GitHub faoliyati.
 * Faqat haqiqiy ma'lumot: repolar ro'yxati va tillar taqsimoti.
 * Yulduz yoki kuzatuvchi soni nolga teng bo'lsa — ko'rsatilmaydi.
 */
export function GitHubActivity({
  stats,
  username,
  locale,
}: {
  stats: GitHubStats | null;
  username?: string;
  locale: Locale;
}) {
  const repos = stats?.repos ?? [];
  const hasRepos = repos.length > 0;

  if (!stats || !hasRepos) {
    return (
      <Section id="github" tight>
        <SectionHeading
          eyebrow="GitHub"
          title={tr('section.github', locale)}
          subtitle={
            locale === 'uz'
              ? "Ochiq kod loyihalarim GitHub'da."
              : 'My open source projects live on GitHub.'
          }
        />
        <Reveal delay={0.1}>
          <a
            href={`https://github.com/${username || 'menarzullayev'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-ink)] transition-transform hover:scale-[1.03]"
          >
            GitHub profilim
            <ArrowUpRight size={15} />
          </a>
        </Reveal>
      </Section>
    );
  }

  const top = repos.slice(0, 6);

  return (
    <Section id="github" tight>
      <SectionHeading
        eyebrow="GitHub"
        title={tr('section.github', locale)}
        subtitle={
          username
            ? `@${username} — ${stats.publicRepos} ${locale === 'uz' ? 'ta ochiq loyiha' : 'public projects'}`
            : locale === 'uz'
              ? 'Ochiq kod faoliyatim'
              : 'My open source activity'
        }
      />

      {/* Repolar ro'yxati */}
      <StaggerGroup className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {top.map((repo) => (
          <motion.a
            key={repo.full_name}
            variants={staggerItem}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="card card-hover group flex flex-col p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-mono text-[0.88rem] font-medium text-[var(--accent)]">
                {repo.name}
              </h3>
              <ArrowUpRight
                size={14}
                className="mt-0.5 shrink-0 text-[var(--text-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>

            <p className="mt-3 flex-1 text-[0.82rem] leading-relaxed text-[var(--text-muted)]">
              {repo.description || (locale === 'uz' ? 'Tavsif kiritilmagan' : 'No description')}
            </p>

            <div className="mt-4 flex items-center gap-4 border-t border-[var(--border)] pt-3.5 text-[0.74rem] text-[var(--text-muted)]">
              {repo.language && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                  {repo.language}
                </span>
              )}
              {repo.stargazers_count > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Star size={11} /> {repo.stargazers_count}
                </span>
              )}
              {repo.forks_count > 0 && (
                <span className="inline-flex items-center gap-1">
                  <GitFork size={11} /> {repo.forks_count}
                </span>
              )}
            </div>
          </motion.a>
        ))}
      </StaggerGroup>

      {/* Tillar taqsimoti */}
      {stats.topLanguages.length > 0 && (
        <Reveal delay={0.15}>
          <div className="mt-10">
            <h3 className="text-[0.78rem] font-semibold tracking-[0.12em] uppercase text-[var(--text-muted)]">
              {locale === 'uz' ? 'Asosiy tillar' : 'Top languages'}
            </h3>
            <div className="mt-4 flex h-2.5 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
              {stats.topLanguages.map((lang, i) => (
                <motion.span
                  key={lang.name}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.08 }}
                  style={{
                    background: `color-mix(in srgb, var(--accent) ${100 - i * 14}%, var(--accent-2))`,
                  }}
                  className="h-full"
                  title={`${lang.name} ${lang.percent}%`}
                />
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {stats.topLanguages.map((lang) => (
                <span key={lang.name} className="inline-flex items-center gap-2 text-[0.78rem]">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                  <span className="text-[var(--text-soft)]">{lang.name}</span>
                  <span className="font-mono text-[0.72rem] text-[var(--text-muted)]">
                    {lang.percent}%
                  </span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      <Reveal delay={0.2}>
        <a
          href={`https://github.com/${username || 'menarzullayev'}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          {locale === 'uz' ? 'Barcha loyihalar' : 'All projects'}
          <ArrowUpRight size={15} />
        </a>
      </Reveal>
    </Section>
  );
}

/* ============================================================
   C5 — Ochiq kod hissasi (ma'lumot bo'lsa ko'rsatiladi)
   ============================================================ */
export function OpenSource({ content, locale }: { content: SiteContent; locale: Locale }) {
  if (content.openSource.length === 0) return null;

  return (
    <Section id="opensource" tight>
      <SectionHeading
        eyebrow="Open source"
        title={tr('section.openSource', locale)}
        subtitle={
          locale === 'uz'
            ? "Boshqa loyihalarga qo'shgan hissam."
            : 'My contributions to other projects.'
        }
      />
      <StaggerGroup className="mt-10 grid gap-4 md:grid-cols-2">
        {content.openSource.map((item) => (
          <motion.div key={item.repo} variants={staggerItem} className="card card-hover p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate font-mono text-[0.85rem] font-medium text-[var(--accent)]">
                  {item.repo}
                </h3>
                <p className="mt-2 text-[0.84rem] leading-relaxed text-[var(--text-muted)]">
                  {t(item.description, locale)}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-lg font-semibold">{item.prs}</div>
                <div className="text-[0.68rem] text-[var(--text-muted)]">PR / MR</div>
              </div>
            </div>
          </motion.div>
        ))}
      </StaggerGroup>
    </Section>
  );
}
