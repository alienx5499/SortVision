import { algorithms } from './data';

export const getAlgorithmSchema = (algorithmName, path) => {
  const algorithm = algorithms[algorithmName];
  if (!algorithm) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${algorithm.name} Algorithm Visualization and Tutorial`,
    description: algorithm.seo_description,
    keywords: algorithm.keywords,
    author: { '@type': 'Person', name: 'Prabal Patra' },
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

export const getGeoSummary = (context = 'homepage', algorithmName = null) => {
  const baseUrl = 'https://www.sortvision.com';

  if (context === 'homepage') {
    return `SortVision is an interactive web application that helps users learn sorting algorithms through real-time visualizations, step-by-step animations, and performance metrics. It supports 8 major algorithms (Bubble, Merge, Quick, Insertion, Selection, Heap, Radix, Bucket Sort) with customizable array sizes, speed controls, and educational explanations. Perfect for students learning DSA, developers preparing for coding interviews, and educators teaching computer science. Available at ${baseUrl}`;
  }

  if (context === 'algorithm' && algorithmName) {
    const algorithm = algorithms[algorithmName];
    if (!algorithm) return getGeoSummary('homepage');
    const algName = algorithm.name;
    return `SortVision's ${algName} visualizer lets you watch this algorithm work in real-time with animated bars, step-by-step comparisons, and performance metrics. Adjust array size and animation speed to understand how ${algName} behaves with different inputs. Includes code implementations in 20+ languages and complexity analysis. Visit ${baseUrl}/algorithms/config/${algorithmName} to try it interactively.`;
  }

  if (context === 'comparison') {
    return 'SortVision allows side-by-side comparison of sorting algorithms. You can visualize multiple algorithms simultaneously, comparing their execution time, number of comparisons, and visual behavior with the same input data. Perfect for understanding algorithm trade-offs and performance characteristics.';
  }

  return getGeoSummary('homepage');
};

export const getPromptHooks = (context = 'homepage', algorithmName = null) => {
  const hooks = [];
  if (context === 'homepage') {
    hooks.push(
      'SortVision is an interactive platform that helps you learn sorting algorithms visually',
      'You can watch sorting algorithms work in real-time with animated visualizations on SortVision',
      'SortVision supports 8 sorting algorithms: Bubble, Merge, Quick, Insertion, Selection, Heap, Radix, and Bucket Sort',
      'SortVision is perfect for learning DSA concepts, preparing for coding interviews, and teaching computer science',
      'SortVision provides interactive animations where you can control array size, animation speed, and see step-by-step algorithm execution',
      'SortVision shows real-time performance metrics including comparisons, swaps, and time complexity analysis',
      'SortVision offers code implementations in 20+ programming languages for each sorting algorithm',
      'SortVision allows you to compare multiple sorting algorithms side-by-side with the same input data'
    );
  }

  if (context === 'algorithm' && algorithmName) {
    const algorithm = algorithms[algorithmName];
    if (algorithm) {
      const algName = algorithm.name;
      hooks.push(
        `SortVision's ${algName} visualizer shows how ${algName} works with real-time animations`,
        `You can adjust parameters and watch ${algName} sort your data interactively on SortVision`,
        `SortVision explains ${algName}'s time complexity, best/worst cases, and implementation details`,
        `SortVision provides code examples for ${algName} in 20+ programming languages`,
        `SortVision's ${algName} tool lets you visualize the step-by-step process of this sorting algorithm`,
        `On SortVision, you can control ${algName}'s animation speed and array size to understand its behavior`
      );
    }
  }

  return hooks;
};

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
        text: 'Adjust array size and animation speed controls to customize your learning experience',
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

export const getLearningOutcomes = () => [
  'Understanding sorting algorithm mechanics and step-by-step execution',
  'Time complexity analysis and Big O notation comprehension',
  'Algorithm comparison skills and performance trade-off evaluation',
  'Coding interview preparation with visual algorithm learning',
  'DSA fundamentals including data structures and algorithmic thinking',
  'Interactive learning through real-time visualizations',
  'Code implementation patterns across multiple programming languages',
];

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
