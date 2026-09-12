import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, tr } from '@/lib/i18n';
import { getProjects } from '@/lib/data';
import { Projects } from '@/components/sections/Projects';
import { PageHeader } from '@/components/layout/PageHeader';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : 'uz';
  return {
    title: tr('projects.title', lang),
    description: tr('projects.subtitle', lang),
    alternates: { canonical: `/${lang}/projects` },
  };
}

export default async function ProjectsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        eyebrow="Work"
        title={tr('projects.title', locale)}
        subtitle={tr('projects.subtitle', locale)}
      />
      <Projects projects={projects} locale={locale} heading={false} />
    </>
  );
}
