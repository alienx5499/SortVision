import { ClientOnly } from './client';
import {
  getAlgorithmMetaTags,
  getHomepageMetaTags,
  getContributionsMetaTags,
  getSSOCMetaTags,
  algorithms,
} from '../../utils/seo';

// Generate metadata dynamically based on the route
export async function generateMetadata({ params, searchParams }) {
  // Await params as they are now a Promise in Next.js 16
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const slug = resolvedParams.slug || [];
  
  // Detect language from URL path - support multiple languages
  const supportedLanguages = ['en', 'es', 'hi', 'fr', 'de', 'zh', 'bn', 'ja', 'jp'];
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
  if (language === 'en' && resolvedSearchParams?.lang && supportedLanguages.includes(resolvedSearchParams.lang)) {
    language = resolvedSearchParams.lang;
  }

  // Generate hreflang alternatives for all supported languages
  // Note: Search engines expect 'ja' for Japanese. We map 'jp' -> 'ja' and dedupe.
  const generateHreflangAlternates = (basePath) => {
    const alternates = {};
    const add = (hreflangCode, langForPath) => {
      const path = hreflangCode === 'en' ? basePath : `/${langForPath}${basePath}`;
      if (!alternates[hreflangCode]) {
        alternates[hreflangCode] = `https://www.sortvision.com${path}`;
      }
    };

    supportedLanguages.forEach((lang) => {
      // Map invalid/alias codes to valid hreflang
      const hreflang = lang === 'jp' ? 'ja' : lang;
      const langForPath = hreflang === 'en' ? 'en' : hreflang; // ensure we link to /ja not /jp
      add(hreflang, langForPath);
    });

    // Add x-default pointing to English
    alternates['x-default'] = `https://www.sortvision.com${basePath}`;

    return alternates;
  };

  // Handle algorithm pages: /algorithms/{tab}/{algorithm}
  if (slug[0] === 'algorithms' && slug[2] && algorithms[slug[2]]) {
    const algorithm = slug[2];
    const tab = slug[1] || 'config';
    const metaTags = getAlgorithmMetaTags(algorithm, language);

    const basePath = `/algorithms/${tab}/${algorithm}`;
    const currentUrl = language === 'en' ? basePath : `/${language}${basePath}`;
    
    return {
      title: metaTags.title,
      description: metaTags.description,
      keywords: metaTags.keywords,
      authors: [{ name: 'alienX' }],
      robots:
        'index, follow, noarchive, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
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
        locale: language === 'es' ? 'es_ES' : language === 'hi' ? 'hi_IN' : language === 'fr' ? 'fr_FR' : language === 'de' ? 'de_DE' : language === 'zh' ? 'zh_CN' : 'en_US',
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
        canonical: `https://www.sortvision.com${currentUrl}`,
        languages: generateHreflangAlternates(basePath),
      },
      other: {
        // Add structured data as meta tag for Next.js
        'script:ld+json': JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: `${algorithms[algorithm].name} Algorithm Visualization and Tutorial`,
            description: metaTags.description,
            keywords: metaTags.keywords,
            author: {
              '@type': 'Person',
              name: 'alienX',
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
          },
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
        ]),
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

    const basePath = contributorId
      ? `/contributions/${section}/${contributorId}`
      : `/contributions/${section}`;
    const currentUrl = language === 'en' ? basePath : `/${language}${basePath}`;
    
    return {
      title: metaTags.title,
      description: metaTags.description,
      keywords: metaTags.keywords,
      authors: [{ name: 'alienX' }],
      robots:
        'index, follow, noarchive, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
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
        locale: language === 'es' ? 'es_ES' : language === 'hi' ? 'hi_IN' : language === 'fr' ? 'fr_FR' : language === 'de' ? 'de_DE' : language === 'zh' ? 'zh_CN' : 'en_US',
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
        canonical: `https://www.sortvision.com${currentUrl}`,
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
  const currentUrl = language === 'en' ? basePath : `/${language}${basePath}`;
  
  return {
    title: metaTags.title,
    description: metaTags.description,
    keywords: metaTags.keywords,
    authors: [{ name: 'alienX' }],
    robots:
      'index, follow, noarchive, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
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
      locale: language === 'es' ? 'es_ES' : language === 'hi' ? 'hi_IN' : language === 'fr' ? 'fr_FR' : language === 'de' ? 'de_DE' : language === 'zh' ? 'zh_CN' : 'en_US',
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
      canonical: `https://www.sortvision.com${currentUrl}`,
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
          applicationSubCategory: 'Algorithm Visualization',
          operatingSystem: 'Any',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          description: metaTags.description,
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
            'Interactive Bubble Sort Visualization',
            'Interactive Insertion Sort Visualization',
            'Interactive Selection Sort Visualization',
            'Interactive Merge Sort Visualization',
            'Interactive Quick Sort Visualization',
            'Interactive Heap Sort Visualization',
            'Interactive Radix Sort Visualization',
            'Real-time Performance Metrics',
            'Algorithm Comparison Tools',
            'Educational Content',
            'Step-by-step Animation',
            'Algorithm Complexity Analysis',
          ],
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
                    name: 'alienX',
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
  const supportedLanguages = ['en', 'es', 'hi', 'fr', 'de', 'zh', 'bn', 'ja', 'jp'];

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
      params.push({ slug: [...prefix, 'contributions', 'overview', contributor] });
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

export default function Page({ params }) {
  return <ClientOnly />;
}
