/**
 * Sayt uchun statik resurslarni yaratadi:
 * SVG rasm o'rinbosarlari (avatar, loyiha muqovalari, OG rasm) va CV fayli.
 *
 * Ishlatish: node scripts/generate-assets.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const pub = join(root, 'public');

['images', 'images/projects', 'cv'].forEach((d) => mkdirSync(join(pub, d), { recursive: true }));

/* ============================================================
   Palitralar — har bir loyiha uchun alohida rang juftligi
   ============================================================ */
const palettes = [
  ['#4f46e5', '#06b6d4'],
  ['#7c3aed', '#ec4899'],
  ['#0ea5e9', '#22d3ee'],
  ['#f59e0b', '#ef4444'],
  ['#10b981', '#06b6d4'],
  ['#6366f1', '#a855f7'],
  ['#e11d48', '#f97316'],
];

/** Muqovadagi yozuvni SVG uchun xavfsiz holga keltirish */
const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function projectCover(title, subtitle, meta, index) {
  const [c1, c2] = palettes[index % palettes.length];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500" role="img" aria-label="${esc(title)}">
  <defs>
    <linearGradient id="bg${index}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b0d12"/>
      <stop offset="100%" stop-color="#151824"/>
    </linearGradient>
    <linearGradient id="acc${index}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <pattern id="grid${index}" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity="0.045" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="800" height="500" fill="url(#bg${index})"/>
  <rect width="800" height="500" fill="url(#grid${index})"/>
  <circle cx="670" cy="80" r="190" fill="url(#acc${index})" opacity="0.16"/>
  <circle cx="110" cy="440" r="160" fill="url(#acc${index})" opacity="0.10"/>

  <g transform="translate(56 148)">
    <rect x="0" y="0" width="56" height="6" rx="3" fill="url(#acc${index})"/>
    <text x="0" y="66" font-family="Inter, Segoe UI, sans-serif" font-size="40" font-weight="700" fill="#f3f4f6">${esc(title)}</text>
    <text x="0" y="106" font-family="Inter, Segoe UI, sans-serif" font-size="19" fill="#8b91a0">${esc(subtitle)}</text>
  </g>

  <g transform="translate(56 372)" font-family="JetBrains Mono, monospace" font-size="14" fill="#6b7280">
    <text x="0" y="0">${esc(meta)}</text>
  </g>

  <g transform="translate(548 330)">
    <rect x="0" y="0" width="196" height="122" rx="14" fill="#0f1115" stroke="#1e222a"/>
    <rect x="18" y="20" width="62" height="8" rx="4" fill="url(#acc${index})" opacity="0.85"/>
    <rect x="18" y="40" width="130" height="7" rx="3.5" fill="#2c313c"/>
    <rect x="18" y="57" width="102" height="7" rx="3.5" fill="#2c313c"/>
    <rect x="18" y="74" width="150" height="7" rx="3.5" fill="#2c313c"/>
    <rect x="18" y="91" width="76" height="7" rx="3.5" fill="#2c313c"/>
  </g>
</svg>`;
}

function mainAvatar() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" role="img" aria-label="SN">
  <defs>
    <linearGradient id="a" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4f46e5"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
    <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="#ffffff" fill-opacity="0.14"/>
    </pattern>
  </defs>
  <rect width="400" height="400" rx="48" fill="#0f1115"/>
  <rect width="400" height="400" rx="48" fill="url(#dots)"/>
  <circle cx="200" cy="200" r="120" fill="url(#a)" opacity="0.16"/>
  <text x="200" y="232" text-anchor="middle" font-family="Inter, Segoe UI, sans-serif" font-size="130" font-weight="700" fill="url(#a)">SN</text>
</svg>`;
}

function ogImage() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img" aria-label="Open Graph">
  <defs>
    <linearGradient id="og" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#07080a"/>
      <stop offset="100%" stop-color="#12141c"/>
    </linearGradient>
    <linearGradient id="acc" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#4f46e5"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#og)"/>
  <circle cx="1000" cy="120" r="260" fill="#4f46e5" opacity="0.16"/>
  <circle cx="180" cy="560" r="220" fill="#06b6d4" opacity="0.12"/>
  <rect x="80" y="90" width="70" height="7" rx="3.5" fill="url(#acc)"/>
  <text x="80" y="240" font-family="Inter, Segoe UI, sans-serif" font-size="72" font-weight="700" fill="#f3f4f6">Saidakbar Narzullayev</text>
  <text x="80" y="308" font-family="Inter, Segoe UI, sans-serif" font-size="32" fill="#8b91a0">Software injener · Kompyuter ko&#8217;rish</text>
  <text x="80" y="408" font-family="Inter, Segoe UI, sans-serif" font-size="25" fill="#6b7280">Kameradan bulutgacha — tizimni boshidan oxirigacha yozaman</text>
  <rect x="80" y="468" width="220" height="52" rx="26" fill="url(#acc)"/>
  <text x="190" y="501" text-anchor="middle" font-family="Inter, Segoe UI, sans-serif" font-size="20" font-weight="600" fill="#0a0b12">Portfolio</text>
</svg>`;
}

function favicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="f" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4f46e5"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="url(#f)"/>
  <text x="32" y="43" text-anchor="middle" font-family="Inter, Segoe UI, sans-serif" font-size="30" font-weight="700" fill="#ffffff">SN</text>
</svg>`;
}

function videoPoster() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <rect width="1280" height="720" fill="#0f1115"/>
  <circle cx="640" cy="360" r="70" fill="#4f46e5"/>
  <polygon points="620,330 620,390 672,360" fill="#ffffff"/>
  <text x="640" y="500" text-anchor="middle" font-family="Inter, Segoe UI, sans-serif" font-size="24" fill="#8b91a0">60 soniyada tanishuv</text>
</svg>`;
}

/* ============================================================
   Fayllarni yozish
   ============================================================ */
writeFileSync(join(pub, 'favicon.svg'), favicon());
writeFileSync(join(pub, 'images', 'avatar.svg'), mainAvatar());
writeFileSync(join(pub, 'images', 'og.svg'), ogImage());
writeFileSync(join(pub, 'images', 'video-poster.svg'), videoPoster());

const projects = [
  ['comnex-face-embed', 'Yuz embedding quvuri', '// SCRFD + ArcFace · 512-dim · ONNX', 'face-embed'],
  ['YuzDanYuz', 'Milliy Sertifikat — EdTech', '// Django 5.2 · Next.js 15 · React Native', 'yuzdanyuz'],
  ['SilkLens', 'Madaniy meros platformasi', '// Flutter · FastAPI · pgvector · GPU', 'silklens'],
  ['3D-Jet', 'Interaktiv 3D ko&#8217;ruvchi', '// model-viewer · ES modules', '3d-jet'],
  ['Anoma', 'GSAP parallaks tajriba', '// GSAP · ScrollTrigger · 54 layers', 'anoma'],
  ['CSS 3D', 'Komponentlar laboratoriyasi', '// pure CSS · vanilla JS', 'css-3d'],
];

projects.forEach(([title, subtitle, meta, slug], i) => {
  writeFileSync(join(pub, 'images', 'projects', `${slug}.svg`), projectCover(title, subtitle, meta, i));
});

/* ============================================================
   Minimal PDF (CV) — tashqi kutubxonasiz
   ============================================================ */
function buildPdf(lines) {
  const escape = (s) =>
    String(s).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

  // Har bir satr: [matn, shrift o'lchami]
  let content = 'BT\n';
  let y = 800;
  lines.forEach((line) => {
    const [text, size] = Array.isArray(line) ? line : [line, 11];
    y -= size + 6;
    content += `/F1 ${size} Tf\n1 0 0 1 56 ${y} Tm\n(${escape(text)}) Tj\n`;
  });
  content += 'ET';

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [];
  objects.forEach((obj, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return Buffer.from(pdf, 'latin1');
}

const cv = [
  ['SAIDAKBAR NARZULLAYEV', 20],
  ['Software injener - Kompyuter korish tizimlari', 11],
  ['', 6],
  ['Samarqand, Ozbekiston  |  saidakbarnarzullayev@mail.ru', 10],
  ['github.com/menarzullayev  |  t.me/menarzullayev', 10],
  ['', 8],
  ['TAJRIBA', 13],
  ['2025 - hozirgacha   TASS Vision - Software injener', 11],
  ['  - AI kameralar (Vitrac) uchun firmware va model integratsiyasi', 10],
  ['  - Yuz aniqlash va embedding moduli (SCRFD + ArcFace)', 10],
  ['  - Mahsulot 200+ brend va 10 davlatda qollaniladi', 10],
  ['', 4],
  ['2024 - 2025   Mustaqil loyihalar - Dasturchi', 11],
  ['  - YuzDanYuz (Milliy Sertifikat) EdTech monorepo', 10],
  ['  - SilkLens madaniy meros platformasi poydevori', 10],
  ['  - 25+ ochiq kod loyihasi', 10],
  ['', 8],
  ['TALIM', 13],
  ['2020 - 2024   Muhammad al-Xorazmiy nomidagi TATU Samarqand filiali', 11],
  ['  Kompyuter injiniringi, bakalavr', 10],
  ['', 8],
  ['KONIKMALAR', 13],
  ['Kompyuter korish: OpenCV, ONNX Runtime, ArcFace, SCRFD, CR-FIQA', 10],
  ['Embedded: C, C++, Linux, GStreamer, NPU', 10],
  ['Backend: Python, Django, DRF, FastAPI, Celery, Redis', 10],
  ['Baza: PostgreSQL, pgvector, SQLite', 10],
  ['Frontend: TypeScript, React, Next.js, Tailwind, SCSS', 10],
  ['Mobil: React Native, Expo, Flutter', 10],
  ['DevOps: Docker, GitHub Actions, Nginx', 10],
  ['', 8],
  ['TILLAR', 13],
  ['Ozbek - ona tili   |   Ingliz - B2 (texnik hujjatlar)', 10],
];

writeFileSync(join(pub, 'cv', 'saidakbar-narzullayev-cv.pdf'), buildPdf(cv));

console.log('Resurslar tayyor:');
console.log('  favicon.svg, images/avatar.svg, images/og.svg, images/video-poster.svg');
console.log('  images/projects/*.svg (6 ta loyiha muqovasi)');
console.log('  cv/saidakbar-narzullayev-cv.pdf');
