/**
 * SEO schema and learning-context helpers.
 */

import { algorithms } from './constants';

/**
 * Generate schema markup for algorithm pages
 * @param {string} algorithmName - The algorithm identifier
 * @param {string} path - Current URL path
 * @returns {Object} - Schema.org JSON-LD markup
 */
export const getAlgorithmSchema = (algorithmName, path) => {
  const algorithm = algorithms[algorithmName];
  if (!algorithm) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${algorithm.name} Algorithm Visualization and Tutorial`,
    description: algorithm.seo_description,
    keywords: algorithm.keywords,
    author: {
      '@type': 'Person',
      name: 'Prabal Patra',
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
    dateModified: '2024-03-26',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.sortvision.com${path}`,
    },
    about: {
      '@type': 'Thing',
      name: algorithm.name,
      description: algorithm.description,
    },
    educationalUse: 'Interactive Visualization',
    timeRequired: 'PT10M',
  };
};

/**
 * Generate SEO-friendly URLs for all supported algorithms
 * @returns {Array} - Array of URL objects for sitemap
 */
export const getAllAlgorithmUrls = () => {
  return Object.keys(algorithms).map(key => ({
    url: `/algorithms/${key}`,
    title: algorithms[key].name,
    description: algorithms[key].seo_description,
    lastModified: new Date().toISOString().split('T')[0],
  }));
};

/**
 * GEO: Generate enhanced HowTo schema for algorithm learning
 * @param {string} algorithmName - The algorithm identifier
 * @returns {Object} - HowTo schema markup
 */
export const getAlgorithmHowToSchema = algorithmName => {
  const algorithm = algorithms[algorithmName];
  if (!algorithm) return null;

  const algName = algorithm.name;
  const baseUrl = 'https://www.sortvision.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `Learn ${algName} with Interactive Visualization on SortVision`,
    description: `Step-by-step guide to understanding ${algName} through SortVision's interactive visualizer`,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Access SortVision',
        text: `Visit ${baseUrl}/algorithms/config/${algorithmName} to access the ${algName} visualizer`,
        url: `${baseUrl}/algorithms/config/${algorithmName}`,
      },
      {
        '@type': 'HowToStep',
        name: 'Configure Parameters',
        text: `Adjust array size and animation speed controls to customize your learning experience`,
      },
      {
        '@type': 'HowToStep',
        name: 'Watch Interactive Animation',
        text: `Click Start to see ${algName} work in real-time with animated visualizations showing each comparison and swap`,
      },
      {
        '@type': 'HowToStep',
        name: 'Analyze Performance',
        text: `Observe performance metrics including comparisons, swaps, and time complexity to understand ${algName}'s efficiency`,
      },
      {
        '@type': 'HowToStep',
        name: 'Review Code Implementation',
        text: `Explore code examples in 20+ programming languages to understand ${algName}'s implementation`,
      },
    ],
    totalTime: 'PT10M',
    educationalLevel: 'beginner, intermediate',
  };
};

/**
 * GEO: Generate ItemList schema for algorithm catalog
 * @returns {Object} - ItemList schema markup
 */
export const getAlgorithmCatalogSchema = () => {
  const baseUrl = 'https://www.sortvision.com';
  const algorithmKeys = Object.keys(algorithms);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Sorting Algorithms Available on SortVision',
    description:
      'Complete list of interactive sorting algorithm visualizations available on SortVision',
    itemListElement: algorithmKeys.map((key, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: algorithms[key].name,
      url: `${baseUrl}/algorithms/config/${key}`,
      description: `Interactive ${algorithms[key].name} visualization with real-time animations and performance metrics`,
    })),
  };
};

/**
 * GEO: Generate learning outcomes schema
 * @returns {Array<string>} - Array of learning outcomes
 */
export const getLearningOutcomes = () => {
  return [
    'Understanding sorting algorithm mechanics and step-by-step execution',
    'Time complexity analysis and Big O notation comprehension',
    'Algorithm comparison skills and performance trade-off evaluation',
    'Coding interview preparation with visual algorithm learning',
    'DSA fundamentals including data structures and algorithmic thinking',
    'Interactive learning through real-time visualizations',
    'Code implementation patterns across multiple programming languages',
  ];
};

/**
 * GEO: Generate comparison context description
 * @param {Array<string>} algorithmNames - Array of algorithm identifiers to compare
 * @returns {string} - Natural language comparison description
 */
export const getComparisonContext = algorithmNames => {
  if (!Array.isArray(algorithmNames) || algorithmNames.length === 0) {
    return 'SortVision allows you to compare multiple sorting algorithms side-by-side with the same input data, showing their performance differences through real-time visualizations.';
  }

  const algorithmNamesList = algorithmNames
    .map(name => algorithms[name]?.name)
    .filter(Boolean)
    .join(' vs ');

  return `SortVision lets you compare ${algorithmNamesList} simultaneously. You can visualize how these algorithms perform on the same data, comparing their execution time, number of comparisons, swaps, and visual behavior to understand their trade-offs and performance characteristics.`;
};
