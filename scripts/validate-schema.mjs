/**
 * supabase/schema.sql ni haqiqiy Postgres (WASM) da sinab ko'radi.
 *
 * Maqsad: Supabase SQL Editor'da ishga tushirishdan OLDIN xatolarni topish.
 * Supabase'ga xos qismlar (storage sxemasi, kengaytmalar) chetlab o'tiladi —
 * ular Supabase'da allaqachon mavjud.
 *
 * Ishlatish:
 *   npm i -D @electric-sql/pglite
 *   node scripts/validate-schema.mjs
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const SCHEMA = join(root, 'supabase', 'schema.sql');

let PGlite;
try {
  ({ PGlite } = await import('@electric-sql/pglite'));
} catch {
  console.error('\n❌ @electric-sql/pglite topilmadi.\n');
  console.error('O\'rnatish:  npm i -D @electric-sql/pglite\n');
  process.exit(1);
}

/* ── SQL ni bo'laklarga ajratish ─────────────────────────────── */
function splitStatements(text) {
  const lines = text.split('\n').filter((line) => !line.trim().startsWith('--'));
  const statements = [];
  let current = '';
  let inDollar = false;
  let inString = false;

  for (const char of lines.join('\n')) {
    if (char === "'") inString = !inString;
    current += char;

    if (!inString) {
      if (current.endsWith('$$')) inDollar = !inDollar;
      if (char === ';' && !inDollar) {
        const trimmed = current.trim();
        if (trimmed.length > 1) statements.push(trimmed);
        current = '';
      }
    }
  }
  if (current.trim().length > 1) statements.push(current.trim());
  return statements;
}

/* ── Supabase'ga xos buyruqlarni olib tashlash ───────────────── */
const skipped = [];
const statements = splitStatements(readFileSync(SCHEMA, 'utf8')).filter((statement) => {
  const l = statement.toLowerCase();
  if (l.includes('uuid-ossp')) {
    skipped.push('kengaytma: uuid-ossp');
    return false;
  }
  if (l.includes('storage.')) {
    skipped.push('storage sxemasi');
    return false;
  }
  return true;
});

/* ── Sinov ───────────────────────────────────────────────────── */
const db = new PGlite();
let ok = 0;
const failures = [];

console.log(`\n🧪 ${statements.length} ta SQL buyrug'i sinovdan o'tkaziladi…\n`);

for (const statement of statements) {
  const label = statement.replace(/\s+/g, ' ').slice(0, 70);
  try {
    await db.exec(statement);
    ok += 1;
  } catch (error) {
    failures.push({ label, message: error.message.split('\n')[0] });
  }
}

/* ── Natija ──────────────────────────────────────────────────── */
const expected = [
  'site_settings', 'projects', 'posts', 'services', 'faqs',
  'testimonials', 'messages', 'guestbook', 'uses', 'changelog',
  'socials', 'subscribers',
];

const { rows: tableRows } = await db.query(
  `select table_name from information_schema.tables
   where table_schema = 'public' order by table_name`,
);
const tables = tableRows.map((r) => r.table_name);
const missing = expected.filter((t) => !tables.includes(t));

const { rows: indexRows } = await db.query(
  `select indexname from pg_indexes where schemaname = 'public'`,
);
const { rows: policyRows } = await db.query(
  `select policyname from pg_policies where schemaname = 'public'`,
);
const { rows: triggerRows } = await db.query(
  `select tgname from pg_trigger where not tgisinternal`,
);

const skippedList = [...new Set(skipped)].join(', ') || 'yo`q';

console.log('─'.repeat(62));
console.log(`  Bajarildi:        ${ok} / ${statements.length}`);
console.log(`  Xatolar:          ${failures.length}`);
console.log(`  Jadvallar:        ${tables.length} ta`);
console.log(`  Indekslar:        ${indexRows.length} ta`);
console.log(`  RLS siyosatlari:  ${policyRows.length} ta`);
console.log(`  Triggerlar:       ${triggerRows.length} ta`);
console.log(`  Chetlab o'tildi:  ${skippedList}`);
console.log('─'.repeat(62));

if (missing.length) console.log(`\n⚠️  Yetishmayotgan jadvallar: ${missing.join(', ')}`);
else console.log('\n✅ Barcha 12 jadval yaratildi');

if (failures.length) {
  console.log('\n❌ XATOLAR:\n');
  failures.forEach((f, i) => {
    console.log(`${i + 1}. ${f.label}…`);
    console.log(`   → ${f.message}\n`);
  });
  process.exit(1);
}

console.log('\n✅ Sxema toza — Supabase SQL Editor\'da xatosiz ishlaydi\n');
