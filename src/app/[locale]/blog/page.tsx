import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, tr } from '@/lib/i18n';
import { getPosts } from '@/lib/data';
import { BlogList } from '@/components/sections/Blog';
import { PageHeader } from '@/components/layout/PageHeader';

// Kontent admin panelda boshqariladi — har sorovda yangi malumot olinadi.
// Statik keshlash admin ozgarishlarini korinmas qilib qoyadi.
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : 'uz';
  return {
    title: tr('blog.title', lang),
    description: tr('blog.subtitle', lang),
    alternates: { canonical: `/${lang}/blog` },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const posts = await getPosts();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title={tr('blog.title', locale)}
        subtitle={tr('blog.subtitle', locale)}
      />
      <BlogList posts={posts} locale={locale} heading={false} />
    </>
  );
}
