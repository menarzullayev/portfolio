'use client';

import { useEffect } from 'react';
import type { Locale } from '@/lib/types';

/** HTML til atributini joriy tilga moslaydi (SEO va ekran o'quvchilar uchun) */
export function LangSetter({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
