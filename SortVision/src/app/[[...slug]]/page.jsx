import { ClientOnly } from './client';
import { generateAppStaticParams } from './staticParams';
import { resolveLanguageAndSlug } from './metadata/helpers';
import { buildAlgorithmMetadata } from './metadata/builders/algorithm';
import { buildContributionsMetadata } from './metadata/builders/contributions';
import { buildHomepageMetadata } from './metadata/builders/home';

// Generate metadata dynamically based on the route
export async function generateMetadata({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { language, slug } = resolveLanguageAndSlug(
    resolvedParams.slug || [],
    resolvedSearchParams
  );

  const algorithmMetadata = buildAlgorithmMetadata({ slug, language });
  if (algorithmMetadata) return algorithmMetadata;

  const contributionsMetadata = buildContributionsMetadata({ slug, language });
  if (contributionsMetadata) return contributionsMetadata;

  return buildHomepageMetadata(language);
}

// Generate static params for known routes (optional for better performance)
export async function generateStaticParams() {
  return generateAppStaticParams();
}

export default function Page({ params: _params }) {
  return <ClientOnly />;
}
