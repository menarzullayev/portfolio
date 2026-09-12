# Joylash qo'llanmasi (Vercel)

Saytni internetga chiqarish — qadam-baqadam. Taxminan 10 daqiqa vaqt oladi va **bepul**.

---

## 1. Supabase'ni tayyorlash

Agar hali qilmagan bo'lsangiz:

1. **[supabase.com](https://supabase.com)** da loyiha oching (bepul tarif yetarli)
2. **SQL Editor → New query** bo'limida `supabase/schema.sql` faylining mazmunini qo'yib **Run** bosing
3. **Settings → API** dan 3 ta qiymatni oling:
   - Project URL
   - anon public
   - service_role secret
4. **Storage → New bucket** → nomi `media`, **Public** yoqilgan bo'lsin

> `schema.sql` oldindan Postgres'da sinovdan o'tkazilgan — 12 jadval, 21 indeks, 10 RLS siyosati, 3 trigger. Xatosiz ishlaydi.

**Ixtiyoriy:** kontentni bazaga ko'chirish (admin panelda tahrirlash uchun):

```bash
node scripts/seed-database.mjs
```

---

## 2. Vercel'ga ulash

1. **[vercel.com](https://vercel.com)** → GitHub bilan kiring
2. **Add New → Project**
3. `portfolio` repozitoriysini tanlang → **Import**
4. Sozlamalarga tegmang — Next.js avtomatik aniqlanadi
5. **Environment Variables** bo'limini ochib quyidagilarni qo'shing:

| Nomi | Qiymat | Majburiy |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://sizning-domen.vercel.app` | ✅ |
| `ADMIN_PASSWORD` | Kuchli parol | ✅ |
| `ADMIN_SECRET` | 64 belgili tasodifiy matn | ✅ |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Supabase uchun |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` | Supabase uchun |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGci...` | Supabase uchun |
| `SUPABASE_STORAGE_BUCKET` | `media` | Supabase uchun |
| `GITHUB_USERNAME` | `menarzullayev` | Tavsiya etiladi |
| `GITHUB_TOKEN` | `ghp_...` | Ixtiyoriy |
| `RESEND_API_KEY` | `re_...` | Ixtiyoriy |
| `CONTACT_EMAIL` | `saidakbarnarzullayev@mail.ru` | Ixtiyoriy |
| `NEXT_PUBLIC_ANALYTICS_ID` | Umami/Plausible ID | Ixtiyoriy |

6. **Deploy** tugmasini bosing — 2 daqiqada tayyor

### Maxfiy kalit yaratish

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 2.5. Hududni tanlash (tezlik uchun muhim)

Sayt har bir so'rovda Supabase'dan ma'lumot oladi (admin panelda kiritilgan
o'zgarishlar darhol ko'rinishi uchun). Shuning uchun **Vercel funksiyasi
Supabase bilan bir hududda bo'lishi** tezlikni sezilarli oshiradi.

Sizning Supabase loyihangiz **`ap-southeast-2` (Sidney)** da joylashgan.

Vercel'da hududni o'zgartirish:

1. **Settings → Functions → Function Region**
2. **Sydney (syd1)** ni tanlang
3. **Redeploy** qiling

> Farqi: noto'g'ri hududda har bir so'rov ~300-500 ms sekinroq bo'ladi.

---

## 3. Domenni ulash

1. Vercel → **Settings → Domains** → **Add**
2. Domeningizni yozing (masalan `saidakbar.uz`)
3. DNS sozlamalarini ko'rsatilganidek qiling:
   - `A` yozuvi → `76.76.21.21`
   - yoki `CNAME` → `cname.vercel-dns.com`
4. **Muhim:** `NEXT_PUBLIC_SITE_URL` ni yangi domenga o'zgartirib, **Redeploy** qiling

> Domen yo'qmi? Vercel bepul `sizning-loyiha.vercel.app` manzilini beradi.

---

## 4. Joylashdan keyin tekshirish

| Nima | Qayerda |
|---|---|
| Sayt ochilyaptimi | `https://domeningiz` |
| Sitemap | `https://domeningiz/sitemap.xml` |
| Robots | `https://domeningiz/robots.txt` |
| RSS | `https://domeningiz/uz/rss.xml` |
| Admin panel | `https://domeningiz/admin` |
| **Sozlash holati** | Admin panel → Umumiy → pastdagi panel |

Admin panelning bosh sahifasidagi **"Sozlash holati"** paneli hamma narsa to'g'ri ulanganini ko'rsatadi. Qaysi xizmat sozlanmagan bo'lsa, o'sha yerda nima qilish kerakligi yozilgan.

---

## 5. Tez-tez uchraydigan muammolar

### Saytda namunali kontent ko'rinayapti, admin paneldagi o'zgarishlar yo'q

Supabase sozlanmagan yoki jadvallar bo'sh. Admin panel → **Sozlash holati** ni tekshiring.

### Admin panelga kira olmayapman

`ADMIN_PASSWORD` Vercel'da to'g'ri qo'yilganini tekshiring. O'zgartirgan bo'lsangiz — **Redeploy** kerak (muhit o'zgaruvchilari faqat qurishda o'qiladi).

### Rasmlar yuklanmayapti

Supabase → Storage → `media` bo'limi yaratilganini va **Public** ekanini tekshiring.

### Havolani ulashganda rasm chiqmayapti

`NEXT_PUBLIC_SITE_URL` haqiqiy domen bo'lishi kerak — `localhost` bo'lsa ijtimoiy tarmoqlar rasmni topa olmaydi.

### 404 xatosi ichki sahifalarda

`supabase/schema.sql` ishga tushirilganini tekshiring.

### Build xatosi

Vercel'da **Deployments → Logs** ni oching. Ko'pincha sabab — muhit o'zgaruvchisi yetishmayapti.

---

## 6. Yangilanishlarni chiqarish

Saytga o'zgarish kiritsangiz:

```bash
git add .
git commit -m "izoh"
git push
```

Vercel **avtomatik** qayta quradi va yangilaydi. Hech narsa bosish shart emas.

---

## 7. Xarajat

| Xizmat | Bepul tarif |
|---|---|
| Vercel | 100 GB trafik/oy, cheksiz deploy |
| Supabase | 500 MB baza, 1 GB rasm saqlash, 50 000 so'rov/oy |

Shaxsiy portfolio uchun bepul tarif **yillar davomida yetadi**.

---

## Muqobil: Netlify yoki GitHub Pages

**Netlify** — Vercel kabi ishlaydi, Next.js qo'llab-quvvatlanadi.
**GitHub Pages** — statik eksport kerak (`next build` + `output: 'export'`), lekin u holda **admin panel va API ishlamaydi**. Tavsiya etilmaydi.
