# Shaxsiy portfolio va blog

Next.js 15 asosida qurilgan, to'liq dinamik shaxsiy sayt: portfolio, blog, xizmatlar, narxlar va admin panel.

**🌐 Jonli manzil:** https://portfolio-narzullayevme-s-projects.vercel.app
**🔐 Admin panel:** [/admin](https://portfolio-narzullayevme-s-projects.vercel.app/admin)

---

## Nima bor

**45 ta bo'lim** — batafsil ro'yxat `docs/sayt-bolimlari.md` faylida.

| Guruh | Bo'limlar |
|---|---|
| A. Kirish | Hero, yopishqoq navigatsiya, aylanuvchi texnologiya tasmasi, fon animatsiyasi, tanishtiruv videosi, bandlik holati |
| B. Men haqimda | Bio, tajriba yo'li, ko'nikmalar, texnologiya stack, ta'lim, sertifikatlar, tillar, ish jarayoni, qiziqishlar, "Hozir", tamoyillar, kun tartibi |
| C. Ishlar | Loyihalar galereyasi, filtrlash, batafsil loyiha sahifasi, GitHub statistikasi, ochiq kod hissasi, kod namunalari, interaktiv terminal, natijalar, ilova havolalari, case study |
| D. Blog | Maqolalar ro'yxati, qidiruv, teglar, o'qish vaqti, seriyalar, o'xshash maqolalar, obuna, ko'rishlar |
| E. Ishonch | Mijoz fikrlari, hamkorlar, raqamlar, mukofotlar, matbuot, mijozlar xaritasi |
| F. Xizmatlar | Xizmatlar, narx paketlari, narx kalkulyatori, savol-javob, ish shartlari, bo'sh vaqtlar |
| G. Aloqa | Forma, ijtimoiy tarmoqlar, email, CV yuklab olish, suhbat belgilash, suzuvchi tugma, chaqiruv banneri, xarita, javob va'dasi |
| H. Texnik | UZ/EN til, qorong'i/yorqin rejim, SEO, moslashuvchan dizayn, tezlik, 404 (+ mini o'yin), xato chegarasi, yuklanish skeleton, sitemap, RSS, analitika, cookie, qulaylik (a11y), admin panel |
| I. O'ziga xos | Interaktiv terminal, kursor effekti, 404 o'yini, "Uses" sahifasi, mehmonlar kitobi, yangilanishlar, yashirin hazil, ovozli tanishtiruv, mini o'yin |

---

## Texnologiyalar

- **Next.js 15** (App Router, Server Components)
- **TypeScript**
- **Tailwind CSS v4** — dizayn tokenlari CSS o'zgaruvchilarda
- **Framer Motion** — animatsiyalar
- **next-themes** — qorong'i/yorqin rejim
- **Supabase** — ma'lumotlar bazasi + rasm saqlash
- **react-markdown** — blog maqolalari

---

## Ishga tushirish

```bash
# 1. Bog'liqliklarni o'rnatish
npm install

# 2. Muhit o'zgaruvchilarini sozlash
cp .env.example .env.local
# .env.local faylini ochib qiymatlarni to'ldiring

# 3. Ishga tushirish
npm run dev
```

Sayt: http://localhost:3000 → avtomatik `/uz` ga yo'naltiriladi.
Admin panel: http://localhost:3000/admin

> Supabase sozlanmagan bo'lsa ham sayt **to'liq ishlaydi** — namunali kontent (`src/content/seed.ts`) ko'rsatiladi. Admin panel esa faqat baza ulangandan keyin ishlaydi.

---

## Supabase ulash

1. [supabase.com](https://supabase.com) saytida loyiha oching.
2. Supabase CLI orqali loyihani ulab, `supabase/migrations/` dagi migratsiyalarni boshqaring.
3. **Project Settings → API** bo'limidan quyidagilarni `.env.local` fayliga yozing:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

4. Serverni qayta ishga tushiring.

**Schema source of truth:** `supabase/migrations/`.
`supabase/schema.sql` hozircha eski bootstrap/reference snapshot sifatida saqlanadi; yangi schema o'zgarishlarini unga qo'shmang.

### Migration workflow

```bash
# Supabase CLI bilan ishlash
supabase login
supabase link --project-ref <PROJECT_REF>

# Yangi migration
supabase migration new <change_name>

# Lokal/linked database bilan migration holatini tekshirish
supabase migration list

# Migrationlarni qo'llash
supabase db push
```

> Eslatma: mavjud production bazasining migration history'sini baseline bilan moslashtirish alohida operatsion qadam. Bu repo o'zgarishi production bazaga avtomatik migration qo'llamaydi.

---

## Admin panel

Manzil: `/admin` · Parol: `.env.local` dagi `ADMIN_PASSWORD` (standart: `admin123`)

> **Sozlash holati** — panelning bosh sahifasida qaysi xizmatlar ulanganini ko'rsatadigan panel bor: Supabase, GitHub, email, analitika, admin xavfsizligi va sayt manzili. Har biri uchun nima qilish kerakligi yozilgan. Standart parol ishlatilsa ogohlantiradi.

**Imkoniyatlar:**

- **Loyihalar** — qo'shish, tahrirlash, o'chirish, kategoriya va teglar
- **Maqolalar** — markdown formatida yozish, qoralama saqlash, seriyalar
- **Xizmatlar, savol-javob, mijoz fikrlari, vositalar, yangilanishlar, ijtimoiy tarmoqlar** — to'liq CRUD
- **Xabarlar** — aloqa formasi orqali kelgan murojaatlar
- **Mehmonlar kitobi** — izohlarni boshqarish
- **Rasm yuklash** — 5 MB gacha, Supabase Storage'ga
- **Sozlamalar** — ism, shior, aloqa, bandlik holati, CV havolasi

> ⚠️ **Muhim:** Parolni almashtiring!
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```
> Natijani `ADMIN_SECRET` ga yozing va `ADMIN_PASSWORD` ni kuchli parolga o'zgartiring.

---

## GitHub integratsiyasi

`.env.local` faylida `GITHUB_USERNAME` ni yozsangiz, GitHub statistikasi (yulduzlar, tillar, repolar) avtomatik tortiladi.

```env
GITHUB_USERNAME=azizkarimov
GITHUB_TOKEN=ghp_xxxx   # majburiy emas, limit uchun foydali
```

---

## Analitika (majburiy emas)

`.env.local` faylida `NEXT_PUBLIC_ANALYTICS_ID` ni to'ldirsangiz, tashrif statistikasi yig'iladi. Bo'sh qolsa hech qanday skript yuklanmaydi.

```env
# Umami (standart) — cloud.umami.is → Settings → Websites
NEXT_PUBLIC_ANALYTICS_ID=xxxxxxxx-xxxx-xxxx
NEXT_PUBLIC_ANALYTICS_PROVIDER=umami

# yoki Plausible — plausible.io → Site settings
NEXT_PUBLIC_ANALYTICS_ID=azizkarimov.dev
NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible
```

Ikkala xizmat ham cookie ishlatmaydi — shuning uchun maxfiylik siyosatiga ziddiyat yo'q.
O'zingiz joylagan Umami serveringiz bo'lsa, `NEXT_PUBLIC_ANALYTICS_URL` ni ko'rsating.

---

## Vercel'ga joylash

1. Loyihani GitHub'ga yuklang.
2. [vercel.com](https://vercel.com) → **New Project** → reponi tanlang.
3. **Environment Variables** bo'limida `.env.local` dagi barcha qiymatlarni qo'shing.
4. **Deploy** tugmasini bosing.

`NEXT_PUBLIC_SITE_URL` ni haqiqiy domeningizga o'zgartirishni unutmang — bu SEO, RSS va sitemap uchun muhim.

> Batafsil qadam-baqadam qo'llanma: **[`docs/deploy.md`](docs/deploy.md)** — muhit o'zgaruvchilari jadvali, domen ulash, muammolarni bartaraf etish bilan.

---

## Papka tuzilishi

```
src/
├── app/
│   ├── [locale]/          # UZ/EN sahifalar
│   │   ├── page.tsx       # Bosh sahifa (45 bo'lim)
│   │   ├── blog/          # Blog ro'yxati va maqola sahifasi
│   │   ├── projects/      # Loyihalar va batafsil sahifa
│   │   ├── uses/ now/ guestbook/ changelog/ sitemap/
│   │   ├── privacy/ terms/
│   │   └── rss.xml/       # RSS kanali
│   ├── admin/             # Admin panel
│   ├── api/               # API yo'nalishlari
│   ├── globals.css        # Dizayn tokenlari
│   ├── layout.tsx         # Asosiy karkas
│   ├── not-found.tsx      # 404 (+ mini o'yin)
│   ├── sitemap.ts         # Sayt xaritasi
│   └── robots.ts
├── components/
│   ├── layout/            # Navbar, Footer, PageHeader
│   ├── sections/          # Sahifa bo'limlari
│   ├── admin/             # Admin panel interfeysi
│   ├── ui/                # Kichik komponentlar
│   └── providers/         # Mavzu provayderi
├── content/seed.ts        # Namunali kontent
├── lib/                   # i18n, ma'lumot, auth, GitHub
└── middleware.ts          # Til yo'naltirish
```

---

## Hujjatlar

- **[`docs/deploy.md`](docs/deploy.md)** — internetga chiqarish: Vercel, muhit o'zgaruvchilari, domen, muammolarni bartaraf etish
- **[`docs/sozlash.md`](docs/sozlash.md)** — amaliy sozlash qo'llanmasi: ranglar, shrift, bo'lim qo'shish/o'chirish, kontent, rasmlar
- **[`docs/tekshirish.md`](docs/tekshirish.md)** — har bir ma'lumot qayerdan olingani va ko'rib chiqilishi kerak bo'lgan matnlar
- **[`docs/sayt-bolimlari.md`](docs/sayt-bolimlari.md)** — 45 ta bo'limning to'liq katalogi

---

## Kontentni tahrirlash

Ikki yo'l bor:

1. **Admin panel orqali** (Supabase ulangan bo'lsa) — o'zgarish darhol saqlanadi.
2. **`src/content/seed.ts` faylini tahrirlab** — bu holda o'zgarish kod bilan birga versiyalanadi. Baza bo'sh bo'lganda sayt shu fayldan o'qiydi.

---

## Foydali buyruqlar

```bash
npm run dev      # Ishlab chiqish serveri
npm run build    # Ishlab chiqarish uchun qurish
npm run start    # Qurilgan versiyani ishga tushirish
npm run lint     # Kodni tekshirish

node scripts/generate-assets.mjs   # Rasm o'rinbosarlarini qayta yaratish
node scripts/supabase-setup.mjs    # Sxemani ishga tushirish (12 jadval, RLS, indekslar)
node scripts/seed-database.mjs     # Bazani kontent bilan to'ldirish
node scripts/seed-database.mjs --force   # Mavjud ma'lumotni almashtirib to'ldirish
```

**Build natijasini boshqa papkaga yozish** (masalan, ikki nusxani yonma-yon sinash uchun):

```bash
NEXT_DIST_DIR=.next-preview npm run build
NEXT_DIST_DIR=.next-preview npm run start
```

---

## Litsenziya

Shaxsiy foydalanish uchun. O'zgartirib, o'z nomingizga moslashtiring.
