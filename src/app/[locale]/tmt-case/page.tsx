import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'TMT Digital Design Case Study',
  description: 'A concept case study for TEXTILE MILL TASHKENT: digital audit, product catalog, production dashboard and social design system.',
  robots: { index: true, follow: true },
};

const stats = [
  ['20M+', 'pairs / year'],
  ['500+', 'knitting machines'],
  ['2011', 'founded'],
];

const products = [
  ['MEN', 'TMT-001'],
  ['WOMEN', 'TMT-002'],
  ['KIDS', 'TMT-003'],
  ['SPORT', 'TMT-004'],
];

const machines = [
  ['#102', 'Running'],
  ['#103', 'Running'],
  ['#104', 'Warning'],
  ['#105', 'Offline'],
  ['#106', 'Running'],
];

function ProductVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] bg-[#2f2721] ${compact ? 'h-56' : 'h-[430px]'}`}>
      <div className="absolute left-7 top-7 font-mono text-xs tracking-[0.2em] text-[#f1e6d4]">TMT / 2026</div>
      <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[90px] bg-[#eee8dc] shadow-2xl ${compact ? 'h-40 w-28' : 'h-72 w-48'}`}>
        <div className="absolute inset-x-0 top-[31%] h-7 bg-[#8f3b2d]" />
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[45px] bg-[#eee8dc] ${compact ? 'h-12 w-24' : 'h-20 w-44'}`} />
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold tracking-[0.2em] text-[#8f3b2d]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#171513] md:text-5xl">{title}</h2>
      {body && <p className="mt-5 text-base leading-7 text-[#5d5852]">{body}</p>}
    </div>
  );
}

export default async function TmtCaseStudy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#171513]">
      <header className="border-b border-[#ded6c9] bg-[#f5f1e8]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <Link href={`/${locale}/projects`} className="font-semibold tracking-[-0.02em] text-[#8f3b2d]">TMT</Link>
          <div className="hidden gap-7 text-sm text-[#5d5852] md:flex">
            <a href="#audit">Audit</a>
            <a href="#catalog">Catalog</a>
            <a href="#dashboard">Dashboard</a>
            <a href="#social">Social</a>
          </div>
          <a href="https://tmtsocks.uz/" target="_blank" rel="noreferrer" className="rounded-full bg-[#8f3b2d] px-4 py-2 text-xs font-semibold text-white">Current website ↗</a>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-28">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-[#8f3b2d]">DIGITAL DESIGN PROPOSAL · 2026</p>
          <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.055em] md:text-7xl">Quality woven into every thread.</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#5d5852]">A focused concept for TEXTILE MILL TASHKENT: turn an industrial manufacturer into a clearer digital product story for buyers, partners, candidates and internal teams.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#catalog" className="rounded-full bg-[#8f3b2d] px-6 py-3 text-sm font-semibold text-white">Explore concept</a>
            <a href="#dashboard" className="rounded-full border border-[#bdb4a7] px-6 py-3 text-sm font-semibold">See IT dashboard</a>
          </div>
        </div>
        <ProductVisual />
      </section>

      <section className="bg-[#1d1a17] text-[#f4ede2]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-3 md:px-10">
          {stats.map(([value, label]) => (
            <div key={value} className="border-l border-[#544c43] pl-5">
              <div className="text-4xl font-semibold tracking-[-0.04em]">{value}</div>
              <div className="mt-1 text-sm text-[#aaa095]">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="audit" className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <SectionTitle eyebrow="01 / DIGITAL AUDIT" title="From company information to a buyer journey." body="The current site already exposes the core facts: Nurafshon production, socks and footwear, 20M+ pairs/year, 500+ machines and export orientation. The redesign organizes those facts around clearer jobs-to-be-done instead of adding more content." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            ['DISCOVER', 'Who is TMT?', 'Company, production capacity, quality and export story.'],
            ['BROWSE', 'What do you make?', 'Product families with consistent specifications.'],
            ['TRUST', 'Can I work with you?', 'Certificates, quality process and manufacturing evidence.'],
            ['CONVERT', 'How do we start?', 'Quotation and contract-order CTA with less friction.'],
          ].map(([a, b, c]) => (
            <div key={a} className="rounded-3xl border border-[#ded6c9] bg-[#faf7f0] p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#8f3b2d]">{a}</p>
              <h3 className="mt-5 text-lg font-semibold">{b}</h3>
              <p className="mt-3 text-sm leading-6 text-[#69635c]">{c}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="catalog" className="border-y border-[#ded6c9] bg-[#fbf8f1]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <SectionTitle eyebrow="02 / PRODUCT CATALOG" title="A B2B catalog that can actually be used." body="Every product gets a predictable information model: SKU, composition, sizes, colors, category and a quotation path. The same content model can later power web, PDF and sales workflows." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {products.map(([name, sku], i) => (
              <article key={sku} className="overflow-hidden rounded-3xl border border-[#ded6c9] bg-[#f0eadf]">
                <ProductVisual compact />
                <div className="p-5">
                  <p className="text-xs font-mono text-[#8f3b2d]">{sku}</p>
                  <h3 className="mt-2 font-semibold">{name}</h3>
                  <p className="mt-2 text-sm text-[#69635c]">{i === 3 ? 'Performance and active movement.' : 'Everyday collection for the target market.'}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-3xl bg-[#8f3b2d] p-7 text-white md:flex md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-[#f3d6cb]">PRODUCT DETAIL</p>
              <h3 className="mt-2 text-2xl font-semibold">TMT SPORT 004</h3>
              <p className="mt-2 text-sm text-[#f2dfd8]">80% Cotton · 17% Polyamide · 3% Elastane · Sizes 36–40</p>
            </div>
            <button className="mt-5 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#8f3b2d] md:mt-0">Request quotation</button>
          </div>
        </div>
      </section>

      <section id="dashboard" className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <SectionTitle eyebrow="03 / IT DESIGN" title="A production dashboard that speaks the factory's language." body="The IT-designer role can extend beyond marketing visuals. This concept turns machine state, production output, downtime and quality signals into a compact operational interface." />
        <div className="mt-12 overflow-hidden rounded-[32px] border border-[#302a24] bg-[#f8f6f1] shadow-2xl">
          <div className="grid md:grid-cols-[220px_1fr]">
            <aside className="bg-[#1d1a17] p-6 text-[#f4ede2]">
              <p className="text-xl font-semibold">TMT<br />OPERATIONS</p>
              <nav className="mt-12 space-y-5 text-sm text-[#aaa095]">
                <div className="font-semibold text-[#f4ede2]">Overview</div><div>Production</div><div>Machines</div><div>Orders</div><div>Quality</div><div>Reports</div>
              </nav>
            </aside>
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div><h3 className="text-2xl font-semibold">Production overview</h3><p className="mt-1 text-sm text-[#777068]">Today · Nurafshon factory</p></div>
                <span className="rounded-full bg-[#e6efe8] px-3 py-1.5 text-xs font-semibold text-[#23643d]">87% target</span>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ['18,420','Pairs produced'],['462','Machines active'],['25','Downtime'],['87%','Target progress']
                ].map(([v,l]) => <div key={l} className="rounded-2xl border border-[#e1dacf] bg-white p-5"><div className="text-2xl font-semibold">{v}</div><div className="mt-2 text-xs text-[#777068]">{l}</div></div>)}
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_.8fr]">
                <div className="rounded-2xl border border-[#e1dacf] bg-white p-5">
                  <p className="text-sm font-semibold">Daily production</p>
                  <div className="mt-7 flex h-44 items-end gap-3">
                    {[45,70,90,64,110,84,128].map((h,i) => <div key={i} className="flex-1 rounded-t-lg bg-[#8f3b2d]" style={{height: h}} />)}
                  </div>
                </div>
                <div className="rounded-2xl border border-[#e1dacf] bg-white p-5">
                  <p className="text-sm font-semibold">Machine status</p>
                  <div className="mt-5 space-y-3">
                    {machines.map(([id,state]) => <div key={id} className="flex items-center justify-between text-sm"><span>{id}</span><span className={state === 'Running' ? 'text-[#23643d]' : state === 'Warning' ? 'text-[#a66a18]' : 'text-[#9a3b2d]'}>{state}</span></div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="social" className="bg-[#1d1a17] text-[#f4ede2]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <SectionTitle eyebrow="04 / SOCIAL DESIGN SYSTEM" title="Four repeatable formats instead of four unrelated posts." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              ['NEW COLLECTION','New product launch'],['FACTORY','Production story'],['QUALITY','Certification / trust'],['CAREERS','Recruitment']
            ].map(([title,sub],i) => <div key={title} className="rounded-3xl bg-[#2c2722] p-4"><div className={`flex h-72 flex-col justify-between rounded-2xl p-5 ${i % 2 === 0 ? 'bg-[#8f3b2d]' : 'bg-[#7b5b3e]'}`}><span className="text-xs font-semibold tracking-[0.16em] text-[#f5dfd7]">TMT</span><span className="text-2xl font-semibold">{title}</span></div><div className="px-1 pb-1 pt-4"><p className="font-semibold">{sub}</p><p className="mt-1 text-xs text-[#aaa095]">1080 × 1350 · reusable template</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <SectionTitle eyebrow="05 / IMPLEMENTATION" title="Designed to become a real digital system." body="The prototype is intentionally implementation-oriented: Next.js, TypeScript, responsive UI, accessible structure and reusable content patterns. A production rollout can connect the catalog to a CMS, ERP or internal API without changing the visual information architecture." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ['Website','Corporate site + product catalog + quotation flow'],
            ['Internal IT','Production dashboard + machine state + reporting'],
            ['Content','Social templates + product specs + sales collateral'],
          ].map(([a,b]) => <div key={a} className="rounded-3xl border border-[#ded6c9] bg-[#faf7f0] p-6"><h3 className="font-semibold">{a}</h3><p className="mt-3 text-sm leading-6 text-[#69635c]">{b}</p></div>)}
        </div>
      </section>

      <footer className="border-t border-[#ded6c9]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-[#69635c] md:flex-row md:items-center md:justify-between md:px-10">
          <span>TMT Digital Design Case Study · Concept</span>
          <div className="flex gap-5"><a href="https://tmtsocks.uz/" target="_blank" rel="noreferrer">tmtsocks.uz ↗</a><a href="#audit">Back to top ↑</a></div>
        </div>
      </footer>
    </main>
  );
}
