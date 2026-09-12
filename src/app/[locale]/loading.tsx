/**
 * Yuklanish holati (skeleton).
 * Sahifa ma'lumotlari tayyor bo'lguncha ko'rsatiladi — bo'sh oq ekran o'rniga.
 */
export default function Loading() {
  return (
    <div className="pt-28 pb-24" aria-busy="true" aria-live="polite">
      <span className="sr-only">Yuklanmoqda…</span>

      {/* Hero skeleti */}
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <div className="h-7 w-40 animate-pulse rounded-full bg-[var(--surface-2)]" />
            <div className="mt-6 h-4 w-24 animate-pulse rounded bg-[var(--surface-2)]" />
            <div className="mt-4 h-14 w-[85%] animate-pulse rounded-lg bg-[var(--surface-2)]" />
            <div className="mt-4 h-7 w-52 animate-pulse rounded bg-[var(--surface-2)]" />
            <div className="mt-7 space-y-3">
              <div className="h-4 w-full max-w-xl animate-pulse rounded bg-[var(--surface-2)]" />
              <div className="h-4 w-full max-w-lg animate-pulse rounded bg-[var(--surface-2)]" />
            </div>
            <div className="mt-9 flex gap-3">
              <div className="h-12 w-44 animate-pulse rounded-full bg-[var(--surface-2)]" />
              <div className="h-12 w-32 animate-pulse rounded-full bg-[var(--surface-2)]" />
            </div>
          </div>

          <div className="h-[280px] animate-pulse rounded-3xl bg-[var(--surface-2)]" />
        </div>
      </div>

      {/* Bo'limlar skeleti */}
      <div className="container-x mt-24">
        <div className="h-4 w-28 animate-pulse rounded bg-[var(--surface-2)]" />
        <div className="mt-4 h-9 w-72 animate-pulse rounded-lg bg-[var(--surface-2)]" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card p-6">
              <div className="h-11 w-11 animate-pulse rounded-xl bg-[var(--surface-2)]" />
              <div className="mt-5 h-5 w-2/3 animate-pulse rounded bg-[var(--surface-2)]" />
              <div className="mt-3 space-y-2.5">
                <div className="h-3.5 w-full animate-pulse rounded bg-[var(--surface-2)]" />
                <div className="h-3.5 w-5/6 animate-pulse rounded bg-[var(--surface-2)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
