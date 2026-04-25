import {
  getHomepageMetaTags,
  algorithms,
  getAlgorithmCatalogSchema,
  getGeoSummary,
  getLearningOutcomes,
} from '../../../../utils/seo';
import { BASE_URL, OG_LOCALE_MAP } from '../constants';
import {
  ensureMinimumDescriptionLength,
  generateHreflangAlternates,
} from '../helpers';

export const buildHomepageMetadata = language => {
  const metaTags = getHomepageMetaTags(language);
  const basePath = '/';
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
      url: `${BASE_URL}${currentUrl}`,
      title: metaTags.ogTitle,
      description: metaTags.ogDescription,
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
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
      images: [`${BASE_URL}/og-image.png`],
      creator: '@alienx5499',
      site: '@alienx5499',
    },
    alternates: {
      canonical: `${BASE_URL}${currentUrl}`,
      languages: generateHreflangAlternates(basePath),
    },
    other: {
      'meta-description': metaTags.description,
      'script:ld+json': JSON.stringify([
        {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'SortVision',
          url: BASE_URL,
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
          screenshot: `${BASE_URL}/og-image.png`,
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
        getAlgorithmCatalogSchema(),
        {
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          name: 'SortVision',
          url: BASE_URL,
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
                url: `${BASE_URL}/algorithms/config/${key}`,
                provider: {
                  '@type': 'Organization',
                  name: 'SortVision',
                  url: BASE_URL,
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
};
