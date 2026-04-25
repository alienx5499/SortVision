import React from 'react';
import { AUTHOR_NAME, SITE_NAME } from '../../../constants/version';
/**
 * File purpose: Renders course-style educational resource JSON-LD schema.
 */

export const SeoEducationalResourceSchemaScript = ({ baseUrl }) => (
  <>
    <script type="application/ld+json">
      {JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: `Interactive Sorting Algorithms Learning with ${SITE_NAME}`,
        url: baseUrl,
        description:
          'Comprehensive interactive course on sorting algorithms including merge sort, quick sort, heap sort, and more. Visual learning with animations and performance analysis.',
        provider: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: baseUrl,
        },
        educationalLevel: 'Beginner to Advanced',
        about: [
          'Sorting Algorithms',
          'Data Structures',
          'Algorithm Analysis',
          'Computer Science',
          'Programming',
        ],
        teaches: [
          'Merge Sort Implementation',
          'Quick Sort Algorithm',
          'Heap Sort Visualization',
          'Bubble Sort Analysis',
          'Algorithm Complexity',
          'DSA Concepts',
        ],
        courseMode: 'online',
        isAccessibleForFree: true,
        inLanguage: 'en',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          category: 'Educational Course',
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: 'PT2H',
          instructor: {
            '@type': 'Person',
            name: AUTHOR_NAME,
          },
          courseSchedule: {
            '@type': 'Schedule',
            startDate: '2024-01-01',
            repeatFrequency: 'P1D',
          },
        },
      })}
    </script>
  </>
);
