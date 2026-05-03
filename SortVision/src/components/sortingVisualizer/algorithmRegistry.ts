import {
  bubbleSort,
  insertionSort,
  selectionSort,
  quickSort,
  mergeSort,
  radixSort,
  heapSort,
  bucketSort,
} from '@/algorithms';

export const SORTING_ALGORITHM_REGISTRY = {
  bubble: bubbleSort,
  insertion: insertionSort,
  selection: selectionSort,
  quick: quickSort,
  merge: mergeSort,
  radix: radixSort,
  heap: heapSort,
  bucket: bucketSort,
} as const;

export type SortingAlgorithmId = keyof typeof SORTING_ALGORITHM_REGISTRY;

export const SORTING_ALGORITHMS = Object.keys(
  SORTING_ALGORITHM_REGISTRY
) as SortingAlgorithmId[];

const DEFAULT_ALGORITHM_ID: SortingAlgorithmId = 'bubble';

/** Coerce route or UI input to a supported algorithm id (production-safe fallback). */
export function normalizeSortingAlgorithmId(raw: string): SortingAlgorithmId {
  if (raw in SORTING_ALGORITHM_REGISTRY) {
    return raw as SortingAlgorithmId;
  }
  return DEFAULT_ALGORITHM_ID;
}
