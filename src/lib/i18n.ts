import type { LText, Locale } from './types';
import { DEFAULT_LOCALE, LOCALES } from './types';

export { LOCALES, DEFAULT_LOCALE };
export type { LText, Locale } from './types';

/** Ikki tilli maydondan kerakli tilni oladi */
export function t(value: LText | undefined, locale: Locale): string {
  if (!value) return '';
  return value[locale] ?? value[DEFAULT_LOCALE] ?? '';
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as string[]).includes(value);
}

export const localeNames: Record<Locale, string> = {
  uz: "O'zbekcha",
  en: 'English',
};

export const localeShort: Record<Locale, string> = {
  uz: 'UZ',
  en: 'EN',
};

/** Sana formatlash */
export function formatDate(iso: string, locale: Locale): string {
  const months = {
    uz: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  };
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const month = months[locale][d.getMonth()];
  return locale === 'uz' ? `${d.getDate()}-${month}, ${d.getFullYear()}` : `${month} ${d.getDate()}, ${d.getFullYear()}`;
}

/** Raqamlarni chiroyli formatlash */
export function formatNumber(n: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'uz' ? 'uz-UZ' : 'en-US').format(n);
}

/** /uz/... yoki /en/... havola yasash */
export function localeHref(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  return `/${locale}${clean ? `/${clean}` : ''}`;
}

/* ============================================================
   Interfeys matnlari (UI lug'ati)
   ============================================================ */
type Dict = Record<string, LText>;

export const ui: Dict = {
  // Navigatsiya
  'nav.home': { uz: 'Bosh sahifa', en: 'Home' },
  'nav.about': { uz: 'Men haqimda', en: 'About' },
  'nav.skills': { uz: 'Ko‘nikmalar', en: 'Skills' },
  'nav.experience': { uz: 'Tajriba', en: 'Experience' },
  'nav.work': { uz: 'Ishlar', en: 'Work' },
  'nav.projects': { uz: 'Loyihalar', en: 'Projects' },
  'nav.services': { uz: 'Xizmatlar', en: 'Services' },
  'nav.blog': { uz: 'Blog', en: 'Blog' },
  'nav.pricing': { uz: 'Narxlar', en: 'Pricing' },
  'nav.faq': { uz: 'Savollar', en: 'FAQ' },
  'nav.contact': { uz: 'Aloqa', en: 'Contact' },
  'nav.more': { uz: 'Yana', en: 'More' },
  'nav.uses': { uz: 'Vositalarim', en: 'Uses' },
  'nav.now': { uz: 'Hozir', en: 'Now' },
  'nav.guestbook': { uz: 'Mehmonlar kitobi', en: 'Guestbook' },
  'nav.changelog': { uz: 'Yangilanishlar', en: 'Changelog' },
  'nav.menu': { uz: 'Menyu', en: 'Menu' },
  'nav.close': { uz: 'Yopish', en: 'Close' },

  // Umumiy
  'common.readMore': { uz: "Batafsil o'qish", en: 'Read more' },
  'common.viewAll': { uz: 'Barchasini ko‘rish', en: 'View all' },
  'common.viewProject': { uz: 'Loyihani ko‘rish', en: 'View project' },
  'common.back': { uz: 'Orqaga', en: 'Back' },
  'common.loading': { uz: 'Yuklanmoqda…', en: 'Loading…' },
  'common.send': { uz: 'Yuborish', en: 'Send' },
  'common.sending': { uz: 'Yuborilmoqda…', en: 'Sending…' },
  'common.minRead': { uz: 'daqiqa o‘qish', en: 'min read' },
  'common.views': { uz: 'ko‘rish', en: 'views' },
  'common.year': { uz: 'Yil', en: 'Year' },
  'common.tags': { uz: 'Teglar', en: 'Tags' },
  'common.all': { uz: 'Barchasi', en: 'All' },
  'common.search': { uz: 'Qidirish', en: 'Search' },
  'common.searchPlaceholder': { uz: 'Maqola qidirish…', en: 'Search articles…' },
  'common.noResults': { uz: 'Hech narsa topilmadi', en: 'Nothing found' },
  'common.copy': { uz: 'Nusxalash', en: 'Copy' },
  'common.copied': { uz: 'Nusxalandi', en: 'Copied' },
  'common.download': { uz: 'Yuklab olish', en: 'Download' },
  'common.optional': { uz: 'majburiy emas', en: 'optional' },
  'common.error': { uz: 'Xatolik yuz berdi', en: 'Something went wrong' },
  'common.required': { uz: 'to‘ldirish shart', en: 'required' },
  'common.share': { uz: 'Ulashish', en: 'Share' },
  'common.prev': { uz: 'Oldingi', en: 'Previous' },
  'common.next': { uz: 'Keyingi', en: 'Next' },
  'common.close': { uz: 'Yopish', en: 'Close' },
  'common.retry': { uz: 'Qayta urinish', en: 'Retry' },

  // Hero
  'hero.greeting': { uz: 'Salom, men', en: 'Hi, I am' },
  'hero.cta.work': { uz: 'Ishlarimni ko‘rish', en: 'See my work' },
  'hero.cta.contact': { uz: 'Bog‘lanish', en: 'Get in touch' },
  'hero.scroll': { uz: 'Pastga suring', en: 'Scroll down' },
  'hero.basedIn': { uz: 'Manzil', en: 'Based in' },

  // Holat
  'status.available': { uz: 'Yangi loyihalar uchun ochiq', en: 'Available for new projects' },
  'status.busy': { uz: 'Hozir band', en: 'Currently busy' },
  'status.open': { uz: 'Suhbatga ochiq', en: 'Open to talk' },

  // Bo'limlar
  'section.about': { uz: 'Men haqimda', en: 'About me' },
  'section.about.sub': { uz: 'Qisqacha tanishing', en: 'A quick introduction' },
  'section.skills': { uz: 'Ko‘nikmalar', en: 'Skills' },
  'section.skills.sub': { uz: 'Nima bilan ishlayman', en: 'What I work with' },
  'section.stack': { uz: 'Texnologiyalar', en: 'Tech stack' },
  'section.stack.sub': { uz: 'Kundalik vositalarim', en: 'My daily tools' },
  'section.experience': { uz: 'Tajriba', en: 'Experience' },
  'section.experience.sub': { uz: 'Ish yo‘lim', en: 'My career path' },
  'section.education': { uz: 'Ta’lim', en: 'Education' },
  'section.certificates': { uz: 'Sertifikatlar', en: 'Certificates' },
  'section.languages': { uz: 'Tillar', en: 'Languages' },
  'section.process': { uz: 'Ish jarayoni', en: 'Work process' },
  'section.process.sub': { uz: 'G‘oyadan natijagacha', en: 'From idea to result' },
  'section.projects': { uz: 'Loyihalar', en: 'Projects' },
  'section.projects.sub': { uz: 'Tanlangan ishlar', en: 'Selected work' },
  'section.caseStudies': { uz: 'Muvaffaqiyat holatlari', en: 'Case studies' },
  'section.snippets': { uz: 'Kod namunalari', en: 'Code samples' },
  'section.openSource': { uz: 'Ochiq kod hissasi', en: 'Open source' },
  'section.github': { uz: 'GitHub faoliyati', en: 'GitHub activity' },
  'section.blog': { uz: 'Blog', en: 'Blog' },
  'section.blog.sub': { uz: 'Yozgan maqolalarim', en: 'Articles I wrote' },
  'section.testimonials': { uz: 'Mijozlar fikri', en: 'Testimonials' },
  'section.partners': { uz: 'Hamkorlar', en: 'Partners' },
  'section.stats': { uz: 'Raqamlarda', en: 'In numbers' },
  'section.awards': { uz: 'Mukofotlar', en: 'Awards' },
  'section.press': { uz: 'Matbuotda', en: 'In the press' },
  'section.services': { uz: 'Xizmatlar', en: 'Services' },
  'section.services.sub': { uz: 'Nima qilib bera olaman', en: 'What I can do for you' },
  'section.pricing': { uz: 'Narxlar', en: 'Pricing' },
  'section.pricing.sub': { uz: 'Shaffof va tushunarli', en: 'Transparent and clear' },
  'section.faq': { uz: 'Ko‘p so‘raladigan savollar', en: 'Frequently asked questions' },
  'section.terms': { uz: 'Ish shartlari', en: 'Work terms' },
  'section.contact': { uz: 'Aloqa', en: 'Contact' },
  'section.contact.sub': { uz: 'Keling, gaplashamiz', en: 'Let us talk' },
  'section.interests': { uz: 'Qiziqishlarim', en: 'Interests' },
  'section.now': { uz: 'Hozir nima bilan shug‘ullanyapman', en: 'What I am doing now' },
  'section.principles': { uz: 'Tamoyillarim', en: 'My principles' },
  'section.routine': { uz: 'Bir kunim', en: 'My day' },
  'section.uses': { uz: 'Ishlatadigan vositalarim', en: 'Things I use' },
  'section.guestbook': { uz: 'Mehmonlar kitobi', en: 'Guestbook' },
  'section.changelog': { uz: 'Sayt yangilanishlari', en: 'Site changelog' },
  'section.availability': { uz: 'Bo‘sh vaqtlar', en: 'Availability' },
  'section.map': { uz: 'Qayerda ishlayman', en: 'Where I work' },
  'section.apps': { uz: 'Ilovalar', en: 'Apps' },
  'section.cta': { uz: 'Loyihangiz bormi?', en: 'Got a project?' },
  'section.cta.sub': { uz: 'Keling, g‘oyangizni birgalikda amalga oshiramiz', en: 'Let us bring your idea to life together' },
  'section.terminal': { uz: 'Interaktiv terminal', en: 'Interactive terminal' },
  'section.playground': { uz: 'Kichik o‘yin', en: 'Mini game' },
  'section.contribute': { uz: 'Hissa qo‘shish', en: 'Contribute' },

  // Forma
  'form.name': { uz: 'Ismingiz', en: 'Your name' },
  'form.email': { uz: 'Email manzilingiz', en: 'Your email' },
  'form.subject': { uz: 'Mavzu', en: 'Subject' },
  'form.message': { uz: 'Xabar', en: 'Message' },
  'form.namePlaceholder': { uz: 'Ismingizni yozing', en: 'Type your name' },
  'form.emailPlaceholder': { uz: 'siz@example.com', en: 'you@example.com' },
  'form.messagePlaceholder': { uz: 'Loyihangiz haqida qisqacha yozing…', en: 'Tell me briefly about your project…' },
  'form.success': { uz: 'Xabar yuborildi! Tez orada javob beraman.', en: 'Message sent! I will reply soon.' },
  'form.error': { uz: 'Xabar yuborilmadi. Iltimos, qayta urinib ko‘ring.', en: 'Message not sent. Please try again.' },
  'form.invalidEmail': { uz: 'Email manzil noto‘g‘ri', en: 'Invalid email address' },
  'form.tooShort': { uz: 'Xabar juda qisqa', en: 'Message is too short' },
  'form.responseTime': { uz: 'Odatda 24 soat ichida javob beraman', en: 'I usually reply within 24 hours' },

  // Blog
  'blog.title': { uz: 'Blog', en: 'Blog' },
  'blog.subtitle': { uz: 'Kod, unumdorlik va jamoa haqida yozaman', en: 'I write about code, performance and teams' },
  'blog.allPosts': { uz: 'Barcha maqolalar', en: 'All articles' },
  'blog.related': { uz: 'O‘xshash maqolalar', en: 'Related articles' },
  'blog.series': { uz: 'Seriya', en: 'Series' },
  'blog.part': { uz: 'qism', en: 'part' },
  'blog.toc': { uz: 'Mundarija', en: 'Contents' },
  'blog.empty': { uz: 'Hozircha maqola yo‘q', en: 'No articles yet' },

  // Loyihalar
  'projects.title': { uz: 'Loyihalar', en: 'Projects' },
  'projects.subtitle': { uz: 'Men yaratgan mahsulotlar', en: 'Products I have built' },
  'projects.empty': { uz: 'Hozircha loyiha yo‘q', en: 'No projects yet' },
  'projects.problem': { uz: 'Muammo', en: 'Problem' },
  'projects.solution': { uz: 'Yechim', en: 'Solution' },
  'projects.result': { uz: 'Natija', en: 'Result' },
  'projects.tech': { uz: 'Texnologiyalar', en: 'Technologies' },
  'projects.fromGithub': { uz: 'GitHub’dan', en: 'From GitHub' },

  // Kategoriyalar
  'cat.all': { uz: 'Barchasi', en: 'All' },
  'cat.frontend': { uz: 'Frontend', en: 'Frontend' },
  'cat.backend': { uz: 'Backend', en: 'Backend' },
  'cat.mobile': { uz: 'Mobil', en: 'Mobile' },
  'cat.ai': { uz: 'AI', en: 'AI' },
  'cat.fullstack': { uz: 'Full-stack', en: 'Full-stack' },
  'cat.devops': { uz: 'DevOps', en: 'DevOps' },
  'cat.data': { uz: 'Ma’lumotlar', en: 'Data' },
  'cat.design': { uz: 'Dizayn', en: 'Design' },
  'cat.embedded': { uz: 'Embedded', en: 'Embedded' },

  // Aloqa
  'contact.title': { uz: 'Bog‘lanish', en: 'Get in touch' },
  'contact.subtitle': { uz: 'Loyihangiz bormi yoki shunchaki salom aytmoqchimisiz? Yozing.', en: 'Have a project or just want to say hi? Write to me.' },
  'contact.emailMe': { uz: 'Email yozish', en: 'Email me' },
  'contact.callMe': { uz: 'Qo‘ng‘iroq', en: 'Call me' },
  'contact.bookCall': { uz: 'Suhbat belgilash', en: 'Book a call' },
  'contact.followMe': { uz: 'Ijtimoiy tarmoqlar', en: 'Follow me' },

  // Footer
  'footer.rights': { uz: 'Barcha huquqlar himoyalangan', en: 'All rights reserved' },
  'footer.builtWith': { uz: 'Next.js va Supabase bilan qurilgan', en: 'Built with Next.js and Supabase' },
  'footer.quickLinks': { uz: 'Tezkor havolalar', en: 'Quick links' },
  'footer.legal': { uz: 'Huquqiy', en: 'Legal' },
  'footer.privacy': { uz: 'Maxfiylik siyosati', en: 'Privacy policy' },
  'footer.terms': { uz: 'Foydalanish shartlari', en: 'Terms of use' },
  'footer.sitemap': { uz: 'Sayt xaritasi', en: 'Sitemap' },
  'footer.backToTop': { uz: 'Yuqoriga', en: 'Back to top' },
  'footer.madeIn': { uz: 'Toshkentda mehr bilan yasaldi', en: 'Made with care in Tashkent' },

  // 404
  'notFound.title': { uz: 'Sahifa topilmadi', en: 'Page not found' },
  'notFound.text': { uz: 'Bu sahifa o‘chirilgan yoki manzil xato yozilgan bo‘lishi mumkin.', en: 'This page may have been removed or the address mistyped.' },
  'notFound.game': { uz: 'Xato sahifada o‘yin o‘ynaysizmi?', en: 'Want to play a game on this error page?' },
  'notFound.play': { uz: 'O‘ynash', en: 'Play' },
  'notFound.home': { uz: 'Bosh sahifaga qaytish', en: 'Back to home' },

  // Terminal
  'terminal.hint': { uz: 'Buyruq yozing yoki quyidagilardan birini bosing', en: 'Type a command or click one below' },
  'terminal.unknown': { uz: 'Buyruq topilmadi', en: 'Command not found' },
  'terminal.help': { uz: 'Mavjud buyruqlar', en: 'Available commands' },

  // Admin
  'admin.login': { uz: 'Admin panelga kirish', en: 'Admin login' },
  'admin.password': { uz: 'Parol', en: 'Password' },
  'admin.enter': { uz: 'Kirish', en: 'Sign in' },
  'admin.logout': { uz: 'Chiqish', en: 'Sign out' },
  'admin.dashboard': { uz: 'Boshqaruv paneli', en: 'Dashboard' },
  'admin.wrongPassword': { uz: 'Parol noto‘g‘ri', en: 'Wrong password' },

  // Guestbook
  'guestbook.leave': { uz: 'O‘z izohingizni qoldiring', en: 'Leave your message' },
  'guestbook.namePlaceholder': { uz: 'Ismingiz', en: 'Your name' },
  'guestbook.messagePlaceholder': { uz: 'Bir og‘iz so‘z…', en: 'A few words…' },
  'guestbook.cityPlaceholder': { uz: 'Shahar (majburiy emas)', en: 'City (optional)' },
  'guestbook.added': { uz: 'Rahmat! Izohingiz qo‘shildi.', en: 'Thanks! Your message was added.' },
  'guestbook.entries': { uz: 'izoh', en: 'entries' },
};

/** Lug'atdan matn olish */
export function tr(key: string, locale: Locale): string {
  const item = ui[key];
  if (!item) return key;
  return item[locale] ?? item[DEFAULT_LOCALE] ?? key;
}
