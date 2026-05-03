import type { SortingAlgorithmId } from '@/components/sortingVisualizer/algorithmRegistry';
import type { VisualizerBarHighlight } from '@/components/sortingVisualizer/visualizerBarState';
import type { PanelTranslate } from '../shared/panelTranslate';

export type DetailsTranslate = PanelTranslate;

/** Selector strip in the details tab (distinct from config panel selector). */
export type DetailsAlgorithmSelectorProps = {
  algorithm: SortingAlgorithmId;
  setAlgorithm: (id: SortingAlgorithmId) => void;
};

export type DataPanelProps = DetailsAlgorithmSelectorProps & {
  array: number[];
  currentBar: VisualizerBarHighlight;
  isSorting: boolean;
  currentTestingAlgo: string | null;
  isStopped: boolean;
};

export type DetailsPanelProps = DataPanelProps;

export type DetailsAlgorithmProps = {
  algorithm: SortingAlgorithmId;
};
