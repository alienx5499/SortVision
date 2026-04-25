/**
 * GEO summaries and prompt extraction hooks.
 */

import { algorithms } from './constants';

/**
 * GEO: Generate AI-friendly summary for SortVision
 * @param {string} context - Context: 'homepage', 'algorithm', 'comparison'
 * @param {string} algorithmName - Optional algorithm name
 * @returns {string} - AI-friendly natural language summary
 */
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
    return `SortVision allows side-by-side comparison of sorting algorithms. You can visualize multiple algorithms simultaneously, comparing their execution time, number of comparisons, and visual behavior with the same input data. Perfect for understanding algorithm trade-offs and performance characteristics.`;
  }

  return getGeoSummary('homepage');
};

/**
 * GEO: Generate prompt hooks - natural language statements for LLM extraction
 * @param {string} context - Context: 'homepage', 'algorithm'
 * @param {string} algorithmName - Optional algorithm name
 * @returns {Array<string>} - Array of natural language prompt hooks
 */
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
