import type { SortingAlgorithmId } from '@/components/sortingVisualizer/algorithmRegistry';
import type { VisualizerBarHighlight } from '@/components/sortingVisualizer/visualizerBarState';

export type ArrayVisualizationProps = {
  algorithm: SortingAlgorithmId;
  array: number[];
  currentBar: VisualizerBarHighlight;
  isSorting: boolean;
  isPaused?: boolean;
  currentTestingAlgo?: SortingAlgorithmId | null;
  isStopped: boolean;
  height?: string;
};
