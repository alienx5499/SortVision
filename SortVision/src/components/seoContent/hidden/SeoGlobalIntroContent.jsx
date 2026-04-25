import React from 'react';
/**
 * File purpose: Renders introductory hidden SEO content and core value statements.
 */

export const SeoGlobalIntroContent = ({
  algorithm,
  geoSummary,
  promptHooks,
}) => (
  <>
    <div data-geo="ai-summary" style={{ display: 'none' }}>
      {!algorithm && geoSummary}
    </div>

    {!algorithm && (
      <div data-geo="prompt-hooks" style={{ display: 'none' }}>
        {promptHooks.map((hook, index) => (
          <p key={index}>{hook}</p>
        ))}
      </div>
    )}

    {!algorithm && (
      <h1>
        SortVision: Interactive Sorting Algorithms Visualizer | Time Complexity
        & Animation
      </h1>
    )}

    <div itemScope itemType="https://schema.org/EducationalResource">
      <meta itemProp="educationalUse" content="instruction" />
      <meta
        itemProp="educationalLevel"
        content="beginner, intermediate, advanced"
      />
      <meta itemProp="learningResourceType" content="interactive simulation" />
      <meta itemProp="isAccessibleForFree" content="true" />

      <p itemProp="description">
        SortVision is the world's leading sorting algorithm visualizer and
        interactive DSA learning platform, offering in-depth educational
        visualizations, animations, and time complexity analysis for merge sort,
        quick sort, heap sort, bubble sort, insertion sort, selection sort,
        radix sort, and bucket sort. Whether you're studying data structures and
        algorithms (DSA), preparing for coding interviews at Google, Amazon,
        Microsoft, or teaching computer science, SortVision provides real-time
        step-by-step animations, performance metrics, complexity analysis, and
        interactive learning for every major sorting algorithm technique.
        Perfect for beginners learning sorting algorithms with examples and
        comprehensive tutorials.
      </p>

      <h2>Complete Sorting Algorithm Visualizer for DSA Education</h2>
      <ul>
        <li>
          Merge Sort algorithm visualizer: divide-and-conquer demonstration with
          recursive subarray merging and O(n log n) analysis - Perfect for
          Python and Java developers
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
    </div>
  </>
);
