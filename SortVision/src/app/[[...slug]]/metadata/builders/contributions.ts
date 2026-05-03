import {
  getContributionsMetaTags,
  getSSOCMetaTags,
} from '../../../../utils/seo';
import { BASE_URL, DEFAULT_LANGUAGE, OG_LOCALE_MAP } from '../constants';
import {
  ensureMinimumDescriptionLength,
  generateHreflangAlternates,
} from '../helpers';
import type { SeoPageMetaBundle } from '@/types/seoMetaTags';

type BuildContributionsMetadataArgs = {
  slug: string[];
  language: string;
};

export const buildContributionsMetadata = ({
  slug,
  language,
}: BuildContributionsMetadataArgs) => {
  if (slug[0] !== 'contributions') {
    return null;
  }

  const section = slug[1] || 'overview';
  const contributorId = slug[2];
  let metaTags: SeoPageMetaBundle;

  if (section === 'ssoc') {
    metaTags = getSSOCMetaTags() as SeoPageMetaBundle;
  } else if (section === 'overview' && contributorId) {
    metaTags = {
      title: `${contributorId} - Contributor Profile | SortVision`,
      description: `View ${contributorId}'s contributions to SortVision. See their pull requests, issues, commits, and impact on our open-source sorting algorithm visualizer.`,
      keywords: `${contributorId}, contributor, open source, SortVision, GitHub profile, contributions, pull requests, commits`,
      ogTitle: `${contributorId} - SortVision Contributor`,
      ogDescription: `Explore ${contributorId}'s contributions to the SortVision project and their impact on algorithm education.`,
      twitterTitle: `${contributorId} - SortVision Contributor`,
      twitterDescription: `Check out ${contributorId}'s contributions to SortVision algorithm visualizer project.`,
    };
  } else {
    metaTags = getContributionsMetaTags(language) as SeoPageMetaBundle;
  }

  const sectionTitleMap = {
    overview: 'Overview',
    guide: 'Guide',
    ssoc: 'Leaderboard',
  } as const;
  const sectionTitleSuffix =
    sectionTitleMap[section as keyof typeof sectionTitleMap] || 'Contributions';
  const languageTitleSuffix =
    language === DEFAULT_LANGUAGE ? '' : ` (${language.toUpperCase()})`;
  const sectionDescriptionMap = {
    overview:
      'Browse contributor profiles, pull requests, issues, and overall community impact.',
    guide:
      'Learn contribution workflow, setup steps, standards, and PR process for SortVision.',
    ssoc: 'Track SSOC leaderboard standings, points, and contributor activity across the program.',
  } as const;
  const sectionDescriptionSuffix =
    sectionDescriptionMap[section as keyof typeof sectionDescriptionMap] ||
    'Explore this contribution section for project and community insights.';
  const languageDescriptionSuffix =
    language === DEFAULT_LANGUAGE
      ? ''
      : ` Localized for ${language.toUpperCase()} users.`;

  const basePath = contributorId
    ? `/contributions/${section}/${contributorId}`
    : `/contributions/${section}`;
  const currentUrl =
    language === DEFAULT_LANGUAGE ? basePath : `/${language}${basePath}`;

  return {
    title: `${metaTags.title} | ${sectionTitleSuffix}${languageTitleSuffix}`,
    description: ensureMinimumDescriptionLength(
      `${metaTags.description} ${sectionDescriptionSuffix}${languageDescriptionSuffix}`,
      language,
      `${section} contributions`
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
          alt: 'SortVision - Open Source Algorithm Visualizer',
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
      canonical: `${BASE_URL}${currentUrl}`,
      languages: generateHreflangAlternates(basePath),
    },
    other: {
      'script:ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: metaTags.title,
        description: metaTags.description,
        url: contributorId
          ? `${BASE_URL}/contributions/${section}/${contributorId}`
          : `${BASE_URL}/contributions/${section}`,
        author: {
          '@type': 'Person',
          name: 'alienX',
        },
        publisher: {
          '@type': 'Organization',
          name: 'SortVision',
        },
        dateModified: '2025-10-22',
      }),
    },
  };
};
