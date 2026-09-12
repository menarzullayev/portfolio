import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { buildToc } from '@/lib/posts';
import type { Locale } from '@/lib/types';
import { tr } from '@/lib/i18n';

/** Maqola matni (markdown) va mundarija */
export function ArticleBody({ markdown, locale }: { markdown: string; locale: Locale }) {
  const toc = buildToc(markdown);

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
      <div className="min-w-0">
        <div className="prose-article max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h2: ({ children, ...props }) => {
                const id = String(children)
                  .toLowerCase()
                  .replace(/[^\p{L}\p{N}\s-]/gu, '')
                  .trim()
                  .replace(/\s+/g, '-');
                return (
                  <h2 id={id} {...props}>
                    {children}
                  </h2>
                );
              },
              h3: ({ children, ...props }) => {
                const id = String(children)
                  .toLowerCase()
                  .replace(/[^\p{L}\p{N}\s-]/gu, '')
                  .trim()
                  .replace(/\s+/g, '-');
                return (
                  <h3 id={id} {...props}>
                    {children}
                  </h3>
                );
              },
              a: ({ href, children, ...props }) => (
                <a
                  href={href}
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  {...props}
                >
                  {children}
                </a>
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>

      {/* Mundarija */}
      {toc.length > 0 && (
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <h3 className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-[var(--text-muted)]">
              {tr('blog.toc', locale)}
            </h3>
            <nav className="mt-4 space-y-2 border-l border-[var(--border)]">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block text-[0.78rem] leading-snug text-[var(--text-muted)] transition-colors hover:text-[var(--accent)] ${
                    item.level === 3 ? 'pl-6' : 'pl-4'
                  }`}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      )}
    </div>
  );
}
