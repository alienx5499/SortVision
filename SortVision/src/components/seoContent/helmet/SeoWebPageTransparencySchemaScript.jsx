import React from 'react';
import {
  AUTHOR_GITHUB,
  AUTHOR_NAME,
  COPYRIGHT_YEAR,
  PUBLISHED_DATE,
  SITE_NAME,
} from '../../../constants/version';
/**
 * File purpose: Renders WebPage JSON-LD with content and learning transparency.
 */

export const SeoWebPageTransparencySchemaScript = ({
  algorithm,
  baseUrl,
  currentUrl,
  getGeoSummary,
  getLearningOutcomes,
}) => (
  <>
    <script type="application/ld+json">
      {JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `${SITE_NAME} - Algorithm Learning Platform`,
        description: algorithm
          ? getGeoSummary('algorithm', algorithm)
          : getGeoSummary('homepage'),
        url: currentUrl,
        inLanguage: ['en', 'es', 'hi', 'fr', 'de', 'zh', 'bn', 'ja'],
        isAccessibleForFree: true,
        educationalUse: 'instruction',
        audience: {
          '@type': 'EducationalAudience',
          audienceType: 'students, developers, educators',
          educationalRole: 'learner',
        },
        about: [
          {
            '@type': 'Thing',
            name: 'Sorting Algorithms',
            description: 'Methods to arrange data in specific order',
          },
          {
            '@type': 'Thing',
            name: 'Data Structures',
            description: 'Organizational formats for storing and managing data',
          },
          {
            '@type': 'Thing',
            name: 'Algorithm Complexity',
            description: 'Time and space efficiency analysis',
          },
          {
            '@type': 'Thing',
            name: 'Interactive Learning',
            description:
              'Real-time visualizations and step-by-step animations for algorithm understanding',
          },
        ],
        mentions: [
          'Bubble Sort',
          'Merge Sort',
          'Quick Sort',
          'Insertion Sort',
          'Selection Sort',
          'Heap Sort',
          'Radix Sort',
          'Bucket Sort',
          'DSA',
          'Coding Interviews',
          'Computer Science Education',
          'Algorithm Visualization',
          'Interactive Learning',
        ],
        // GenEI: Content source attribution
        author: {
          '@type': 'Person',
          name: AUTHOR_NAME,
          url: AUTHOR_GITHUB,
        },
        copyrightHolder: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: baseUrl,
        },
        copyrightYear: COPYRIGHT_YEAR,
        datePublished: PUBLISHED_DATE,
        dateModified: new Date().toISOString(),
        license: 'https://opensource.org/licenses/MIT',
        // GEO: Explicit content characteristics for AI understanding
        teaches:
          'Sorting algorithms, data structures, time complexity analysis, Big O notation, interactive algorithm learning',
        educationalLevel: 'beginner, intermediate, advanced',
        learningResourceType: 'interactive simulation',
        // GEO: Learning outcomes
        learningOutcomes: getLearningOutcomes(),
      })}
    </script>
  </>
);
