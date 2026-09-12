import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';
import { NotFoundGame } from '@/components/ui/NotFoundGame';

export const metadata = {
  title: '404 — Sahifa topilmadi',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100svh] items-center py-24">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1.5 text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-[var(--accent)]">
            <Compass size={13} /> 404
          </span>
          <h1 className="mt-6 text-[2.4rem] font-semibold tracking-tight text-balance md:text-[3.4rem] md:leading-[1.08]">
            Sahifa topilmadi
          </h1>
          <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-[var(--text-muted)]">
            Bu sahifa o‘chirilgan yoki manzil xato yozilgan bo‘lishi mumkin. Lekin sizni
            yo‘ldan yo‘qotib qo‘ymaymiz.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/uz"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-ink)] transition-transform hover:scale-[1.03]"
            >
              <ArrowLeft size={15} />
              Bosh sahifaga qaytish
            </Link>
            <Link
              href="/uz/blog"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-6 py-3 text-sm font-semibold transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Blogga o‘tish
            </Link>
          </div>
        </div>

        <NotFoundGame />
      </div>
    </div>
  );
}
