import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock, Eye, Layers } from 'lucide-react';
import { findRelated } from '@/lib/posts';
import { formatDate, isLocale, t, tr, type Locale } from '@/lib/i18n';
import { getPost, getPosts } from '@/lib/data';
import { getSiteContent } from '@/lib/data';
import { ArticleBody } from '@/components/sections/ArticleBody';
import { ShareButtons } from '@/components/sections/ShareButtons';
import { CommentsCta } from '@/components/sections/Extras';
import { Reveal } from '@/components/ui/Reveal';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang: Locale = isLocale(locale) ? locale : 'uz';
  const post = await getPost(slug);
  if (!post) return { title: '404' };

  // Ijtimoiy tarmoq kartasi (Telegram, LinkedIn uchun PNG)
  const ogImage = `/images/og/maqola-${post.slug}.png`;

  return {
    title: t(post.title, lang),
    description: t(post.excerpt, lang),
    keywords: post.tags,
    alternates: {
      canonical: `/${lang}/blog/${post.slug}`,
      languages: {
        uz: `/uz/blog/${post.slug}`,
        en: `/en/blog/${post.slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title: t(post.title, lang),
      description: t(post.excerpt, lang),
      publishedTime: post.date,
      tags: post.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: t(post.title, lang) }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t(post.title, lang),
      description: t(post.excerpt, lang),
      images: [ogImage],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const [post, posts, content] = await Promise.all([getPost(slug), getPosts(), getSiteContent()]);
  if (!post) notFound();

  const related = findRelated(posts, post, 3);
  const index = posts.findIndex((p) => p.slug === post.slug);
  const prev = posts[index + 1];
  const next = posts[index - 1];
  const telegram = content.socials.find((s) => s.icon === 'telegram')?.url;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: t(post.title, locale),
    description: t(post.excerpt, locale),
    datePublished: post.date,
    author: { '@type': 'Person', name: content.settings.name },
    keywords: post.tags.join(', '),
    url: `${siteUrl}/${locale}/blog/${post.slug}`,
    inLanguage: locale,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="pt-28 pb-16">
        <div className="container-x">
          {/* Sarlavha */}
          <header className="max-w-3xl">
            <Link
              href={`/${locale}/blog`}
              className="mb-6 inline-flex items-center gap-2 text-[0.8rem] font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
            >
              <ArrowLeft size={14} />
              {tr('blog.allPosts', locale)}
            </Link>

            {post.series && (
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[0.7rem] font-semibold text-[var(--accent)]">
                <Layers size={12} />
                {post.series}
                {post.seriesOrder ? ` · ${post.seriesOrder}-${tr('blog.part', locale)}` : ''}
              </span>
            )}

            <h1 className="text-[1.9rem] font-semibold tracking-tight text-balance md:text-[2.6rem] md:leading-[1.12]">
              {t(post.title, locale)}
            </h1>

            <p className="mt-5 text-[1rem] leading-relaxed text-[var(--text-muted)]">
              {t(post.excerpt, locale)}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-[var(--border)] py-4 text-[0.78rem] text-[var(--text-muted)]">
              <span>{content.settings.name}</span>
              <span>{formatDate(post.date, locale)}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={12} />
                {post.readingTime} {tr('common.minRead', locale)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Eye size={12} />
                {post.views} {tr('common.views', locale)}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/${locale}/blog`} className="chip hover:border-[var(--accent)] hover:text-[var(--accent)]">
                    #{tag}
                  </Link>
                ))}
              </div>
              <ShareButtons
                url={`${siteUrl}/${locale}/blog/${post.slug}`}
                title={t(post.title, locale)}
                locale={locale}
              />
            </div>
          </header>

          {/* Matn */}
          <div className="mt-12">
            <ArticleBody markdown={post.body} locale={locale} />
          </div>

          {/* Oldingi / keyingi */}
          {(prev || next) && (
            <div className="mt-16 grid gap-4 border-t border-[var(--border)] pt-8 sm:grid-cols-2">
              {prev ? (
                <Link href={`/${locale}/blog/${prev.slug}`} className="card card-hover group p-5">
                  <span className="inline-flex items-center gap-2 text-[0.72rem] text-[var(--text-muted)]">
                    <ArrowLeft size={12} /> {tr('common.prev', locale)}
                  </span>
                  <span className="mt-2 block text-[0.9rem] font-medium group-hover:text-[var(--accent)]">
                    {t(prev.title, locale)}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  href={`/${locale}/blog/${next.slug}`}
                  className="card card-hover group p-5 text-right sm:col-start-2"
                >
                  <span className="inline-flex items-center gap-2 text-[0.72rem] text-[var(--text-muted)]">
                    {tr('common.next', locale)} <ArrowRight size={12} />
                  </span>
                  <span className="mt-2 block text-[0.9rem] font-medium group-hover:text-[var(--accent)]">
                    {t(next.title, locale)}
                  </span>
                </Link>
              )}
            </div>
          )}
        </div>
      </article>

      {/* D6 — o'xshash maqolalar */}
      {related.length > 0 && (
        <section className="border-t border-[var(--border)] py-16">
          <div className="container-x">
            <h2 className="text-sm font-semibold tracking-[0.12em] uppercase text-[var(--text-muted)]">
              {tr('blog.related', locale)}
            </h2>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Reveal key={item.slug}>
                  <Link href={`/${locale}/blog/${item.slug}`} className="card card-hover block h-full p-6">
                    <h3 className="text-[0.98rem] font-semibold leading-snug hover:text-[var(--accent)]">
                      {t(item.title, locale)}
                    </h3>
                    <p className="mt-3 text-[0.83rem] leading-relaxed text-[var(--text-muted)]">
                      {t(item.excerpt, locale)}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-[0.72rem] text-[var(--text-muted)]">
                      <span>{formatDate(item.date, locale)}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={11} /> {item.readingTime} {tr('common.minRead', locale)}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CommentsCta telegram={telegram} locale={locale} />
    </>
  );
}
