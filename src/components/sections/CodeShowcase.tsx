'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Terminal as TerminalIcon } from 'lucide-react';
import { t, tr, type Locale } from '@/lib/i18n';
import type { CodeSnippet, SiteContent } from '@/lib/types';
import { Section, SectionHeading } from '../ui/Section';
import { Reveal } from '../ui/Reveal';

/* ============================================================
   C6 — Kod namunalari (tablar + nusxalash)
   ============================================================ */
export function CodeSnippets({ snippets, locale }: { snippets: CodeSnippet[]; locale: Locale }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const snippet = snippets[active];
  if (!snippet) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard mavjud emas */
    }
  };

  return (
    <Section id="code">
      <SectionHeading
        eyebrow="Code"
        title={tr('section.snippets', locale)}
        subtitle={
          locale === 'uz'
            ? "Men yozgan kodning kichik qismlari — har biri haqiqiy loyihadan."
            : 'Small pieces of code I wrote — each from a real project.'
        }
      />

      <Reveal delay={0.08}>
        <div className="mt-9 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--code-bg)]">
          {/* Sarlavha qatori */}
          <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-[0.72rem] text-[var(--text-muted)]">
                {snippet.language}
              </span>
            </div>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 py-1 text-[0.7rem] font-medium text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? tr('common.copied', locale) : tr('common.copy', locale)}
            </button>
          </div>

          {/* Tablar */}
          <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-[var(--border)] px-2 py-2">
            {snippets.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-[0.76rem] font-medium transition-colors ${
                  i === active
                    ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {t(s.title, locale)}
              </button>
            ))}
          </div>

          {/* Kod */}
          <pre className="no-scrollbar overflow-x-auto p-5 text-[0.8rem] leading-relaxed">
            <code className="font-mono text-[var(--text-soft)]">{snippet.code}</code>
          </pre>
        </div>
      </Reveal>
    </Section>
  );
}

/* ============================================================
   C7 + I1 — Interaktiv terminal
   ============================================================ */
interface Line {
  type: 'input' | 'output';
  text: string;
}

export function TerminalSection({ content, locale }: { content: SiteContent; locale: Locale }) {
  const { settings, skills, projects, socials } = content;
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', text: `${settings.name} — interactive shell v1.0` },
    { type: 'output', text: tr('terminal.hint', locale) },
    { type: 'output', text: '' },
  ]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const commands = ['help', 'whoami', 'about', 'skills', 'projects', 'contact', 'now', 'social', 'clear'];

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: 'smooth' });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const out: Line[] = [{ type: 'input', text: raw }];

    const push = (text: string) => out.push({ type: 'output', text });

    switch (cmd) {
      case '':
        break;
      case 'help':
        push(`${tr('terminal.help', locale)}:`);
        push('  help        — shu ro\'yxat');
        push('  whoami      — kim ekanligim');
        push('  about       — qisqa ma\'lumot');
        push('  skills      — ko\'nikmalar');
        push('  projects    — loyihalar');
        push('  contact     — aloqa ma\'lumotlari');
        push('  social      — ijtimoiy tarmoqlar');
        push('  now         — hozir nima qilyapman');
        push('  clear       — ekranni tozalash');
        break;
      case 'whoami':
        push(`${settings.name} — ${t(settings.role, locale)}`);
        push(t(settings.location, locale));
        break;
      case 'about':
        push(t(settings.shortBio, locale));
        push(`${settings.yearsExperience}+ ${locale === 'uz' ? 'yillik tajriba' : 'years of experience'}`);
        break;
      case 'skills':
        push(skills.slice(0, 8).map((s) => `${s.name} (${s.level}%)`).join('  ·  '));
        break;
      case 'projects':
        projects.slice(0, 5).forEach((p) => push(`• ${p.title} — ${p.year}`));
        push(`→ ${projects.length} ${locale === 'uz' ? 'ta loyiha' : 'projects total'}`);
        break;
      case 'contact':
        push(`email:   ${settings.email}`);
        push(`telegram: ${socials.find((s) => s.icon === 'telegram')?.handle ?? '—'}`);
        push(`github:   ${socials.find((s) => s.icon === 'github')?.handle ?? '—'}`);
        break;
      case 'social':
        socials.forEach((s) => push(`${s.label.padEnd(10)} ${s.handle}`));
        break;
      case 'now':
        content.now.slice(0, 3).forEach((n) => push(`• ${t(n, locale)}`));
        break;
      case 'clear':
        setLines([]);
        setValue('');
        return;
      case 'sudo':
        push(locale === 'uz' ? 'Bu yerda sudo kerak emas 😉' : 'No sudo needed here 😉');
        break;
      case 'ls':
        push('about.md   projects/   posts/   cv.pdf   contact.txt');
        break;
      case 'cat':
        push(locale === 'uz' ? 'Qaysi fayl? Masalan: cat about.md' : 'Which file? e.g. cat about.md');
        break;
      default:
        push(`${tr('terminal.unknown', locale)}: ${cmd}`);
        push(`${locale === 'uz' ? 'Yordam uchun' : 'Type'} "help" ${locale === 'uz' ? 'yozing' : ''}`);
    }

    out.push({ type: 'output', text: '' });
    setLines((prev) => [...prev, ...out]);
    setHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);
    setValue('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      if (history[nextIndex] !== undefined) {
        setValue(history[nextIndex]);
        setHistoryIndex(nextIndex);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setValue('');
        setHistoryIndex(-1);
      } else {
        setValue(history[nextIndex]);
        setHistoryIndex(nextIndex);
      }
    }
  };

  return (
    <Section id="terminal">
      <SectionHeading
        eyebrow="Shell"
        title={tr('section.terminal', locale)}
        subtitle={
          locale === 'uz'
            ? "Saytni klaviatura bilan kezishni yaxshi ko'rasizmi? Buyruq yozib ko'ring."
            : 'Prefer the keyboard? Try typing a command.'
        }
      />

      <Reveal delay={0.08}>
        <div className="mt-9 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--code-bg)] shadow-[var(--shadow-md)]">
          <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-2.5">
            <TerminalIcon size={13} className="text-[var(--accent)]" />
            <span className="font-mono text-[0.72rem] text-[var(--text-muted)]">
              {settings.name.split(' ')[0].toLowerCase()}@portfolio:~$
            </span>
          </div>

          <div
            ref={boxRef}
            onClick={() => inputRef.current?.focus()}
            className="no-scrollbar h-[320px] cursor-text overflow-y-auto p-5 font-mono text-[0.8rem] leading-relaxed"
          >
            {lines.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {line.type === 'input' ? (
                  <span>
                    <span className="text-[var(--accent)]">$ </span>
                    <span className="text-[var(--text)]">{line.text}</span>
                  </span>
                ) : (
                  <span className="text-[var(--text-muted)]">{line.text}</span>
                )}
              </div>
            ))}

            {/* Kiritish qatori */}
            <div className="flex items-center">
              <span className="text-[var(--accent)]">$&nbsp;</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal buyrug'i"
                className="flex-1 bg-transparent font-mono text-[0.8rem] text-[var(--text)] outline-none"
              />
              <span className="animate-blink text-[var(--accent)]">▊</span>
            </div>
          </div>

          {/* Tezkor tugmalar */}
          <div className="flex flex-wrap gap-2 border-t border-[var(--border)] px-4 py-3">
            {commands.slice(0, 6).map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => run(cmd)}
                className="rounded-lg border border-[var(--border)] px-2.5 py-1 font-mono text-[0.7rem] text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
