import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getAdminClient, STORAGE_BUCKET } from '@/lib/supabase';

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif'];

/** Rasm yuklash — Supabase Storage'ga */
export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const client = getAdminClient();
  if (!client) {
    return NextResponse.json(
      { error: 'supabase_not_configured', message: 'Rasm yuklash uchun Supabase kerak.' },
      { status: 503 },
    );
  }

  // multipart/form-data bo'lmasa formData() xato beradi — ushlab qolamiz
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: 'invalid_form_data', message: 'Fayl multipart/form-data ko‘rinishida yuborilishi kerak.' },
      { status: 400 },
    );
  }

  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'file_required' }, { status: 422 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'file_too_large', maxSize: '5MB' }, { status: 413 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: 'unsupported_type', allowed: ALLOWED }, { status: 415 });
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'png';
  const safeName = file.name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .slice(0, 50);
  const path = `${Date.now()}-${safeName}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await client.storage.from(STORAGE_BUCKET).upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const { data } = client.storage.from(STORAGE_BUCKET).getPublicUrl(path);

  return NextResponse.json({ ok: true, path, url: data.publicUrl });
}

export const dynamic = 'force-dynamic';
