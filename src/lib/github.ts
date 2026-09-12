import type { Project } from './types';

/**
 * GitHub integratsiyasi.
 * GITHUB_USERNAME berilmasa yoki API javob bermasa — bo'sh natija qaytadi
 * va sayt qo'lda kiritilgan loyihalarni ko'rsatadi.
 */

const USERNAME = process.env.GITHUB_USERNAME || '';
const TOKEN = process.env.GITHUB_TOKEN || '';

export const isGitHubConfigured = Boolean(USERNAME);

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
}

export interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  location: string | null;
}

export interface GitHubStats {
  totalStars: number;
  totalForks: number;
  publicRepos: number;
  followers: number;
  topLanguages: { name: string; count: number; percent: number }[];
  repos: GitHubRepo[];
}

function headers(): HeadersInit {
  const h: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'portfolio-site',
  };
  if (TOKEN) h.Authorization = `Bearer ${TOKEN}`;
  return h;
}

async function ghFetch<T>(path: string, revalidate = 3600): Promise<T | null> {
  if (!isGitHubConfigured) return null;
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: headers(),
      next: { revalidate },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getGitHubProfile(): Promise<GitHubProfile | null> {
  return ghFetch<GitHubProfile>(`/users/${USERNAME}`);
}

export async function getGitHubRepos(limit = 30): Promise<GitHubRepo[]> {
  const repos = await ghFetch<GitHubRepo[]>(
    `/users/${USERNAME}/repos?per_page=100&sort=pushed`,
  );
  if (!repos) return [];
  return repos
    .filter((r) => !r.fork && !r.archived)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, limit);
}

export async function getGitHubStats(): Promise<GitHubStats> {
  const [profile, repos] = await Promise.all([getGitHubProfile(), getGitHubRepos(50)]);

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

  const langMap = new Map<string, number>();
  repos.forEach((r) => {
    if (r.language) langMap.set(r.language, (langMap.get(r.language) ?? 0) + 1);
  });
  const total = [...langMap.values()].reduce((a, b) => a + b, 0) || 1;
  const topLanguages = [...langMap.entries()]
    .map(([name, count]) => ({ name, count, percent: Math.round((count / total) * 100) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return {
    totalStars,
    totalForks,
    publicRepos: profile?.public_repos ?? repos.length,
    followers: profile?.followers ?? 0,
    topLanguages,
    repos,
  };
}

/** GitHub repolarini loyiha kartochkalariga aylantirish */
export function repoToProject(repo: GitHubRepo): Project {
  const description = repo.description ?? '';
  return {
    slug: repo.name.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
    title: repo.name.replace(/[-_]/g, ' '),
    summary: { uz: description, en: description },
    description: { uz: description, en: description },
    category: guessCategory(repo),
    tags: [repo.language, ...(repo.topics ?? [])].filter(Boolean).slice(0, 5) as string[],
    cover: `https://opengraph.githubassets.com/1/${repo.full_name}`,
    year: new Date(repo.pushed_at || repo.updated_at).getFullYear().toString(),
    links: [
      { label: 'GitHub', url: repo.html_url },
      ...(repo.homepage ? [{ label: 'Demo', url: repo.homepage }] : []),
    ],
    featured: repo.stargazers_count > 50,
    source: 'github',
    repo: repo.full_name,
    stars: repo.stargazers_count,
    language: repo.language ?? undefined,
  };
}

function guessCategory(repo: GitHubRepo): Project['category'] {
  const text = `${repo.name} ${repo.description ?? ''} ${(repo.topics ?? []).join(' ')}`.toLowerCase();
  if (/(react-native|expo|flutter|android|ios|mobile)/.test(text)) return 'mobile';
  if (/(ai|ml|gpt|llm|model|nlp|transformers)/.test(text)) return 'ai';
  if (/(api|server|backend|nestjs|express|fastapi|database)/.test(text)) return 'backend';
  if (/(ui|css|tailwind|component|design-system|frontend)/.test(text)) return 'frontend';
  return 'fullstack';
}

/** GitHub repolarini loyihalar ro'yxatiga qo'shish */
export async function mergeGitHubProjects(manual: Project[], limit = 8): Promise<Project[]> {
  const repos = await getGitHubRepos(limit);
  if (repos.length === 0) return manual;
  const manualNames = new Set(manual.map((p) => p.title.toLowerCase().replace(/\s+/g, '')));
  const fromGh = repos
    .filter((r) => !manualNames.has(r.name.toLowerCase().replace(/[-_]/g, '')))
    .map(repoToProject);
  return [...manual, ...fromGh];
}
