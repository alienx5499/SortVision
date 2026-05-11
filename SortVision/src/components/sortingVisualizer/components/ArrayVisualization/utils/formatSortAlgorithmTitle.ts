import type { SortingAlgorithmId } from '@/components/sortingVisualizer/algorithmRegistry';

/** Title-case label for UI copy (e.g. "Bubble" → used with " Sort"). */
export function formatSortAlgorithmTitle(id: SortingAlgorithmId): string {
  return id.charAt(0).toUpperCase() + id.slice(1);
}
