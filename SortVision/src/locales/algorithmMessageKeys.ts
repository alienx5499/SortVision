import type { SortingAlgorithmId } from '@/components/sortingVisualizer/algorithmRegistry';
import type { TranslationKey } from '@/config/translationKey';

export type AlgorithmFactKey = Extract<
  TranslationKey,
  `details.facts.${string}`
>;

export function algorithmFactKey(id: SortingAlgorithmId): AlgorithmFactKey {
  return `details.facts.${id}` as AlgorithmFactKey;
}
