import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getAdminClient, isSupabaseConfigured } from '@/lib/supabase';
import { rowsToApp, toSnake } from '@/lib/case';

/** Ruxsat etilgan jadvallar — ixtiyoriy jadval nomini bloklaydi */
const TABLES = [
  'projects',
  'posts',
  'services',
  'faqs',
  'testimonials',
  'guestbook',
  'messages',
  'site_settings',
  'changelog',
  'uses',
] as const;

type TableName = (typeof TABLES)[number];

function resolveTable(value: string): TableName | null {
  return (TABLES as readonly string[]).includes(value) ? (value as TableName) : null;
}

async function guard(table: string) {
  if (!(await isAuthenticated())) {
    return { error: NextResponse.json({ error: 'unauthorized' }, { status: 401 }) };
  }
  const name = resolveTable(table);
  if (!name) {
    return { error: NextResponse.json({ error: 'unknown_table' }, { status: 404 }) };
  }
  const client = getAdminClient();
  if (!client) {
    return {
      error: NextResponse.json(
        {
          error: 'supabase_not_configured',
          message:
            'Supabase sozlanmagan. .env faylida NEXT_PUBLIC_SUPABASE_URL va SUPABASE_SERVICE_ROLE_KEY ni to‘ldiring.',
        },
        { status: 503 },
      ),
    };
  }
  return { client, name };
}

/** Ro'yxatni olish */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ table: string }> },
) {
  const { table } = await params;
  const result = await guard(table);
  if (result.error) return result.error;

  const { data, error } = await result.client
    .from(result.name)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data: rowsToApp(data ?? []) });
}

/** Yangi yozuv qo'shish */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ table: string }> },
) {
  const { table } = await params;
  const result = await guard(table);
  if (result.error) return result.error;

  const body = await request.json();
  const { data, error } = await result.client
    .from(result.name)
    .insert(toSnake(body))
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data: rowsToApp([data])[0] });
}

/** Yozuvni yangilash */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ table: string }> },
) {
  const { table } = await params;
  const result = await guard(table);
  if (result.error) return result.error;

  const body = (await request.json()) as { id?: string | number } & Record<string, unknown>;
  const { id, ...changes } = body;
  if (id === undefined) {
    return NextResponse.json({ error: 'id_required' }, { status: 422 });
  }

  const { data, error } = await result.client
    .from(result.name)
    .update(toSnake(changes))
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data: rowsToApp([data])[0] });
}

/** Yozuvni o'chirish */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ table: string }> },
) {
  const { table } = await params;
  const result = await guard(table);
  if (result.error) return result.error;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id_required' }, { status: 422 });

  const { error } = await result.client.from(result.name).delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export const dynamic = 'force-dynamic';

/** Supabase sozlangan-sozlanmaganini bilish uchun yordamchi */
export async function OPTIONS() {
  return NextResponse.json({ configured: isSupabaseConfigured });
}
