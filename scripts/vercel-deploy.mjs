/**
 * Vercel'ga deploy qilish — REST API orqali (MCP kerak emas).
 *
 * Nima qiladi:
 *   1. Loyihani yaratadi va GitHub repo bilan bog'laydi
 *   2. Muhit o'zgaruvchilarini o'rnatadi
 *   3. Hududni tanlaydi (Supabase bilan bir joyda — tezlik uchun)
 *   4. Deploy qiladi va tugashini kutadi
 *   5. Manzilni oladi
 *
 * Ishlatish:
 *   VERCEL_TOKEN=xxx node scripts/vercel-deploy.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const API = 'https://api.vercel.com';
const REPO = 'menarzullayev/portfolio';
const PROJECT_NAME = 'portfolio';
const REGION = 'syd1'; // Sydney — Supabase (ap-southeast-2) bilan bir hudud

/* ── Token ───────────────────────────────────────────────────── */
function readEnvFile(file) {
  const path = join(process.cwd(), file);
  if (!existsSync(path)) return {};
  const out = {};
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq === -1) continue;
    out[t.slice(0, eq).trim()] = t.slice(eq + 1).trim();
  }
  return out;
}

const env = { ...readEnvFile('vercel-env.txt'), ...readEnvFile('.env.local'), ...process.env };
const TOKEN = env.VERCEL_TOKEN;

if (!TOKEN) {
  console.error('\n❌ VERCEL_TOKEN topilmadi.');
  console.error('   vercel.com/account/tokens → Create Token\n');
  process.exit(1);
}

const call = async (path, options = {}) => {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }
  return { ok: res.ok, status: res.status, data };
};

/* ── 1. Loyihani yaratish yoki olish ─────────────────────────── */
console.log('\n🔍 Loyiha tekshirilmoqda…');

let project = await call(`/v9/projects/${PROJECT_NAME}`);
let projectId;

if (project.ok) {
  projectId = project.data.id;
  console.log(`✓ Loyiha mavjud: ${project.data.name} (${projectId})`);
} else if (project.status === 404) {
  console.log('  Yangi loyiha yaratilmoqda…');
  const created = await call('/v11/projects', {
    method: 'POST',
    body: JSON.stringify({
      name: PROJECT_NAME,
      framework: 'nextjs',
      gitRepository: { type: 'github', repo: REPO },
    }),
  });
  if (!created.ok) {
    console.error(`\n❌ Loyiha yaratilmadi (${created.status}):`);
    console.error(`   ${JSON.stringify(created.data).slice(0, 400)}\n`);
    process.exit(1);
  }
  project = created;
  projectId = created.data.id;
  console.log(`✓ Loyiha yaratildi: ${created.data.name} (${projectId})`);
} else {
  console.error(`\n❌ Loyihani tekshirib bo'lmadi (${project.status}):`);
  console.error(`   ${JSON.stringify(project.data).slice(0, 300)}\n`);
  process.exit(1);
}

const repoId = project.data.link?.repoId;
console.log(`  Repo: ${project.data.link?.repo ?? '—'} | repoId: ${repoId ?? '—'}`);

/* ── 2. Muhit o'zgaruvchilari ────────────────────────────────── */
console.log("\n🔧 Muhit o'zgaruvchilari o'rnatilmoqda…");

const ENV_VARS = [
  ['NEXT_PUBLIC_SUPABASE_URL', env.NEXT_PUBLIC_SUPABASE_URL],
  ['NEXT_PUBLIC_SUPABASE_ANON_KEY', env.NEXT_PUBLIC_SUPABASE_ANON_KEY],
  ['SUPABASE_SERVICE_ROLE_KEY', env.SUPABASE_SERVICE_ROLE_KEY],
  ['SUPABASE_STORAGE_BUCKET', env.SUPABASE_STORAGE_BUCKET || 'media'],
  ['ADMIN_PASSWORD', env.ADMIN_PASSWORD],
  ['ADMIN_SECRET', env.ADMIN_SECRET],
  ['GITHUB_USERNAME', env.GITHUB_USERNAME || 'menarzullayev'],
].filter(([, value]) => value);

const existing = await call(`/v9/projects/${PROJECT_NAME}/env?decrypt=false`);
const existingKeys = new Set(
  (existing.ok ? existing.data.envs ?? [] : []).map((e) => e.key),
);

for (const [key, value] of ENV_VARS) {
  if (existingKeys.has(key)) {
    console.log(`  ○ ${key} — allaqachon bor`);
    continue;
  }
  const res = await call(`/v10/projects/${PROJECT_NAME}/env`, {
    method: 'POST',
    body: JSON.stringify({
      key,
      value,
      type: key.startsWith('NEXT_PUBLIC_') ? 'plain' : 'encrypted',
      target: ['production', 'preview', 'development'],
    }),
  });
  console.log(`  ${res.ok ? '✓' : '✗'} ${key}${res.ok ? '' : ' — ' + JSON.stringify(res.data).slice(0, 120)}`);
}

/* ── 3. Hudud ────────────────────────────────────────────────── */
console.log(`\n🌍 Hudud: ${REGION}`);
const regionRes = await call(`/v9/projects/${PROJECT_NAME}`, {
  method: 'PATCH',
  body: JSON.stringify({ serverlessFunctionRegion: REGION }),
});
console.log(`  ${regionRes.ok ? '✓ o‘rnatildi' : '⚠ ' + JSON.stringify(regionRes.data).slice(0, 120)}`);

/* ── 4. Deploy ───────────────────────────────────────────────── */
console.log('\n🚀 Deploy qilinmoqda…');

const deploy = await call('/v13/deployments', {
  method: 'POST',
  body: JSON.stringify({
    name: PROJECT_NAME,
    project: PROJECT_NAME,
    target: 'production',
    gitSource: { type: 'github', repoId, ref: 'main' },
  }),
});

if (!deploy.ok) {
  console.error(`\n❌ Deploy boshlanmadi (${deploy.status}):`);
  console.error(`   ${JSON.stringify(deploy.data).slice(0, 400)}\n`);
  process.exit(1);
}

const deployId = deploy.data.id;
const deployUrl = `https://${deploy.data.url}`;
console.log(`✓ Boshlandi: ${deployId}`);
console.log(`  ${deployUrl}`);

/* ── 5. Tugashini kutish ─────────────────────────────────────── */
console.log('\n⏳ Qurilish kutilmoqda (2-3 daqiqa)…');

let final;
for (let i = 0; i < 80; i += 1) {
  await new Promise((r) => setTimeout(r, 6000));
  const check = await call(`/v13/deployments/${deployId}`);
  if (!check.ok) continue;
  const state = check.data.readyState;
  if (i % 5 === 0) console.log(`  … ${state}`);
  if (state === 'READY' || state === 'ERROR' || state === 'CANCELED') {
    final = check.data;
    break;
  }
}

if (!final) {
  console.log('\n⚠ Vaqt tugadi — holatni Vercel panelida tekshiring.\n');
  process.exit(1);
}

console.log('');
console.log('─'.repeat(60));

if (final.readyState === 'READY') {
  const url = `https://${final.url}`;
  console.log('✅ DEPLOY MUVAFFAQIYATLI');
  console.log('─'.repeat(60));
  console.log(`\n  Manzil: ${url}\n`);
  console.log('Keyingi qadam — sayt manzilini o‘rnatish:');
  console.log(`  NEXT_PUBLIC_SITE_URL=${url}\n`);
} else {
  console.log(`❌ DEPLOY XATO: ${final.readyState}`);
  console.log('─'.repeat(60));
  if (final.errorMessage) console.log(`\n  ${final.errorMessage}\n`);
  console.log('  Batafsil: vercel.com → loyiha → Deployments → Build Logs\n');
  process.exit(1);
}
