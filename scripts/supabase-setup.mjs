/**
 * Supabase bazasini avtomatik sozlash.
 *
 * Nima qiladi:
 *   1. DATABASE_URL orqali bazaga ulanadi
 *   2. supabase/schema.sql ni ishga tushiradi (12 jadval, RLS, indekslar)
 *   3. media rasm saqlash joyini tekshiradi
 *   4. Natijani hisobot qilib chiqaradi
 *
 * Ishlatish:
 *   node scripts/supabase-setup.mjs
 *
 * DATABASE_URL ni .env.local faylidan yoki muhit o'zgaruvchisidan oladi.
 * Supabase → Project Settings → Database → Connection string → URI
 * (parolni [YOUR-PASSWORD] o'rniga qo'ying)
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import pg from 'pg';

const root = process.cwd();

/* ── Muhit o'zgaruvchilarini yuklash ─────────────────────────── */
function loadEnv() {
  const files = ['.env.local', '.env'];
  const env = { ...process.env };

  for (const file of files) {
    const path = join(root, file);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!(key in process.env)) env[key] = value;
    }
  }
  return env;
}

const env = loadEnv();

/* ── Ulanish satrini yig'ish ─────────────────────────────────── */
function buildConnectionString() {
  if (env.DATABASE_URL) return env.DATABASE_URL;

  const password = env.SUPABASE_DB_PASSWORD;
  const ref = env.SUPABASE_PROJECT_REF;
  if (password && ref) {
    return `postgresql://postgres.${ref}:${encodeURIComponent(password)}@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres`;
  }
  return null;
}

const connectionString = buildConnectionString();

if (!connectionString) {
  console.error('\n❌ DATABASE_URL topilmadi.\n');
  console.error('Ikkita yo\'l bor:\n');
  console.error('  1) .env.local fayliga qo\'shing:');
  console.error('     DATABASE_URL=postgresql://postgres.xxxxx:PAROL@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres');
  console.error('     (Supabase → Project Settings → Database → Connection string → URI)\n');
  console.error('  2) Yoki Supabase → SQL Editor bo\'limida supabase/schema.sql ni qo\'lda ishga tushiring.\n');
  process.exit(1);
}

/* ── SQL ni bo'laklarga ajratish ─────────────────────────────── */
function splitStatements(sql) {
  const withoutComments = sql
    .split('\n')
    .filter((line) => !line.trim().startsWith('--'))
    .join('\n');

  const statements = [];
  let current = '';
  let inDollar = false;
  let inString = false;

  for (const char of withoutComments) {
    if (char === "'") inString = !inString;

    if (!inString) {
      if (current.endsWith('$$')) inDollar = !inDollar;
      if (char === '$') current += char;
      else current += char;
    } else {
      current += char;
    }

    if (char === ';' && !inDollar && !inString) {
      const trimmed = current.trim();
      if (trimmed.length > 1) statements.push(trimmed);
      current = '';
    }
  }

  if (current.trim().length > 1) statements.push(current.trim());
  return statements;
}

/* ── Asosiy ish ──────────────────────────────────────────────── */
async function main() {
  const schemaPath = join(root, 'supabase', 'schema.sql');
  if (!existsSync(schemaPath)) {
    console.error('❌ supabase/schema.sql topilmadi');
    process.exit(1);
  }

  const sql = readFileSync(schemaPath, 'utf8');
  const statements = splitStatements(sql);

  console.log('\n🔌 Bazaga ulanmoqda…');

  const client = new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000,
  });

  try {
    await client.connect();
    console.log('✓ Ulandi\n');
  } catch (error) {
    console.error('❌ Ulanib bo\'lmadi:', error.message);
    console.error('\nTekshiring: parol to\'g\'rimi, loyiha faolmi, IP ruxsat berilganmi.\n');
    process.exit(1);
  }

  console.log(`📄 ${statements.length} ta SQL buyrug'i ishga tushiriladi…\n`);

  let ok = 0;
  let failed = 0;

  for (const statement of statements) {
    const label = statement.replace(/\s+/g, ' ').slice(0, 62);
    try {
      await client.query(statement);
      ok += 1;
      console.log(`  ✓ ${label}…`);
    } catch (error) {
      failed += 1;
      console.log(`  ⚠ ${label}… → ${error.message.split('\n')[0]}`);
    }
  }

  /* ── Natijani tekshirish ───────────────────────────────────── */
  const expected = [
    'site_settings', 'projects', 'posts', 'services', 'faqs',
    'testimonials', 'messages', 'guestbook', 'uses', 'changelog',
    'socials', 'subscribers',
  ];

  const { rows } = await client.query(
    `select table_name from information_schema.tables
     where table_schema = 'public' order by table_name`,
  );
  const existing = rows.map((r) => r.table_name);
  const missing = expected.filter((t) => !existing.includes(t));

  const buckets = await client
    .query(`select id, public from storage.buckets where id = 'media'`)
    .catch(() => ({ rows: [] }));

  console.log('\n' + '─'.repeat(58));
  console.log(`  Buyruqlar:  ${ok} bajarildi, ${failed} xato`);
  console.log(`  Jadvallar:  ${existing.length} ta topildi`);
  if (missing.length) console.log(`  Yetishmaydi: ${missing.join(', ')}`);
  else console.log('  ✓ Barcha 12 jadval joyida');
  console.log(
    `  Rasm joyi:  ${buckets.rows.length ? `media (${buckets.rows[0].public ? 'ommaviy' : 'yopiq'})` : 'yaratilmagan'}`,
  );
  console.log('─'.repeat(58) + '\n');

  await client.end();

  if (missing.length === 0) {
    console.log('✅ Baza tayyor! Endi .env.local faylini to\'ldiring:\n');
    console.log('   NEXT_PUBLIC_SUPABASE_URL=https://<loyiha>.supabase.co');
    console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>');
    console.log('   SUPABASE_SERVICE_ROLE_KEY=<service role key>\n');
    console.log('   (Supabase → Project Settings → API)\n');
  } else {
    console.log('⚠️  Ba\'zi jadvallar yaratilmadi — xato xabarlarini yuqoridan ko\'ring.\n');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('\n❌ Kutilmagan xato:', error.message, '\n');
  process.exit(1);
});
