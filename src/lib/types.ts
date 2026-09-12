/**
 * Sayt kontenti uchun tip ta'riflari.
 * Har bir matn maydoni UZ/EN juftligida saqlanadi.
 */

export type Locale = 'uz' | 'en';
export const LOCALES: Locale[] = ['uz', 'en'];
export const DEFAULT_LOCALE: Locale = 'uz';

/** Ikki tilli matn */
export type LText = { uz: string; en: string };

export interface SiteSettings {
  name: string;
  initials: string;
  role: LText;
  tagline: LText;
  shortBio: LText;
  bio: LText[];
  availability: 'available' | 'busy' | 'open';
  availabilityNote: LText;
  location: LText;
  city: string;
  country: string;
  email: string;
  phone?: string;
  responseTime: LText;
  resumeUrl: string;
  calendarUrl: string;
  mapEmbedUrl?: string;
  avatar: string;
  heroVideoUrl?: string;
  voiceIntroUrl?: string;
  yearsExperience: number;
  heroBadge?: LText;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'telegram' | 'instagram' | 'x' | 'youtube' | 'mail' | 'phone' | 'devto';
  handle: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'mobile' | 'devops' | 'data' | 'design' | 'embedded';
}

export interface StackGroup {
  title: LText;
  items: string[];
}

export interface Experience {
  company: string;
  role: LText;
  period: string;
  location: string;
  summary: LText;
  highlights: LText[];
  current?: boolean;
}

export interface Education {
  school: string;
  degree: LText;
  period: string;
  note?: LText;
}

export interface Certificate {
  name: string;
  issuer: string;
  year: string;
  url?: string;
}

export interface LanguageSkill {
  name: LText;
  level: string; // A1..C2
  note: LText;
}

export interface ProcessStep {
  title: LText;
  description: LText;
}

export interface Project {
  slug: string;
  title: string;
  summary: LText;
  description: LText;
  category: 'frontend' | 'backend' | 'mobile' | 'ai' | 'fullstack';
  tags: string[];
  cover: string;
  year: string;
  links: { label: string; url: string }[];
  metrics?: { label: LText; value: string }[];
  featured: boolean;
  source: 'manual' | 'github';
  repo?: string;
  stars?: number;
  language?: string;
}

export interface CaseStudy {
  client: string;
  title: LText;
  problem: LText;
  approach: LText;
  result: LText;
  metrics: { value: string; label: LText }[];
}

export interface CodeSnippet {
  title: LText;
  language: string;
  code: string;
}

export interface Testimonial {
  name: string;
  position: LText;
  company: string;
  quote: LText;
  avatar: string;
  rating: number;
}

export interface Stat {
  value: string;
  label: LText;
}

export interface Award {
  title: LText;
  org: string;
  year: string;
}

export interface Service {
  icon: string;
  title: LText;
  description: LText;
  features: LText[];
  priceFrom: string;
}

export interface PricingPlan {
  name: LText;
  price: string;
  period: LText;
  description: LText;
  features: LText[];
  highlighted: boolean;
  cta: LText;
}

export interface FaqItem {
  question: LText;
  answer: LText;
}

export interface Post {
  slug: string;
  title: LText;
  excerpt: LText;
  body: string; // markdown
  tags: string[];
  date: string;
  readingTime: number;
  views: number;
  series?: string;
  seriesOrder?: number;
  cover?: string;
  published: boolean;
}

export interface GuestbookEntry {
  name: string;
  message: string;
  date: string;
  city?: string;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  changes: LText[];
}

export interface ToolItem {
  name: string;
  category: LText;
  description: LText;
}

export interface SiteContent {
  settings: SiteSettings;
  socials: SocialLink[];
  skills: Skill[];
  stack: StackGroup[];
  experience: Experience[];
  education: Education[];
  certificates: Certificate[];
  languages: LanguageSkill[];
  process: ProcessStep[];
  interests: { icon: string; title: LText }[];
  now: LText[];
  principles: { title: LText; description: LText }[];
  routine: { time: string; activity: LText }[];
  projects: Project[];
  caseStudies: CaseStudy[];
  snippets: CodeSnippet[];
  openSource: { repo: string; description: LText; prs: number; org: string }[];
  testimonials: Testimonial[];
  partners: string[];
  stats: Stat[];
  awards: Award[];
  press: { title: LText; outlet: string; url: string; date: string }[];
  services: Service[];
  pricing: PricingPlan[];
  faq: FaqItem[];
  workTerms: LText[];
  slots: { period: string; status: LText; state: 'free' | 'booked' }[];
  posts: Post[];
  guestbook: GuestbookEntry[];
  changelog: ChangelogEntry[];
  uses: ToolItem[];
  contactSubjects: LText[];
}
