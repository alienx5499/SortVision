import {
  getAlgorithmMetaTags,
  algorithms,
  getAlgorithmHowToSchema,
  getGeoSummary,
  getLearningOutcomes,
} from '../../../../utils/seo';
import { BASE_URL, OG_LOCALE_MAP } from '../constants';
import {
  ensureMinimumDescriptionLength,
  generateHreflangAlternates,
} from '../helpers';

export const buildAlgorithmMetadata = ({ slug, language }) => {
  if (!(slug[0] === 'algorithms' && slug[2] && algorithms[slug[2]])) {
    return null;
  }

  const algorithm = slug[2];
  const tab = slug[1] || 'config';
  const metaTags = getAlgorithmMetaTags(algorithm, language);
  const tabTitleMap = {
    config: 'Configuration',
    details: 'Step-by-step Details',
    metrics: 'Performance Metrics',
  };
  const tabTitleSuffix = tabTitleMap[tab] || 'Algorithm View';
  const tabDescriptionMap = {
    config:
      'Configure inputs, speed, and array size to explore algorithm behavior interactively.',
    details:
      'Follow each comparison and swap with step-by-step algorithm execution insights.',
    metrics:
      'Analyze time complexity, operation counts, and runtime performance characteristics.',
  };
  const tabDescriptionSuffix =
    tabDescriptionMap[tab] ||
    'Explore this algorithm view with interactive educational controls.';

  const basePath = `/algorithms/${tab}/${algorithm}`;
  const currentUrl = language === 'en' ? basePath : `/${language}${basePath}`;

  const canonicalBasePath = `/algorithms/config/${algorithm}`;
  const canonicalUrl =
    language === 'en' ? canonicalBasePath : `/${language}${canonicalBasePath}`;

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
      locale: OG_LOCALE_MAP[language] || 'en_US',
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
            description: getGeoSummary('algorithm', algorithm),
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
          getAlgorithmHowToSchema(algorithm),
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
