import type { Post } from './types';

/**
 * Maqolalar bilan ishlash uchun sof funksiyalar.
 * Server va klient komponentlarda birdek ishlatiladi.
 */

/** Teg bo'yicha guruhlangan maqolalar */
export function collectTags(posts: Post[]): { tag: string; count: number }[] {
  const map = new Map<string, number>();
  posts.forEach((p) => p.tags.forEach((tag) => map.set(tag, (map.get(tag) ?? 0) + 1)));
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/** Seriya bo'yicha guruhlash */
export function collectSeries(posts: Post[]): { name: string; posts: Post[] }[] {
  const map = new Map<string, Post[]>();
  posts.forEach((p) => {
    if (!p.series) return;
    const list = map.get(p.series) ?? [];
    list.push(p);
    map.set(p.series, list);
  });
  return [...map.entries()].map(([name, items]) => ({
    name,
    posts: items.sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0)),
  }));
}

/** O'xshash maqolalarni topish (umumiy teglar bo'yicha) */
export function findRelated(posts: Post[], current: Post, limit = 3): Post[] {
  return posts
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({ post: p, score: p.tags.filter((tag) => current.tags.includes(tag)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
}

/** Sarlavhalardan mundarija (TOC) yasash */
export function buildToc(markdown: string): { id: string; text: string; level: number }[] {
  const lines = markdown.split('\n');
  const items: { id: string; text: string; level: number }[] = [];
  for (const line of lines) {
    const match = /^(##|###)\s+(.*)$/.exec(line.trim());
    if (match) {
      const text = match[2].replace(/[*`]/g, '').trim();
      items.push({ id: slugifyHeading(text), text, level: match[1].length });
    }
  }
  return items;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}
