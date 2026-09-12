import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, tr } from '@/lib/i18n';
import { getSiteContent } from '@/lib/data';
import { PageHeader } from '@/components/layout/PageHeader';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : 'uz';
  return { title: tr('footer.privacy', lang), alternates: { canonical: `/${lang}/privacy` } };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = await getSiteContent();

  const blocks =
    locale === 'uz'
      ? [
          {
            title: 'Qanday ma’lumot yig‘iladi',
            text: 'Aloqa formasi orqali yuborilgan ism, email va xabar matni saqlanadi. Bu ma’lumot faqat sizga javob berish uchun ishlatiladi.',
          },
          {
            title: 'Cookie fayllar',
            text: 'Sayt tanlagan tilingiz va rang rejimini eslab qolish uchun brauzeringizda cookie saqlaydi. Bu ma’lumot uchinchi shaxslarga berilmaydi.',
          },
          {
            title: 'Analitika',
            text: 'Sahifalar qanchalik ko‘rilayotganini tushunish uchun umumiy statistika yig‘iladi. Shaxsni aniqlovchi ma’lumot to‘planmaydi.',
          },
          {
            title: 'Ma’lumotni o‘chirish',
            text: 'Yuborgan xabaringizni yoki boshqa ma’lumotingizni o‘chirishni xohlasangiz, email orqali yozing — 7 kun ichida o‘chiriladi.',
          },
          {
            title: 'Uchinchi tomon xizmatlari',
            text: 'Sayt hosting, ma’lumotlar bazasi va rasm saqlash uchun tashqi xizmatlardan foydalanadi. Ular o‘z maxfiylik siyosatiga amal qiladi.',
          },
        ]
      : [
          {
            title: 'What data is collected',
            text: 'The name, email and message text submitted through the contact form are stored. This data is used only to reply to you.',
          },
          {
            title: 'Cookies',
            text: 'The site stores cookies in your browser to remember your language and colour theme. This data is never shared with third parties.',
          },
          {
            title: 'Analytics',
            text: 'Aggregate statistics are collected to understand how often pages are viewed. No personally identifying data is gathered.',
          },
          {
            title: 'Data deletion',
            text: 'If you want your message or other data deleted, email me and it will be removed within 7 days.',
          },
          {
            title: 'Third-party services',
            text: 'The site uses external services for hosting, database and image storage. They follow their own privacy policies.',
          },
        ];

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={tr('footer.privacy', locale)}
        subtitle={
          locale === 'uz'
            ? `Oxirgi yangilanish: ${new Date().toISOString().slice(0, 10)}`
            : `Last updated: ${new Date().toISOString().slice(0, 10)}`
        }
      />
      <section className="py-16">
        <div className="container-x max-w-3xl">
          <p className="text-[1rem] leading-[1.85] text-[var(--text-soft)]">
            {locale === 'uz'
              ? `Bu sahifa ${content.settings.name} saytida shaxsiy ma'lumotlar qanday qayta ishlanishini tushuntiradi.`
              : `This page explains how personal data is handled on ${content.settings.name}'s site.`}
          </p>
          <div className="mt-10 space-y-8">
            {blocks.map((block) => (
              <div key={block.title}>
                <h2 className="text-[1.1rem] font-semibold text-[var(--text)]">{block.title}</h2>
                <p className="mt-3 text-[0.95rem] leading-[1.8] text-[var(--text-muted)]">
                  {block.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-6">
            <p className="text-[0.88rem] text-[var(--text-soft)]">
              {locale === 'uz' ? 'Savollar bo‘lsa: ' : 'Questions: '}
              <a href={`mailto:${content.settings.email}`} className="text-[var(--accent)] hover:underline">
                {content.settings.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
