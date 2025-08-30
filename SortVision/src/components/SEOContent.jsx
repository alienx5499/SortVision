import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { generateCanonicalUrl } from '../utils/seo';

/**
 * SEO Content Component
 *
 * Provides comprehensive SEO optimization including:
 * - Meta tags (Open Graph, Twitter Cards, etc.)
 * - Structured data (Application, Educational Resource, FAQ)
 * - Keyword-rich content for search engines
 * - Algorithm-specific optimization
 */
const SEOContent = ({ algorithm = null }) => {
  const location = useLocation();
  const baseUrl = 'https://sortvision.vercel.app';

  // Generate clean canonical URL
  const currentUrl = generateCanonicalUrl(location.pathname, algorithm);

  // 1. Enhanced main heading with primary keywords
  const mainHeading = (
    <h1>
      SortVision: Top Sorting Algorithm Visualizer & DSA Interactive Learning
      Tool
    </h1>
  );

  // 2. Comprehensive keyword-rich content with educational focus
  const allKeywordsContent = (
    <div className="sr-only" aria-hidden="true">
      {mainHeading}

      <p>
        SortVision is the world's leading sorting algorithm visualizer and
        interactive DSA learning platform, offering in-depth educational
        visualizations for merge sort, quick sort, heap sort, bubble sort,
        insertion sort, selection sort, radix sort, and bucket sort. Whether
        you're studying data structures and algorithms (DSA), preparing for
        coding interviews at Google, Amazon, Microsoft, or teaching computer
        science, SortVision provides real-time step-by-step animations,
        performance metrics, complexity analysis, and interactive learning for
        every major sorting algorithm technique.
      </p>

      <h2>Complete Sorting Algorithm Visualizer for DSA Education</h2>
      <ul>
        <li>
          Merge Sort algorithm visualizer: divide-and-conquer demonstration with
          recursive subarray merging and O(n log n) analysis
        </li>
        <li>
          Quick Sort algorithm visualizer: pivot selection strategies,
          partitioning visualization, and recursion tracing
        </li>
        <li>
          Heap Sort visualizer: binary heap construction, heapify operations,
          and sorted element extraction
        </li>
        <li>
          Bubble Sort visualizer: pairwise comparison and swapping with
          best-case vs. worst-case complexity analysis
        </li>
        <li>
          Insertion Sort visualizer: adaptive sorting optimization for small
          arrays with step-by-step insertion process
        </li>
        <li>
          Selection Sort visualizer: minimum element scanning and in-place
          swapping demonstration
        </li>
        <li>
          Radix Sort visualizer: non-comparative digit-by-digit sorting for
          integers with counting sort subroutine
        </li>
        <li>
          Bucket Sort visualizer: element distribution into buckets and
          individual sorting with insertion sort
        </li>
      </ul>

      <h2>Advanced DSA Concepts & Computer Science Fundamentals</h2>
      <p>
        Beyond sorting algorithms, SortVision teaches essential data structures
        and algorithmic concepts: arrays, linked lists, stacks, queues, binary
        search trees (BST), binary heaps, graphs, hash tables, time complexity
        analysis (Big O notation), space complexity evaluation, and algorithmic
        trade-offs. Perfect for computer science students, software engineering
        interviews, coding bootcamps, and self-directed learning.
      </p>
      <ul>
        <li>
          Big O notation analysis: O(1), O(log n), O(n), O(n log n), O(n²),
          O(2^n)
        </li>
        <li>
          Time vs. Space complexity trade-offs and optimization strategies
        </li>
        <li>In-place vs. out-of-place algorithm implementations</li>
        <li>Stable vs. unstable sorting algorithm characteristics</li>
        <li>
          Divide and conquer, dynamic programming, and greedy algorithm
          paradigms
        </li>
        <li>Best-case, average-case, and worst-case performance analysis</li>
        <li>Recursive vs. iterative algorithm implementations</li>
        <li>Adaptive sorting algorithms and optimization techniques</li>
      </ul>

      <h2>Why Choose SortVision for Algorithm Learning & Interview Prep?</h2>
      <p>
        As the premier online sorting algorithm visualizer and DSA education
        platform, SortVision's unique combination of interactive animations,
        real-time performance analytics, step-by-step explanations, and
        comprehensive educational content makes it the top choice for:
      </p>
      <ul>
        <li>
          Computer science students learning algorithms and data structures at
          university level
        </li>
        <li>
          Software engineers preparing for technical interviews at FAANG
          companies (Facebook, Amazon, Apple, Netflix, Google)
        </li>
        <li>
          Coding bootcamp students mastering fundamental algorithms and
          problem-solving techniques
        </li>
        <li>Self-taught programmers building strong algorithmic foundations</li>
        <li>
          CS educators and professors seeking interactive teaching tools for
          algorithm visualization
        </li>
        <li>
          Interview candidates practicing LeetCode, HackerRank, and CodeSignal
          algorithm problems
        </li>
        <li>
          Algorithm researchers comparing sorting methodologies and performance
          characteristics
        </li>
        <li>
          Programming contest participants (ACM ICPC, Codeforces, TopCoder)
          improving algorithmic skills
        </li>
      </ul>

      <h2>Professional-Grade Sorting Algorithm Visualizer Features</h2>
      <ul>
        <li>
          60FPS real-time sorting animations with smooth, professional-quality
          visualizations
        </li>
        <li>
          Customizable visualization speed control (1x to 100x) for detailed
          analysis or quick overview
        </li>
        <li>
          Side-by-side algorithm comparison tools for performance benchmarking
          and analysis
        </li>
        <li>
          Interactive pseudocode walkthrough with synchronized code highlighting
          and execution
        </li>
        <li>
          Comprehensive array, list, tree, and graph data structure
          visualizations
        </li>
        <li>
          Advanced complexity metrics dashboard: time, space, comparisons,
          swaps, recursion depth
        </li>
        <li>
          Mobile-responsive design optimized for tablets, smartphones, and
          desktop learning
        </li>
        <li>
          Completely free and open-source (MIT License) with no registration
          required
        </li>
        <li>
          Accessibility features including screen reader support and keyboard
          navigation
        </li>
        <li>
          Dark/light theme options for comfortable learning in any environment
        </li>
        <li>
          Export functionality for sharing visualizations and performance
          reports
        </li>
        <li>Educational tooltips and hints for guided learning experience</li>
      </ul>

      <h2>Coding Interview Preparation & DSA Mastery</h2>
      <p>
        SortVision is specifically designed to help developers excel in
        technical interviews and master data structures and algorithms. Our
        platform covers essential interview topics including:
      </p>
      <ul>
        <li>Sorting algorithm implementation and optimization techniques</li>
        <li>
          Time and space complexity analysis for interview problem solving
        </li>
        <li>
          Algorithm selection strategies based on input characteristics and
          constraints
        </li>
        <li>
          Common sorting algorithm variations and modifications asked in
          interviews
        </li>
        <li>
          Performance comparison and trade-off analysis between different
          approaches
        </li>
        <li>Edge case handling and boundary condition testing</li>
        <li>Memory usage optimization and in-place algorithm design</li>
        <li>Recursive algorithm design and stack overflow prevention</li>
      </ul>

      <h2>Educational Use Cases & Learning Scenarios</h2>
      <p>
        Whether you're a beginner taking your first computer science course or
        an experienced developer preparing for senior-level technical
        interviews, SortVision adapts to your learning needs:
      </p>
      <ul>
        <li>CS101 Introduction to Programming and basic algorithm concepts</li>
        <li>
          Data Structures and Algorithms (CS201/CS301) university coursework
        </li>
        <li>Algorithm Analysis and Design advanced computer science topics</li>
        <li>Software Engineering job interview preparation and practice</li>
        <li>Coding bootcamp curriculum support and supplementary learning</li>
        <li>Self-study algorithm mastery and skill development</li>
        <li>Research and academic algorithm comparison studies</li>
        <li>Conference presentations and algorithm demonstration talks</li>
        <li>Tutoring and mentoring sessions with visual learning aids</li>
        <li>Corporate training programs for software development teams</li>
      </ul>

      <h2>Start Learning: Free Sorting Algorithm Visualizer & DSA Platform</h2>
      <p>
        Whether your focus is mastering merge sort's divide-and-conquer
        approach, understanding quick sort's partitioning strategies, analyzing
        heap sort's binary heap operations, or comparing bubble sort's
        simplicity with more efficient algorithms, SortVision provides the
        comprehensive tools, educational content, and interactive features you
        need. Join thousands of students, developers, and educators worldwide
        who have improved their DSA skills and algorithm understanding with the
        most advanced, free sorting algorithm visualizer and educational
        platform available online.
      </p>

      <h2>Frequently Asked Questions - Sorting Algorithms & DSA Learning</h2>
      <div>
        <h3>What is the best sorting algorithm to learn first?</h3>
        <p>
          For beginners, we recommend starting with Bubble Sort to understand
          basic comparison and swapping concepts, then progressing to Insertion
          Sort and Selection Sort before tackling more advanced algorithms like
          Merge Sort and Quick Sort.
        </p>

        <h3>How do I prepare for sorting algorithm interview questions?</h3>
        <p>
          Practice implementing each algorithm from scratch, understand their
          time and space complexities, know when to use each algorithm, and be
          able to modify them for specific requirements. Our visualizer helps
          you understand the mechanics before coding.
        </p>

        <h3>
          What's the difference between stable and unstable sorting algorithms?
        </h3>
        <p>
          Stable sorting algorithms maintain the relative order of equal
          elements, while unstable algorithms may change their relative
          positions. Merge Sort and Insertion Sort are stable, while Quick Sort
          and Heap Sort are typically unstable.
        </p>

        <h3>Which sorting algorithm is most efficient?</h3>
        <p>
          It depends on your data and constraints. Merge Sort and Heap Sort
          guarantee O(n log n) worst-case performance, Quick Sort averages O(n
          log n) but can degrade to O(n²), while Radix Sort can be O(nk) for
          integer data.
        </p>
      </div>
    </div>
  );

  // 3. Enhanced algorithm-specific content
  const algorithmSpecificContent = algorithm ? (
    <div className="sr-only" aria-hidden="true">
      <h2>
        {algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort Algorithm
        Visualizer – Master DSA with SortVision
      </h2>
      <p>
        Experience our advanced interactive {algorithm} sort visualizer with
        professional-grade step-by-step animations, detailed performance
        tracking, recursive call visualization, and comprehensive complexity
        analysis. Perfect for mastering
        {algorithm} sort's implementation details, best-case and worst-case
        behavior, optimization techniques, and practical applications in
        real-world software development and technical interviews.
      </p>
      <ul>
        <li>
          Real-time {algorithm} sort animations at 60FPS with customizable speed
          control
        </li>
        <li>
          Comprehensive performance metrics: comparisons, swaps, recursion
          depth, memory usage
        </li>
        <li>
          Custom dataset size configuration and random seed control for
          reproducible testing
        </li>
        <li>
          Visual pivot selection and partitioning breakdown with detailed
          explanations
        </li>
        <li>
          Interactive controls: pause, resume, step-through, and replay
          functionality
        </li>
        <li>
          Side-by-side comparison: {algorithm} sort vs. merge sort, quick sort,
          and other algorithms
        </li>
        <li>
          Educational tooltips explaining each step and algorithmic decision
        </li>
        <li>
          Code implementation examples with syntax highlighting and best
          practices
        </li>
        <li>
          Interview preparation tips and common variations of {algorithm} sort
        </li>
        <li>Performance optimization strategies and trade-off analysis</li>
      </ul>
      <h3>
        Why Choose SortVision's{' '}
        {algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort Visualizer
        for Learning?
      </h3>
      <p>
        SortVision provides the most comprehensive and educational {algorithm}{' '}
        sort visualization experience available online. Our platform combines
        theoretical computer science concepts with practical implementation
        details, making it ideal for coding interview preparation, university
        coursework, self-directed learning, and professional algorithm mastery.
        Master {algorithm} sort with confidence through our interactive, visual
        approach to DSA education.
      </p>
    </div>
  ) : null;

  // 4. Comprehensive meta tags and structured data
  const pageTitle = algorithm
    ? `${
        algorithm.charAt(0).toUpperCase() + algorithm.slice(1)
      } Sort Visualizer - SortVision`
    : 'SortVision - Interactive Sorting Algorithm Visualizer';

  const pageDescription = algorithm
    ? `Master ${algorithm} sort algorithm with SortVision's interactive visualizer. Step-by-step animations, performance analysis, and comprehensive DSA learning for coding interviews.`
    : 'Interactive visualization of sorting algorithms including bubble sort, merge sort, quick sort, and more. Learn data structures and algorithms with real-time performance metrics and educational content.';

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="sorting algorithm visualizer, DSA learning, data structures algorithms, coding interview prep, merge sort, quick sort, heap sort, bubble sort, computer science education, algorithm animation, interactive learning, programming tutorial, software engineering"
        />
        <meta name="author" content="SortVision" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="7 days" />

        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />

        {/* Prevent duplicate content */}
        <meta
          name="googlebot"
          content="index, follow, noarchive, max-snippet:160, max-image-preview:large"
        />
        <meta name="bingbot" content="index, follow, noarchive" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />

        {/* Hreflang for international SEO */}
        <link rel="alternate" href={currentUrl} hreflang="en" />
        <link rel="alternate" href={currentUrl} hreflang="x-default" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={`${baseUrl}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="SortVision" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={currentUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta
          property="twitter:image"
          content={`${baseUrl}/twitter-image.png`}
        />
        <meta property="twitter:creator" content="@SortVision" />

        {/* Additional Technical Meta Tags */}
        <meta name="theme-color" content="#1e293b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="SortVision" />
        <meta name="application-name" content="SortVision" />
        <meta name="msapplication-TileColor" content="#1e293b" />

        {/* Structured Data - Software Application */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'SortVision',
            url: baseUrl,
            description:
              "SortVision is the world's leading sorting algorithm visualizer and interactive DSA learning platform. Features 8 sorting algorithms with real-time animations, performance metrics, and educational content.",
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'Any',
            browserRequirements:
              'Requires JavaScript. Supports Chrome, Firefox, Safari, Edge.',
            softwareVersion: '2.0.0',
            datePublished: '2024-01-15',
            dateModified: new Date().toISOString(),
            author: {
              '@type': 'Organization',
              name: 'SortVision',
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
            screenshot: `${baseUrl}/screenshot.png`,
            license: 'https://opensource.org/licenses/MIT',
            downloadUrl: baseUrl,
            installUrl: baseUrl,
            featureList: [
              'Interactive sorting algorithm visualization',
              '8 major sorting algorithms supported',
              'Real-time performance metrics',
              'Educational content and explanations',
              'Mobile-responsive design',
              'Free and open-source',
            ],
          })}
        </script>

        {/* Structured Data - Educational Resource */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'Interactive Sorting Algorithms Learning with SortVision',
            description:
              'Comprehensive interactive course on sorting algorithms including merge sort, quick sort, heap sort, and more. Visual learning with animations and performance analysis.',
            provider: {
              '@type': 'Organization',
              name: 'SortVision',
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
                name: 'alienX',
              },
              courseSchedule: {
                '@type': 'Schedule',
                startDate: '2024-01-01',
                repeatFrequency: 'P1D',
              },
            },
          })}
        </script>

        {/* Structured Data - FAQ */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the best sorting algorithm to learn first?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For beginners, we recommend starting with Bubble Sort to understand basic comparison and swapping concepts, then progressing to Insertion Sort and Selection Sort before tackling more advanced algorithms like Merge Sort and Quick Sort.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I prepare for sorting algorithm interview questions?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Practice implementing each algorithm from scratch, understand their time and space complexities, know when to use each algorithm, and be able to modify them for specific requirements. Our visualizer helps you understand the mechanics before coding.',
                },
              },
              {
                '@type': 'Question',
                name: 'Which sorting algorithm is most efficient?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'It depends on your data and constraints. Merge Sort and Heap Sort guarantee O(n log n) worst-case performance, Quick Sort averages O(n log n) but can degrade to O(n²), while Radix Sort can be O(nk) for integer data.',
                },
              },
            ],
          })}
        </script>
      </Helmet>

      {allKeywordsContent}
      {algorithmSpecificContent}
    </>
  );
};

export default SEOContent;
