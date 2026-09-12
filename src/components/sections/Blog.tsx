'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, Eye, Layers, Mail, Search, Send } from 'lucide-react';
import { collectSeries, collectTags } from '@/lib/posts';
import { formatDate, t, tr, type Locale } from '@/lib/i18n';
import type { Post } from '@/lib/types';
import { Section, SectionHeading } from '../ui/Section';
import { Reveal, StaggerGroup, staggerItem } from '../ui/Reveal';

/* ============================================================
   D1 + D3 + D4 + D8 — Blog ro'yxati, qidiruv, teg va filtrlar
   ============================================================ */
export function BlogList({
  posts,
  locale,
  limit,
  showControls = true,
  heading = true,
}: {
  posts: Post[];
  locale: Locale;
  limit?: number;
  showControls?: boolean;
  heading?: boolean;
}) {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState<string>('all');

  const tags = useMemo(() => collectTags(posts), [posts]);
  const series = useMemo(() => collectSeries(posts), [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = posts.filter((p) => {
      const matchesTag = tag === 'all' || p.tags.includes(tag);
      const haystack = `${t(p.title, 'uz')} ${t(p.title, 'en')} ${t(p.excerpt, 'uz')} ${t(p.excerpt, 'en')} ${p.tags.join(' ')}`.toLowerCase();
      return matchesTag && (q === '' || haystack.includes(q));
    });
    return limit ? list.slice(0, limit) : list;
  }, [posts, query, tag, limit]);

  return (
    <Section id="blog">
      {heading && (
        <SectionHeading
          eyebrow="Blog"
          title={tr('blog.title', locale)}
          subtitle={tr('blog.subtitle', locale)}
        />
      )}

      {showControls && (
        <Reveal delay={0.05}>
          <div className={`${heading ? 'mt-8' : ''} flex flex-col gap-4`}>
            {/* Qidiruv */}
            <div className="relative max-w-md">
              <Search
                size={15}
                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={tr('common.searchPlaceholder', locale)}
                aria-label={tr('common.search', locale)}
                className="w-full rounded-full border border-[var(--border)] bg-[var(--surface)] py-2.5 pr-4 pl-10 text-[0.85rem] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
              />
            </div>

            {/* Teglar */}
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setTag('all')}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[0.76rem] font-medium transition-colors ${
                  tag === 'all'
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]'
                    : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]'
                }`}
              >
                {tr('common.all', locale)}
                <span className="ml-1.5 font-mono text-[0.68rem] opacity-60">{posts.length}</span>
              </button>
              {tags.map((item) => (
                <button
                  key={item.tag}
                  type="button"
                  onClick={() => setTag(item.tag)}
                  className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[0.76rem] font-medium transition-colors ${
                    tag === item.tag
                      ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]'
                      : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]'
                  }`}
                >
                  {item.tag}
                  <span className="ml-1.5 font-mono text-[0.68rem] opacity-60">{item.count}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* Maqolalar */}
      <StaggerGroup
        className={`${heading ? 'mt-9' : 'mt-0'} grid gap-5 md:grid-cols-2 lg:grid-cols-3`}
        stagger={0.06}
      >
        {filtered.map((post) => (
          <motion.article key={post.slug} variants={staggerItem} className="card card-hover group flex flex-col p-6">
            {/* D5 — Seriya belgisi */}
            {post.series && (
              <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[0.68rem] font-semibold text-[var(--accent)]">
                <Layers size={11} />
                {post.series}
                {post.seriesOrder ? ` · ${post.seriesOrder}-${tr('blog.part', locale)}` : ''}
              </span>
            )}

            <h3 className="text-[1.02rem] font-semibold leading-snug text-[var(--text)]">
              <Link href={`/${locale}/blog/${post.slug}`} className="hover:text-[var(--accent)]">
                {t(post.title, locale)}
              </Link>
            </h3>

            <p className="mt-3 flex-1 text-[0.85rem] leading-relaxed text-[var(--text-muted)]">
              {t(post.excerpt, locale)}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tg) => (
                <span key={tg} className="chip">
                  {tg}
                </span>
              ))}
            </div>

            {/* D4 + D8 — O'qish vaqti va ko'rishlar */}
            <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4 text-[0.72rem] text-[var(--text-muted)]">
              <span>{formatDate(post.date, locale)}</span>
              <span className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <Clock size={11} />
                  {post.readingTime} {tr('common.minRead', locale)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Eye size={11} />
                  {post.views}
                </span>
              </span>
            </div>

            <Link
              href={`/${locale}/blog/${post.slug}`}
              className="mt-4 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-[var(--accent)] transition-transform hover:translate-x-0.5"
            >
              {tr('common.readMore', locale)}
              <ArrowUpRight size={13} />
            </Link>
          </motion.article>
        ))}
      </StaggerGroup>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-[var(--text-muted)]">
          {tr('common.noResults', locale)}
        </p>
      )}

      {/* D5 — Seriyalar */}
      {showControls && series.length > 0 && (
        <Reveal delay={0.1}>
          <div className="mt-14">
            <h3 className="text-[0.78rem] font-semibold tracking-[0.14em] uppercase text-[var(--text-muted)]">
              {tr('blog.series', locale)}
            </h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {series.map((s) => (
                <div key={s.name} className="card p-5">
                  <h4 className="flex items-center gap-2 text-[0.9rem] font-semibold">
                    <Layers size={14} className="text-[var(--accent)]" />
                    {s.name}
                  </h4>
                  <ol className="mt-4 space-y-2.5">
                    {s.posts.map((p, i) => (
                      <li key={p.slug} className="flex items-start gap-3">
                        <span className="mt-0.5 font-mono text-[0.72rem] text-[var(--accent)]">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <Link
                          href={`/${locale}/blog/${p.slug}`}
                          className="text-[0.84rem] text-[var(--text-soft)] transition-colors hover:text-[var(--accent)]"
                        >
                          {t(p.title, locale)}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {limit && posts.length > limit && (
        <Reveal delay={0.1}>
          <div className="mt-12 text-center">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {tr('blog.allPosts', locale)}
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </Reveal>
      )}
    </Section>
  );
}

/* ============================================================
   D7 — Obuna (newsletter)
   ============================================================ */
export function Newsletter({ locale }: { locale: Locale }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'already' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState('error');
      return;
    }

    setState('sending');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) {
        setState('error');
        return;
      }
      setState(json.already ? 'already' : 'ok');
      setEmail('');
      setTimeout(() => setState('idle'), 5000);
    } catch {
      setState('error');
    }
  };

  return (
    <Section id="newsletter" tight>
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-12">
          <div
            aria-hidden
            className="absolute -top-24 -right-16 h-64 w-64 rounded-full"
            style={{ background: 'radial-gradient(circle, var(--glow-1), transparent 70%)' }}
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Mail size={17} />
              </span>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight">
                {locale === 'uz' ? 'Yangi maqolalardan xabardor bo‘ling' : 'Stay updated with new posts'}
              </h2>
              <p className="mt-3 max-w-md text-[0.9rem] leading-relaxed text-[var(--text-muted)]">
                {locale === 'uz'
                  ? "Oyiga bir marta — kod, unumdorlik va jamoa haqida. Spam yo'q, xohlagan paytda chiqib ketishingiz mumkin."
                  : 'Once a month — about code, performance and teams. No spam, unsubscribe anytime.'}
              </p>
            </div>

            <form onSubmit={submit} className="w-full" noValidate>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setState('idle');
                  }}
                  placeholder="siz@example.com"
                  aria-label={tr('form.email', locale)}
                  disabled={state === 'sending'}
                  className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[0.88rem] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-[0.85rem] font-semibold text-[var(--accent-ink)] transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  <Send size={14} />
                  {state === 'sending'
                    ? tr('common.sending', locale)
                    : locale === 'uz'
                      ? 'Obuna'
                      : 'Subscribe'}
                </button>
              </div>

              {state === 'ok' && (
                <p className="mt-2.5 text-[0.78rem] text-[var(--success)]">
                  {locale === 'uz'
                    ? 'Ro‘yxatga qo‘shildingiz. Rahmat!'
                    : 'You are on the list. Thanks!'}
                </p>
              )}
              {state === 'already' && (
                <p className="mt-2.5 text-[0.78rem] text-[var(--text-muted)]">
                  {locale === 'uz'
                    ? 'Bu manzil allaqachon ro‘yxatda.'
                    : 'This address is already subscribed.'}
                </p>
              )}
              {state === 'error' && (
                <p className="mt-2.5 text-[0.78rem] text-[var(--danger)]">
                  {tr('form.invalidEmail', locale)}
                </p>
              )}
            </form>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
