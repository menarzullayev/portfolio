/**
 * Admin panel formalari uchun maydon ta'riflari.
 * Har bir resurs uchun jadval nomi va maydonlar ro'yxati.
 */

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'bool'
  | 'select'
  | 'tags'
  | 'bilingual'
  | 'json';

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  required?: boolean;
  hint?: string;
  wide?: boolean;
}

export interface ResourceDef {
  key: string;
  table: string;
  label: string;
  description: string;
  titleField: string;
  fields: FieldDef[];
}

export const resources: ResourceDef[] = [
  {
    key: 'projects',
    table: 'projects',
    label: 'Loyihalar',
    description: 'Portfolio kartochkalari va batafsil sahifalar',
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Nomi', type: 'text', required: true },
      { name: 'slug', label: 'Manzil (slug)', type: 'text', required: true, hint: 'payflow, devmetrics — lotin harflar va chiziqcha' },
      {
        name: 'category',
        label: 'Kategoriya',
        type: 'select',
        options: ['frontend', 'backend', 'mobile', 'ai', 'fullstack'],
      },
      { name: 'summary', label: 'Qisqa tavsif', type: 'bilingual', wide: true },
      { name: 'description', label: 'To‘liq tavsif', type: 'bilingual', wide: true },
      { name: 'tags', label: 'Texnologiyalar', type: 'tags', wide: true, hint: 'Vergul bilan ajratib yozing' },
      { name: 'cover', label: 'Muqova rasm manzili', type: 'text', wide: true },
      { name: 'year', label: 'Yil', type: 'text' },
      { name: 'featured', label: 'Tanlangan ishlarda ko‘rsatilsin', type: 'bool' },
      { name: 'links', label: 'Havolalar', type: 'json', wide: true, hint: '[{"label":"Demo","url":"https://..."}]' },
    ],
  },
  {
    key: 'posts',
    table: 'posts',
    label: 'Maqolalar',
    description: 'Blog yozuvlari (markdown)',
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Sarlavha', type: 'bilingual', wide: true, required: true },
      { name: 'slug', label: 'Manzil (slug)', type: 'text', required: true },
      { name: 'excerpt', label: 'Qisqa mazmun', type: 'bilingual', wide: true },
      { name: 'body', label: 'Matn (markdown)', type: 'textarea', wide: true, required: true },
      { name: 'tags', label: 'Teglar', type: 'tags', wide: true },
      { name: 'date', label: 'Sana', type: 'text', placeholder: '2026-09-12' },
      { name: 'readingTime', label: 'O‘qish vaqti (daqiqa)', type: 'number' },
      { name: 'views', label: 'Ko‘rishlar soni', type: 'number' },
      { name: 'series', label: 'Seriya nomi', type: 'text' },
      { name: 'seriesOrder', label: 'Seriyadagi tartib', type: 'number' },
      { name: 'published', label: 'Chop etilgan', type: 'bool' },
    ],
  },
  {
    key: 'services',
    table: 'services',
    label: 'Xizmatlar',
    description: 'Taklif qilinadigan xizmatlar',
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Nomi', type: 'bilingual', required: true },
      { name: 'description', label: 'Tavsif', type: 'bilingual', wide: true },
      { name: 'icon', label: 'Ikonka', type: 'select', options: ['code', 'smartphone', 'server', 'gauge', 'shield', 'users'] },
      { name: 'features', label: 'Xususiyatlar', type: 'json', wide: true, hint: '[{"uz":"...","en":"..."}]' },
      { name: 'priceFrom', label: 'Narx (dan)', type: 'text' },
      { name: 'sortOrder', label: 'Tartib', type: 'number' },
    ],
  },
  {
    key: 'faqs',
    table: 'faqs',
    label: 'Savol-javob',
    description: 'Ko‘p so‘raladigan savollar',
    titleField: 'question',
    fields: [
      { name: 'question', label: 'Savol', type: 'bilingual', wide: true, required: true },
      { name: 'answer', label: 'Javob', type: 'bilingual', wide: true, required: true },
      { name: 'sortOrder', label: 'Tartib', type: 'number' },
    ],
  },
  {
    key: 'testimonials',
    table: 'testimonials',
    label: 'Mijoz fikrlari',
    description: 'Tavsiyanomalar',
    titleField: 'name',
    fields: [
      { name: 'name', label: 'Ism', type: 'text', required: true },
      { name: 'position', label: 'Lavozim', type: 'bilingual' },
      { name: 'company', label: 'Kompaniya', type: 'text' },
      { name: 'quote', label: 'Iqtibos', type: 'bilingual', wide: true },
      { name: 'avatar', label: 'Rasm manzili', type: 'text' },
      { name: 'rating', label: 'Baho (1-5)', type: 'number' },
      { name: 'sortOrder', label: 'Tartib', type: 'number' },
    ],
  },
  {
    key: 'messages',
    table: 'messages',
    label: 'Xabarlar',
    description: 'Aloqa formasi orqali kelgan xabarlar',
    titleField: 'name',
    fields: [
      { name: 'name', label: 'Ism', type: 'text' },
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'subject', label: 'Mavzu', type: 'text' },
      { name: 'message', label: 'Xabar', type: 'textarea', wide: true },
      { name: 'read', label: 'O‘qilgan', type: 'bool' },
    ],
  },
  {
    key: 'guestbook',
    table: 'guestbook',
    label: 'Mehmonlar kitobi',
    description: 'Tashrif buyuruvchilar izohlari',
    titleField: 'name',
    fields: [
      { name: 'name', label: 'Ism', type: 'text', required: true },
      { name: 'message', label: 'Izoh', type: 'textarea', wide: true, required: true },
      { name: 'city', label: 'Shahar', type: 'text' },
      { name: 'date', label: 'Sana', type: 'text', placeholder: '2026-09-12' },
    ],
  },
  {
    key: 'uses',
    table: 'uses',
    label: 'Vositalar',
    description: 'Ishlatiladigan jihoz va dasturlar',
    titleField: 'name',
    fields: [
      { name: 'name', label: 'Nomi', type: 'text', required: true },
      { name: 'category', label: 'Toifa', type: 'bilingual' },
      { name: 'description', label: 'Tavsif', type: 'bilingual', wide: true },
      { name: 'sortOrder', label: 'Tartib', type: 'number' },
    ],
  },
  {
    key: 'socials',
    table: 'socials',
    label: 'Ijtimoiy tarmoqlar',
    description: 'Footer, aloqa bo‘limi va hero’dagi havolalar',
    titleField: 'label',
    fields: [
      { name: 'label', label: 'Nomi', type: 'text', required: true, placeholder: 'GitHub' },
      { name: 'url', label: 'Havola', type: 'text', required: true, wide: true, placeholder: 'https://github.com/...' },
      {
        name: 'icon',
        label: 'Ikonka',
        type: 'select',
        options: ['github', 'linkedin', 'telegram', 'instagram', 'x', 'youtube', 'mail', 'phone', 'devto'],
      },
      { name: 'handle', label: 'Foydalanuvchi nomi', type: 'text', placeholder: '@username' },
      { name: 'sortOrder', label: 'Tartib', type: 'number' },
    ],
  },
  {
    key: 'changelog',
    table: 'changelog',
    label: 'Yangilanishlar',
    description: 'Sayt versiyalari tarixi',
    titleField: 'version',
    fields: [
      { name: 'version', label: 'Versiya', type: 'text', required: true, placeholder: '2.4.0' },
      { name: 'date', label: 'Sana', type: 'text', placeholder: '2026-09-01' },
      { name: 'changes', label: 'O‘zgarishlar', type: 'json', wide: true, hint: '[{"uz":"...","en":"..."}]' },
    ],
  },
];

/** Sozlamalar formasi (bitta yozuv) */
export const settingsFields: FieldDef[] = [
  { name: 'name', label: 'To‘liq ism', type: 'text', required: true },
  { name: 'initials', label: 'Bosh harflar', type: 'text', hint: 'Logotip uchun: AK' },
  { name: 'role', label: 'Kasb / unvon', type: 'bilingual' },
  { name: 'tagline', label: 'Shior', type: 'bilingual', wide: true },
  { name: 'shortBio', label: 'Qisqa ma’lumot', type: 'bilingual', wide: true },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'city', label: 'Shahar', type: 'text' },
  { name: 'country', label: 'Davlat', type: 'text' },
  { name: 'location', label: 'Manzil (ko‘rsatiladi)', type: 'bilingual' },
  { name: 'availability', label: 'Bandlik holati', type: 'select', options: ['available', 'busy', 'open'] },
  { name: 'availabilityNote', label: 'Holat izohi', type: 'bilingual' },
  { name: 'responseTime', label: 'Javob va’dasi', type: 'bilingual' },
  { name: 'resumeUrl', label: 'CV havolasi', type: 'text' },
  { name: 'calendarUrl', label: 'Suhbat belgilash havolasi', type: 'text' },
  { name: 'avatar', label: 'Avatar manzili', type: 'text' },
  { name: 'yearsExperience', label: 'Tajriba (yil)', type: 'number' },
  { name: 'heroBadge', label: 'Hero belgisi', type: 'bilingual', wide: true, hint: 'Masalan: 25+ ochiq kod loyihasi' },
  { name: 'heroVideoUrl', label: 'Tanishtiruv videosi', type: 'text' },
  { name: 'voiceIntroUrl', label: 'Ovozli tanishtiruv (mp3)', type: 'text' },
];
