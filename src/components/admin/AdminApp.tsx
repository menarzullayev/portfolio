'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Database,
  ExternalLink,
  Eye,
  FileText,
  Home,
  Image as ImageIcon,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Settings,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { resources, settingsFields, type FieldDef, type ResourceDef } from '@/lib/admin-schema';

type Row = Record<string, unknown> & { id?: string | number };

/* ============================================================
   Kirish ekrani
   ============================================================ */
function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Parol noto'g'ri. Qayta urinib ko'ring.");
        return;
      }
      onSuccess();
    } catch {
      setError('Serverga ulanib bo‘lmadi.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[var(--shadow-float)]"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--accent-ink)]">
          <Settings size={19} />
        </span>
        <h1 className="mt-5 text-xl font-semibold tracking-tight">Admin panel</h1>
        <p className="mt-2 text-[0.83rem] text-[var(--text-muted)]">
          Kontentni boshqarish uchun parolni kiriting.
        </p>

        <label htmlFor="password" className="mt-6 mb-2 block text-[0.78rem] font-medium">
          Parol
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[0.9rem] outline-none focus:border-[var(--accent)]"
          placeholder="••••••••"
          required
        />

        {error && (
          <p className="mt-3 flex items-center gap-1.5 text-[0.78rem] text-[var(--danger)]">
            <AlertTriangle size={12} /> {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-[0.88rem] font-semibold text-[var(--accent-ink)] disabled:opacity-60"
        >
          {busy ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
          Kirish
        </button>

        <Link
          href="/uz"
          className="mt-5 inline-flex items-center gap-1.5 text-[0.78rem] text-[var(--text-muted)] hover:text-[var(--accent)]"
        >
          <ArrowLeft size={12} /> Saytga qaytish
        </Link>
      </form>
    </div>
  );
}

/* ============================================================
   Umumiy CRUD jadvali
   ============================================================ */
function ResourceEditor({ resource }: { resource: ResourceDef }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/content/${resource.table}`);
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || json.error || 'Yuklab bo‘lmadi');
        setRows([]);
        return;
      }
      setRows(json.data ?? []);
    } catch {
      setError('Serverga ulanib bo‘lmadi');
    } finally {
      setLoading(false);
    }
  }, [resource.table]);

  useEffect(() => {
    void load();
  }, [load]);

  const remove = async (id: string | number | undefined) => {
    if (id === undefined) return;
    if (!confirm('Bu yozuvni o‘chirishni tasdiqlaysizmi?')) return;
    await fetch(`/api/admin/content/${resource.table}?id=${id}`, { method: 'DELETE' });
    void load();
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-[0.85rem] text-[var(--text-muted)]">
        <Loader2 size={15} className="animate-spin" /> Yuklanmoqda…
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{resource.label}</h2>
          <p className="mt-1 text-[0.82rem] text-[var(--text-muted)]">{resource.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void load()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] px-3 py-2 text-[0.8rem] font-medium hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <RefreshCw size={13} /> Yangilash
          </button>
          <button
            type="button"
            onClick={() => {
              setCreating(true);
              setEditing({});
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--accent)] px-4 py-2 text-[0.8rem] font-semibold text-[var(--accent-ink)]"
          >
            <Plus size={13} /> Yangi
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-[var(--warning)] bg-[var(--surface-2)] p-4">
          <AlertTriangle size={16} className="mt-0.5 shrink-0 text-[var(--warning)]" />
          <div className="text-[0.83rem] leading-relaxed">
            <p className="font-medium text-[var(--text)]">{error}</p>
            {error.includes('Supabase') && (
              <p className="mt-2 text-[var(--text-muted)]">
                <code className="rounded bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[0.75rem]">.env</code>{' '}
                faylini to‘ldiring va <code className="rounded bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[0.75rem]">supabase/schema.sql</code> ni
                Supabase SQL muharririda ishga tushiring. Shundan keyin panel to‘liq ishlaydi.
              </p>
            )}
          </div>
        </div>
      )}

      {!error && rows.length === 0 && (
        <p className="mt-8 text-[0.85rem] text-[var(--text-muted)]">
          Hozircha yozuv yo‘q. «Yangi» tugmasi bilan birinchisini qo‘shing.
        </p>
      )}

      {rows.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border)]">
          <table className="w-full text-left text-[0.84rem]">
            <thead className="bg-[var(--surface-2)]">
              <tr>
                <th className="px-4 py-3 font-medium text-[var(--text-muted)]">Nomi</th>
                <th className="hidden px-4 py-3 font-medium text-[var(--text-muted)] md:table-cell">
                  Qo‘shimcha
                </th>
                <th className="px-4 py-3 text-right font-medium text-[var(--text-muted)]">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const titleValue = row[resource.titleField];
                const title =
                  typeof titleValue === 'object' && titleValue !== null
                    ? String((titleValue as Record<string, string>).uz ?? '')
                    : String(titleValue ?? '—');
                const extra =
                  resource.key === 'projects'
                    ? String(row.year ?? '')
                    : resource.key === 'posts'
                      ? String(row.date ?? '')
                      : String(row.email ?? row.company ?? row.city ?? '');

                return (
                  <tr key={String(row.id)} className="border-t border-[var(--border)]">
                    <td className="max-w-xs truncate px-4 py-3 font-medium">{title}</td>
                    <td className="hidden px-4 py-3 text-[var(--text-muted)] md:table-cell">{extra}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setCreating(false);
                            setEditing(row);
                          }}
                          aria-label="Tahrirlash"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => void remove(row.id)}
                          aria-label="O‘chirish"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] hover:border-[var(--danger)] hover:text-[var(--danger)]"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {editing !== null && (
        <RowForm
          resource={resource}
          row={editing}
          isNew={creating}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
          onSaved={() => {
            setEditing(null);
            setCreating(false);
            void load();
          }}
        />
      )}
    </div>
  );
}

/* ============================================================
   Yozuv formasi
   ============================================================ */
function RowForm({
  resource,
  row,
  isNew,
  onClose,
  onSaved,
}: {
  resource: ResourceDef;
  row: Row;
  isNew: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [values, setValues] = useState<Record<string, unknown>>(() => ({ ...row }));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const set = (name: string, value: unknown) => setValues((prev) => ({ ...prev, [name]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');

    try {
      const payload = { ...values };
      delete payload.created_at;
      delete payload.updated_at;

      const res = await fetch(`/api/admin/content/${resource.table}`, {
        method: isNew ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isNew ? payload : { ...payload, id: row.id }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || json.error || 'Saqlab bo‘lmadi');
        return;
      }
      onSaved();
    } catch {
      setError('Serverga ulanib bo‘lmadi');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
      <form
        onSubmit={submit}
        className="my-8 w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-float)]"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight">
            {isNew ? 'Yangi yozuv' : 'Tahrirlash'} · {resource.label}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Yopish"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)]"
          >
            <X size={15} />
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {resource.fields.map((field) => (
            <div key={field.name} className={field.wide || field.type === 'bilingual' || field.type === 'textarea' || field.type === 'json' ? 'sm:col-span-2' : ''}>
              <label className="mb-1.5 block text-[0.76rem] font-medium text-[var(--text-soft)]">
                {field.label}
                {field.required && <span className="ml-1 text-[var(--danger)]">*</span>}
              </label>
              <FieldInput field={field} value={values[field.name]} onChange={(v) => set(field.name, v)} />
              {field.hint && (
                <p className="mt-1 text-[0.7rem] text-[var(--text-muted)]">{field.hint}</p>
              )}
            </div>
          ))}
        </div>

        {error && (
          <p className="mt-4 flex items-center gap-1.5 text-[0.78rem] text-[var(--danger)]">
            <AlertTriangle size={12} /> {error}
          </p>
        )}

        <div className="mt-7 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[var(--border)] px-4 py-2.5 text-[0.83rem] font-medium"
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-[0.83rem] font-semibold text-[var(--accent-ink)] disabled:opacity-60"
          >
            {busy ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Saqlash
          </button>
        </div>
      </form>
    </div>
  );
}

/* ============================================================
   Maydon kiritish
   ============================================================ */
const inputClass =
  'w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-[0.85rem] outline-none focus:border-[var(--accent)]';

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  if (field.type === 'bilingual') {
    const obj = (value as Record<string, string>) ?? {};
    return (
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <span className="mb-1 block font-mono text-[0.68rem] text-[var(--text-muted)]">UZ</span>
          <input
            value={obj.uz ?? ''}
            onChange={(e) => onChange({ ...obj, uz: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <span className="mb-1 block font-mono text-[0.68rem] text-[var(--text-muted)]">EN</span>
          <input
            value={obj.en ?? ''}
            onChange={(e) => onChange({ ...obj, en: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>
    );
  }

  if (field.type === 'textarea') {
    return (
      <textarea
        rows={10}
        value={String(value ?? '')}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} resize-y font-mono text-[0.8rem]`}
      />
    );
  }

  if (field.type === 'json') {
    const text = value === undefined || value === null ? '' : JSON.stringify(value, null, 2);
    return (
      <textarea
        rows={5}
        defaultValue={text}
        onBlur={(e) => {
          const raw = e.target.value.trim();
          if (raw === '') {
            onChange(null);
            return;
          }
          try {
            onChange(JSON.parse(raw));
            e.target.style.borderColor = '';
          } catch {
            e.target.style.borderColor = 'var(--danger)';
          }
        }}
        className={`${inputClass} resize-y font-mono text-[0.78rem]`}
      />
    );
  }

  if (field.type === 'bool') {
    return (
      <label className="inline-flex cursor-pointer items-center gap-2.5">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 accent-[var(--accent)]"
        />
        <span className="text-[0.82rem] text-[var(--text-muted)]">Ha</span>
      </label>
    );
  }

  if (field.type === 'select') {
    return (
      <select
        value={String(value ?? field.options?.[0] ?? '')}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      >
        {field.options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === 'tags') {
    const arr = Array.isArray(value) ? (value as string[]) : [];
    return (
      <input
        value={arr.join(', ')}
        onChange={(e) =>
          onChange(
            e.target.value
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean),
          )
        }
        className={inputClass}
      />
    );
  }

  if (field.type === 'number') {
    return (
      <input
        type="number"
        value={value === undefined || value === null ? '' : Number(value)}
        onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))}
        className={inputClass}
      />
    );
  }

  return (
    <input
      value={String(value ?? '')}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      className={inputClass}
    />
  );
}

/* ============================================================
   Sozlamalar paneli
   ============================================================ */
function SettingsPanel() {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch('/api/admin/content/site_settings');
        const json = await res.json();
        if (res.ok && Array.isArray(json.data) && json.data[0]) {
          setValues(json.data[0]);
        }
      } catch {
        /* e'tiborsiz */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    const payload = { ...values };
    const id = payload.id;
    delete payload.id;
    delete payload.created_at;
    delete payload.updated_at;

    try {
      const res = await fetch('/api/admin/content/site_settings', {
        method: id === undefined ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id === undefined ? payload : { ...payload, id }),
      });
      const json = await res.json();
      if (!res.ok) {
        setMessage(json.message || json.error || 'Saqlab bo‘lmadi');
        return;
      }
      setMessage('Saqlandi. Sayt keyingi yangilanishda yangi ma’lumotni ko‘rsatadi.');
      if (json.data) setValues(json.data);
    } catch {
      setMessage('Serverga ulanib bo‘lmadi');
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-[0.85rem] text-[var(--text-muted)]">
        <Loader2 size={15} className="animate-spin" /> Yuklanmoqda…
      </div>
    );
  }

  return (
    <form onSubmit={save}>
      <h2 className="text-lg font-semibold tracking-tight">Sayt sozlamalari</h2>
      <p className="mt-1 text-[0.82rem] text-[var(--text-muted)]">
        Ism, shior, aloqa ma’lumotlari va bandlik holati.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {settingsFields.map((field) => (
          <div
            key={field.name}
            className={
              field.type === 'bilingual' || field.wide ? 'sm:col-span-2' : ''
            }
          >
            <label className="mb-1.5 block text-[0.76rem] font-medium text-[var(--text-soft)]">
              {field.label}
            </label>
            <FieldInput
              field={field}
              value={values[field.name]}
              onChange={(v) => setValues((prev) => ({ ...prev, [field.name]: v }))}
            />
          </div>
        ))}
      </div>

      {message && (
        <p className="mt-5 text-[0.8rem] text-[var(--text-soft)]">{message}</p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-[0.83rem] font-semibold text-[var(--accent-ink)] disabled:opacity-60"
      >
        {busy ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
        Saqlash
      </button>
    </form>
  );
}

/* ============================================================
   Rasm yuklash paneli
   ============================================================ */
function UploadPanel() {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState('');

  const upload = async (file: File) => {
    setBusy(true);
    setError('');
    setResult('');
    const body = new FormData();
    body.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || json.error || 'Yuklab bo‘lmadi');
        return;
      }
      setResult(json.url);
      setPreview(json.url);
    } catch {
      setError('Serverga ulanib bo‘lmadi');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold tracking-tight">Rasm yuklash</h2>
      <p className="mt-1 text-[0.82rem] text-[var(--text-muted)]">
        PNG, JPG, WEBP yoki SVG — 5 MB gacha. Yuklangan rasm manzilini loyiha yoki maqolada ishlatasiz.
      </p>

      <label className="mt-7 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-2)] px-6 py-12 text-center transition-colors hover:border-[var(--accent)]">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
          {busy ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
        </span>
        <span className="text-[0.88rem] font-medium">Faylni tanlang yoki bu yerga tashlang</span>
        <span className="text-[0.75rem] text-[var(--text-muted)]">Maksimal hajm: 5 MB</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void upload(file);
          }}
        />
      </label>

      {error && (
        <p className="mt-4 flex items-center gap-1.5 text-[0.8rem] text-[var(--danger)]">
          <AlertTriangle size={13} /> {error}
        </p>
      )}

      {result && (
        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-[0.78rem] font-medium text-[var(--success)]">Yuklandi!</p>
          <div className="mt-3 flex items-center gap-2">
            <input
              readOnly
              value={result}
              className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 font-mono text-[0.75rem]"
            />
            <button
              type="button"
              onClick={() => void navigator.clipboard.writeText(result)}
              className="rounded-lg border border-[var(--border)] px-3 py-2 text-[0.75rem] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Nusxalash
            </button>
          </div>
          {preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Yuklangan rasm"
              className="mt-4 max-h-56 rounded-lg border border-[var(--border)] object-contain"
            />
          )}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Umumiy ko'rinish
   ============================================================ */
function Overview() {
  return (
    <div>
      <h2 className="text-lg font-semibold tracking-tight">Boshqaruv paneli</h2>
      <p className="mt-1 text-[0.82rem] text-[var(--text-muted)]">
        Sayt kontenti shu yerdan boshqariladi. Chapdan bo‘limni tanlang.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: FileText, title: 'Loyihalar', text: 'Ishlaringizni qo‘shing, tahrirlang va tartiblang.' },
          { icon: FileText, title: 'Maqolalar', text: 'Markdown formatida yozing, qoralama saqlang.' },
          { icon: ImageIcon, title: 'Rasmlar', text: 'Muqova va avatar uchun rasm yuklang.' },
          { icon: Settings, title: 'Sozlamalar', text: 'Ism, shior, aloqa va bandlik holati.' },
          { icon: Eye, title: 'Xabarlar', text: 'Aloqa formasi orqali kelgan murojaatlar.' },
          { icon: Database, title: 'Baza', text: 'Kontent Supabase’da saqlanadi.' },
        ].map((card) => (
          <div key={card.title} className="card p-5">
            <card.icon size={17} className="text-[var(--accent)]" />
            <h3 className="mt-3.5 text-[0.92rem] font-semibold">{card.title}</h3>
            <p className="mt-1.5 text-[0.8rem] leading-relaxed text-[var(--text-muted)]">{card.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-6">
        <h3 className="flex items-center gap-2 text-[0.88rem] font-semibold">
          <Database size={15} className="text-[var(--accent)]" />
          Supabase’ni ulash
        </h3>
        <ol className="mt-4 space-y-2.5 text-[0.82rem] leading-relaxed text-[var(--text-muted)]">
          <li>1. supabase.com saytida bepul loyiha oching.</li>
          <li>
            2. <code className="rounded bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[0.75rem]">supabase/schema.sql</code> faylini
            SQL Editor’da ishga tushiring.
          </li>
          <li>
            3. <code className="rounded bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[0.75rem]">.env</code> fayliga
            URL va kalitlarni yozing.
          </li>
          <li>4. Serverni qayta ishga tushiring — panel to‘liq ishlaydi.</li>
        </ol>
      </div>
    </div>
  );
}

/* ============================================================
   Asosiy ilova
   ============================================================ */
export function AdminApp({ initialAuthed }: { initialAuthed: boolean }) {
  const router = useRouter();
  const [authed, setAuthed] = useState(initialAuthed);
  const [tab, setTab] = useState('overview');

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthed(false);
    router.refresh();
  };

  if (!authed) {
    return (
      <LoginForm
        onSuccess={() => {
          setAuthed(true);
          router.refresh();
        }}
      />
    );
  }

  const activeResource = resources.find((r) => r.key === tab);

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-7xl gap-8 px-5 py-8 lg:px-8">
        {/* Yon menyu */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-8">
            <Link href="/uz" className="inline-flex items-center gap-2 text-[0.82rem] font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-[0.7rem] font-bold text-[var(--accent-ink)]">
                AP
              </span>
              Admin panel
            </Link>

            <nav className="mt-6 space-y-1">
              <button
                type="button"
                onClick={() => setTab('overview')}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[0.83rem] font-medium transition-colors ${
                  tab === 'overview'
                    ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                    : 'text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
                }`}
              >
                <Home size={14} /> Umumiy
              </button>

              {resources.map((resource) => (
                <button
                  key={resource.key}
                  type="button"
                  onClick={() => setTab(resource.key)}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[0.83rem] font-medium transition-colors ${
                    tab === resource.key
                      ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                      : 'text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
                  }`}
                >
                  <FileText size={14} /> {resource.label}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setTab('upload')}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[0.83rem] font-medium transition-colors ${
                  tab === 'upload'
                    ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                    : 'text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
                }`}
              >
                <ImageIcon size={14} /> Rasm yuklash
              </button>

              <button
                type="button"
                onClick={() => setTab('settings')}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[0.83rem] font-medium transition-colors ${
                  tab === 'settings'
                    ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                    : 'text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
                }`}
              >
                <Settings size={14} /> Sozlamalar
              </button>
            </nav>

            <div className="mt-8 space-y-1 border-t border-[var(--border)] pt-6">
              <Link
                href="/uz"
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[0.83rem] font-medium text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                <ExternalLink size={14} /> Saytni ko‘rish
              </Link>
              <button
                type="button"
                onClick={() => void logout()}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[0.83rem] font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--danger)]"
              >
                <LogOut size={14} /> Chiqish
              </button>
            </div>
          </div>
        </aside>

        {/* Kontent */}
        <div className="min-w-0 flex-1">
          {/* Mobil menyu */}
          <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto lg:hidden">
            {['overview', ...resources.map((r) => r.key), 'upload', 'settings'].map((key) => {
              const label =
                key === 'overview'
                  ? 'Umumiy'
                  : key === 'upload'
                    ? 'Rasm'
                    : key === 'settings'
                      ? 'Sozlama'
                      : (resources.find((r) => r.key === key)?.label ?? key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[0.78rem] font-medium ${
                    tab === key
                      ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]'
                      : 'border-[var(--border)] text-[var(--text-muted)]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="card p-6 md:p-8">
            {tab === 'overview' && <Overview />}
            {tab === 'upload' && <UploadPanel />}
            {tab === 'settings' && <SettingsPanel />}
            {activeResource && <ResourceEditor key={activeResource.key} resource={activeResource} />}
          </div>
        </div>
      </div>
    </div>
  );
}
