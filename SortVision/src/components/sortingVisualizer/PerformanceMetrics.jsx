import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * PerformanceMetrics Component
 *
 * Provides utility functions for algorithm performance metrics:
 * - Time complexity information
 * - Space complexity data
 * - Performance characteristics
 */
const PerformanceMetrics = () => {
  const { t } = useLanguage();
  
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
        description: t('algorithms.bubble.description'),
        efficiency: 'low',
        color: 'red',
      },
      insertion: {
        best: 'O(n)',
        average: 'O(n²)',
        worst: 'O(n²)',
        space: 'O(1)',
        description: t('algorithms.insertion.description'),
        efficiency: 'medium-low',
        color: 'orange',
      },
      selection: {
        best: 'O(n²)',
        average: 'O(n²)',
        worst: 'O(n²)',
        space: 'O(1)',
        description: t('algorithms.selection.description'),
        efficiency: 'low',
        color: 'red',
      },
      quick: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n²)',
        space: 'O(log n)',
        description: t('algorithms.quick.description'),
        efficiency: 'high',
        color: 'green',
      },
      merge: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
        space: 'O(n)',
        description: t('algorithms.merge.description'),
        efficiency: 'high',
        color: 'green',
      },
      radix: {
        best: 'O(nk)',
        average: 'O(nk)',
        worst: 'O(nk)',
        space: 'O(n+k)',
        description: t('algorithms.radix.description'),
        efficiency: 'high',
        color: 'green',
      },
      heap: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
        space: 'O(1)',
        description: t('algorithms.heap.description'),
        efficiency: 'high',
        color: 'indigo',
      },
      bucket: {
        best: 'O(n+k)',
        average: 'O(n+k)',
        worst: 'O(n²)',
        space: 'O(n+k)',
        description: t('algorithms.bucket.description'),
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
