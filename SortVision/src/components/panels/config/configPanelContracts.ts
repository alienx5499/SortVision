import { useAudio } from '@/hooks/useAudio';
import type { SortingAlgorithmId } from '@/components/sortingVisualizer/algorithmRegistry';
import type { AlgorithmComplexityProfile } from '@/components/sortingVisualizer/usePerformanceMetrics';
import type { VisualizerBarHighlight } from '@/components/sortingVisualizer/visualizerBarState';

/** Alias for panel consumers; same shape as {@link VisualizerBarHighlight}. */
export type ConfigPanelCurrentBar = VisualizerBarHighlight;

/** Audio API surface used by config controls (stable contract vs full hook return). */
export type ConfigPanelAudio = ReturnType<typeof useAudio>;

export type AlgorithmSelectorProps = {
  algorithm: SortingAlgorithmId;
  setAlgorithm: (algorithm: SortingAlgorithmId) => void;
  isSorting: boolean;
  audio: ConfigPanelAudio;
};

export type ComplexityInfoProps = {
  getAlgorithmTimeComplexity: () => AlgorithmComplexityProfile | undefined;
};

export type ArraySizeControlProps = {
  arraySize: number;
  setArraySize: (size: number) => void;
  isSorting: boolean;
};

export type SpeedControlProps = {
  speed: number;
  setSpeed: (ms: number) => void;
  isSorting: boolean;
  audio: ConfigPanelAudio;
};

export type ControlButtonsProps = {
  generateNewArray: () => void;
  startSorting: () => void | Promise<void>;
  stopSorting: () => void;
  isSorting: boolean;
};

export type ConfigPanelProps = {
  algorithm: SortingAlgorithmId;
  setAlgorithm: (algorithm: SortingAlgorithmId) => void;
  arraySize: number;
  setArraySize: (size: number) => void;
  speed: number;
  setSpeed: (ms: number) => void;
  isSorting: boolean;
  getAlgorithmTimeComplexity: () => AlgorithmComplexityProfile | undefined;
  array: number[];
  currentBar: ConfigPanelCurrentBar;
  currentTestingAlgo: string | null;
  isStopped: boolean;
  generateNewArray: () => void;
  startSorting: () => void | Promise<void>;
  stopSorting: () => void;
  audio: ConfigPanelAudio;
};
