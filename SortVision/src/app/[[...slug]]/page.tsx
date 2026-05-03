import type { Metadata } from 'next';
import { ClientOnly } from './client';
import { generateAppStaticParams } from './staticParams';
import {
  resolveLanguageAndSlug,
  type MetadataSearchParams,
} from './metadata/helpers';
import { buildAlgorithmMetadata } from './metadata/builders/algorithm';
import { buildContributionsMetadata } from './metadata/builders/contributions';
import { buildHomepageMetadata } from './metadata/builders/home';

type CatchAllPageProps = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<MetadataSearchParams>;
};

export async function generateMetadata({
  params,
  searchParams,
}: CatchAllPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { language, slug } = resolveLanguageAndSlug(
    resolvedParams?.slug,
    resolvedSearchParams
  );

  const algorithmMetadata = buildAlgorithmMetadata({ slug, language });
  if (algorithmMetadata) return algorithmMetadata;

  const contributionsMetadata = buildContributionsMetadata({ slug, language });
  if (contributionsMetadata) return contributionsMetadata;

  return buildHomepageMetadata(language);
}

export async function generateStaticParams() {
  return generateAppStaticParams();
}

export default function Page() {
  return <ClientOnly />;
}
