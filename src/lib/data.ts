import { unstable_cache } from 'next/cache';
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

/**
 * Jadvaldan o'qish.
 * MUHIM: bo'sh natija ham massiv sifatida qaytadi (null emas) —
 * shunda "hammasini o'chirdim" holati to'g'ri ishlaydi.
 * null faqat xato yoki baza sozlanmagan holatda qaytadi.
 */
async function readTable<T>(table: string, order?: { column: string; ascending?: boolean }): Promise<T[] | null> {
  if (!isSupabaseConfigured) return null;
  const client = getPublicClient();
  if (!client) return null;
  try {
    let query = client.from(table).select('*');
    if (order) query = query.order(order.column, { ascending: order.ascending ?? true });
    const { data, error } = await query;
    if (error || !data) return null;
    return rowsToApp<T>(data);
  } catch {
    return null;
  }
}

async function loadSiteContent(): Promise<SiteContent> {
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

  /**
   * Baza "to'ldirilgan" hisoblanadi, agar sozlamalar qatori mavjud bo'lsa.
   *
   * - To'ldirilmagan (jadvallar bo'sh) → butun kontent namunadan (seed) olinadi.
   *   Bu baza endi ulangan, lekin hali to'ldirilmagan holat uchun.
   * - To'ldirilgan → baza ustuvor. Bo'sh jadval bo'sh bo'lib qoladi,
   *   ya'ni admin panelda hamma loyihani o'chirsangiz, ular qaytib kelmaydi.
   */
  const isSeeded = Boolean(dbSettings);

  const pick = <T>(rows: T[] | null, fallback: T[]): T[] => {
    if (!isSeeded) return fallback;
    return rows ?? fallback;
  };

  return {
    ...seedContent,
    settings: dbSettings
      ? { ...seedContent.settings, ...stripId(dbSettings) }
      : seedContent.settings,
    socials: pick(socials, seedContent.socials),
    projects: pick(projects, seedContent.projects),
    posts: pick(posts, seedContent.posts).filter((p) => p.published !== false),
    services: pick(services, seedContent.services),
    faq: pick(faqs, seedContent.faq),
    testimonials: pick(testimonials, seedContent.testimonials),
    guestbook: pick(guestbook, seedContent.guestbook),
    uses: pick(uses, seedContent.uses),
    changelog: pick(changelog, seedContent.changelog),
  };
}

function stripId(row: unknown): Partial<SiteSettings> {
  const copy: Record<string, unknown> = { ...(row as Record<string, unknown>) };
  delete copy.id;
  delete copy.createdAt;
  delete copy.updatedAt;
  return copy as Partial<SiteSettings>;
}

async function loadProjects(): Promise<Project[]> {
  const rows = await readTable<Project>('projects', { column: 'created_at', ascending: false });
  return rows ?? seedContent.projects;
}

async function loadPosts(): Promise<Post[]> {
  const rows = await readTable<Post>('posts', { column: 'date', ascending: false });
  const list = rows ?? seedContent.posts;
  return list.filter((p) => p.published !== false);
}

/* ────────────────────────────────────────────────────────────────
   Keshlangan o'qish.

   Nega kesh kerak: har bir so'rovda Supabase'ga 10 ta parallel so'rov
   ketadi (~400 ms). Kesh bilan takroriy so'rovlar ~20 ms da bajariladi.

   Nega yangilanish yo'qolmaydi: kesh "content" tegi bilan belgilangan.
   Admin panelda har qanday o'zgarish bo'lganda revalidateTag('content')
   chaqiriladi — kesh darhol tozalanadi.

   revalidate: 60 — xavfsizlik to'ri: agar teg ishlamay qolsa ham,
   kontent bir daqiqada yangilanadi.
   ──────────────────────────────────────────────────────────────── */
const CACHE_OPTIONS = { tags: ['content'], revalidate: 60 };

export const getSiteContent = unstable_cache(loadSiteContent, ['site-content'], CACHE_OPTIONS);
export const getProjects = unstable_cache(loadProjects, ['site-projects'], CACHE_OPTIONS);
export const getPosts = unstable_cache(loadPosts, ['site-posts'], CACHE_OPTIONS);

export async function getProject(slug: string): Promise<Project | undefined> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const all = await getPosts();
  return all.find((p) => p.slug === slug);
}

/** Teg bo'yicha guruhlangan maqolalar */
export { collectTags, collectSeries, findRelated, buildToc } from './posts';

