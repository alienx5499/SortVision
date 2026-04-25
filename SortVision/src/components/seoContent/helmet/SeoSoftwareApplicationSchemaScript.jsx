import React from 'react';
import {
  APP_VERSION,
  PUBLISHED_DATE,
  SITE_NAME,
} from '../../../constants/version';
/**
 * File purpose: Renders SoftwareApplication JSON-LD for SortVision.
 */

export const SeoSoftwareApplicationSchemaScript = ({
  baseUrl,
  getGeoSummary,
  getLearningOutcomes,
}) => (
  <>
    <script type="application/ld+json">
      {JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: SITE_NAME,
        url: baseUrl,
        description: getGeoSummary('homepage'),
        applicationCategory: 'EducationalApplication',
        applicationSubCategory: 'Interactive Algorithm Visualization Tool',
        interactivityType: 'active',
        operatingSystem: 'Any',
        browserRequirements:
          'Requires JavaScript. Supports Chrome, Firefox, Safari, Edge.',
        softwareVersion: APP_VERSION,
        datePublished: PUBLISHED_DATE,
        dateModified: new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: baseUrl,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '1247',
          bestRating: '5',
          worstRating: '1',
        },
        screenshot: {
          '@type': 'ImageObject',
          url: `${baseUrl}/screenshot.png`,
          caption: 'SortVision sorting algorithm visualizer interface',
        },
        license: 'https://opensource.org/licenses/MIT',
        downloadUrl: baseUrl,
        installUrl: baseUrl,
        featureList: [
          'Interactive sorting algorithm visualization',
          'Real-time algorithm animations',
          '8 major sorting algorithms supported',
          'Interactive step-by-step visualization',
          'Real-time performance metrics',
          'Performance comparison tools',
          'Educational content and explanations',
          'Code implementations in 20+ languages',
          'Mobile-responsive design',
          'Free and open-source',
        ],
        usesDataSource: ['Sorting Algorithms', 'Performance Metrics'],
        learningOutcomes: getLearningOutcomes(),
        // GEO: Explicit educational context
        educationalUse: 'instruction',
        learningResourceType: 'interactive simulation',
        educationalLevel: ['beginner', 'intermediate', 'advanced'],
        teaches: [
          'Sorting Algorithms',
          'Data Structures',
          'Algorithm Complexity Analysis',
          'Computer Science Fundamentals',
          'Coding Interview Preparation',
        ],
      })}
    </script>
  </>
);
