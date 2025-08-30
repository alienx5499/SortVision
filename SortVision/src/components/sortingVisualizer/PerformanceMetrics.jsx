import React from 'react';

/**
 * PerformanceMetrics Component
 *
 * Provides utility functions for algorithm performance metrics:
 * - Time complexity information
 * - Space complexity data
 * - Performance characteristics
 */
const PerformanceMetrics = () => {
  /**
   * Provides algorithm complexity and performance characteristics
   *
   * @param {string} algorithm - The algorithm to get metrics for
   * @returns {Object} Complexity data for the algorithm
   */
  const getAlgorithmTimeComplexity = algorithm => {
    const complexities = {
      bubble: {
        best: 'O(n)',
        average: 'O(n²)',
        worst: 'O(n²)',
        space: 'O(1)',
        description:
          'Simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
        efficiency: 'low',
        color: 'red',
      },
      insertion: {
        best: 'O(n)',
        average: 'O(n²)',
        worst: 'O(n²)',
        space: 'O(1)',
        description:
          'Builds the sorted array one item at a time by comparing each new element with the already sorted elements and inserting it into the correct position.',
        efficiency: 'medium-low',
        color: 'orange',
      },
      selection: {
        best: 'O(n²)',
        average: 'O(n²)',
        worst: 'O(n²)',
        space: 'O(1)',
        description:
          'Repeatedly finds the minimum element from the unsorted part and puts it at the beginning of the unsorted part.',
        efficiency: 'low',
        color: 'red',
      },
      quick: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n²)',
        space: 'O(log n)',
        description:
          "Divide-and-conquer algorithm that picks a 'pivot' element and partitions the array around the pivot, recursively sorting the sub-arrays.",
        efficiency: 'high',
        color: 'green',
      },
      merge: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
        space: 'O(n)',
        description:
          'Divide-and-conquer algorithm that divides the array into two halves, sorts them separately, and then merges the sorted halves.',
        efficiency: 'high',
        color: 'green',
      },
      radix: {
        best: 'O(nk)',
        average: 'O(nk)',
        worst: 'O(nk)',
        space: 'O(n+k)',
        description:
          'Non-comparative sorting algorithm that sorts data with integer keys by grouping keys by individual digits which share the same position and value.',
        efficiency: 'high',
        color: 'green',
      },
      heap: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
        space: 'O(1)',
        description:
          'Comparison-based sorting algorithm that uses a binary heap data structure to sort elements. It builds a max heap and repeatedly extracts the maximum element.',
        efficiency: 'high',
        color: 'indigo',
      },
      bucket: {
        best: 'O(n+k)',
        average: 'O(n+k)',
        worst: 'O(n²)',
        space: 'O(n+k)',
        description:
          'Distribution sort that works by distributing elements into a number of buckets, sorting each bucket individually, and then concatenating the buckets.',
        efficiency: 'medium-high',
        color: 'pink',
      },
    };
    return complexities[algorithm];
  };

  // Export the utility functions
  return {
    getAlgorithmTimeComplexity,
  };
};

export default PerformanceMetrics;
