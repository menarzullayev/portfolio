/**
 * Bazani kontent bilan to'ldirish.
 *
 * Nima qiladi:
 *   1. src/content/seed.ts faylini o'qib, JavaScript'ga o'giradi
 *   2. Supabase'ga REST API orqali yozadi
 *   3. Har bir jadval bo'yicha hisobot chiqaradi
 *
 * Ishlatish:
 *   node scripts/seed-database.mjs           # bo'sh jadvallargina yozadi
 *   node scripts/seed-database.mjs --force   # mavjud ma'lumotni almashtiradi
 *
 * Kerak: .env.local da NEXT_PUBLIC_SUPABASE_URL va SUPABASE_SERVICE_ROLE_KEY
 */
import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { createClient } from '@supabase/supabase-js';

const root = process.cwd();
const FORCE = process.argv.includes('--force');

/* ── Muhit o'zgaruvchilari ───────────────────────────────────── */
function loadEnv() {
  const env = { ...process.env };
  for (const file of ['.env.local', '.env']) {
    const path = join(root, file);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      if (!(key in process.env)) env[key] = trimmed.slice(eq + 1).trim();
    }
  }
  return env;
}

const env = loadEnv();
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('\n❌ NEXT_PUBLIC_SUPABASE_URL yoki SUPABASE_SERVICE_ROLE_KEY topilmadi.\n');
  console.error('.env.local faylini to\'ldiring (Supabase → Settings → API).\n');
  process.exit(1);
}

/* ── seed.ts ni yuklash ──────────────────────────────────────── */
const seedPath = join(root, 'src', 'content', 'seed.ts');
if (!existsSync(seedPath)) {
  console.error('❌ src/content/seed.ts topilmadi');
  process.exit(1);
}

const transpiled = ts.transpileModule(readFileSync(seedPath, 'utf8'), {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;

const tmpPath = join(root, `.seed-tmp-${Date.now()}.mjs`);
writeFileSync(tmpPath, transpiled);

let seedContent;
try {
  const mod = await import(pathToFileURL(tmpPath).href);
  seedContent = mod.seedContent;
} finally {
  unlinkSync(tmpPath);
}

if (!seedContent) {
  console.error('❌ seedContent topilmadi');
  process.exit(1);
}

/* ── camelCase → snake_case ──────────────────────────────────── */
const toSnake = (obj) => {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    out[key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)] = value;
  }
  return out;
};

/* ── Supabase klienti ────────────────────────────────────────── */
const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

/* ── Jadval ta'riflari ───────────────────────────────────────── */
const tables = [
  {
    table: 'site_settings',
    rows: () => [toSnake(seedContent.settings)],
    single: true,
    label: 'Sayt sozlamalari',
  },
  { table: 'socials', rows: () => seedContent.socials.map(toSnake), label: 'Ijtimoiy tarmoqlar' },
  { table: 'projects', rows: () => seedContent.projects.map(toSnake), label: 'Loyihalar' },
  { table: 'posts', rows: () => seedContent.posts.map(toSnake), label: 'Maqolalar' },
  { table: 'services', rows: () => seedContent.services.map(toSnake), label: 'Xizmatlar' },
  { table: 'faqs', rows: () => seedContent.faq.map(toSnake), label: 'Savol-javob' },
  {
    table: 'testimonials',
    rows: () => seedContent.testimonials.map(toSnake),
    label: 'Mijoz fikrlari',
  },
  { table: 'changelog', rows: () => seedContent.changelog.map(toSnake), label: 'Yangilanishlar' },
  { table: 'uses', rows: () => seedContent.uses.map(toSnake), label: 'Vositalar' },
  { table: 'guestbook', rows: () => seedContent.guestbook.map(toSnake), label: 'Mehmonlar kitobi' },
];

/* ── Asosiy ish ──────────────────────────────────────────────── */
console.log(`\n🌱 Baza to'ldirilmoqda${FORCE ? ' (majburiy rejim)' : ''}…\n`);

let written = 0;
let skippedCount = 0;
const errors = [];

for (const { table, rows, single, label } of tables) {
  const data = rows();

  if (data.length === 0) {
    console.log(`  ○ ${label.padEnd(22)} bo'sh — o'tkazib yuborildi`);
    continue;
  }

  // Mavjud ma'lumotni tekshirish
  const { count, error: countError } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true });

  if (countError) {
    errors.push({ table, message: countError.message });
    console.log(`  ✗ ${label.padEnd(22)} ${countError.message}`);
    continue;
  }

  if (count && count > 0 && !FORCE) {
    skippedCount += 1;
    console.log(`  ○ ${label.padEnd(22)} ${count} ta yozuv bor — tegilmadi`);
    continue;
  }

  if (FORCE && count && count > 0) {
    const { error: deleteError } = await supabase
      .from(table)
      .delete()
      .neq('id', single ? -1 : -1);
    if (deleteError) {
      errors.push({ table, message: deleteError.message });
      console.log(`  ✗ ${label.padEnd(22)} o'chirishda xato: ${deleteError.message}`);
      continue;
    }
  }

  const { error } = await supabase.from(table).insert(data);

  if (error) {
    errors.push({ table, message: error.message });
    console.log(`  ✗ ${label.padEnd(22)} ${error.message}`);
  } else {
    written += data.length;
    console.log(`  ✓ ${label.padEnd(22)} ${data.length} ta yozuv`);
  }
}

/* ── Hisobot ─────────────────────────────────────────────────── */
console.log('\n' + '─'.repeat(58));
console.log(`  Yozildi:        ${written} ta yozuv`);
console.log(`  O'tkazildi:     ${skippedCount} ta jadval (ma'lumot bor edi)`);
console.log(`  Xatolar:        ${errors.length}`);
console.log('─'.repeat(58));

if (errors.length) {
  console.log('\n❌ Xatolar:\n');
  errors.forEach((e) => console.log(`  ${e.table}: ${e.message}\n`));
  console.log('Maslahat: sxema ishga tushirilganini tekshiring (supabase/schema.sql).\n');
  process.exit(1);
}

console.log('\n✅ Baza tayyor! Admin panelda tahrirlash mumkin: /admin\n');
