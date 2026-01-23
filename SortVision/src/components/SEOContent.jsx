import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import {
  generateCanonicalUrl,
  getGeoSummary,
  getPromptHooks,
  getAlgorithmHowToSchema,
  getAlgorithmCatalogSchema,
  getLearningOutcomes,
} from '../utils/seo';
import { useLanguage } from '@/context/LanguageContext';

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
  const { language, t } = useLanguage();
  const baseUrl = 'https://www.sortvision.com';

  // Generate clean canonical URL
  const currentUrl = generateCanonicalUrl(location.pathname, algorithm);

  // GEO: AI-friendly summaries and prompt hooks (defined early for use in content)
  const geoSummary = algorithm
    ? getGeoSummary('algorithm', algorithm)
    : getGeoSummary('homepage');

  const promptHooks = algorithm
    ? getPromptHooks('algorithm', algorithm)
    : getPromptHooks('homepage');

  // 1. Enhanced main heading with primary keywords from AnswerThePublic
  const mainHeading = (
    <h1>
      SortVision: Interactive Sorting Algorithms Visualizer | Time Complexity &
      Animation
    </h1>
  );

  // 2. Comprehensive keyword-rich content with educational focus (GenEI-optimized)
  const allKeywordsContent = (
    <div className="sr-only" aria-hidden="true">
      {/* GEO: AI-friendly summary for homepage */}
      <div data-geo="ai-summary" style={{ display: 'none' }}>
        {!algorithm && geoSummary}
      </div>

      {/* GEO: Prompt hooks for LLM extraction */}
      {!algorithm && (
        <div data-geo="prompt-hooks" style={{ display: 'none' }}>
          {promptHooks.map((hook, index) => (
            <p key={index}>{hook}</p>
          ))}
        </div>
      )}

      {/* GenEI: Clear content structure with semantic HTML */}
      {mainHeading}

      <div itemScope itemType="https://schema.org/EducationalResource">
        <meta itemProp="educationalUse" content="instruction" />
        <meta
          itemProp="educationalLevel"
          content="beginner, intermediate, advanced"
        />
        <meta
          itemProp="learningResourceType"
          content="interactive simulation"
        />
        <meta itemProp="isAccessibleForFree" content="true" />

        <p itemProp="description">
          SortVision is the world's leading sorting algorithm visualizer and
          interactive DSA learning platform, offering in-depth educational
          visualizations, animations, and time complexity analysis for merge
          sort, quick sort, heap sort, bubble sort, insertion sort, selection
          sort, radix sort, and bucket sort. Whether you're studying data
          structures and algorithms (DSA), preparing for coding interviews at
          Google, Amazon, Microsoft, or teaching computer science, SortVision
          provides real-time step-by-step animations, performance metrics,
          complexity analysis, and interactive learning for every major sorting
          algorithm technique. Perfect for beginners learning sorting algorithms
          with examples and comprehensive tutorials.
        </p>

        <h2>Complete Sorting Algorithm Visualizer for DSA Education</h2>
        <ul>
          <li>
            Merge Sort algorithm visualizer: divide-and-conquer demonstration
            with recursive subarray merging and O(n log n) analysis - Perfect
            for Python and Java developers
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
          Beyond sorting algorithms, SortVision teaches essential data
          structures and algorithmic concepts: arrays, linked lists, stacks,
          queues, binary search trees (BST), binary heaps, graphs, hash tables,
          time complexity analysis (Big O notation), space complexity
          evaluation, and algorithmic trade-offs. Perfect for computer science
          students, software engineering interviews, coding bootcamps, and
          self-directed learning.
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
          <li>
            Self-taught programmers building strong algorithmic foundations
          </li>
          <li>
            CS educators and professors seeking interactive teaching tools for
            algorithm visualization
          </li>
          <li>
            Interview candidates practicing LeetCode, HackerRank, and CodeSignal
            algorithm problems
          </li>
          <li>
            Algorithm researchers comparing sorting methodologies and
            performance characteristics
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
            Interactive pseudocode walkthrough with synchronized code
            highlighting and execution
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
          <li>
            CS101 Introduction to Programming and basic algorithm concepts
          </li>
          <li>
            Data Structures and Algorithms (CS201/CS301) university coursework
          </li>
          <li>
            Algorithm Analysis and Design advanced computer science topics
          </li>
          <li>Software Engineering job interview preparation and practice</li>
          <li>Coding bootcamp curriculum support and supplementary learning</li>
          <li>Self-study algorithm mastery and skill development</li>
          <li>Research and academic algorithm comparison studies</li>
          <li>Conference presentations and algorithm demonstration talks</li>
          <li>Tutoring and mentoring sessions with visual learning aids</li>
          <li>Corporate training programs for software development teams</li>
        </ul>

        <h2>
          Start Learning: Free Sorting Algorithm Visualizer & DSA Platform
        </h2>
        <p>
          Whether your focus is mastering merge sort's divide-and-conquer
          approach, understanding quick sort's partitioning strategies,
          analyzing heap sort's binary heap operations, or comparing bubble
          sort's simplicity with more efficient algorithms, SortVision provides
          the comprehensive tools, educational content, and interactive features
          you need. Join thousands of students, developers, and educators
          worldwide who have improved their DSA skills and algorithm
          understanding with the most advanced, free sorting algorithm
          visualizer and educational platform available online.
        </p>
      </div>

      <h2>Frequently Asked Questions - Sorting Algorithms & DSA Learning</h2>
      <div>
        <h3>What are the 5 sorting algorithms?</h3>
        <p>
          The 5 most important sorting algorithms to learn are: Bubble Sort
          (O(n²)), Insertion Sort (O(n²)), Selection Sort (O(n²)), Merge Sort
          (O(n log n)), and Quick Sort (O(n log n) average). SortVision
          visualizes all 8 major sorting algorithms including Heap Sort, Radix
          Sort, and Bucket Sort.
        </p>

        <h3>What are sorting algorithms?</h3>
        <p>
          Sorting algorithms are methods to arrange data in a specific order
          (ascending or descending). They're fundamental in computer science and
          essential for coding interviews. SortVision provides interactive
          visualizations to help you understand how each algorithm works
          step-by-step.
        </p>

        <h3>How many types of sorting algorithms are there?</h3>
        <p>
          There are many types of sorting algorithms, but the main categories
          include: comparison-based sorts (Bubble, Insertion, Selection, Merge,
          Quick, Heap), non-comparison sorts (Radix, Bucket, Counting), stable
          vs unstable sorts, and in-place vs out-of-place sorts. SortVision
          covers 8 major algorithms.
        </p>

        <h3>Which sorting algorithm is easy?</h3>
        <p>
          Bubble Sort is considered the easiest to understand and implement,
          making it perfect for beginners. It uses simple comparison and
          swapping logic. SortVision's interactive visualizer helps you see
          exactly how it works before moving to more complex algorithms.
        </p>

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

        <h3>What are sorting algorithms used for?</h3>
        <p>
          Sorting algorithms are used in databases (indexing), search engines
          (ranking), operating systems (process scheduling), data analysis,
          machine learning, and countless other applications. Understanding them
          is crucial for software development and technical interviews.
        </p>

        <h3>Why are sorting algorithms important?</h3>
        <p>
          Sorting algorithms are fundamental to computer science and essential
          for efficient data processing. They're frequently asked in coding
          interviews and are the foundation for understanding more complex
          algorithms and data structures.
        </p>

        <h3>What are the four basic sorting algorithms?</h3>
        <p>
          The four basic sorting algorithms every programmer should know are:
          Bubble Sort (O(n²)), Insertion Sort (O(n²)), Selection Sort (O(n²)),
          and Merge Sort (O(n log n)). These form the foundation for
          understanding more advanced sorting techniques and are commonly asked
          in coding interviews.
        </p>

        <h3>Should I learn sorting algorithms?</h3>
        <p>
          Absolutely! Sorting algorithms are essential for any programmer.
          They're fundamental to computer science, frequently asked in coding
          interviews at top tech companies, and form the basis for understanding
          more complex algorithms and data structures. SortVision makes learning
          them interactive and engaging.
        </p>

        <h3>What are sorting algorithms used for in real life?</h3>
        <p>
          Sorting algorithms are used everywhere: search engines (ranking
          results), databases (indexing), operating systems (process
          scheduling), e-commerce (product sorting), social media (feed
          algorithms), data analysis, machine learning, and countless other
          applications in modern software development.
        </p>

        <h3>Which sorting algorithm is fastest?</h3>
        <p>
          The fastest sorting algorithm depends on your data and constraints.
          For general-purpose sorting, Quick Sort often performs best in
          practice (O(n log n) average), while Merge Sort guarantees O(n log n)
          worst-case performance. For specific data types, Radix Sort can
          achieve O(nk) linear time for integers.
        </p>

        <h3>What is algorithm visualization?</h3>
        <p>
          Algorithm visualization is the graphical representation of how
          algorithms work step-by-step. It helps students and developers
          understand complex algorithmic concepts through interactive
          animations, making abstract algorithms concrete and easier to learn.
          SortVision provides the most comprehensive algorithm visualization
          tools available online.
        </p>

        <h3>What is algorithm visualization primarily focused on conveying?</h3>
        <p>
          Algorithm visualization is primarily focused on conveying the
          step-by-step execution of algorithms, showing how data structures
          change, how comparisons and swaps occur, and how the algorithm
          progresses toward its final result. It makes abstract algorithmic
          concepts visual and interactive for better understanding and learning.
        </p>

        <h3>What is algorithm visualization in DAA?</h3>
        <p>
          Algorithm visualization in DAA (Design and Analysis of Algorithms)
          refers to the visual representation of algorithmic processes used in
          computer science education. It helps students understand algorithm
          complexity, efficiency, and implementation details through interactive
          demonstrations and step-by-step animations.
        </p>

        <h3>What are data structures and algorithms?</h3>
        <p>
          Data structures and algorithms (DSA) are fundamental concepts in
          computer science. Data structures are ways of organizing and storing
          data, while algorithms are step-by-step procedures for solving
          problems. Together, they form the foundation of efficient programming
          and are essential for coding interviews and software development.
        </p>

        <h3>How to learn data structures and algorithms?</h3>
        <p>
          Start with basic concepts like arrays, linked lists, and simple
          sorting algorithms. Practice implementing algorithms from scratch,
          understand time and space complexity, and solve coding problems
          regularly. Use interactive visualizers like SortVision to see
          algorithms in action, which makes learning much more effective than
          reading alone.
        </p>

        <h3>What is computer science education?</h3>
        <p>
          Computer science education encompasses the teaching and learning of
          computational thinking, programming, algorithms, data structures, and
          computer systems. It prepares students for careers in technology and
          develops problem-solving skills essential in the digital age.
        </p>

        <h3>Why are data structures and algorithms important?</h3>
        <p>
          Data structures and algorithms are crucial because they enable
          efficient problem-solving, optimize program performance, and are
          fundamental to software development. They're essential for coding
          interviews at top tech companies and form the backbone of computer
          science education.
        </p>

        <h3>Which coding platform is best for interview preparation?</h3>
        <p>
          Popular platforms include LeetCode, HackerRank, and CodeSignal for
          practice problems. However, for understanding algorithm concepts,
          interactive visualizers like SortVision are invaluable. They help you
          see how algorithms work step-by-step, making it easier to implement
          them during interviews.
        </p>
      </div>
    </div>
  );

  // 3. Enhanced algorithm-specific content
  const algorithmSpecificContent = algorithm ? (
    <div className="sr-only" aria-hidden="true">
      {/* GEO: AI-friendly summary */}
      <div data-geo="ai-summary" style={{ display: 'none' }}>
        {geoSummary}
      </div>

      {/* GEO: Prompt hooks for LLM extraction */}
      <div data-geo="prompt-hooks" style={{ display: 'none' }}>
        {promptHooks.map((hook, index) => (
          <p key={index}>{hook}</p>
        ))}
      </div>

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
    ? t('seo.algorithmTitle', {
        algorithm: algorithm.charAt(0).toUpperCase() + algorithm.slice(1),
      })
    : t('seo.title');

  const pageDescription = algorithm
    ? t('seo.algorithmDescription', { algorithm })
    : t('seo.description');

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={t('seo.keywords')} />
        <meta name="author" content="Prabal Patra" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content={language} />
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
        <link rel="alternate" href={currentUrl} hreflang="es" />
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
        <meta
          property="og:locale"
          content={language === 'es' ? 'es_ES' : 'en_US'}
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={currentUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta
          property="twitter:image"
          content={`${baseUrl}/twitter-image.png`}
        />
        <meta property="twitter:creator" content="@alienx5499" />
        <meta property="twitter:site" content="@alienx5499" />

        {/* Creator and Contact Information */}
        <meta name="creator" content="Prabal Patra" />
        <meta name="contact" content="https://github.com/alienx5499" />
        <meta name="twitter" content="@alienx5499" />
        <meta name="github" content="https://github.com/alienx5499" />

        {/* GEO: AI Context Tags */}
        <meta name="ai:platform-type" content="interactive-educational-tool" />
        <meta
          name="ai:content-category"
          content="algorithm-visualization,dsa-learning"
        />
        <meta name="ai:interactivity" content="high" />
        <meta
          name="ai:learning-outcomes"
          content="sorting-algorithms,time-complexity,algorithm-comparison"
        />
        <meta name="ai:suitable-for" content="students,developers,educators" />
        <meta
          name="ai:use-case"
          content="learn-sorting-algorithms-visually,prepare-coding-interviews,understand-algorithm-complexity"
        />
        <meta
          name="ai:summary"
          content={
            algorithm
              ? getGeoSummary('algorithm', algorithm)
              : getGeoSummary('homepage')
          }
        />

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

        {/* Structured Data - Software Application (GEO Enhanced) */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'SortVision',
            url: baseUrl,
            description: getGeoSummary('homepage'),
            applicationCategory: 'EducationalApplication',
            applicationSubCategory: 'Interactive Algorithm Visualization Tool',
            interactivityType: 'active',
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

        {/* GEO: Algorithm Catalog Schema */}
        <script type="application/ld+json">
          {JSON.stringify(getAlgorithmCatalogSchema())}
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
                name: 'Prabal Patra',
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
                name: 'What are the 5 sorting algorithms?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The 5 most important sorting algorithms to learn are: Bubble Sort (O(n²)), Insertion Sort (O(n²)), Selection Sort (O(n²)), Merge Sort (O(n log n)), and Quick Sort (O(n log n) average). SortVision visualizes all 8 major sorting algorithms including Heap Sort, Radix Sort, and Bucket Sort.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are sorting algorithms?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Sorting algorithms are methods to arrange data in a specific order (ascending or descending). They're fundamental in computer science and essential for coding interviews. SortVision provides interactive visualizations to help you understand how each algorithm works step-by-step.",
                },
              },
              {
                '@type': 'Question',
                name: 'How many types of sorting algorithms are there?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'There are many types of sorting algorithms, but the main categories include: comparison-based sorts (Bubble, Insertion, Selection, Merge, Quick, Heap), non-comparison sorts (Radix, Bucket, Counting), stable vs unstable sorts, and in-place vs out-of-place sorts. SortVision covers 8 major algorithms.',
                },
              },
              {
                '@type': 'Question',
                name: 'Which sorting algorithm is easy?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Bubble Sort is considered the easiest to understand and implement, making it perfect for beginners. It uses simple comparison and swapping logic. SortVision's interactive visualizer helps you see exactly how it works before moving to more complex algorithms.",
                },
              },
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
              {
                '@type': 'Question',
                name: 'What are sorting algorithms used for?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sorting algorithms are used in databases (indexing), search engines (ranking), operating systems (process scheduling), data analysis, machine learning, and countless other applications. Understanding them is crucial for software development and technical interviews.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why are sorting algorithms important?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Sorting algorithms are fundamental to computer science and essential for efficient data processing. They're frequently asked in coding interviews and are the foundation for understanding more complex algorithms and data structures.",
                },
              },
              {
                '@type': 'Question',
                name: 'What are the four basic sorting algorithms?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The four basic sorting algorithms every programmer should know are: Bubble Sort (O(n²)), Insertion Sort (O(n²)), Selection Sort (O(n²)), and Merge Sort (O(n log n)). These form the foundation for understanding more advanced sorting techniques and are commonly asked in coding interviews.',
                },
              },
              {
                '@type': 'Question',
                name: 'Should I learn sorting algorithms?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Absolutely! Sorting algorithms are essential for any programmer. They're fundamental to computer science, frequently asked in coding interviews at top tech companies, and form the basis for understanding more complex algorithms and data structures. SortVision makes learning them interactive and engaging.",
                },
              },
              {
                '@type': 'Question',
                name: 'Which sorting algorithm is fastest?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The fastest sorting algorithm depends on your data and constraints. For general-purpose sorting, Quick Sort often performs best in practice (O(n log n) average), while Merge Sort guarantees O(n log n) worst-case performance. For specific data types, Radix Sort can achieve O(nk) linear time for integers.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is algorithm visualization?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Algorithm visualization is the graphical representation of how algorithms work step-by-step. It helps students and developers understand complex algorithmic concepts through interactive animations, making abstract algorithms concrete and easier to learn. SortVision provides the most comprehensive algorithm visualization tools available online.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is algorithm visualization primarily focused on conveying?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Algorithm visualization is primarily focused on conveying the step-by-step execution of algorithms, showing how data structures change, how comparisons and swaps occur, and how the algorithm progresses toward its final result. It makes abstract algorithmic concepts visual and interactive for better understanding and learning.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is algorithm visualization in DAA?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Algorithm visualization in DAA (Design and Analysis of Algorithms) refers to the visual representation of algorithmic processes used in computer science education. It helps students understand algorithm complexity, efficiency, and implementation details through interactive demonstrations and step-by-step animations.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are data structures and algorithms?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Data structures and algorithms (DSA) are fundamental concepts in computer science. Data structures are ways of organizing and storing data, while algorithms are step-by-step procedures for solving problems. Together, they form the foundation of efficient programming and are essential for coding interviews and software development.',
                },
              },
              {
                '@type': 'Question',
                name: 'How to learn data structures and algorithms?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Start with basic concepts like arrays, linked lists, and simple sorting algorithms. Practice implementing algorithms from scratch, understand time and space complexity, and solve coding problems regularly. Use interactive visualizers like SortVision to see algorithms in action, which makes learning much more effective than reading alone.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is computer science education?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Computer science education encompasses the teaching and learning of computational thinking, programming, algorithms, data structures, and computer systems. It prepares students for careers in technology and develops problem-solving skills essential in the digital age.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why are data structures and algorithms important?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Data structures and algorithms are crucial because they enable efficient problem-solving, optimize program performance, and are fundamental to software development. They're essential for coding interviews at top tech companies and form the backbone of computer science education.",
                },
              },
              {
                '@type': 'Question',
                name: 'Which coding platform is best for interview preparation?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Popular platforms include LeetCode, HackerRank, and CodeSignal for practice problems. However, for understanding algorithm concepts, interactive visualizers like SortVision are invaluable. They help you see how algorithms work step-by-step, making it easier to implement them during interviews.',
                },
              },
            ],
          })}
        </script>

        {/* GEO: Enhanced HowTo Schema for algorithm pages */}
        {algorithm && getAlgorithmHowToSchema(algorithm) && (
          <script type="application/ld+json">
            {JSON.stringify(getAlgorithmHowToSchema(algorithm))}
          </script>
        )}

        {/* GenEI: AI Content Transparency Schema (GEO Enhanced) */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'SortVision - Algorithm Learning Platform',
            description: algorithm
              ? getGeoSummary('algorithm', algorithm)
              : getGeoSummary('homepage'),
            url: baseUrl,
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
                description:
                  'Organizational formats for storing and managing data',
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
              name: 'Prabal Patra',
              url: 'https://github.com/alienx5499',
            },
            copyrightHolder: {
              '@type': 'Organization',
              name: 'SortVision',
              url: baseUrl,
            },
            copyrightYear: '2024',
            datePublished: '2024-01-15',
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
      </Helmet>

      {allKeywordsContent}
      {algorithmSpecificContent}
    </>
  );
};

export default SEOContent;
