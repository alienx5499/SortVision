import type { SortingAlgorithmId } from '@/components/sortingVisualizer/algorithmRegistry';

const CATEGORY_STYLES = {
  efficient: {
    name: 'Efficient Sorts',
    color: 'text-green-500',
    hover: 'text-green-400',
  },
  special: {
    name: 'Special Sorts',
    color: 'text-cyan-500',
    hover: 'text-cyan-400',
  },
  basic: {
    name: 'Basic Sorts',
    color: 'text-red-500',
    hover: 'text-red-400',
  },
  other: {
    name: 'Other Sorts',
    color: 'text-slate-500',
    hover: 'text-slate-400',
  },
} as const;

type CategoryId = keyof typeof CATEGORY_STYLES;

const ALGORITHM_CATEGORY_BY_ID: Partial<
  Record<SortingAlgorithmId, CategoryId>
> = {
  quick: 'efficient',
  merge: 'efficient',
  heap: 'efficient',
  radix: 'special',
  bucket: 'special',
  insertion: 'basic',
  selection: 'basic',
  bubble: 'basic',
};

export type AlgorithmCategoryStyle = (typeof CATEGORY_STYLES)[CategoryId];

export const getAlgorithmCategory = (
  algorithmId: string | undefined
): AlgorithmCategoryStyle => {
  if (!algorithmId) return CATEGORY_STYLES.other;
  const categoryId =
    ALGORITHM_CATEGORY_BY_ID[algorithmId as SortingAlgorithmId] ?? 'other';
  return CATEGORY_STYLES[categoryId];
};
