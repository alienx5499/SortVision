import {
  getAlgorithmMetaTags,
  algorithms,
  getAlgorithmHowToSchema,
  getGeoSummary,
  getLearningOutcomes,
} from '../../../../utils/seo';
import { BASE_URL, DEFAULT_LANGUAGE, OG_LOCALE_MAP } from '../constants';
import {
  ensureMinimumDescriptionLength,
  generateHreflangAlternates,
} from '../helpers';
import type { SeoPageMetaBundle } from '@/types/seoMetaTags';

type BuildAlgorithmMetadataArgs = {
  slug: string[];
  language: string;
};

export const buildAlgorithmMetadata = ({
  slug,
  language,
}: BuildAlgorithmMetadataArgs) => {
  const rawId = slug[2];
  if (!(slug[0] === 'algorithms' && rawId)) {
    return null;
  }
  if (!Object.prototype.hasOwnProperty.call(algorithms, rawId)) {
    return null;
  }
  const algorithm = rawId as keyof typeof algorithms;
  const tab = slug[1] || 'config';
  const metaTags = getAlgorithmMetaTags(
    String(algorithm),
    language
  ) as SeoPageMetaBundle;
  const tabTitleMap = {
    config: 'Configuration',
    details: 'Step-by-step Details',
    metrics: 'Performance Metrics',
  } as const;
  const tabTitleSuffix =
    tabTitleMap[tab as keyof typeof tabTitleMap] || 'Algorithm View';
  const tabDescriptionMap = {
    config:
      'Configure inputs, speed, and array size to explore algorithm behavior interactively.',
    details:
      'Follow each comparison and swap with step-by-step algorithm execution insights.',
    metrics:
      'Analyze time complexity, operation counts, and runtime performance characteristics.',
  } as const;
  const tabDescriptionSuffix =
    tabDescriptionMap[tab as keyof typeof tabDescriptionMap] ||
    'Explore this algorithm view with interactive educational controls.';

  const basePath = `/algorithms/${tab}/${algorithm}`;
  const currentUrl =
    language === DEFAULT_LANGUAGE ? basePath : `/${language}${basePath}`;

  const canonicalBasePath = `/algorithms/config/${algorithm}`;
  const canonicalUrl =
    language === DEFAULT_LANGUAGE
      ? canonicalBasePath
      : `/${language}${canonicalBasePath}`;

  return {
    title: `${metaTags.title} | ${tabTitleSuffix}`,
    description: ensureMinimumDescriptionLength(
      `${metaTags.description} ${tabDescriptionSuffix}`,
      language,
      `${algorithm} algorithm`
    ),
    keywords: metaTags.keywords,
    authors: [{ name: 'Prabal Patra' }],
    robots:
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    openGraph: {
      type: 'website',
      url: `${BASE_URL}${currentUrl}`,
      title: metaTags.ogTitle,
      description: metaTags.ogDescription,
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${algorithms[algorithm].name} Algorithm Visualization - SortVision`,
        },
      ],
      siteName: 'SortVision',
      locale: OG_LOCALE_MAP[language as keyof typeof OG_LOCALE_MAP] || 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTags.twitterTitle,
      description: metaTags.twitterDescription,
      images: [`${BASE_URL}/og-image.png`],
      creator: '@alienx5499',
      site: '@alienx5499',
    },
    alternates: {
      canonical: `${BASE_URL}${canonicalUrl}`,
      languages: generateHreflangAlternates(canonicalBasePath),
    },
    other: {
      'script:ld+json': JSON.stringify(
        [
          {
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: `${algorithms[algorithm].name} Algorithm Visualization and Tutorial`,
            description: getGeoSummary('algorithm', String(algorithm)),
            keywords: metaTags.keywords,
            author: {
              '@type': 'Person',
              name: 'Prabal Patra',
              url: 'https://github.com/alienx5499',
            },
            publisher: {
              '@type': 'Organization',
              name: 'SortVision',
              logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/favicon.svg`,
              },
            },
            datePublished: '2024-03-26',
            dateModified: '2025-10-22',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${BASE_URL}/algorithms/${tab}/${algorithm}`,
            },
            about: {
              '@type': 'Thing',
              name: algorithms[algorithm].name,
              description: algorithms[algorithm].description,
            },
            educationalUse: 'Interactive Visualization',
            timeRequired: 'PT10M',
            learningOutcomes: getLearningOutcomes(),
          },
          getAlgorithmHowToSchema(String(algorithm)),
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${BASE_URL}/`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: algorithms[algorithm].name,
                item: `${BASE_URL}/algorithms/${tab}/${algorithm}`,
              },
            ],
          },
        ].filter(Boolean)
      ),
    },
  };
};
