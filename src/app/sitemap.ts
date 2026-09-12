import type { MetadataRoute } from 'next';
import { getPosts, getProjects } from '@/lib/data';
import { LOCALES } from '@/lib/i18n';

/** Qidiruv tizimlari uchun sayt xaritasi */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);

  const staticPaths = ['', '/blog', '/projects', '/uses', '/now', '/guestbook', '/changelog', '/sitemap', '/privacy', '/terms'];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${siteUrl}/${l}${path}`]),
          ),
        },
      });
    }

    for (const post of posts) {
      entries.push({
        url: `${siteUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'yearly',
        priority: 0.6,
      });
    }

    for (const project of projects) {
      entries.push({
        url: `${siteUrl}/${locale}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
