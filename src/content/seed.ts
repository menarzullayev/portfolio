import type { SiteContent } from '@/lib/types';

/**
 * Sayt kontenti.
 * Supabase ulanmagan bo'lsa ham sayt to'liq ishlaydi.
 * Admin paneldagi o'zgarishlar bazaga yoziladi va bu ma'lumotlarni almashtiradi.
 */
export const seedContent: SiteContent = {
  settings: {
    name: 'Saidakbar Narzullayev',
    initials: 'SN',
    role: {
      uz: 'Software injener · Kompyuter ko‘rish',
      en: 'Software Engineer · Computer Vision',
    },
    tagline: {
      uz: 'Kameradan bulutgacha — tizimni boshidan oxirigacha yozaman',
      en: 'From camera to cloud — I build the system end to end',
    },
    shortBio: {
      uz: 'TASS Vision’da AI kameralar uchun firmware yozaman. Python, C va ONNX Runtime bilan qurilmaning o‘zida kompyuter ko‘rish modellarini ishga tushiraman.',
      en: 'I write firmware for AI cameras at TASS Vision. With Python, C and ONNX Runtime I run computer-vision models directly on the device.',
    },
    bio: [
      {
        uz: "Men Muhammad al-Xorazmiy nomidagi Toshkent Axborot Texnologiyalari Universitetining Samarqand filialini kompyuter injiniringi yo'nalishida tamomlaganman. Hozir TASS Vision kompaniyasida software injener bo'lib ishlayman — retail tarmoqlari uchun AI kameralar (Vitrac mahsuloti) ustida.",
        en: 'I graduated in Computer Engineering from the Samarkand branch of Tashkent University of Information Technologies named after Muhammad al-Khwarizmi. I now work as a software engineer at TASS Vision — on AI cameras for retail chains (the Vitrac product).',
      },
      {
        uz: "Ishimning katta qismi qurilmaning o'zida kechadi: kamera kadrni oladi, yuzni topadi, sifatini tekshiradi va embedding hisoblaydi — bularning barchasi tarmoqqa chiqmasdan, qurilmaning o'zida bajarilishi kerak. Shu sababli chekka qurilmalarda ishlaydigan modellarga, ularning tezligi va xotira sarfiga alohida e'tibor beraman.",
        en: 'Most of my work happens on the device itself: the camera captures a frame, detects a face, checks its quality and computes an embedding — all of it without leaving the device. That is why I pay close attention to models that run on edge hardware, their speed and memory footprint.',
      },
      {
        uz: "Bo'sh vaqtimda ochiq kod loyihalari bilan shug'ullanaman: yuz embedding quvurlari, EdTech platformalar va brauzerda ishlaydigan 3D tajribalar. Kodni yozish bilan bir qatorda uni tushunarli qilib yozishga — ertaga o'zim ham, boshqalar ham o'qiy oladigan holatda qoldirishga harakat qilaman.",
        en: 'In my free time I work on open source: face embedding pipelines, EdTech platforms and 3D experiences that run in the browser. Alongside writing code, I try to make it understandable — leaving it in a state that I and others can read tomorrow.',
      },
    ],
    availability: 'open',
    availabilityNote: {
      uz: 'Yangi imkoniyatlarga ochiq',
      en: 'Open to new opportunities',
    },
    location: { uz: 'Samarqand, O‘zbekiston', en: 'Samarkand, Uzbekistan' },
    city: 'Samarkand',
    country: 'Uzbekistan',
    email: 'saidakbarnarzullayev@mail.ru',
    responseTime: {
      uz: 'Odatda bir kun ichida javob beraman',
      en: 'I usually reply within a day',
    },
    resumeUrl: '/cv/saidakbar-narzullayev-cv.pdf',
    calendarUrl: 'https://t.me/menarzullayev',
    mapEmbedUrl:
      'https://www.openstreetmap.org/export/embed.html?bbox=66.85%2C39.60%2C67.15%2C39.72&layer=mapnik',
    avatar: '/images/avatar.svg',
    heroVideoUrl: '',
    voiceIntroUrl: '',
    yearsExperience: 1,
    heroBadge: { uz: '25+ ochiq kod loyihasi', en: '25+ open source projects' },
  },

  socials: [
    {
      label: 'GitHub',
      url: 'https://github.com/menarzullayev',
      icon: 'github',
      handle: '@menarzullayev',
    },
    {
      label: 'Telegram',
      url: 'https://t.me/menarzullayev',
      icon: 'telegram',
      handle: '@menarzullayev',
    },
    {
      label: 'Email',
      url: 'mailto:saidakbarnarzullayev@mail.ru',
      icon: 'mail',
      handle: 'saidakbarnarzullayev@mail.ru',
    },
    {
      label: 'about.me',
      url: 'https://about.me/narzullayevme',
      icon: 'devto',
      handle: 'about.me/narzullayevme',
    },
  ],

  skills: [
    { name: 'Python', level: 92, category: 'backend' },
    { name: 'OpenCV', level: 88, category: 'data' },
    { name: 'ONNX Runtime', level: 85, category: 'embedded' },
    { name: 'Django / DRF', level: 85, category: 'backend' },
    { name: 'FastAPI', level: 84, category: 'backend' },
    { name: 'PostgreSQL', level: 82, category: 'backend' },
    { name: 'TypeScript', level: 85, category: 'frontend' },
    { name: 'React / Next.js', level: 85, category: 'frontend' },
    { name: 'NumPy', level: 86, category: 'data' },
    { name: 'C / C++', level: 78, category: 'embedded' },
    { name: 'Linux (embedded)', level: 80, category: 'embedded' },
    { name: 'Celery / Redis', level: 78, category: 'backend' },
    { name: 'SCSS / CSS', level: 88, category: 'frontend' },
    { name: 'React Native / Expo', level: 78, category: 'mobile' },
    { name: 'Docker', level: 80, category: 'devops' },
    { name: 'GitHub Actions', level: 80, category: 'devops' },
    { name: 'Flutter', level: 68, category: 'mobile' },
    { name: 'pgvector', level: 72, category: 'data' },
  ],

  stack: [
    {
      title: { uz: 'Kompyuter ko‘rish', en: 'Computer Vision' },
      items: ['OpenCV', 'ONNX Runtime', 'ArcFace', 'SCRFD', 'CR-FIQA', 'NumPy'],
    },
    {
      title: { uz: 'Embedded', en: 'Embedded' },
      items: ['C', 'C++', 'Linux', 'GStreamer', 'CV25 NPU', 'AIBOX'],
    },
    {
      title: { uz: 'Backend', en: 'Backend' },
      items: ['Python', 'Django', 'DRF', 'FastAPI', 'Celery', 'Redis'],
    },
    {
      title: { uz: 'Frontend', en: 'Frontend' },
      items: ['TypeScript', 'React 19', 'Next.js 15', 'Tailwind', 'SCSS', 'GSAP'],
    },
    {
      title: { uz: 'Ma’lumotlar bazasi', en: 'Database' },
      items: ['PostgreSQL', 'pgvector', 'Redis', 'SQLite'],
    },
    {
      title: { uz: 'Mobil', en: 'Mobile' },
      items: ['React Native', 'Expo', 'Flutter'],
    },
    {
      title: { uz: 'DevOps', en: 'DevOps' },
      items: ['Docker', 'GitHub Actions', 'Nginx', 'Make'],
    },
  ],

  experience: [
    {
      company: 'TASS Vision',
      role: { uz: 'Software injener', en: 'Software Engineer' },
      period: '2025 — hozirgacha',
      location: 'Samarqand',
      summary: {
        uz: 'Retail tarmoqlari uchun AI kameralar (Vitrac) ustida ishlayman — qurilma firmware’idan tortib model integratsiyasigacha.',
        en: 'I work on AI cameras for retail chains (Vitrac) — from device firmware to model integration.',
      },
      highlights: [
        {
          uz: 'Kamera firmware yozaman: kadr olish, sifat nazorati va modelni qurilmaning o‘zida ishga tushirish',
          en: 'I write camera firmware: frame capture, quality checks and on-device model inference',
        },
        {
          uz: 'Yuz embedding moduli va biometrik sifat filtrlari ustida ishladim (SCRFD + ArcFace)',
          en: 'Worked on the face embedding module and biometric quality guards (SCRFD + ArcFace)',
        },
        {
          uz: 'Mahsulot 200 dan ortiq brend va 10 davlatda qo‘llaniladi',
          en: 'The product is used by 200+ brands across 10 countries',
        },
      ],
      current: true,
    },
    {
      company: 'Mustaqil loyihalar',
      role: { uz: 'Mustaqil dasturchi', en: 'Independent Developer' },
      period: '2024 — 2025',
      location: 'Samarqand',
      summary: {
        uz: 'Universitetni tamomlagach mustaqil loyihalar ustida ishladim — EdTech platforma, madaniy meros loyihasi va ochiq kod tajribalari.',
        en: 'After graduating I worked on independent projects — an EdTech platform, a cultural heritage project and open source work.',
      },
      highlights: [
        {
          uz: 'YuzDanYuz (Milliy Sertifikat) — EdTech super-ilovaning monorepo arxitekturasini qurdim',
          en: 'YuzDanYuz (Milliy Sertifikat) — built the monorepo architecture of the EdTech super-app',
        },
        {
          uz: 'SilkLens — madaniy meros uchun AI platformaning poydevorini yozdim',
          en: 'SilkLens — wrote the foundation of an AI platform for cultural heritage',
        },
        {
          uz: '25 dan ortiq ochiq kod loyihasini e’lon qildim',
          en: 'Published 25+ open source projects',
        },
      ],
    },
  ],

  education: [
    {
      school:
        'Muhammad al-Xorazmiy nomidagi Toshkent Axborot Texnologiyalari Universiteti, Samarqand filiali',
      degree: { uz: 'Kompyuter injiniringi, bakalavr', en: 'Computer Engineering, BSc' },
      period: '2020 — 2024',
      note: {
        uz: 'Dasturlash asoslari, algoritmlar, ma’lumotlar bazasi va tarmoq texnologiyalari',
        en: 'Programming fundamentals, algorithms, databases and network technologies',
      },
    },
  ],

  certificates: [],

  languages: [
    {
      name: { uz: 'O‘zbek tili', en: 'Uzbek' },
      level: 'C2',
      note: { uz: 'Ona tili', en: 'Native' },
    },
    {
      name: { uz: 'Ingliz tili', en: 'English' },
      level: 'B2',
      note: { uz: 'Texnik hujjatlar va muloqot', en: 'Technical docs and communication' },
    },
  ],

  process: [
    {
      title: { uz: 'Tahlil', en: 'Discovery' },
      description: {
        uz: 'Muammoni, maqsadni va cheklovlarni aniqlaymiz. Yozma texnik topshiriq chiqadi.',
        en: 'We define the problem, goal and constraints. A written spec comes out.',
      },
    },
    {
      title: { uz: 'Arxitektura', en: 'Architecture' },
      description: {
        uz: 'Yechim qayerda ishlashi kerakligini hal qilamiz: qurilmadami, serverdami yoki ikkalasidami.',
        en: 'We decide where the solution must run: on the device, on the server, or both.',
      },
    },
    {
      title: { uz: 'Prototip', en: 'Prototype' },
      description: {
        uz: 'Eng xavfli qismni birinchi bo‘lib sinab ko‘ramiz — model tezligi, xotira, aloqa.',
        en: 'We test the riskiest part first — model speed, memory, connectivity.',
      },
    },
    {
      title: { uz: 'Ishlab chiqish', en: 'Development' },
      description: {
        uz: 'Bosqichma-bosqich kod, har hafta ko‘rsatiladigan natija va kod ko‘rigi.',
        en: 'Step-by-step code, a weekly demo and code review.',
      },
    },
    {
      title: { uz: 'Test', en: 'Testing' },
      description: {
        uz: 'Avtomatik testlar, real qurilmada sinov va o‘lchov natijalari.',
        en: 'Automated tests, real-device trials and measured results.',
      },
    },
    {
      title: { uz: 'Topshirish', en: 'Handover' },
      description: {
        uz: 'Hujjat, o‘rnatish yo‘riqnomasi va kodni tushuntirish sessiyasi.',
        en: 'Documentation, setup guide and a code walkthrough session.',
      },
    },
    {
      title: { uz: 'Qo‘llab-quvvatlash', en: 'Support' },
      description: {
        uz: 'Ishga tushgandan keyin ham savollarga javob beraman.',
        en: 'I stay available for questions after launch.',
      },
    },
  ],

  interests: [],

  now: [
    {
      uz: 'TASS Vision’da kamera firmware va kompyuter ko‘rish modullari ustida ishlayapman',
      en: 'Working on camera firmware and computer-vision modules at TASS Vision',
    },
    {
      uz: 'SilkLens — madaniy meros platformasining poydevorini qurmoqdaman',
      en: 'Building the foundation of SilkLens, a cultural heritage platform',
    },
    {
      uz: 'YuzDanYuz (Milliy Sertifikat) monorepo’sini rivojlantiryapman',
      en: 'Developing the YuzDanYuz (Milliy Sertifikat) monorepo',
    },
    {
      uz: 'Yangi modellarni chekka qurilmalarda sinab ko‘rmoqdaman: tezlik va xotira sarfi',
      en: 'Testing new models on edge devices: speed and memory footprint',
    },
  ],

  principles: [
    {
      title: { uz: 'Avval o‘qiladi, keyin ishlaydi', en: 'Readable first, working second' },
      description: {
        uz: 'Kodni kompyuter emas, inson o‘qiydi. Shuning uchun nomlash va tuzilishga alohida e’tibor beraman.',
        en: 'Code is read by humans, not machines. So I pay extra attention to naming and structure.',
      },
    },
    {
      title: { uz: 'O‘lchamasa, bilmaysan', en: "If you can't measure it, you don't know it" },
      description: {
        uz: 'Har bir optimizatsiya o‘lchov natijasiga asoslanadi, taxminga emas.',
        en: 'Every optimisation is based on measurement, not guesses.',
      },
    },
    {
      title: { uz: 'Chekka qurilmada har bayt muhim', en: 'On edge devices every byte matters' },
      description: {
        uz: 'Model o‘lchami, xotira va quvvat sarfi — qurilmada ishlaydigan kodning asosiy cheklovlari.',
        en: 'Model size, memory and power draw are the core constraints of on-device code.',
      },
    },
    {
      title: { uz: 'Oddiylik — kuch', en: 'Simplicity is power' },
      description: {
        uz: 'Murakkab yechim oson ko‘rinadi, oddiy yechim esa ko‘p o‘ylashni talab qiladi.',
        en: 'Complex solutions look clever; simple ones take real thought.',
      },
    },
  ],

  routine: [],

  projects: [
    {
      slug: 'comnex-face-embed',
      title: 'comnex-face-embed',
      summary: {
        uz: 'Bitta fotosuratdan 512 o‘lchamli ArcFace embedding ajratib oluvchi modul.',
        en: 'A module that extracts a 512-dim ArcFace embedding from a single photo.',
      },
      description: {
        uz: 'Bu modul bitta rasmni oladi va undan yuz embeddingini qaytaradi — hech qanday server, API yoki ma’lumotlar bazasisiz. Quvur quyidagicha: SCRFD detektori yuzni topadi, biometrik filtrlar sifatni tekshiradi, Umeyama usulida tekislash bajariladi va ArcFace modeli 512 o‘lchamli vektorni hisoblaydi. Filtrlar yuz o‘lchami, markazlashuvi, bosh burilish burchagi va CR-FIQA sifat bahosini tekshiradi — o‘tmasa, sabab tushunarli matnda qaytariladi. Modellar fayl nomiga qarab avtomatik aniqlanadi: MobileFaceNet (13 MB) yengil kameralar uchun, ResNet-50 va ResNet-100 esa kuchli qurilmalar uchun.',
        en: 'The module takes one image and returns a face embedding — no server, API or database. The pipeline is: the SCRFD detector finds the face, biometric guards check quality, Umeyama alignment is applied, and the ArcFace model computes a 512-dim vector. The guards check face size, centrality, head rotation and CR-FIQA quality — if they fail, a human-readable reason is returned. Models are auto-detected by filename: MobileFaceNet (13 MB) for lightweight cameras, ResNet-50 and ResNet-100 for stronger hardware.',
      },
      category: 'ai',
      tags: ['Python', 'ONNX Runtime', 'OpenCV', 'ArcFace', 'SCRFD'],
      cover: '/images/projects/face-embed.svg',
      year: '2026',
      links: [
        { label: 'GitHub', url: 'https://github.com/menarzullayev/comnex-face-embed' },
      ],
      metrics: [
        { label: { uz: 'Embedding o‘lchami', en: 'Embedding size' }, value: '512' },
        { label: { uz: 'Eng yengil model', en: 'Lightest model' }, value: '13 MB' },
      ],
      featured: true,
      source: 'manual',
    },
    {
      slug: 'yuzdanyuz',
      title: 'YuzDanYuz — Milliy Sertifikat',
      summary: {
        uz: 'DTM simulyatori, AI diagnostika va B2B white-label imkoniyatli EdTech super-ilova.',
        en: 'An EdTech super-app with a DTM simulator, AI diagnostics and B2B white-label support.',
      },
      description: {
        uz: "YuzDanYuz — o'quvchilarni milliy sertifikat imtihoniga tayyorlaydigan platforma. Loyiha monorepo ko'rinishida qurilgan: Django 5.2 va DRF backend, Celery bilan fon vazifalari, Next.js 15 va React 19 bilan veb-interfeys, React Native va Expo bilan mobil ilova. Umumiy TypeScript tiplari alohida paketga ajratilgan, shuning uchun veb va mobil bir xil ma'lumot modelidan foydalanadi. Har bir paket uchun CI sozlangan — test va lint avtomatik ishlaydi.",
        en: 'YuzDanYuz is a platform that prepares students for the national certification exam. The project is a monorepo: a Django 5.2 + DRF backend, Celery for background jobs, a Next.js 15 + React 19 web client, and a React Native + Expo mobile app. Shared TypeScript types live in their own package, so web and mobile use the same data model. CI is configured per package — tests and lint run automatically.',
      },
      category: 'fullstack',
      tags: ['Django 5.2', 'DRF', 'Celery', 'Next.js 15', 'React Native'],
      cover: '/images/projects/yuzdanyuz.svg',
      year: '2026',
      links: [
        { label: 'GitHub', url: 'https://github.com/menarzullayev/yuzdanyuz-monorepo' },
      ],
      metrics: [
        { label: { uz: 'Paketlar', en: 'Packages' }, value: '4' },
        { label: { uz: 'Platforma', en: 'Platforms' }, value: '3' },
      ],
      featured: true,
      source: 'manual',
    },
    {
      slug: 'silklens',
      title: 'SilkLens',
      summary: {
        uz: 'Madaniy meros uchun AI platforma: Flutter mijoz, FastAPI backend va vektor qidiruv.',
        en: 'An AI platform for cultural heritage: Flutter client, FastAPI backend and vector search.',
      },
      description: {
        uz: "SilkLens — madaniy meros obyektlarini aniqlash va o'rganish uchun platforma. Arxitektura to'rt qismdan iborat: Flutter mobil mijozi, FastAPI backend, PostgreSQL va pgvector asosidagi vektor qidiruv, hamda GPU'da ishlaydigan AI stek. Ma'lumotlar modeli sakkizta dizayn bo'yicha uch yuzdan ortiq jadvalga bo'lingan. Loyiha hozir poydevor bosqichida — arxitektura qarorlari va yo'l xaritasi alohida hujjatlarda yozilgan.",
        en: 'SilkLens is a platform for identifying and exploring cultural heritage objects. The architecture has four parts: a Flutter mobile client, a FastAPI backend, vector search based on PostgreSQL and pgvector, and a GPU-powered AI stack. The data model is split into 300+ tables across eight designs. The project is currently in its foundation phase — architecture decisions and the roadmap live in separate documents.',
      },
      category: 'ai',
      tags: ['Flutter', 'FastAPI', 'PostgreSQL', 'pgvector', 'GPU'],
      cover: '/images/projects/silklens.svg',
      year: '2026',
      links: [{ label: 'GitHub', url: 'https://github.com/menarzullayev/silklens' }],
      metrics: [
        { label: { uz: 'Jadval', en: 'Tables' }, value: '328' },
        { label: { uz: 'Qatlam', en: 'Layers' }, value: '4' },
      ],
      featured: true,
      source: 'manual',
    },
    {
      slug: '3d-jet',
      title: '3D-Jet',
      summary: {
        uz: 'Brauzerda ishlaydigan interaktiv 3D samolyot ko‘ruvchisi.',
        en: 'An interactive 3D jet aircraft viewer that runs in the browser.',
      },
      description: {
        uz: "3D-Jet — sahifa aylanishiga qarab kamera harakatlanadigan 3D ko'ruvchi. Model-viewer va ES modullari ishlatilgan, hech qanday og'ir framework yo'q. Loyiha model yuklash, yorug'lik sozlash va kamera boshqaruvini minimal kod bilan qanday qilish mumkinligini ko'rsatadi.",
        en: '3D-Jet is a 3D viewer where the camera moves as you scroll. It uses model-viewer and ES modules — no heavy framework. The project shows how to handle model loading, lighting and camera control with minimal code.',
      },
      category: 'frontend',
      tags: ['JavaScript', 'model-viewer', 'ES Modules', '3D'],
      cover: '/images/projects/3d-jet.svg',
      year: '2026',
      links: [{ label: 'GitHub', url: 'https://github.com/menarzullayev/3D-Jet' }],
      featured: false,
      source: 'manual',
    },
    {
      slug: 'anoma-gsap',
      title: 'Anoma — GSAP parallaks',
      summary: {
        uz: 'GSAP va ScrollTrigger bilan qurilgan parallaks sahifa tajribasi.',
        en: 'A parallax page experience built with GSAP and ScrollTrigger.',
      },
      description: {
        uz: "Anoma — olti bo'limdan iborat parallaks sahifa. Harakat 54 ta PNG qatlamdan yig'ilgan, uch xil rang mavzusi bor. Loyihada ScrollTrigger yordamida qatlamlarni vaqt bo'yicha sinxronlash, sahifa aylanish tezligiga moslash va mobil qurilmalarda ishlashni yengillashtirish ko'rsatilgan.",
        en: 'Anoma is a six-section parallax page. The motion is assembled from 54 PNG layers with three colour themes. The project demonstrates syncing layers over time with ScrollTrigger, adapting to scroll speed, and keeping it usable on mobile.',
      },
      category: 'frontend',
      tags: ['GSAP', 'ScrollTrigger', 'SCSS', 'Animation'],
      cover: '/images/projects/anoma.svg',
      year: '2026',
      links: [{ label: 'GitHub', url: 'https://github.com/menarzullayev/Anoma-GSAP' }],
      metrics: [{ label: { uz: 'Qatlam', en: 'Layers' }, value: '54' }],
      featured: false,
      source: 'manual',
    },
    {
      slug: 'css-3d-lab',
      title: 'CSS 3D laboratoriya',
      summary: {
        uz: 'Sof CSS va JavaScript bilan yozilgan 3D komponentlar to‘plami.',
        en: 'A collection of 3D components written in pure CSS and JavaScript.',
      },
      description: {
        uz: "Bu to'plamda kutubxonasiz yozilgan 3D komponentlar bor: aylanuvchi kub, izometrik toggle tugmalari, gradient matnli silindr, orbita yuklagichi va kosmik 404 sahifasi. Har birida sozlash tugmalari (tezlik, rang mavzusi, o'lcham) va qorong'i/yorqin rejim qo'llab-quvvatlanadi. Maqsad — brauzerning o'z imkoniyatlari bilan qancha natijaga erishish mumkinligini ko'rsatish.",
        en: 'This collection contains 3D components written without libraries: a rotating cube, isometric toggles, a gradient text cylinder, an orbit loader and a cosmic 404 page. Each has controls (speed, colour theme, size) and dark/light support. The goal is to show how far native browser capabilities can go.',
      },
      category: 'frontend',
      tags: ['CSS 3D', 'JavaScript', 'Animation', 'SCSS'],
      cover: '/images/projects/css-3d.svg',
      year: '2026',
      links: [
        { label: 'GitHub', url: 'https://github.com/menarzullayev/Circle-Loader' },
        { label: 'To‘plam', url: 'https://github.com/menarzullayev?tab=repositories' },
      ],
      featured: false,
      source: 'manual',
    },
  ],

  caseStudies: [],

  snippets: [
    {
      title: { uz: 'Yuzni ArcFace shabloniga tekislash', en: 'Aligning a face to the ArcFace template' },
      language: 'python',
      code: `import cv2
import numpy as np
from skimage.transform import SimilarityTransform

# ArcFace standart 5 nuqtali shablon (112x112)
ARCFACE_DST = np.array([
    [38.2946, 51.6963],   # chap ko'z
    [73.5318, 51.5014],   # o'ng ko'z
    [56.0252, 71.7366],   # burun uchi
    [41.5493, 92.3655],   # chap lab burchagi
    [70.7299, 92.2041],   # o'ng lab burchagi
], dtype=np.float32)


def align_face(image, landmarks, size=112):
    """5 nuqta bo'yicha yuzni shablonga tekislaydi."""
    tform = SimilarityTransform()
    tform.estimate(landmarks, ARCFACE_DST)
    return cv2.warpAffine(
        image,
        tform.params[0:2],
        (size, size),
        borderValue=0.0,
    )`,
    },
    {
      title: { uz: 'Biometrik sifat filtrlari', en: 'Biometric quality guards' },
      language: 'python',
      code: `MIN_FACE_SIZE = 80        # px — eng kichik yuz o'lchami
MIN_CX, MAX_CX = 0.25, 0.75   # markaz bo'yicha gorizontal nisbat
MIN_YAW = 0.5             # chap/o'ng burilish simmetriyasi
MIN_QUALITY = 0.15        # CR-FIQA sifat chegarasi


def check_guards(face, image_shape, quality):
    """Sifat yetarli bo'lmasa sababni qaytaradi, aks holda None."""
    x1, y1, x2, y2 = face.bbox

    if min(x2 - x1, y2 - y1) < MIN_FACE_SIZE:
        return "Yuz juda kichik — kameraga yaqinroq keling"

    cx = (x1 + x2) / 2 / image_shape[1]
    if not (MIN_CX <= cx <= MAX_CX):
        return "Yuz kadr markazida emas"

    yaw = face.kps[0][0] / max(face.kps[1][0], 1e-6)
    if not (MIN_YAW <= yaw <= 1 / MIN_YAW):
        return "Bosh juda yon tomonga burilgan"

    if quality < MIN_QUALITY:
        return "Sifat past — yorug'lik yoki fokus yetarli emas"

    return None`,
    },
    {
      title: { uz: 'Modelni qurilma quvvatiga moslash', en: 'Matching the model to the device' },
      language: 'python',
      code: `import os
import onnxruntime as ort

MODELS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "models")

# Bir xil API — turli qurilmalar uchun turli model
RECOGNIZERS = {
    "w600k_mbf": "MobileFaceNet — 13 MB,  tez   (yengil kamera / NPU)",
    "w600k_r50": "ResNet-50    — 167 MB, aniq  (AIBOX)",
    "glintr100": "ResNet-100   — 249 MB, eng aniq (AIBOX)",
}


def load_recognizer(name="w600k_mbf"):
    if name not in RECOGNIZERS:
        raise ValueError(f"Noma'lum model: {name}")

    session = ort.InferenceSession(
        os.path.join(MODELS_DIR, f"{name}.onnx"),
        providers=["CPUExecutionProvider"],
    )
    return session, RECOGNIZERS[name]`,
    },
  ],

  openSource: [],

  testimonials: [],

  partners: [],

  stats: [
    { value: '25', label: { uz: 'Ochiq kod loyihasi', en: 'Open source projects' } },
    { value: '1+', label: { uz: 'Yillik sanoat tajribasi', en: 'Year of industry experience' } },
    { value: '4', label: { uz: 'Texnologiya yo‘nalishi', en: 'Technology domains' } },
    { value: '6', label: { uz: 'Asosiy loyiha', en: 'Featured projects' } },
  ],

  awards: [],

  press: [],

  services: [
    {
      icon: 'camera',
      title: { uz: 'Kompyuter ko‘rish', en: 'Computer vision' },
      description: {
        uz: 'Yuz aniqlash, embedding hisoblash va sifat nazorati modullari.',
        en: 'Face detection, embedding computation and quality-control modules.',
      },
      features: [
        { uz: 'SCRFD va ArcFace', en: 'SCRFD and ArcFace' },
        { uz: 'ONNX Runtime', en: 'ONNX Runtime' },
        { uz: 'Sifat filtrlari', en: 'Quality guards' },
      ],
      priceFrom: '',
    },
    {
      icon: 'cpu',
      title: { uz: 'Embedded va firmware', en: 'Embedded & firmware' },
      description: {
        uz: 'Kamera qurilmalari uchun firmware va model integratsiyasi.',
        en: 'Firmware and model integration for camera devices.',
      },
      features: [
        { uz: 'C / C++', en: 'C / C++' },
        { uz: 'Linux va GStreamer', en: 'Linux and GStreamer' },
        { uz: 'NPU’da ishga tushirish', en: 'Running on NPU' },
      ],
      priceFrom: '',
    },
    {
      icon: 'server',
      title: { uz: 'Backend va API', en: 'Backend & API' },
      description: {
        uz: 'Python’da xizmatlar, ma’lumotlar bazasi va fon vazifalari.',
        en: 'Python services, databases and background jobs.',
      },
      features: [
        { uz: 'Django / DRF / FastAPI', en: 'Django / DRF / FastAPI' },
        { uz: 'PostgreSQL, pgvector', en: 'PostgreSQL, pgvector' },
        { uz: 'Celery va Redis', en: 'Celery and Redis' },
      ],
      priceFrom: '',
    },
    {
      icon: 'layout',
      title: { uz: 'Veb-interfeys', en: 'Web interface' },
      description: {
        uz: 'Tez va moslashuvchan interfeyslar, dashboard va vizualizatsiya.',
        en: 'Fast, responsive interfaces, dashboards and visualisation.',
      },
      features: [
        { uz: 'Next.js va React', en: 'Next.js and React' },
        { uz: 'Tailwind va SCSS', en: 'Tailwind and SCSS' },
        { uz: 'GSAP animatsiyalar', en: 'GSAP animations' },
      ],
      priceFrom: '',
    },
    {
      icon: 'smartphone',
      title: { uz: 'Mobil ilova', en: 'Mobile app' },
      description: {
        uz: 'iOS va Android uchun bitta koddan ilova.',
        en: 'One codebase for both iOS and Android.',
      },
      features: [
        { uz: 'React Native va Expo', en: 'React Native and Expo' },
        { uz: 'Flutter', en: 'Flutter' },
        { uz: 'API integratsiyasi', en: 'API integration' },
      ],
      priceFrom: '',
    },
    {
      icon: 'users',
      title: { uz: 'Texnik maslahat', en: 'Technical consulting' },
      description: {
        uz: 'Arxitektura tanlovi, kod ko‘rigi va yo‘nalish bo‘yicha maslahat.',
        en: 'Architecture choices, code review and guidance.',
      },
      features: [
        { uz: 'Arxitektura', en: 'Architecture' },
        { uz: 'Kod ko‘rigi', en: 'Code review' },
        { uz: 'O‘lchov va optimizatsiya', en: 'Measurement and optimisation' },
      ],
      priceFrom: '',
    },
  ],

  pricing: [],

  faq: [
    {
      question: { uz: 'Qanday texnologiyalar bilan ishlaysiz?', en: 'What technologies do you work with?' },
      answer: {
        uz: 'Asosiy yo‘nalishim — Python (Django, DRF, FastAPI) va kompyuter ko‘rish (OpenCV, ONNX Runtime). Frontendda TypeScript, React va Next.js, mobilda React Native va Flutter, embedded qismida C/C++ va Linux ishlataman.',
        en: 'My core is Python (Django, DRF, FastAPI) and computer vision (OpenCV, ONNX Runtime). On the frontend I use TypeScript, React and Next.js, on mobile React Native and Flutter, and in embedded work C/C++ and Linux.',
      },
    },
    {
      question: { uz: 'Hozir ishga tayyormisiz?', en: 'Are you available for work right now?' },
      answer: {
        uz: 'Hozir TASS Vision’da to‘liq vaqt ishlayman. Shu bilan birga texnik maslahat, kod ko‘rigi va qisqa muddatli loyihalar bo‘yicha gaplashishim mumkin — Telegram yoki email orqali yozing.',
        en: 'I currently work full time at TASS Vision. Alongside that I can discuss technical consulting, code review and short-term projects — reach me on Telegram or email.',
      },
    },
    {
      question: {
        uz: 'Kompyuter ko‘rish bo‘yicha qanday tajribangiz bor?',
        en: 'What is your experience with computer vision?',
      },
      answer: {
        uz: 'Yuz aniqlash (SCRFD), embedding hisoblash (ArcFace), sifat baholash (CR-FIQA) va modellarni chekka qurilmalarda ishga tushirish bilan ishlaganman. Ochiq kod loyiham comnex-face-embed shu quvurni to‘liq ko‘rsatadi.',
        en: 'I have worked with face detection (SCRFD), embedding computation (ArcFace), quality scoring (CR-FIQA) and running models on edge devices. My open source project comnex-face-embed shows the whole pipeline.',
      },
    },
    {
      question: { uz: 'Masofadan ishlaysizmi?', en: 'Do you work remotely?' },
      answer: {
        uz: 'Ha, masofadan ishlashga tayyorman. Vaqt mintaqasi farqi muhim emas — uchrashuvlarni moslashtiramiz.',
        en: 'Yes, I am ready to work remotely. Time zone differences are fine — we align meetings.',
      },
    },
    {
      question: { uz: 'Kodingizni ko‘rsam bo‘ladimi?', en: 'Can I see your code?' },
      answer: {
        uz: 'Albatta. GitHub’da 25 dan ortiq ochiq loyiham bor — yuz embedding quvuri, EdTech monorepo, madaniy meros platformasi va brauzerda ishlaydigan 3D tajribalar.',
        en: 'Absolutely. I have 25+ public projects on GitHub — a face embedding pipeline, an EdTech monorepo, a cultural heritage platform and 3D experiences in the browser.',
      },
    },
    {
      question: { uz: 'Qanday bog‘lanish mumkin?', en: 'How can I get in touch?' },
      answer: {
        uz: 'Email (saidakbarnarzullayev@mail.ru) yoki Telegram (@menarzullayev) orqali yozing. Odatda bir kun ichida javob beraman.',
        en: 'Write to me on email (saidakbarnarzullayev@mail.ru) or Telegram (@menarzullayev). I usually reply within a day.',
      },
    },
  ],

  workTerms: [],

  slots: [],

  posts: [
    {
      slug: 'nextjs-app-router-ichki-ishlashi',
      title: {
        uz: 'Next.js App Router qanday ishlaydi: server va klient chegarasi',
        en: 'How Next.js App Router works: the server-client boundary',
      },
      excerpt: {
        uz: "Server Components nima uchun kerak, 'use client' qachon qo'yiladi va bu bundle hajmiga qanday ta'sir qiladi — amaliy misollar bilan.",
        en: 'Why Server Components exist, when to add "use client", and how it affects bundle size — with practical examples.',
      },
      body: `## Nima uchun bu chegarani tushunish muhim

Ko'p loyihalarda eng katta tezlik muammosi — brauzerga yuborilayotgan ortiqcha JavaScript. App Router'ning asosiy g'oyasi shu: **komponent serverda qolsa, u brauzerga umuman yuborilmaydi.**

Ya'ni savol "qaysi komponent klient bo'ladi?" emas, balki **"qaysi komponent haqiqatan klient bo'lishi shart?"**

## Server Component — standart holat

App Router'da har bir komponent sukut bo'yicha server komponenti:

\`\`\`tsx
// app/posts/page.tsx — bu server komponenti
export default async function PostsPage() {
  const posts = await db.post.findMany(); // to'g'ridan-to'g'ri baza
  return <PostList posts={posts} />;
}
\`\`\`

Diqqat qiling: \`fetch\` ham, API qatlami ham yo'q. Baza so'rovi to'g'ridan-to'g'ri shu yerda bajariladi. Bu kod brauzerga **umuman yuborilmaydi**.

## 'use client' — qachon kerak?

Faqat quyidagi holatlarda:

- \`useState\`, \`useEffect\`, \`useRef\` kabi hook'lar ishlatilsa
- Brauzer hodisalari kerak bo'lsa (\`onClick\`, \`onChange\`)
- \`window\`, \`localStorage\`, \`navigator\` ga murojaat bo'lsa

\`\`\`tsx
'use client';

export function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(!liked)}>{liked ? '❤️' : '🤍'}</button>;
}
\`\`\`

## Eng ko'p uchraydigan xato

Butun sahifani klient qilib qo'yish:

\`\`\`tsx
'use client'; // ❌ butun sahifa, butun subtree brauzerga ketadi

export default function Page() {
  return (
    <div>
      <HeavyChart />        {/* aslida serverda bo'lishi mumkin edi */}
      <LikeButton />        {/* faqat shu klient bo'lishi kerak edi */}
    </div>
  );
}
\`\`\`

To'g'ri yondashuv — **chegarani pastga tushirish**:

\`\`\`tsx
export default function Page() {
  return (
    <div>
      <HeavyChart />   {/* ✅ serverda qoldi */}
      <LikeButton />   {/* ✅ faqat shu brauzerga ketadi */}
    </div>
  );
}
\`\`\`

## Amaliy natija

Interaktiv komponentni daraxtning eng pastki qismiga tushirish odatda boshlang'ich bundle hajmini sezilarli kamaytiradi — sabab oddiy: serverda qolgan kod umuman yuborilmaydi.

> Qoida: \`'use client'\` ni komponentning eng pastki, haqiqatan interaktiv qismiga qo'ying.`,
      tags: ['Next.js', 'React', 'Performance'],
      date: '2026-08-14',
      readingTime: 7,
      views: 0,
      series: 'Next.js chuqur',
      seriesOrder: 1,
      published: true,
    },
    {
      slug: 'sql-sorovni-tezlashtirish',
      title: {
        uz: 'SQL so‘rovni tezlashtirish: qadam-baqadam amaliy yo‘l',
        en: 'Speeding up an SQL query: a step-by-step practical guide',
      },
      excerpt: {
        uz: 'EXPLAIN ANALYZE o‘qishni o‘rganish, to‘g‘ri indeks tanlash va N+1 muammosini yo‘q qilish — amaliy misol bilan.',
        en: 'Learning to read EXPLAIN ANALYZE, choosing the right index, and killing N+1 — with a practical example.',
      },
      body: `## Muammo

Sekin dashboard deyarli har doim bir xil belgidan boshlanadi: ma'lumot hajmi katta emas, lekin sahifa sekin yuklanadi. Ya'ni muammo hajmda emas.

## 1-qadam: EXPLAIN ANALYZE

Birinchi qoida — **taxmin qilmang, o'lchang**:

\`\`\`sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders WHERE user_id = 42 ORDER BY created_at DESC LIMIT 50;
\`\`\`

Agar natijada \`Seq Scan\` ko'rsangiz — jadval har safar to'liq o'qilmoqda. Bu indeks yo'qligining birinchi belgisi.

## 2-qadam: indeks

\`\`\`sql
CREATE INDEX CONCURRENTLY idx_orders_user_created
  ON orders (user_id, created_at DESC)
  INCLUDE (total, status);
\`\`\`

Ustunlar tartibi muhim: avval **tenglik** sharti (\`user_id\`), keyin **tartiblash** (\`created_at\`). \`INCLUDE\` esa jadvalga qayta murojaat qilishni yo'q qiladi — bu "covering index" deyiladi.

## 3-qadam: N+1 ni yo'q qilish

Kodda ko'p uchraydigan naqsh:

\`\`\`ts
// ❌ 50 ta buyurtma = 51 ta so'rov
const orders = await db.orders.findMany({ where: { userId } });
for (const o of orders) o.items = await db.items.findMany({ where: { orderId: o.id } });
\`\`\`

Buni bitta so'rovga jamlash mumkin:

\`\`\`ts
// ✅ 1 ta so'rov
const orders = await db.orders.findMany({
  where: { userId },
  include: { items: true },
});
\`\`\`

## Tekshirish tartibi

| Bosqich | Nima qilinadi |
|---|---|
| 1 | \`EXPLAIN ANALYZE\` bilan o'lchash |
| 2 | Kerakli indeksni qo'shish |
| 3 | N+1 ni birlashtirish |
| 4 | Qayta o'lchash va solishtirish |

> Esda tuting: indekslar yozishni sekinlashtiradi. Har bir indeksni haqiqiy so'rovlar asosida qo'shing, "ehtimol kerak bo'ladi" deb emas.`,
      tags: ['PostgreSQL', 'SQL', 'Performance', 'Backend'],
      date: '2026-06-02',
      readingTime: 9,
      views: 0,
      series: 'Tezlik sirlari',
      seriesOrder: 1,
      published: true,
    },
    {
      slug: 'kod-koriki-madaniyati',
      title: {
        uz: 'Kod ko‘rigi nima uchun bahsga aylanadi va buni qanday tuzatish mumkin',
        en: 'Why code review turns into an argument and how to fix it',
      },
      excerpt: {
        uz: 'Kod ko‘rigi shaxsiy bahs emas, umumiy sifat nazorati. Jamoada tartib o‘rnatishning 5 ta amaliy qoidasi.',
        en: 'Code review is not a personal debate, it is shared quality control. 5 practical rules for a team.',
      },
      body: `## Muammo ko'pincha kodda emas

Kod ko'riklari cho'zilib ketsa yoki tez-tez shaxsiy bahsga aylansa, sabab odatda bitta: **qoidalar yozilmagan.**

## 1-qoida: Kichik PR

400 qatorli PR ni hech kim jiddiy o'qimaydi. 150 qatordan oshsa — bo'lib tashlash kerak.

## 2-qoida: Muallif izoh yozadi

PR tavsifida uchta narsa bo'lishi shart:

1. **Nima o'zgardi**
2. **Nima uchun** (havola: vazifa raqami)
3. **Qanday tekshirish mumkin**

## 3-qoida: Izoh turini belgilash

Har bir izoh oldiga teg qo'yamiz:

- \`[blok]\` — shu tuzatilmasa merge qilinmaydi
- \`[taklif]\` — yaxshiroq variant bor, lekin majburiy emas
- \`[savol]\` — tushunmadim, tushuntiring

Bu bitta o'zgarish bahslarning katta qismini yo'q qiladi. Endi odam "nega bunday yozding?" deb emas, "[savol] bu yerda nima uchun kerak?" deb yozadi.

## 4-qoida: Avtomatik tekshiruv oldin

Linter, test, tip tekshiruvi — hammasi CI'da o'tishi kerak. Inson **uslubni** emas, **mantiqni** ko'rigi qilsin.

## 5-qoida: 24 soat qoidasi

PR 24 soat ichida javob olishi shart. Kutish — eng qimmat narsa.

## Xulosa

Bu qoidalarning maqsadi odamlarni nazorat qilish emas — **kod haqida gapirishni osonlashtirish**. Kod ko'rigi qanchalik aniq qoidalarga tayansa, u shunchalik tez va xotirjam o'tadi.`,
      tags: ['Jamoa', 'Jarayon', 'Code Review'],
      date: '2026-03-18',
      readingTime: 6,
      views: 0,
      published: true,
    },
  ],

  guestbook: [],

  changelog: [
    {
      version: '1.0.0',
      date: '2026-09-12',
      changes: [
        { uz: 'Sayt ishga tushdi', en: 'Site launched' },
        { uz: 'Portfolio, blog va admin panel qo‘shildi', en: 'Portfolio, blog and admin panel added' },
        { uz: 'O‘zbek va ingliz tillari qo‘llab-quvvatlanadi', en: 'Uzbek and English supported' },
      ],
    },
  ],

  uses: [],

  contactSubjects: [
    { uz: 'Ish taklifi', en: 'Job offer' },
    { uz: 'Texnik maslahat', en: 'Technical consulting' },
    { uz: 'Hamkorlik', en: 'Partnership' },
    { uz: 'Loyiha bo‘yicha savol', en: 'Question about a project' },
    { uz: 'Boshqa', en: 'Other' },
  ],
};
