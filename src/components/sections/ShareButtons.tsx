'use client';

import { useState } from 'react';
import { Check, Link2, Linkedin, Send, Twitter } from 'lucide-react';

/** Maqolani ulashish tugmalari */
export function ShareButtons({
  url,
  title,
  locale,
}: {
  url: string;
  title: string;
  locale: 'uz' | 'en';
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* e'tiborsiz */
    }
  };

  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  const links = [
    { icon: Send, label: 'Telegram', href: `https://t.me/share/url?url=${encoded}&text=${text}` },
    { icon: Twitter, label: 'X', href: `https://twitter.com/intent/tweet?url=${encoded}&text=${text}` },
    { icon: Linkedin, label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}` },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[0.75rem] text-[var(--text-muted)]">
        {locale === 'uz' ? 'Ulashish:' : 'Share:'}
      </span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <link.icon size={14} />
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label="Havolani nusxalash"
        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-[0.72rem] font-medium text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        {copied ? <Check size={12} /> : <Link2 size={12} />}
        {copied ? (locale === 'uz' ? 'Nusxalandi' : 'Copied') : (locale === 'uz' ? 'Havola' : 'Link')}
      </button>
    </div>
  );
}
