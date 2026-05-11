export {
  default as SortingVisualizer,
  type SortingVisualizerHandle,
  type SortingVisualizerProps,
} from './SortingVisualizer';

export { useSortingController as useSortingVisualizerController } from './hooks';

export {
  useSortingRunner,
  useSortingNavigation,
  useVisualizerRouteSync,
  useVisualizerContextBridge,
  useVisualizerAudioEffects,
  useVisualizerMetricsState,
} from './hooks';

export {
  AlgorithmSelectorCard,
  AlgorithmBadge,
  AlgorithmIcon,
  AlgorithmSelectOptionIcon,
  AlgorithmVisualization,
  renderAlgorithmMiniVisualization,
  type AlgorithmVisualizationProps,
} from './components/AlgorithmSelector';

export {
  ALGORITHM_OPTIONS,
  BADGE_COMPLEXITY_TEXT_MAP,
  BADGE_GRADIENT_MAP,
  BADGE_THEME_MAP,
} from './components/AlgorithmSelector';

export { ControlButtons } from './components/ControlButtons';

export {
  default as ArrayVisualization,
  ArrayVisualizationView,
  type ArrayVisualizationProps,
  algorithmBackgroundTintClass,
  getArrayVizWatermarkClasses,
  getIdleBarGradientForAlgorithm,
  formatSortAlgorithmTitle,
  getBarLayoutMetrics,
  getBarStyleState,
  type BarLayoutMetrics,
  type BarStyleState,
} from './components/ArrayVisualization';

export type { SortingAlgorithmId } from './algorithmRegistry';
