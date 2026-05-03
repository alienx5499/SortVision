import { SUPPORTED_LANGUAGES } from '@/config/i18n';

const today = () => new Date().toISOString().split('T')[0];

export const buildSoftwareApplicationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SortVision',
  url: 'https://www.sortvision.com/',
  description:
    'SortVision is an interactive sorting algorithm visualizer that helps users learn Bubble, Merge, Quick, Heap, Insertion, Selection, Radix, and Bucket Sort through animations and performance metrics.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  featureList: [
    'Visualize multiple sorting algorithms',
    'Adjustable speed and array size',
    'Real-time comparisons and performance metrics',
    'Interactive step-by-step controls',
  ],
  author: {
    '@type': 'Person',
    name: 'Prabal Patra',
    url: 'https://github.com/alienx5499',
  },
  sameAs: [
    'https://github.com/alienx5499/SortVision',
    'https://www.sortvision.com/',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  applicationSubCategory: 'Interactive Algorithm Visualization Tool',
  interactivityType: 'active',
  educationalUse: 'instruction',
  learningResourceType: 'interactive simulation',
  educationalLevel: ['beginner', 'intermediate', 'advanced'],
  teaches: [
    'Sorting Algorithms',
    'Data Structures',
    'Computer Science',
    'Programming',
    'Algorithm Analysis',
  ],
  about: [
    {
      '@type': 'Thing',
      name: 'Bubble Sort',
      description: 'Simple comparison-based sorting algorithm',
    },
    {
      '@type': 'Thing',
      name: 'Merge Sort',
      description: 'Efficient divide-and-conquer sorting algorithm',
    },
    {
      '@type': 'Thing',
      name: 'Quick Sort',
      description: 'Fast in-place sorting algorithm',
    },
    {
      '@type': 'Thing',
      name: 'Insertion Sort',
      description: 'Simple adaptive sorting algorithm',
    },
    {
      '@type': 'Thing',
      name: 'Selection Sort',
      description: 'Simple in-place sorting algorithm',
    },
    {
      '@type': 'Thing',
      name: 'Heap Sort',
      description: 'Comparison-based sorting using heap data structure',
    },
    {
      '@type': 'Thing',
      name: 'Radix Sort',
      description: 'Non-comparison integer sorting algorithm',
    },
    {
      '@type': 'Thing',
      name: 'Bucket Sort',
      description: 'Distribution-based sorting algorithm',
    },
  ],
  dateCreated: '2024-01-15',
  dateModified: today(),
  isAccessibleForFree: true,
  keywords:
    'sorting algorithms, algorithm visualization, DSA learning, coding interview prep, computer science education',
});

export const buildCreativeWorkSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'SortVision Educational Content',
  description:
    'Comprehensive educational content about sorting algorithms and data structures',
  author: {
    '@type': 'Person',
    name: 'Prabal Patra',
    url: 'https://github.com/alienx5499',
  },
  publisher: {
    '@type': 'Organization',
    name: 'SortVision',
    url: 'https://www.sortvision.com',
  },
  copyrightHolder: {
    '@type': 'Organization',
    name: 'SortVision',
    url: 'https://www.sortvision.com',
  },
  copyrightYear: '2024',
  license: 'https://opensource.org/licenses/MIT',
  datePublished: '2024-01-15',
  dateModified: today(),
  educationalUse: 'instruction',
  inLanguage: SUPPORTED_LANGUAGES,
  teaches:
    'Sorting algorithms, data structures, algorithm complexity analysis, computer science fundamentals',
  audience: {
    '@type': 'EducationalAudience',
    audienceType: 'students, developers, educators',
    educationalRole: 'learner',
  },
  isAccessibleForFree: true,
  accountablePerson: {
    '@type': 'Person',
    name: 'Prabal Patra',
  },
  mentions: [
    'Bubble Sort',
    'Merge Sort',
    'Quick Sort',
    'Insertion Sort',
    'Selection Sort',
    'Heap Sort',
    'Radix Sort',
    'Bucket Sort',
    'Time Complexity',
    'Space Complexity',
    'Big O Notation',
    'Algorithm Visualization',
  ],
});

export const buildFaqSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is SortVision?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SortVision is an interactive sorting algorithm visualizer designed to help students, developers, and educators understand sorting algorithms through real-time animations, step-by-step explanations, and performance metrics.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which sorting algorithms does SortVision support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SortVision supports 8 major sorting algorithms: Bubble Sort, Merge Sort, Quick Sort, Insertion Sort, Selection Sort, Heap Sort, Radix Sort, and Bucket Sort, each with detailed explanations and complexity analysis.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is SortVision free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, SortVision is completely free and open-source. It's designed to make algorithm learning accessible to everyone, from beginners to advanced programmers.",
      },
    },
    {
      '@type': 'Question',
      name: 'How can SortVision help with coding interviews?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SortVision helps prepare for coding interviews by providing visual understanding of sorting algorithms, their time/space complexity, and practical examples that are commonly asked in technical interviews at top tech companies.',
      },
    },
    {
      '@type': 'Question',
      name: 'What programming languages are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SortVision provides algorithm implementations in multiple programming languages including Python, JavaScript, Java, C++, C#, Go, Rust, and more, making it suitable for developers across different tech stacks.',
      },
    },
  ],
});

export const buildEducationalOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'SortVision',
  description:
    'Interactive platform for learning sorting algorithms and data structures',
  url: 'https://www.sortvision.com',
  educationalCredentialAwarded: 'Algorithm Understanding Certificate',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Sorting Algorithm Courses',
    itemListElement: [
      {
        '@type': 'Course',
        name: 'Bubble Sort Algorithm',
        description:
          'Learn the fundamentals of bubble sort with interactive visualization',
      },
      {
        '@type': 'Course',
        name: 'Merge Sort Algorithm',
        description: 'Master divide-and-conquer sorting with merge sort',
      },
      {
        '@type': 'Course',
        name: 'Quick Sort Algorithm',
        description: 'Understand the most efficient sorting algorithm',
      },
    ],
  },
});
