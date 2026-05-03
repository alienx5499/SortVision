/**
 * File purpose: Centralized SEO detail map for per-algorithm hidden content.
 */
export const ALGORITHM_DETAILS = {
  bubble: {
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
    useCases: ['Small datasets', 'Nearly sorted data', 'Teaching purposes'],
    realWorldUse: [
      'Early computer science education',
      'Embedded systems with tiny datasets',
    ],
    interviewTips: [
      'Mention the early-termination optimization for O(n) best case.',
      'Explain why bubble sort is rarely used in production systems.',
    ],
    whyLearnFirst:
      'Bubble Sort is the ideal starting point because its comparison-and-swap logic introduces core sorting mechanics with minimal abstraction.',
    commonMistakes: [
      'Forgetting the early-termination flag that enables O(n) best-case performance.',
      'Assuming bubble sort is practical for production workloads beyond tiny or nearly sorted datasets.',
    ],
  },
  insertion: {
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
    useCases: [
      'Small arrays in hybrid sorts',
      'Nearly sorted datasets',
      'Online incremental inserts',
    ],
    realWorldUse: [
      'Library sort fallbacks for tiny partitions',
      'Streaming data insertion pipelines',
    ],
    interviewTips: [
      'Highlight strong performance on nearly sorted arrays.',
      'Compare insertion sort trade-offs against selection sort.',
    ],
    whyLearnFirst:
      'Insertion Sort is beginner-friendly because it mirrors how humans sort cards and builds intuition for incremental ordering.',
    commonMistakes: [
      'Ignoring that insertion sort can run in O(n) on nearly sorted input.',
      'Confusing insertion sort with selection sort swap behavior and write count.',
    ],
  },
  selection: {
    timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
    useCases: [
      'When minimizing swaps is important',
      'Very small in-memory datasets',
      'Teaching in-place sorting concepts',
    ],
    realWorldUse: [
      'Write-sensitive memory scenarios',
      'Low-level systems examples in education',
    ],
    interviewTips: [
      'State that comparisons stay O(n²) regardless of input order.',
      'Explain why fewer writes can still make it useful in niche cases.',
    ],
    whyLearnFirst:
      'Selection Sort is useful early for understanding deterministic pass-by-pass minimization and in-place selection.',
    commonMistakes: [
      'Claiming best-case time is faster than O(n²) when comparisons remain unchanged.',
      'Assuming selection sort is stable without explicitly preserving equal-key order.',
    ],
  },
  merge: {
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: false,
    useCases: [
      'Large datasets with stable ordering requirements',
      'Linked-list sorting',
      'External sorting on disk',
    ],
    realWorldUse: [
      'Database merge operations',
      'Distributed batch processing frameworks',
    ],
    interviewTips: [
      'Call out guaranteed O(n log n) complexity.',
      'Discuss extra memory trade-off versus quick sort.',
    ],
    whyLearnFirst:
      'Merge Sort is a strong first divide-and-conquer algorithm because its recursion pattern is regular and predictable.',
    commonMistakes: [
      'Forgetting to mention O(n) auxiliary space in array-based implementations.',
      'Confusing stable merge behavior with unstable in-place partitioning algorithms.',
    ],
  },
  quick: {
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(log n)',
    stable: false,
    inPlace: true,
    useCases: [
      'General-purpose in-memory sorting',
      'High-performance average-case workloads',
      'Partition-based selection problems',
    ],
    realWorldUse: [
      'Language runtime sort implementations',
      'Analytics pipelines with randomized pivoting',
    ],
    interviewTips: [
      'Explain how pivot strategy impacts worst-case behavior.',
      'Mention randomization or median-of-three to reduce O(n²) risk.',
    ],
    whyLearnFirst:
      'Quick Sort is a great step after basics because it teaches partitioning, pivots, and practical average-case optimization.',
    commonMistakes: [
      'Stating quick sort is always O(n log n) and omitting O(n²) worst case.',
      'Skipping pivot strategy discussion and recursion depth implications.',
    ],
  },
  heap: {
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
    useCases: [
      'Memory-constrained environments',
      'Priority queue backed workflows',
      'Deterministic worst-case requirements',
    ],
    realWorldUse: [
      'Job schedulers and task queues',
      'Top-k and streaming ranking systems',
    ],
    interviewTips: [
      'Differentiate heap sort from heap-based priority queue operations.',
      'Contrast predictable worst-case with quick sort average speed.',
    ],
    whyLearnFirst:
      'Heap Sort should be learned early for interviews because it connects array indexing with tree semantics and guaranteed O(n log n).',
    commonMistakes: [
      'Confusing heap construction O(n) with repeated insert O(n log n) build.',
      'Assuming heap sort is stable without preserving equal-element order.',
    ],
  },
  radix: {
    timeComplexity: { best: 'O(nk)', average: 'O(nk)', worst: 'O(nk)' },
    spaceComplexity: 'O(n + k)',
    stable: true,
    inPlace: false,
    useCases: [
      'Fixed-length integer keys',
      'Large numeric datasets',
      'String sorting with bounded alphabet',
    ],
    realWorldUse: [
      'Postal and record sorting systems',
      'Telemetry processing with integer identifiers',
    ],
    interviewTips: [
      'Clarify dependency on digit count and base size.',
      'Emphasize that radix sort is non-comparative and often stable.',
    ],
    whyLearnFirst:
      'Radix Sort is a key non-comparative algorithm to learn once core comparison sorts are understood.',
    commonMistakes: [
      'Claiming radix sort beats comparison sorts for all data types and domains.',
      'Ignoring that stability of the inner pass is required for correctness.',
    ],
  },
  bucket: {
    timeComplexity: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n²)' },
    spaceComplexity: 'O(n + k)',
    stable: false,
    inPlace: false,
    useCases: [
      'Uniformly distributed values',
      'Floating-point values in bounded ranges',
      'Parallelized pre-bucketing workflows',
    ],
    realWorldUse: [
      'Data normalization pipelines',
      'Histogram and distribution-based analytics',
    ],
    interviewTips: [
      'State that performance depends heavily on data distribution.',
      'Explain fallback behavior when buckets become unbalanced.',
    ],
    whyLearnFirst:
      'Bucket Sort is valuable to learn for understanding how distribution assumptions can drastically improve practical performance.',
    commonMistakes: [
      'Assuming average-case behavior holds even for highly skewed data.',
      'Forgetting to describe the per-bucket sorting strategy and its impact.',
    ],
  },
};
