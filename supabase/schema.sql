-- ============================================================
--  Portfolio sayt — Supabase ma'lumotlar bazasi sxemasi
--  Ishlatish: Supabase → SQL Editor → shu faylni qo'yib "Run"
-- ============================================================

-- Kerakli kengaytmalar
create extension if not exists "uuid-ossp";

-- ============================================================
-- 1. Sayt sozlamalari (bitta yozuv)
-- ============================================================
create table if not exists site_settings (
  id                bigint primary key generated always as identity,
  name              text not null default 'Ismingiz',
  initials          text default 'IS',
  role              jsonb default '{"uz":"","en":""}'::jsonb,
  tagline           jsonb default '{"uz":"","en":""}'::jsonb,
  short_bio         jsonb default '{"uz":"","en":""}'::jsonb,
  bio               jsonb default '[]'::jsonb,
  availability      text default 'available',
  availability_note jsonb default '{"uz":"","en":""}'::jsonb,
  location          jsonb default '{"uz":"","en":""}'::jsonb,
  city              text default '',
  country           text default '',
  email             text default '',
  response_time     jsonb default '{"uz":"","en":""}'::jsonb,
  resume_url        text default '',
  calendar_url      text default '',
  map_embed_url     text default '',
  avatar            text default '',
  hero_video_url    text default '',
  voice_intro_url   text default '',
  years_experience  int default 0,
  hero_badge        jsonb default '{"uz":"","en":""}'::jsonb,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

-- ============================================================
-- 2. Loyihalar
-- ============================================================
create table if not exists projects (
  id           bigint primary key generated always as identity,
  slug         text unique not null,
  title        text not null,
  summary      jsonb default '{"uz":"","en":""}'::jsonb,
  description  jsonb default '{"uz":"","en":""}'::jsonb,
  category     text default 'fullstack',
  tags         text[] default '{}',
  cover        text default '',
  year         text default '',
  links        jsonb default '[]'::jsonb,
  metrics      jsonb default '[]'::jsonb,
  featured     boolean default false,
  source       text default 'manual',
  repo         text,
  stars        int,
  language     text,
  sort_order   int default 0,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- ============================================================
-- 3. Maqolalar
-- ============================================================
create table if not exists posts (
  id            bigint primary key generated always as identity,
  slug          text unique not null,
  title         jsonb default '{"uz":"","en":""}'::jsonb,
  excerpt       jsonb default '{"uz":"","en":""}'::jsonb,
  body          text default '',
  tags          text[] default '{}',
  date          date default current_date,
  reading_time  int default 5,
  views         int default 0,
  series        text,
  series_order  int,
  cover         text,
  published     boolean default true,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ============================================================
-- 4. Xizmatlar
-- ============================================================
create table if not exists services (
  id           bigint primary key generated always as identity,
  title        jsonb default '{"uz":"","en":""}'::jsonb,
  description  jsonb default '{"uz":"","en":""}'::jsonb,
  icon         text default 'code',
  features     jsonb default '[]'::jsonb,
  price_from   text default '',
  sort_order   int default 0,
  created_at   timestamptz default now()
);

-- ============================================================
-- 5. Savol-javob
-- ============================================================
create table if not exists faqs (
  id          bigint primary key generated always as identity,
  question    jsonb default '{"uz":"","en":""}'::jsonb,
  answer      jsonb default '{"uz":"","en":""}'::jsonb,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

-- ============================================================
-- 6. Mijoz fikrlari
-- ============================================================
create table if not exists testimonials (
  id          bigint primary key generated always as identity,
  name        text not null,
  position    jsonb default '{"uz":"","en":""}'::jsonb,
  company     text default '',
  quote       jsonb default '{"uz":"","en":""}'::jsonb,
  avatar      text default '',
  rating      int default 5,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

-- ============================================================
-- 7. Xabarlar (aloqa formasi)
-- ============================================================
create table if not exists messages (
  id          bigint primary key generated always as identity,
  name        text not null,
  email       text not null,
  subject     text default '',
  message     text not null,
  read        boolean default false,
  created_at  timestamptz default now()
);

-- ============================================================
-- 8. Mehmonlar kitobi
-- ============================================================
create table if not exists guestbook (
  id          bigint primary key generated always as identity,
  name        text not null,
  message     text not null,
  city        text,
  date        date default current_date,
  created_at  timestamptz default now()
);

-- ============================================================
-- 9. Vositalar (uses)
-- ============================================================
create table if not exists uses (
  id          bigint primary key generated always as identity,
  name        text not null,
  category    jsonb default '{"uz":"","en":""}'::jsonb,
  description jsonb default '{"uz":"","en":""}'::jsonb,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

-- ============================================================
-- 10. Yangilanishlar tarixi
-- ============================================================
create table if not exists changelog (
  id          bigint primary key generated always as identity,
  version     text not null,
  date        date default current_date,
  changes     jsonb default '[]'::jsonb,
  created_at  timestamptz default now()
);

-- ============================================================
-- 11. Ijtimoiy tarmoqlar
-- ============================================================
create table if not exists socials (
  id          bigint primary key generated always as identity,
  label       text not null,
  url         text not null,
  icon        text default 'github',
  handle      text default '',
  sort_order  int default 0,
  created_at  timestamptz default now()
);

-- ============================================================
-- 12. Blog obunachilari
-- ============================================================
create table if not exists subscribers (
  id          bigint primary key generated always as identity,
  email       text unique not null,
  confirmed   boolean default false,
  created_at  timestamptz default now()
);

-- Obunachilar ro'yxati faqat service_role orqali o'qiladi (siyosat yo'q)

-- ============================================================
-- RLS (Row Level Security)
-- Ommaviy o'qish mumkin, yozish faqat service_role orqali
-- ============================================================
alter table site_settings enable row level security;
alter table projects      enable row level security;
alter table posts         enable row level security;
alter table services      enable row level security;
alter table faqs          enable row level security;
alter table testimonials  enable row level security;
alter table messages      enable row level security;
alter table guestbook     enable row level security;
alter table uses          enable row level security;
alter table changelog     enable row level security;
alter table socials       enable row level security;

-- Ommaviy o'qish siyosatlari
do $$
declare
  t text;
begin
  foreach t in array array[
    'site_settings','projects','posts','services','faqs',
    'testimonials','guestbook','uses','changelog','socials'
  ]
  loop
    execute format(
      'drop policy if exists "public_read_%1$s" on %1$s;', t
    );
    execute format(
      'create policy "public_read_%1$s" on %1$s for select using (true);', t
    );
  end loop;
end $$;

-- Xabarlar faqat service_role orqali o'qiladi (siyosat yo'q = hech kim o'qiy olmaydi)

-- ============================================================
-- Indekslar
-- ============================================================
create index if not exists idx_projects_slug    on projects (slug);
create index if not exists idx_projects_featured on projects (featured);
create index if not exists idx_posts_slug       on posts (slug);
create index if not exists idx_posts_date       on posts (date desc);
create index if not exists idx_guestbook_date   on guestbook (created_at desc);
create index if not exists idx_messages_created on messages (created_at desc);

-- ============================================================
-- updated_at avtomatik yangilanishi
-- ============================================================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_site_settings_updated on site_settings;
create trigger trg_site_settings_updated before update on site_settings
  for each row execute function set_updated_at();

drop trigger if exists trg_projects_updated on projects;
create trigger trg_projects_updated before update on projects
  for each row execute function set_updated_at();

drop trigger if exists trg_posts_updated on posts;
create trigger trg_posts_updated before update on posts
  for each row execute function set_updated_at();

-- ============================================================
-- Storage bucket (rasmlar uchun)
-- Supabase → Storage → New bucket → nomi: media → Public: yoqilgan
-- Yoki quyidagini ishga tushiring:
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public_read_media" on storage.objects;
create policy "public_read_media" on storage.objects
  for select using (bucket_id = 'media');
