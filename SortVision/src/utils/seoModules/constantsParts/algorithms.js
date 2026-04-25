/**
 * Sorting algorithm SEO metadata catalog.
 */

// Sorting algorithm information for SEO
export const algorithms = {
  bubble: {
    name: 'Bubble Sort',
    description:
      'A simple comparison sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
    complexity: 'O(n²)',
    keywords:
      'bubble sort, bubble sort visualization, bubble sort visualizer, bubble sort animation, bubble sort time complexity, sorting algorithms, sorting algorithm visualizer, sorting algorithms for beginners, sorting algorithms examples, algorithm visualizer, dsa sorting, data structures algorithms, comparison sort, swapping algorithm, in-place sorting algorithm, sorting animation, learn sorting, bubble sort tutorial, sorting algorithm visualization, computer science education, programming tutorial, sorting algorithms cheat sheet',
    seo_title:
      'Bubble Sort Visualization | Time Complexity & Animation | SortVision',
    seo_description:
      'Master Bubble Sort with interactive visualizations, animations, and time complexity analysis. Learn how this simple comparison-based sorting algorithm works step-by-step. Perfect for understanding O(n²) sorting algorithms with real-time performance metrics and examples.',
  },
  insertion: {
    name: 'Insertion Sort',
    description:
      'A simple sorting algorithm that builds the final sorted array one item at a time, by repeatedly taking the next unsorted item and inserting it into its correct position in the already sorted part.',
    complexity: 'O(n²)',
    keywords:
      'insertion sort visualization, insertion sort visualizer, insertion sort animation, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, efficient for small data sets, online algorithm, in-place sorting algorithm, sorting animation, learn sorting, insertion sort tutorial, computer science education, programming tutorial',
    seo_title:
      'Insertion Sort Visualization | Interactive Algorithm Learning | SortVision',
    seo_description:
      'Master Insertion Sort with interactive visualizations and animations. Learn how this adaptive sorting algorithm efficiently sorts small datasets. Perfect for understanding O(n²) sorting algorithms with real-time performance metrics.',
  },
  selection: {
    name: 'Selection Sort',
    description:
      'A sorting algorithm that repeatedly finds the minimum element from the unsorted part and puts it at the beginning of the unsorted part.',
    complexity: 'O(n²)',
    keywords:
      'selection sort visualization, selection sort visualizer, selection sort animation, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, in-place comparison sort, simple sorting algorithm, sorting animation, learn sorting, selection sort tutorial, computer science education, programming tutorial',
    seo_title:
      'Selection Sort Visualization | Interactive Algorithm Animation | SortVision',
    seo_description:
      'Master Selection Sort with interactive visualizations and animations. Learn how this simple in-place sorting algorithm finds the minimum element in each pass. Perfect for understanding O(n²) sorting algorithms with real-time performance metrics.',
  },
  merge: {
    name: 'Merge Sort',
    description:
      'An efficient, stable, divide-and-conquer sorting algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.',
    complexity: 'O(n log n)',
    keywords:
      'merge sort, sorting algorithms merge sort, merge sort visualization, merge sort animation, merge sort time complexity, sorting algorithms, sorting algorithm visualizer, sorting algorithms time complexity, sorting algorithms animation, sorting algorithms visualized, algorithm visualizer, dsa sorting, data structures algorithms, divide and conquer, efficient sorting, stable sort, sorting animation, learn sorting, merge sort tutorial, computer science education, programming tutorial, sorting algorithms examples, sorting algorithms python, sorting algorithms java',
    seo_title:
      'Merge Sort Visualizer | Time Complexity & Animation | SortVision',
    seo_description:
      'Master Merge Sort with interactive visualizations, animations, and time complexity analysis. Learn this efficient divide-and-conquer algorithm with step-by-step animation, performance tracking, and examples. Perfect for Python and Java developers.',
  },
  quick: {
    name: 'Quick Sort',
    description:
      'An efficient, in-place sorting algorithm that uses the divide-and-conquer strategy with a pivot element to partition the array.',
    complexity: 'O(n log n) average, O(n²) worst case',
    keywords:
      'quick sort, quick sort visualization, quick sort visualizer, quicksort visualization, quicksort visualizer, quick sort animation, quick sort time complexity, sorting algorithms, sorting algorithm visualizer, sorting algorithms time complexity, sorting algorithms animation, quick sort calculator, quick sort partition visualization, partition visualization, quick sort algorithm visualization, quick sort visual, quicksort visual, quicksort visualisation, quick sort visualisation, quick sort dsa, quicksort algorithm animation, quicksort algorithm visualization, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, pivot, partitioning, divide and conquer, efficient sorting, sorting animation, learn sorting, quick sort tutorial, computer science education, programming tutorial, sorting algorithms examples',
    seo_title:
      'Quick Sort Visualization | Time Complexity & Animation | SortVision',
    seo_description:
      'Master Quick Sort with interactive visualizations, animations, and time complexity analysis. Learn how this efficient divide-and-conquer algorithm uses pivot elements and partitioning. Perfect for understanding O(n log n) sorting algorithms with real-time performance metrics and examples.',
  },
  heap: {
    name: 'Heap Sort',
    description:
      'A comparison-based sorting algorithm that uses a binary heap data structure to build a heap and then repeatedly extracts the maximum element.',
    complexity: 'O(n log n)',
    keywords:
      'heap sort algorithm visualization, heap sort visualization, heap sort visualizer, heap sort animation, heapsort visualization, heapify animation, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, binary heap, efficient sorting, in-place algorithm, sorting animation, learn sorting, heap sort tutorial, computer science education, programming tutorial',
    seo_title:
      'Heap Sort Visualization | Binary Heap-Based Algorithm | SortVision',
    seo_description:
      'Master Heap Sort with interactive visualizations and animations. Learn how this binary heap-based algorithm efficiently sorts data with O(n log n) complexity. Perfect for understanding heap data structures and sorting algorithms.',
  },
  radix: {
    name: 'Radix Sort',
    description:
      'A non-comparative integer sorting algorithm that sorts data by processing individual digits, starting from the least significant digit to the most significant.',
    complexity: 'O(nk) where k is the number of digits',
    keywords:
      'radix sort visualization, radix sort visualizer, radix sort animation, radix sort online, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, digit-by-digit sort, non-comparative sort, linear time, sorting animation, learn sorting, radix sort tutorial, computer science education, programming tutorial, radix sort gif, radix sort calculator, radix sort algo, radix sort algorithms, radix sort worst case time complexity, radix sort big o',
    seo_title:
      'Radix Sort Visualization | Interactive Radix Sort Algorithm | SortVision',
    seo_description:
      'Master Radix Sort with interactive visualizations and animations. Learn how this non-comparative sorting algorithm processes data digit by digit. Perfect for understanding linear-time sorting algorithms with real-time performance metrics.',
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
