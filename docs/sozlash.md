# Sozlash qo'llanmasi

Bu saytni o'zingizga moslashtirish uchun amaliy qo'llanma. Har bir bo'limda **nima qilish kerak** va **qaysi faylga tegish kerak** ko'rsatilgan.

---

## 1. Kontentni o'zgartirish

Ikki yo'l bor. Ikkalasi birga ishlaydi: **baza bo'sh bo'lsa seed fayl, to'ldirilgan bo'lsa baza ustuvor.**

### A yo'l — Admin panel (oson, kod kerak emas)

1. `http://localhost:3000/admin` ga kiring (parol: `.env.local` dagi `ADMIN_PASSWORD`)
2. Chap menyudan bo'limni tanlang
3. «Yangi» yoki qalamcha tugmasi bilan tahrirlang
4. «Saqlash»

Bu yo'l **Supabase ulangan bo'lishi shart.** Ulanmagan bo'lsa panel ogohlantirish ko'rsatadi.

### B yo'l — `src/content/seed.ts` fayli

Baza ulanmagan bo'lsa sayt shu fayldan o'qiydi. Kod bilan birga versiyalanadi — qulay.

```ts
// src/content/seed.ts
export const seedContent: SiteContent = {
  settings: {
    name: 'Aziz Karimov',           // ← ismingiz
    initials: 'AK',                  // ← logotip harflari
    role: { uz: 'Full-stack dasturchi', en: 'Full-stack Developer' },
    tagline: {
      uz: 'Tez, toza va ishonchli kod yozaman',
      en: 'I write fast, clean and reliable code',
    },
    email: 'salom@azizkarimov.dev',
    // ...
  },
};
```

> **Muhim:** har bir matn maydoni `{ uz: '...', en: '...' }` ko'rinishida. Ikki tilni ham to'ldiring, aks holda o'sha tilda bo'sh chiqadi.

### Tez almashtirish kerak bo'lgan maydonlar

| Nima | Qayerda |
|---|---|
| Ism, kasb, shior | `settings.name`, `settings.role`, `settings.tagline` |
| Email, shahar | `settings.email`, `settings.city`, `settings.location` |
| Ijtimoiy tarmoqlar | `socials` massivi |
| "Men haqimda" matni | `settings.bio` (paragraflar massivi) |
| Ko'nikmalar | `skills` massivi (`level`: 0–100) |
| Tajriba | `experience` massivi |
| Loyihalar | `projects` massivi |
| Maqolalar | `posts` massivi (`body` — markdown) |
| Narxlar | `pricing` massivi |
| Savol-javob | `faq` massivi |

---

## 2. Ranglarni o'zgartirish

Barcha ranglar `src/app/globals.css` faylidagi CSS o'zgaruvchilarda. Bitta joyni o'zgartirsangiz butun sayt yangilanadi.

```css
/* src/app/globals.css */

/* Yorqin rejim */
:root {
  --accent: #4f46e5;        /* ← asosiy rang (tugmalar, havolalar) */
  --accent-hover: #4338ca;
  --accent-soft: #eef0ff;   /* ← och fon (kartochka ichlari) */
  --accent-2: #06b6d4;      /* ← ikkinchi rang (gradientlar) */
  --bg: #ffffff;
  --text: #0b0c0f;
}

/* Qorong'i rejim */
.dark {
  --accent: #8b8cf9;        /* ← qorong'ida biroz ochroq bo'lishi kerak */
  --accent-hover: #a5a6ff;
  --accent-soft: #1a1b33;
  --bg: #07080a;
  --text: #f3f4f6;
}
```

**Maslahat:** qorong'i rejimda rangni bir pog'ona ochroq qiling, aks holda to'q fonda xira ko'rinadi.

### Tayyor palitralar

| Uslub | `--accent` (yorqin) | `--accent` (qorong'i) | `--accent-2` |
|---|---|---|---|
| Indigo (hozirgi) | `#4f46e5` | `#8b8cf9` | `#06b6d4` |
| Yashil | `#059669` | `#34d399` | `#22d3ee` |
| To'q sariq | `#ea580c` | `#fb923c` | `#f59e0b` |
| Pushti | `#db2777` | `#f472b6` | `#a855f7` |
| Ko'k | `#2563eb` | `#60a5fa` | `#06b6d4` |

---

## 3. Shriftni o'zgartirish

Shrift `src/app/layout.tsx` faylida Google Fonts orqali ulanadi:

```tsx
// src/app/layout.tsx
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

Shriftni almashtirsangiz, `globals.css` dagi `--font-sans` ni ham yangilang:

```css
@theme inline {
  --font-sans: "Yangi shrift", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

**Mashhur tanlovlar:** `Poppins`, `Manrope`, `DM Sans`, `Plus Jakarta Sans`, `Space Grotesk`.

---

## 4. Bo'limlarni o'chirish yoki tartibini o'zgartirish

Barcha bo'limlar `src/app/[locale]/page.tsx` faylida ketma-ket yozilgan. Shunchaki keraksizini o'chiring yoki o'rnini almashtiring:

```tsx
// src/app/[locale]/page.tsx
<Hero content={content} locale={locale} />
<Marquee items={techItems} />
<About content={content} locale={locale} />
<Skills content={content} locale={locale} />

{/* Kerakmasa o'chiring: */}
{/* <MiniGame locale={locale} /> */}

<Contact content={content} locale={locale} />
```

> Har bir bo'lim `id` ga ega (`#about`, `#projects`...). O'chirilgan bo'limning havolasini menyudan ham olib tashlang — `src/components/layout/Navbar.tsx` faylidagi `primaryItems` massividan.

---

## 5. Yangi bo'lim qo'shish

**1-qadam.** `src/components/sections/` ichida yangi fayl yarating:

```tsx
// src/components/sections/Mening.tsx
'use client';

import { t, tr, type Locale } from '@/lib/i18n';
import type { SiteContent } from '@/lib/types';
import { Section, SectionHeading } from '../ui/Section';

export function Mening({ content, locale }: { content: SiteContent; locale: Locale }) {
  return (
    <Section id="mening">
      <SectionHeading eyebrow="Yangi" title="Mening bo'limim" subtitle="Tavsif" />
      <p>Kontent shu yerda.</p>
    </Section>
  );
}
```

**2-qadam.** `src/app/[locale]/page.tsx` ga qo'shing:

```tsx
import { Mening } from '@/components/sections/Mening';
// ...
<Mening content={content} locale={locale} />
```

**3-qadam.** Menyuga qo'shish uchun `src/lib/i18n.ts` dagi `ui` lug'atiga yangi kalit qo'shing:

```ts
'nav.mening': { uz: 'Mening bo\'limim', en: 'My section' },
```

va `Navbar.tsx` dagi `primaryItems` massiviga yozing.

---

## 6. Interfeys matnlarini tahrirlash

Tugmalar, sarlavhalar va boshqa interfeys matnlari `src/lib/i18n.ts` faylidagi `ui` lug'atida:

```ts
export const ui: Dict = {
  'nav.about': { uz: 'Men haqimda', en: 'About' },
  'hero.cta.work': { uz: 'Ishlarimni ko\'rish', en: 'See my work' },
  'form.send': { uz: 'Yuborish', en: 'Send' },
  // ...
};
```

Kalitni topish uchun komponentda `tr('nav.about', locale)` yozuvini qidiring.

---

## 7. Logotip va favicon

Ikkalasi ham SVG. `public/` papkasida:

- `public/favicon.svg` — brauzer yorlig'idagi belgi
- Hero va Footer'dagi logotip — `settings.initials` matnidan yasaladi (`AK` kabi)

Faviconni almashtirish uchun `scripts/generate-assets.mjs` faylidagi `favicon()` funksiyasini tahrirlab, qayta ishga tushiring:

```bash
node scripts/generate-assets.mjs
```

Yoki shunchaki `public/favicon.svg` ni o'z faylingiz bilan almashtiring.

---

## 8. Rasmlarni almashtirish

Barcha o'rinbosar rasmlar SVG formatda — ularni almashtirish oson:

| Rasm | Manzil |
|---|---|
| Avatar | `public/images/avatar.svg` |
| Muqova (OG) | `public/images/og.svg` |
| Mijoz rasmlari | `public/images/avatars/1.svg` … `4.svg` |
| Loyiha muqovalari | `public/images/projects/*.svg` |
| CV | `public/cv/aziz-karimov-cv.pdf` |

**Loyiha muqovasini almashtirish:** rasmni `public/images/projects/` ga tashlang, so'ng `seed.ts` dagi `cover` maydonini yangilang:

```ts
cover: '/images/projects/mening-loyiham.jpg',
```

Yoki admin panelda «Rasm yuklash» bo'limidan yuklab, chiqqan manzilni `cover` ga qo'ying.

---

## 9. Yangi loyiha qo'shish

`src/content/seed.ts` dagi `projects` massiviga qo'shing:

```ts
{
  slug: 'mening-loyiham',              // manzil: /uz/projects/mening-loyiham
  title: 'Mening loyiham',
  summary: { uz: 'Bir jumlalik tavsif', en: 'One-line description' },
  description: { uz: 'Batafsil matn', en: 'Detailed text' },
  category: 'fullstack',               // frontend | backend | mobile | ai | fullstack
  tags: ['Next.js', 'PostgreSQL'],
  cover: '/images/projects/mening-loyiham.svg',
  year: '2026',
  links: [{ label: 'Demo', url: 'https://...' }],
  metrics: [
    { label: { uz: 'Tezlik', en: 'Speed' }, value: '2x' },
  ],
  featured: true,
  source: 'manual',
},
```

---

## 10. Yangi maqola yozish

`posts` massiviga qo'shing. `body` maydoni **markdown** formatida:

````ts
{
  slug: 'yangi-maqola',
  title: { uz: 'Sarlavha', en: 'Title' },
  excerpt: { uz: 'Qisqa mazmun', en: 'Short excerpt' },
  body: `## Birinchi sarlavha

Matn shu yerda. **Qalin**, *kursiv*, [havola](https://example.com).

\`\`\`ts
const x = 1;
\`\`\`

- Ro'yxat elementi
- Ikkinchisi`,
  tags: ['Next.js', 'Performance'],
  date: '2026-09-12',
  readingTime: 5,
  views: 0,
  published: true,
},
````

> Kod bloklari uchun uchta teskari belgi (\`\`\`) ishlatiladi — sintaksis avtomatik ranglanadi.

---

## 11. Muammolarni bartaraf etish

### Sayt namunali kontentni ko'rsatyapti, admin paneldagi o'zgarishlar ko'rinmayapti

Supabase ulanmagan yoki `schema.sql` ishga tushirilmagan. Tekshiring:

```bash
# .env.local da bu qatorlar to'ldirilganmi?
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

So'ng `supabase/schema.sql` ni Supabase → SQL Editor da ishga tushiring va serverni qayta yoqing.

### Admin panelga kira olmayapman

Parol `.env.local` dagi `ADMIN_PASSWORD`. Almashtirgan bo'lsangiz, serverni qayta ishga tushirish kerak — Next.js muhit o'zgaruvchilarini faqat ishga tushishda o'qiydi.

### 3000-port band

```bash
npm run dev -- -p 3200
```

### Rasmlar ko'rinmayapti

`next.config.mjs` dagi `images.remotePatterns` ro'yxatiga rasm manzilining domenini qo'shing:

```js
{ protocol: 'https', hostname: 'sizning-domeningiz.com' },
```

### Build xatosi: "Module not found"

```bash
rm -rf .next node_modules
npm install
npm run build
```

---

## 12. Foydali buyruqlar

```bash
npm run dev                          # Ishlab chiqish serveri
npm run build                        # Ishlab chiqarish uchun qurish
npm run start                        # Qurilgan versiyani ishga tushirish

node scripts/generate-assets.mjs     # Rasm o'rinbosarlarini qayta yaratish

# Tasodifiy maxfiy kalit yaratish
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Yordam kerakmi?

Agar biror joyda turg'un qolib qolsangiz — qaysi faylni, qaysi qatorni o'zgartirmoqchi ekaningizni yozing. Yoki menga ayting, birga qilamiz.
