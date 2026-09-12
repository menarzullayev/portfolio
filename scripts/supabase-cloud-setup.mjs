/**
 * Supabase loyihasini to'liq avtomatik sozlash (Management API orqali).
 *
 * Bitta token bilan hammasi:
 *   1. API kalitlarini oladi (anon + service_role)
 *   2. .env.local faylini yozadi
 *   3. Sxemani ishga tushiradi
 *   4. Tekshiradi
 *
 * Kerak: Supabase personal access token (sbp_...)
 *   supabase.com/dashboard/account/tokens → Generate new token
 *
 * Ishlatish:
 *   SUPABASE_ACCESS_TOKEN=sbp_xxx node scripts/supabase-cloud-setup.mjs
 *   yoki .env.local faylida SUPABASE_ACCESS_TOKEN=...
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const PROJECT_REF = 'nwemjkrantwdndjwjvlb';
const API = 'https://api.supabase.com/v1';

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
const token = env.SUPABASE_ACCESS_TOKEN;

if (!token) {
  console.error('\n❌ SUPABASE_ACCESS_TOKEN topilmadi.\n');
  console.error('Token olish:  https://supabase.com/dashboard/account/tokens');
  console.error('Ishlatish:    SUPABASE_ACCESS_TOKEN=sbp_xxx node scripts/supabase-cloud-setup.mjs\n');
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

const call = async (path, options = {}) => {
  const res = await fetch(`${API}${path}`, { ...options, headers });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = text;
  }
  return { ok: res.ok, status: res.status, data: json };
};

/* ── 1. Loyihani tekshirish ──────────────────────────────────── */
console.log('\n🔍 Loyiha tekshirilmoqda…');

const project = await call(`/projects/${PROJECT_REF}`);
if (!project.ok) {
  console.error(`\n❌ Loyihaga ulanib bo'lmadi (${project.status}).`);
  console.error(`   ${typeof project.data === 'object' ? JSON.stringify(project.data) : project.data}\n`);
  console.error('Token to\'g\'rimi va loyiha mavjudmi — tekshiring.\n');
  process.exit(1);
}

console.log(`✓ Loyiha: ${project.data.name} (${project.data.region})`);
console.log(`  Holat: ${project.data.status}`);

/* ── 2. API kalitlarini olish ────────────────────────────────── */
console.log('\n🔑 API kalitlari olinmoqda…');

const keysResult = await call(`/projects/${PROJECT_REF}/api-keys`);
if (!keysResult.ok) {
  console.error(`\n❌ Kalitlarni olib bo'lmadi (${keysResult.status}).`);
  console.error(`   ${typeof keysResult.data === 'object' ? JSON.stringify(keysResult.data) : keysResult.data}\n`);
  process.exit(1);
}

const keys = Array.isArray(keysResult.data) ? keysResult.data : [];
const anonKey = keys.find((k) => k.name === 'anon')?.api_key;
const serviceKey = keys.find((k) => k.name === 'service_role')?.api_key;

if (!anonKey || !serviceKey) {
  console.error('\n❌ Kalitlar topilmadi. Mavjud kalitlar:');
  console.error('   ' + keys.map((k) => k.name).join(', ') + '\n');
  process.exit(1);
}

console.log(`✓ anon key:         ${anonKey.slice(0, 20)}… (${anonKey.length} belgi)`);
console.log(`✓ service_role key: ${serviceKey.slice(0, 20)}… (${serviceKey.length} belgi)`);

const projectUrl = `https://${PROJECT_REF}.supabase.co`;

/* ── 3. .env.local faylini yozish ────────────────────────────── */
console.log('\n📝 .env.local yangilanmoqda…');

const envPath = join(root, '.env.local');
let envContent = existsSync(envPath) ? readFileSync(envPath, 'utf8') : '';

const setValue = (content, key, value) => {
  const re = new RegExp(`^${key}=.*$`, 'm');
  if (re.test(content)) return content.replace(re, `${key}=${value}`);
  return content.trimEnd() + `\n${key}=${value}\n`;
};

envContent = setValue(envContent, 'NEXT_PUBLIC_SUPABASE_URL', projectUrl);
envContent = setValue(envContent, 'NEXT_PUBLIC_SUPABASE_ANON_KEY', anonKey);
envContent = setValue(envContent, 'SUPABASE_SERVICE_ROLE_KEY', serviceKey);

writeFileSync(envPath, envContent);
console.log('✓ Yozildi: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

/* ── 4. Sxemani ishga tushirish ──────────────────────────────── */
console.log('\n🗄️  Sxema ishga tushirilmoqda…');

const schemaPath = join(root, 'supabase', 'schema.sql');
const schema = readFileSync(schemaPath, 'utf8');

const queryResult = await call(`/projects/${PROJECT_REF}/database/query`, {
  method: 'POST',
  body: JSON.stringify({ query: schema }),
});

if (!queryResult.ok) {
  console.error(`\n⚠️  Sxema ishga tushmadi (${queryResult.status}):`);
  console.error(`   ${typeof queryResult.data === 'object' ? JSON.stringify(queryResult.data) : queryResult.data}`);
  console.error('\n   Bu muhim emas — sxema allaqachon ishga tushirilgan bo\'lishi mumkin.\n');
} else {
  console.log('✓ Sxema bajarildi');
}

/* ── 5. Jadvallarni tekshirish ───────────────────────────────── */
console.log('\n✅ Jadvallar tekshirilmoqda…');

const check = await call(`/projects/${PROJECT_REF}/database/query`, {
  method: 'POST',
  body: JSON.stringify({
    query: `select table_name from information_schema.tables
            where table_schema = 'public' order by table_name`,
  }),
});

if (check.ok && Array.isArray(check.data)) {
  const tables = check.data.map((r) => r.table_name);
  console.log(`   Topildi: ${tables.length} ta jadval`);
  console.log(`   ${tables.join(', ')}`);

  const expected = [
    'site_settings', 'projects', 'posts', 'services', 'faqs',
    'testimonials', 'messages', 'guestbook', 'uses', 'changelog',
    'socials', 'subscribers',
  ];
  const missing = expected.filter((t) => !tables.includes(t));
  if (missing.length) console.log(`\n   ⚠️  Yetishmaydi: ${missing.join(', ')}`);
  else console.log('\n   ✓ Barcha 12 jadval joyida');
} else {
  console.log(`   ⚠️  Tekshirib bo'lmadi (${check.status})`);
}

/* ── Xulosa ──────────────────────────────────────────────────── */
console.log('\n' + '─'.repeat(60));
console.log('  Baza ulandi!');
console.log('─'.repeat(60));
console.log('\nKeyingi qadam — bazani kontent bilan to\'ldirish:');
console.log('  node scripts/seed-database.mjs\n');
console.log('So\'ng serverni qayta ishga tushiring va admin panelni oching:');
console.log('  npm run dev    →  /admin\n');
