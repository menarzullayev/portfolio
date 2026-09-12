import { getPosts, getSiteContent } from '@/lib/data';
import { isLocale, t } from '@/lib/i18n';
import type { Locale } from '@/lib/types';

/** RSS kanali — blogga obuna bo'lish uchun */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'uz';

  const [posts, content] = await Promise.all([getPosts(), getSiteContent()]);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const items = posts
    .slice(0, 20)
    .map(
      (post) => `    <item>
      <title><![CDATA[${t(post.title, locale)}]]></title>
      <link>${siteUrl}/${locale}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/${locale}/blog/${post.slug}</guid>
      <description><![CDATA[${t(post.excerpt, locale)}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
${post.tags.map((tag) => `      <category>${tag}</category>`).join('\n')}
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${content.settings.name} — ${t(content.settings.role, locale)}</title>
    <link>${siteUrl}/${locale}</link>
    <description><![CDATA[${t(content.settings.shortBio, locale)}]]></description>
    <language>${locale}</language>
    <atom:link href="${siteUrl}/${locale}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
