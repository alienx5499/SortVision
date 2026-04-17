// Enhanced helper functions for better chat handling
export const ALGORITHM_DATA = {
  bubbleSort: {
    name: 'Bubble Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description:
      'Compares adjacent elements and swaps them if they are in wrong order. Repeats until array is sorted.',
    bestFor: 'Educational purposes and small datasets',
    steps:
      'Compare adjacent elements → Swap if needed → Move to next pair → Repeat until no swaps needed',
  },
  mergeSort: {
    name: 'Merge Sort',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description:
      'Divides array into halves, sorts them recursively, then merges sorted halves.',
    bestFor: 'Large datasets and when stable sorting is needed',
    steps:
      'Divide array in half → Sort left half → Sort right half → Merge sorted halves',
  },
  quickSort: {
    name: 'Quick Sort',
    timeComplexity: 'O(n log n) average, O(n²) worst',
    spaceComplexity: 'O(log n)',
    description:
      'Picks a pivot element and partitions array around it, then sorts partitions recursively.',
    bestFor: 'General purpose sorting with good average performance',
    steps:
      'Choose pivot → Partition array around pivot → Recursively sort left partition → Recursively sort right partition',
  },
  heapSort: {
    name: 'Heap Sort',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    description:
      'Builds a max heap from array, then repeatedly extracts maximum element.',
    bestFor: 'When consistent O(n log n) performance is needed',
    steps:
      'Build max heap → Extract max (root) → Restore heap property → Repeat until array is sorted',
  },
  insertionSort: {
    name: 'Insertion Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description:
      'Builds sorted array one element at a time by inserting each element into its correct position.',
    bestFor: 'Small datasets and nearly sorted arrays',
    steps:
      'Start with second element → Compare with previous elements → Insert in correct position → Move to next element',
  },
  selectionSort: {
    name: 'Selection Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description:
      'Finds minimum element and places it at the beginning, then repeats for remaining array.',
    bestFor: 'Situations where memory writes are costly',
    steps:
      'Find minimum element → Swap with first element → Find minimum in remaining array → Repeat',
  },
  radixSort: {
    name: 'Radix Sort',
    timeComplexity: 'O(d × n)',
    spaceComplexity: 'O(n + k)',
    description:
      'Sorts numbers digit by digit, starting from least significant digit.',
    bestFor: 'Sorting integers or fixed-length strings',
    steps:
      'Sort by least significant digit → Move to next digit → Repeat until all digits processed',
  },
  bucketSort: {
    name: 'Bucket Sort',
    timeComplexity: 'O(n + k)',
    spaceComplexity: 'O(n)',
    description:
      'Distributes elements into buckets, sorts each bucket, then concatenates buckets.',
    bestFor: 'Uniformly distributed data',
    steps:
      'Create buckets → Distribute elements into buckets → Sort each bucket → Concatenate buckets',
  },
};
