import Script from 'next/script';

/**
 * H9 — Analitika.
 *
 * `NEXT_PUBLIC_ANALYTICS_ID` bo'sh bo'lsa hech narsa yuklanmaydi.
 * Ikki xil xizmat qo'llab-quvvatlanadi:
 *   NEXT_PUBLIC_ANALYTICS_PROVIDER=umami     (standart)
 *   NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible
 *
 * Ikkalasi ham cookie ishlatmaydi — maxfiylik siyosatiga mos.
 */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  if (!id) return null;

  const provider = (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || 'umami').toLowerCase();
  const scriptUrl =
    process.env.NEXT_PUBLIC_ANALYTICS_URL ||
    (provider === 'plausible' ? 'https://plausible.io/js/script.js' : 'https://cloud.umami.is/script.js');

  if (provider === 'plausible') {
    return (
      <Script
        defer
        data-domain={id}
        src={scriptUrl}
        strategy="afterInteractive"
      />
    );
  }

  // Umami (standart)
  return (
    <Script
      async
      data-website-id={id}
      src={scriptUrl}
      strategy="afterInteractive"
    />
  );
}
