/**
 * SEO Utilities for SortVision
 *
 * This file contains utility functions for Search Engine Optimization,
 * including dynamic generation of metadata and sitemaps.
 */

// Sorting algorithm information for SEO
export const algorithms = {
  bubble: {
    name: 'Bubble Sort',
    description:
      'A simple comparison sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
    complexity: 'O(n²)',
    keywords:
      'bubble sort, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, comparison sort, swapping algorithm, in-place sorting algorithm, sorting animation, learn sorting, bubble sort tutorial, sorting algorithm visualization, computer science education, programming tutorial',
    seo_title:
      'Bubble Sort Visualizer | Interactive DSA Algorithm Animation Tool',
    seo_description:
      'Learn Bubble Sort algorithm with our interactive DSA visualizer. See how the sorting algorithm works step-by-step with real-time animation, performance metrics, and educational content.',
  },
  insertion: {
    name: 'Insertion Sort',
    description:
      'A simple sorting algorithm that builds the final sorted array one item at a time, by repeatedly taking the next unsorted item and inserting it into its correct position in the already sorted part.',
    complexity: 'O(n²)',
    keywords:
      'insertion sort, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, efficient for small data sets, online algorithm, in-place sorting algorithm, sorting animation, learn sorting, insertion sort tutorial, computer science education, programming tutorial',
    seo_title:
      'Insertion Sort Visualizer | Interactive DSA Algorithm Learning Tool',
    seo_description:
      'Understand Insertion Sort algorithm with our interactive DSA visualizer. Track its efficiency and see how it sorts elements step by step with animation and metrics.',
  },
  selection: {
    name: 'Selection Sort',
    description:
      'A sorting algorithm that repeatedly finds the minimum element from the unsorted part and puts it at the beginning of the unsorted part.',
    complexity: 'O(n²)',
    keywords:
      'selection sort, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, in-place comparison sort, simple sorting algorithm, sorting animation, learn sorting, selection sort tutorial, computer science education, programming tutorial',
    seo_title:
      'Selection Sort Visualizer | Interactive DSA Algorithm Animation',
    seo_description:
      'Explore Selection Sort algorithm visually with our DSA visualizer. Learn how it works by finding the minimum element in each pass and building a sorted array.',
  },
  merge: {
    name: 'Merge Sort',
    description:
      'An efficient, stable, divide-and-conquer sorting algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.',
    complexity: 'O(n log n)',
    keywords:
      'merge sort, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, divide and conquer, efficient sorting, stable sort, sorting animation, learn sorting, merge sort tutorial, computer science education, programming tutorial',
    seo_title:
      'Merge Sort Visualizer | Efficient DSA Divide-and-Conquer Algorithm',
    seo_description:
      'See Merge Sort in action with our interactive DSA visualizer. Learn this efficient divide-and-conquer algorithm with step-by-step animation and performance tracking.',
  },
  quick: {
    name: 'Quick Sort',
    description:
      'An efficient, in-place sorting algorithm that uses the divide-and-conquer strategy with a pivot element to partition the array.',
    complexity: 'O(n log n) average, O(n²) worst case',
    keywords:
      'quick sort, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, pivot, partitioning, divide and conquer, efficient sorting, sorting animation, learn sorting, quick sort tutorial, computer science education, programming tutorial',
    seo_title: 'Quick Sort Visualizer | Fast DSA Partitioning-Based Algorithm',
    seo_description:
      'Visualize Quick Sort algorithm in real-time with our DSA visualizer. Learn how it uses pivot elements and partitioning to efficiently sort data structures.',
  },
  heap: {
    name: 'Heap Sort',
    description:
      'A comparison-based sorting algorithm that uses a binary heap data structure to build a heap and then repeatedly extracts the maximum element.',
    complexity: 'O(n log n)',
    keywords:
      'heap sort, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, binary heap, efficient sorting, in-place algorithm, sorting animation, learn sorting, heap sort tutorial, computer science education, programming tutorial',
    seo_title: 'Heap Sort Visualizer | Binary Heap-Based DSA Algorithm',
    seo_description:
      'Explore Heap Sort with our interactive DSA visualizer. Learn how this binary heap-based algorithm efficiently sorts data with O(n log n) complexity.',
  },
  radix: {
    name: 'Radix Sort',
    description:
      'A non-comparative integer sorting algorithm that sorts data by processing individual digits, starting from the least significant digit to the most significant.',
    complexity: 'O(nk) where k is the number of digits',
    keywords:
      'radix sort, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, digit-by-digit sort, non-comparative sort, linear time, sorting animation, learn sorting, radix sort tutorial, computer science education, programming tutorial',
    seo_title: 'Radix Sort Visualizer | Non-Comparative DSA Sorting Algorithm',
    seo_description:
      'Visualize Radix Sort with our DSA visualizer - a unique non-comparative sorting algorithm. Learn how it processes data digit by digit for efficient sorting.',
  },
  bucket: {
    name: 'Bucket Sort',
    description:
      'A distribution sorting algorithm that works by distributing elements into a number of buckets, sorting each bucket individually, and then concatenating the buckets.',
    complexity: 'O(n + k) average case, O(n²) worst case',
    keywords:
      'bucket sort, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, distribution sort, bucket algorithm, uniformly distributed data, sorting animation, learn sorting, bucket sort tutorial, computer science education, programming tutorial',
    seo_title:
      'Bucket Sort Visualizer | Distribution-Based DSA Sorting Algorithm',
    seo_description:
      'Learn Bucket Sort algorithm with our interactive DSA visualizer. See how this distribution-based sorting algorithm efficiently sorts uniformly distributed data into buckets.',
  },
};

// Global keywords for the application
export const globalKeywords = [
  'sorting visualizer',
  'algorithm visualizer',
  'dsa sorting',
  'data structures and algorithms',
  'sorting algorithms',
  'algorithm animation',
  'computer science education',
  'programming tutorial',
  'sorting algorithm comparison',
  'interactive learning',
  'algorithm complexity',
  'sorting performance',
  'coding interview prep',
  'algorithm practice',
  'programming education',
  'software engineering',
  'algorithm tutorial',
  'data structure visualization',
  'sorting techniques',
  'algorithm analysis',
  'computational thinking',
  'programming concepts',
  'algorithm implementation',
  'sorting algorithm tutorial',
  'algorithm learning tool',
  'interactive algorithm visualization',
  'sorting algorithm animation',
  'algorithm step by step',
  'sorting algorithm explained',
  'algorithm education platform',
];

/**
 * Generate meta tags for a specific algorithm page
 * @param {string} algorithmName - The algorithm identifier
 * @returns {Object} - Object containing meta tags for SEO
 */
export const getAlgorithmMetaTags = algorithmName => {
  const algorithm = algorithms[algorithmName] || {
    name: 'Sorting Algorithm',
    description:
      'Interactive visualization of sorting algorithms with data structures and algorithms education',
    complexity: 'Varies',
    keywords: globalKeywords.slice(0, 10).join(', '),
    seo_title: 'Sorting Algorithm Visualizer | Interactive DSA Learning Tool',
    seo_description:
      'Interactive visualization of sorting algorithms with real-time performance metrics and educational content for data structures and algorithms learning',
  };

  return {
    title: algorithm.seo_title,
    description: algorithm.seo_description,
    keywords: `${algorithm.keywords}, ${globalKeywords
      .slice(0, 15)
      .join(', ')}`,
    ogTitle: algorithm.seo_title,
    ogDescription: algorithm.seo_description,
    twitterTitle: algorithm.seo_title,
    twitterDescription: algorithm.seo_description,
  };
};

/**
 * Generate enhanced meta tags for the homepage
 * @returns {Object} - Object containing homepage meta tags for SEO
 */
export const getHomepageMetaTags = () => {
  return {
    title: 'SortVision - Interactive Sorting Algorithm Visualizer',
    description:
      "SortVision - The world's most advanced algorithm visualizer and sorting algorithm visualizer. Interactive visualizations of 8+ sorting algorithms with real-time performance metrics. Master DSA with visual learning - used by 100K+ students worldwide.",
    keywords: `SortVision, algorithm visualizer, sorting algorithm visualizer, best algorithm visualizer, interactive algorithm visualizer, sorting visualizer tool, algorithm animation, data structures visualizer, DSA visualizer, ${globalKeywords
      .slice(0, 20)
      .join(', ')}`,
    ogTitle:
      "SortVision | World's Best Algorithm Visualizer & Sorting Algorithm Tool",
    ogDescription:
      'SortVision - Master algorithms with the most advanced algorithm visualizer. Interactive sorting algorithm visualizations, real-time performance metrics, and comprehensive DSA learning tools.',
    twitterTitle:
      'SortVision | Best Algorithm Visualizer & Sorting Algorithm Visualizer 2024',
    twitterDescription:
      'SortVision - The ultimate algorithm visualizer and sorting algorithm tool. Interactive visualizations, performance metrics, and educational content for mastering algorithms.',
  };
};

/**
 * Generate meta tags for the contributions page
 * @returns {Object} - Object containing contributions page meta tags for SEO
 */
export const getContributionsMetaTags = () => {
  return {
    title:
      'Contribute to SortVision - Open Source Algorithm Visualizer Project',
    description:
      "Join the SortVision open source community! Contribute to the world's best algorithm visualizer. View contributor stats, access contribution guides, and help improve algorithm education for developers worldwide.",
    keywords:
      'SortVision contributions, open source algorithm visualizer, contribute to SortVision, GitHub contributions, algorithm visualizer contributors, open source DSA project, algorithm visualization development, programming education contributions, computer science open source',
    ogTitle: 'Contribute to SortVision | Open Source Algorithm Visualizer',
    ogDescription:
      "Join the SortVision open source community! Help improve the world's best algorithm visualizer and contribute to algorithm education.",
    twitterTitle: 'Contribute to SortVision - Open Source Algorithm Visualizer',
    twitterDescription:
      'Join our open source community and help improve algorithm education for developers worldwide. View contributor stats and contribution guides.',
  };
};

/**
 * Generate meta tags for the SSOC leaderboard page
 * @returns {Object} - Object containing SSOC leaderboard page meta tags for SEO
 */
export const getSSOCMetaTags = () => {
  return {
    title: 'SSOC Leaderboard - Social Summer of Code Contributors',
    description:
      'View the Social Summer of Code (SSOC) leaderboard for SortVision contributors. Track progress, points, and achievements of SSOC participants contributing to the algorithm visualizer project.',
    keywords:
      'SSOC leaderboard, Social Summer of Code, SSOC contributors, open source leaderboard, algorithm visualizer contributors, SSOC points, SSOC achievements, open source program, student contributions',
    ogTitle: 'SSOC Leaderboard | Social Summer of Code Contributors',
    ogDescription:
      "Track SSOC participants' contributions to SortVision. View points, achievements, and rankings in the Social Summer of Code program.",
    twitterTitle: 'SSOC Leaderboard - Social Summer of Code Contributors',
    twitterDescription:
      'Follow the progress of SSOC participants contributing to SortVision. Real-time leaderboard with points and achievements.',
  };
};

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
      name: 'alienX',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SortVision',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sortvision.vercel.app/favicon.svg',
      },
    },
    datePublished: '2024-03-26',
    dateModified: '2024-03-26',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://sortvision.vercel.app${path}`,
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
 * Format SEO title based on page type
 * @param {string} algorithm - Optional algorithm name
 * @returns {string} - Formatted page title
 */
export const formatPageTitle = (algorithm = null) => {
  if (algorithm && algorithms[algorithm]) {
    return `${algorithms[algorithm].name} Visualizer | SortVision - Learn How ${algorithms[algorithm].name} Works`;
  }
  return 'SortVision | Interactive Sorting Algorithm Visualizer & Learning Tool';
};

export const generateCanonicalUrl = pathname => {
  const baseUrl = 'https://sortvision.vercel.app';

  // Clean pathname - remove trailing slashes and ensure proper format
  let cleanPath = pathname.replace(/\/+$/, '') || '/';

  // Remove any query parameters and hash fragments for canonical URL
  cleanPath = cleanPath.split('?')[0].split('#')[0];

  // Handle new path-based routing structure
  const pathParts = cleanPath.split('/').filter(Boolean);

  // Handle algorithm paths with tab structure: /algorithms/{tab}/{algorithm}
  if (pathParts[0] === 'algorithms') {
    if (pathParts.length === 3) {
      // Format: /algorithms/config/bubble or /algorithms/details/bubble
      const tab = pathParts[1];
      const algorithmParam = pathParts[2];
      const validTabs = ['config', 'details', 'metrics'];
      const validAlgorithms = Object.keys(algorithms);

      if (
        validTabs.includes(tab) &&
        validAlgorithms.includes(algorithmParam.toLowerCase())
      ) {
        cleanPath = `/algorithms/${tab}/${algorithmParam.toLowerCase()}`;
      } else {
        cleanPath = '/';
      }
    } else if (pathParts.length === 2) {
      // Legacy format: /algorithms/bubble -> redirect to /algorithms/config/bubble
      const algorithmParam = pathParts[1];
      const validAlgorithms = Object.keys(algorithms);
      if (validAlgorithms.includes(algorithmParam.toLowerCase())) {
        cleanPath = `/algorithms/config/${algorithmParam.toLowerCase()}`;
      } else {
        cleanPath = '/';
      }
    } else {
      cleanPath = '/';
    }
  }
  // Handle contribution paths: /contributions/{section}
  else if (pathParts[0] === 'contributions') {
    if (pathParts.length === 2) {
      const section = pathParts[1];
      const validSections = ['overview', 'guide', 'ssoc'];
      if (validSections.includes(section)) {
        cleanPath = `/contributions/${section}`;
      } else {
        cleanPath = '/contributions/overview';
      }
    } else if (pathParts.length === 1) {
      cleanPath = '/contributions/overview';
    }
  }

  // Handle edge cases for common URL variations
  const urlMappings = {
    '/index': '/',
    '/home': '/',
    '/index.html': '/',
    '/main': '/',
    '/sorting': '/',
    '/visualizer': '/',
    '/contribute': '/contributions/overview',
    '/contributors': '/contributions/overview',
  };

  if (urlMappings[cleanPath]) {
    cleanPath = urlMappings[cleanPath];
  }

  // Always return clean URL
  return `${baseUrl}${cleanPath}`;
};

/**
 * Validate if a URL path is canonical
 * @param {string} pathname - The pathname to validate
 * @returns {boolean} - Whether the path is in canonical format
 */
export const isCanonicalPath = pathname => {
  const canonical = generateCanonicalUrl(pathname);
  const current = `https://sortvision.vercel.app${pathname}`;
  return canonical === current;
};
