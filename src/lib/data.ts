import { rowsToApp } from './case';
import { getPublicClient, isSupabaseConfigured } from './supabase';
import { seedContent } from '@/content/seed';
import type {
  Post,
  Project,
  Service,
  SiteContent,
  SiteSettings,
  FaqItem,
  Testimonial,
  GuestbookEntry,
  SocialLink,
  ToolItem,
  ChangelogEntry,
} from './types';

/**
 * Kontent qatlami.
 * 1) Supabase sozlangan va jadval mavjud bo'lsa — bazadan o'qiydi.
 * 2) Aks holda — namunali kontent (seed) qaytaradi.
 * Shu tufayli sayt baza ulanmasa ham to'liq ishlaydi.
 */

async function readTable<T>(table: string, order?: { column: string; ascending?: boolean }): Promise<T[] | null> {
  if (!isSupabaseConfigured) return null;
  const client = getPublicClient();
  if (!client) return null;
  try {
    let query = client.from(table).select('*');
    if (order) query = query.order(order.column, { ascending: order.ascending ?? true });
    const { data, error } = await query;
    if (error || !data || data.length === 0) return null;
    return rowsToApp<T>(data);
  } catch {
    return null;
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  const [
    settingsRows,
    projects,
    posts,
    services,
    faqs,
    testimonials,
    guestbook,
    socials,
    uses,
    changelog,
  ] = await Promise.all([
    readTable<SiteSettings & { id: number }>('site_settings'),
    readTable<Project>('projects', { column: 'created_at', ascending: false }),
    readTable<Post>('posts', { column: 'date', ascending: false }),
    readTable<Service>('services', { column: 'sort_order' }),
    readTable<FaqItem>('faqs', { column: 'sort_order' }),
    readTable<Testimonial>('testimonials', { column: 'sort_order' }),
    readTable<GuestbookEntry>('guestbook', { column: 'date', ascending: false }),
    readTable<SocialLink>('socials', { column: 'sort_order' }),
    readTable<ToolItem>('uses', { column: 'sort_order' }),
    readTable<ChangelogEntry>('changelog', { column: 'date', ascending: false }),
  ]);

  const dbSettings = settingsRows?.[0];

  return {
    ...seedContent,
    settings: dbSettings
      ? { ...seedContent.settings, ...stripId(dbSettings) }
      : seedContent.settings,
    socials: socials ?? seedContent.socials,
    projects: projects ?? seedContent.projects,
    posts: (posts ?? seedContent.posts).filter((p) => p.published !== false),
    services: services ?? seedContent.services,
    faq: faqs ?? seedContent.faq,
    testimonials: testimonials ?? seedContent.testimonials,
    guestbook: guestbook ?? seedContent.guestbook,
    uses: uses ?? seedContent.uses,
    changelog: changelog ?? seedContent.changelog,
  };
}

function stripId(row: unknown): Partial<SiteSettings> {
  const copy: Record<string, unknown> = { ...(row as Record<string, unknown>) };
  delete copy.id;
  delete copy.createdAt;
  delete copy.updatedAt;
  return copy as Partial<SiteSettings>;
}

export async function getProjects(): Promise<Project[]> {
  const rows = await readTable<Project>('projects', { column: 'created_at', ascending: false });
  return rows ?? seedContent.projects;
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug);
}

export async function getPosts(): Promise<Post[]> {
  const rows = await readTable<Post>('posts', { column: 'date', ascending: false });
  const list = rows ?? seedContent.posts;
  return list.filter((p) => p.published !== false);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const all = await getPosts();
  return all.find((p) => p.slug === slug);
}

/** Teg bo'yicha guruhlangan maqolalar */
export { collectTags, collectSeries, findRelated, buildToc } from './posts';

