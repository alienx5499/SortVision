export { default } from './SortingVisualizer';
export type {
  SortingVisualizerHandle,
  SortingVisualizerProps,
} from './SortingVisualizer';

export { default as SortingHeader } from './SortingHeader';
export { default as SortingControls } from './SortingControls';
export { default as PerformanceMetrics } from './PerformanceMetrics';
export { default as AudioControls } from './AudioControls';
export { usePerformanceMetrics } from './usePerformanceMetrics';

export type { SortingAlgorithmId } from './algorithmRegistry';
export {
  normalizeSortingAlgorithmId,
  SORTING_ALGORITHMS,
} from './algorithmRegistry';
export type { VisualizerBarHighlight } from './visualizerBarState';
