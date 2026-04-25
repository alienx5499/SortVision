import { ClientOnly } from './client';
import {
  getAlgorithmMetaTags,
  getHomepageMetaTags,
  getContributionsMetaTags,
  getSSOCMetaTags,
  algorithms,
  getAlgorithmHowToSchema,
  getAlgorithmCatalogSchema,
  getGeoSummary,
  getLearningOutcomes,
} from '../../utils/seo';

const OG_LOCALE_MAP = {
  en: 'en_US',
  es: 'es_ES',
  hi: 'hi_IN',
  fr: 'fr_FR',
  de: 'de_DE',
  zh: 'zh_CN',
  bn: 'bn_BD',
  ja: 'ja_JP',
};

const HREFLANG_REGION_ALIASES = {
  en: ['en-US', 'en-GB', 'en-IN'],
  es: ['es-ES', 'es-MX', 'es-AR'],
  hi: ['hi-IN'],
  fr: ['fr-FR', 'fr-CA'],
  de: ['de-DE', 'de-AT'],
  zh: ['zh-CN', 'zh-TW', 'zh-HK'],
  bn: ['bn-BD', 'bn-IN'],
  ja: ['ja-JP'],
};

const ensureMinimumDescriptionLength = (
  description,
  language,
  contextLabel = 'page'
) => {
  if (!description) return description;
  const MIN_LENGTH = 150;
  const MAX_LENGTH = 165;
  if (description.length >= MIN_LENGTH) {
    return description.length > MAX_LENGTH
      ? `${description.slice(0, MAX_LENGTH - 1).trimEnd()}…`
      : description;
  }

  const EXPANSION_BY_LANGUAGE = {
    en:
      contextLabel === 'homepage'
        ? ' Explore sorting animations, compare runtime behavior, and strengthen DSA interview preparation.'
        : ` Explore this ${contextLabel} with interactive visuals and interview-focused DSA guidance.`,
    es:
      contextLabel === 'homepage'
        ? ' Explora animaciones de ordenamiento, compara rendimiento y fortalece tu preparación para entrevistas DSA.'
        : ' Explora esta página con visualización interactiva y guía práctica para entrevistas DSA.',
    hi:
      contextLabel === 'homepage'
        ? ' सॉर्टिंग एनीमेशन देखें, प्रदर्शन की तुलना करें और DSA इंटरव्यू तैयारी मजबूत करें।'
        : ' इस पेज को इंटरएक्टिव विजुअल्स और इंटरव्यू-केंद्रित DSA मार्गदर्शन के साथ समझें।',
    fr:
      contextLabel === 'homepage'
        ? ' Explorez les animations de tri, comparez les performances et renforcez votre préparation DSA.'
        : ' Explorez cette page avec des visuels interactifs et des conseils DSA orientés entretien.',
    de:
      contextLabel === 'homepage'
        ? ' Entdecke Sortieranimationen, vergleiche Laufzeiten und verbessere deine DSA-Interviewvorbereitung.'
        : ' Entdecke diese Seite mit interaktiven Visualisierungen und DSA-Interviewhilfe.',
    zh:
      contextLabel === 'homepage'
        ? ' 通过交互式排序动画对比性能表现，系统提升你的 DSA 面试准备效率。'
        : ' 通过交互式可视化学习本页面内容，并获得面试导向的 DSA 学习指引。',
    bn:
      contextLabel === 'homepage'
        ? ' ইন্টারঅ্যাকটিভ সোর্টিং অ্যানিমেশন দেখে পারফরম্যান্স তুলনা করুন এবং DSA ইন্টারভিউ প্রস্তুতি বাড়ান।'
        : ' ইন্টারঅ্যাকটিভ ভিজুয়াল ও ইন্টারভিউ-কেন্দ্রিক DSA গাইডসহ এই পেজটি অন্বেষণ করুন।',
    ja:
      contextLabel === 'homepage'
        ? ' ソートのアニメーションで挙動と性能を比較し、DSA面接対策を効果的に進められます。'
        : ' このページをインタラクティブ表示で学び、面接向けDSA理解を深められます。',
  };

  const expansion = EXPANSION_BY_LANGUAGE[language] || EXPANSION_BY_LANGUAGE.en;
  const needed = MIN_LENGTH - description.length;
  const safeAppend = expansion.slice(0, Math.max(needed + 8, 0));
  const merged = `${description}${safeAppend}`.trim();

  return merged.length > MAX_LENGTH
    ? `${merged.slice(0, MAX_LENGTH - 1).trimEnd()}…`
    : merged;
};

// Generate metadata dynamically based on the route
export async function generateMetadata({ params, searchParams }) {
  // Await params as they are now a Promise in Next.js 16
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const slug = resolvedParams.slug || [];

  // Detect language from URL path - support multiple languages
  const supportedLanguages = ['en', 'es', 'hi', 'fr', 'de', 'zh', 'bn', 'ja'];
  // Language names for reference (currently unused but kept for future use)
  // const languageNames = {
  //   en: 'English',
  //   es: 'Español',
  //   hi: 'हिन्दी',
  //   fr: 'Français',
  //   de: 'Deutsch',
  //   zh: '中文'
  // };

  // Check if first segment is a language code
  let language = 'en';
  if (slug.length > 0 && supportedLanguages.includes(slug[0])) {
    language = slug[0];
    // Remove language from slug for further processing
    slug.shift();
  }

  // Fallback to query parameter for backward compatibility
  if (
    language === 'en' &&
    resolvedSearchParams?.lang &&
    supportedLanguages.includes(resolvedSearchParams.lang)
  ) {
    language = resolvedSearchParams.lang;
  }

  // Generate hreflang alternatives for all supported languages
  // Note: Search engines expect 'ja' for Japanese. We map 'jp' -> 'ja' and dedupe.
  const generateHreflangAlternates = basePath => {
    const alternates = {};
    const seen = new Set();

    const add = (hreflangCode, langForPath) => {
      const path =
        hreflangCode === 'en' ? basePath : `/${langForPath}${basePath}`;
      const fullUrl = `https://www.sortvision.com${path}`;

      // Prevent duplicate hreflang codes
      if (!seen.has(hreflangCode)) {
        alternates[hreflangCode] = fullUrl;
        seen.add(hreflangCode);
      }
    };

    // Add English first (highest priority)
    add('en', 'en');

    // Add other languages
    supportedLanguages.forEach(lang => {
      if (lang === 'en') return; // Skip English, already added
      add(lang, lang);
    });

    // Add regional aliases that map to the same language URL.
    supportedLanguages.forEach(lang => {
      const aliases = HREFLANG_REGION_ALIASES[lang] || [];
      aliases.forEach(alias => add(alias, lang));
    });

    // Add x-default pointing to English (canonical)
    alternates['x-default'] = `https://www.sortvision.com${basePath}`;

    return alternates;
  };

  // Handle algorithm pages: /algorithms/{tab}/{algorithm}
  if (slug[0] === 'algorithms' && slug[2] && algorithms[slug[2]]) {
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

    // CRITICAL FIX: All algorithm pages should use config tab as canonical
    // This prevents duplicate content issues across tabs (config, details, metrics)
    // For non-English pages, use self-referencing canonical with language prefix
    const canonicalBasePath = `/algorithms/config/${algorithm}`;
    const canonicalUrl =
      language === 'en'
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
        url: `https://www.sortvision.com${currentUrl}`,
        title: metaTags.ogTitle,
        description: metaTags.ogDescription,
        images: [
          {
            url: 'https://www.sortvision.com/og-image.png',
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
        images: ['https://www.sortvision.com/og-image.png'],
        creator: '@alienx5499',
        site: '@alienx5499',
      },
      alternates: {
        canonical: `https://www.sortvision.com${canonicalUrl}`,
        languages: generateHreflangAlternates(canonicalBasePath),
      },
      other: {
        // Add structured data as meta tag for Next.js (GEO Enhanced)
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
                  url: 'https://www.sortvision.com/favicon.svg',
                },
              },
              datePublished: '2024-03-26',
              dateModified: '2025-10-22',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://www.sortvision.com/algorithms/${tab}/${algorithm}`,
              },
              about: {
                '@type': 'Thing',
                name: algorithms[algorithm].name,
                description: algorithms[algorithm].description,
              },
              educationalUse: 'Interactive Visualization',
              timeRequired: 'PT10M',
              // GEO: Learning outcomes
              learningOutcomes: getLearningOutcomes(),
            },
            // GEO: HowTo schema for learning path
            getAlgorithmHowToSchema(algorithm),
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.sortvision.com/',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: algorithms[algorithm].name,
                  item: `https://www.sortvision.com/algorithms/${tab}/${algorithm}`,
                },
              ],
            },
          ].filter(Boolean)
        ), // Filter out null HowTo schema if algorithm not found
      },
    };
  }

  // Handle contributions pages
  if (slug[0] === 'contributions') {
    const section = slug[1] || 'overview';
    const contributorId = slug[2]; // For /contributions/overview/{contributorId}
    let metaTags;

    if (section === 'ssoc') {
      metaTags = getSSOCMetaTags();
    } else if (section === 'overview' && contributorId) {
      // Custom metadata for contributor detail pages
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
      metaTags = getContributionsMetaTags(language);
    }
    const sectionTitleMap = {
      overview: 'Overview',
      guide: 'Guide',
      ssoc: 'Leaderboard',
    };
    const sectionTitleSuffix = sectionTitleMap[section] || 'Contributions';
    const languageTitleSuffix =
      language === 'en' ? '' : ` (${language.toUpperCase()})`;
    const sectionDescriptionMap = {
      overview:
        'Browse contributor profiles, pull requests, issues, and overall community impact.',
      guide:
        'Learn contribution workflow, setup steps, standards, and PR process for SortVision.',
      ssoc: 'Track SSOC leaderboard standings, points, and contributor activity across the program.',
    };
    const sectionDescriptionSuffix =
      sectionDescriptionMap[section] ||
      'Explore this contribution section for project and community insights.';
    const languageDescriptionSuffix =
      language === 'en'
        ? ''
        : ` Localized for ${language.toUpperCase()} users.`;

    const basePath = contributorId
      ? `/contributions/${section}/${contributorId}`
      : `/contributions/${section}`;
    const currentUrl = language === 'en' ? basePath : `/${language}${basePath}`;

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
        url: `https://www.sortvision.com${currentUrl}`,
        title: metaTags.ogTitle,
        description: metaTags.ogDescription,
        images: [
          {
            url: 'https://www.sortvision.com/og-image.png',
            width: 1200,
            height: 630,
            alt: 'SortVision - Open Source Algorithm Visualizer',
          },
        ],
        siteName: 'SortVision',
        locale: OG_LOCALE_MAP[language] || 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title: metaTags.twitterTitle,
        description: metaTags.twitterDescription,
        images: ['https://www.sortvision.com/og-image.png'],
        creator: '@alienx5499',
        site: '@alienx5499',
      },
      alternates: {
        canonical: `https://www.sortvision.com${currentUrl}`, // Self-referencing canonical for each language
        languages: generateHreflangAlternates(basePath),
      },
      other: {
        'script:ld+json': JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: metaTags.title,
          description: metaTags.description,
          url: contributorId
            ? `https://www.sortvision.com/contributions/${section}/${contributorId}`
            : `https://www.sortvision.com/contributions/${section}`,
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
  }

  // Default homepage metadata
  const metaTags = getHomepageMetaTags(language);
  const basePath = '/';
  // Fix: Language homepage URLs should not have trailing slash
  const currentUrl = language === 'en' ? basePath : `/${language}`;

  return {
    title: metaTags.title,
    description: ensureMinimumDescriptionLength(
      metaTags.description,
      language,
      'homepage'
    ),
    keywords: metaTags.keywords,
    authors: [{ name: 'Prabal Patra' }],
    robots:
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    openGraph: {
      type: 'website',
      url: `https://www.sortvision.com${currentUrl}`,
      title: metaTags.ogTitle,
      description: metaTags.ogDescription,
      images: [
        {
          url: 'https://www.sortvision.com/og-image.png',
          width: 1200,
          height: 630,
          alt: 'SortVision - Interactive Sorting Algorithm Visualizer for DSA Learning',
        },
      ],
      siteName: 'SortVision',
      locale: OG_LOCALE_MAP[language] || 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTags.twitterTitle,
      description: metaTags.twitterDescription,
      images: ['https://www.sortvision.com/og-image.png'],
      creator: '@alienx5499',
      site: '@alienx5499',
    },
    alternates: {
      canonical: `https://www.sortvision.com${currentUrl}`, // Self-referencing canonical for each language
      languages: generateHreflangAlternates(basePath),
    },
    other: {
      'meta-description': metaTags.description,
      'script:ld+json': JSON.stringify([
        {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'SortVision',
          url: 'https://www.sortvision.com',
          applicationCategory: 'EducationalApplication',
          applicationSubCategory: 'Interactive Algorithm Visualization Tool',
          interactivityType: 'active',
          operatingSystem: 'Any',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          description: getGeoSummary('homepage'),
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '1247',
            bestRating: '5',
            worstRating: '1',
          },
          creator: {
            '@type': 'Person',
            name: 'alienX',
            url: 'https://github.com/alienx5499',
          },
          screenshot: 'https://www.sortvision.com/og-image.png',
          featureList: [
            'Interactive sorting algorithm visualization',
            'Real-time algorithm animations',
            'Interactive Bubble Sort Visualization',
            'Interactive Insertion Sort Visualization',
            'Interactive Selection Sort Visualization',
            'Interactive Merge Sort Visualization',
            'Interactive Quick Sort Visualization',
            'Interactive Heap Sort Visualization',
            'Interactive Radix Sort Visualization',
            'Interactive Bucket Sort Visualization',
            'Interactive step-by-step visualization',
            'Real-time Performance Metrics',
            'Algorithm Comparison Tools',
            'Educational Content',
            'Step-by-step Animation',
            'Algorithm Complexity Analysis',
            'Code implementations in 20+ languages',
          ],
          usesDataSource: ['Sorting Algorithms', 'Performance Metrics'],
          learningOutcomes: getLearningOutcomes(),
          keywords: metaTags.keywords,
          educationalUse: [
            'Computer Science Education',
            'Algorithm Learning',
            'Data Structures and Algorithms',
            'Programming Education',
            'Coding Interview Preparation',
          ],
          audience: {
            '@type': 'EducationalAudience',
            educationalRole: [
              'student',
              'teacher',
              'self-learner',
              'developer',
            ],
          },
          sameAs: [
            'https://github.com/alienx5499/SortVision',
            'https://x.com/alienx5499',
          ],
        },
        // GEO: Algorithm Catalog Schema
        getAlgorithmCatalogSchema(),
        {
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          name: 'SortVision',
          url: 'https://www.sortvision.com',
          description: metaTags.description,
          educationalCredentialAwarded: 'Algorithm Visualization Knowledge',
          hasOfferingCatalog: {
            '@type': 'OfferingCatalog',
            name: 'Sorting Algorithm Visualizations',
            itemListElement: Object.keys(algorithms)
              .slice(0, 3)
              .map(key => ({
                '@type': 'Course',
                name: `${algorithms[key].name} Visualization`,
                description: `Interactive learning of ${algorithms[key].name} algorithm`,
                url: `https://www.sortvision.com/algorithms/config/${key}`,
                provider: {
                  '@type': 'Organization',
                  name: 'SortVision',
                  url: 'https://www.sortvision.com',
                },
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                  availability: 'https://schema.org/InStock',
                  category: 'Educational Course',
                },
                hasCourseInstance: {
                  '@type': 'CourseInstance',
                  courseMode: 'Online',
                  courseWorkload: 'PT30M',
                  instructor: {
                    '@type': 'Person',
                    name: 'Prabal Patra',
                  },
                },
              })),
          },
        },
      ]),
    },
  };
}

// Generate static params for known routes (optional for better performance)
export async function generateStaticParams() {
  const params = [];
  const supportedLanguages = ['en', 'es', 'hi', 'fr', 'de', 'zh', 'bn', 'ja'];

  // Homepage - all languages
  params.push({ slug: [] }); // English homepage
  supportedLanguages.slice(1).forEach(lang => {
    params.push({ slug: [lang] });
  });

  // Base routes - all languages
  supportedLanguages.forEach(lang => {
    const prefix = lang === 'en' ? [] : [lang];
    params.push({ slug: [...prefix, 'algorithms'] });
    params.push({ slug: [...prefix, 'contributions'] });
  });

  // Generate params for algorithm pages - all languages
  const algorithmNames = Object.keys(algorithms);
  const tabs = ['config', 'details', 'metrics'];

  for (const algorithm of algorithmNames) {
    for (const lang of supportedLanguages) {
      const prefix = lang === 'en' ? [] : [lang];

      // Individual algorithm pages without tab
      params.push({ slug: [...prefix, 'algorithms', algorithm] });

      // Algorithm pages with tabs
      for (const tab of tabs) {
        params.push({ slug: [...prefix, 'algorithms', tab, algorithm] });
      }
    }
  }

  // Generate params for contribution pages - all languages
  const contributionSections = ['overview', 'guide', 'ssoc'];
  for (const section of contributionSections) {
    for (const lang of supportedLanguages) {
      const prefix = lang === 'en' ? [] : [lang];
      params.push({ slug: [...prefix, 'contributions', section] });
    }
  }

  // Add contributor detail pages - all languages
  const commonContributors = [
    'alienx5499',
    'dependabot[bot]',
    'github-actions[bot]',
  ];
  for (const contributor of commonContributors) {
    for (const lang of supportedLanguages) {
      const prefix = lang === 'en' ? [] : [lang];
      params.push({
        slug: [...prefix, 'contributions', 'overview', contributor],
      });
    }
  }

  // Add common system paths to prevent build errors (but NOT API routes)
  params.push({
    slug: ['.well-known', 'appspecific', 'com.chrome.devtools.json'],
  });
  params.push({ slug: ['favicon.ico'] });
  // Removed API routes - they should be handled by their own files, not the catch-all route

  return params;
}

export default function Page({ params: _params }) {
  return <ClientOnly />;
}
