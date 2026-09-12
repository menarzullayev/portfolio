import type { Metadata } from 'next';
import { isAuthenticated } from '@/lib/auth';
import { AdminApp } from '@/components/admin/AdminApp';

export const metadata: Metadata = {
  title: 'Admin panel',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const authed = await isAuthenticated();
  return <AdminApp initialAuthed={authed} />;
}
