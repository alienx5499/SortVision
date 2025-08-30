// Export all panel components for easier imports
export { default as ConfigPanel } from './ConfigPanel';
export { default as MetricsPanel } from './MetricsPanel';
export { default as DetailsPanel } from './DetailsPanel';
export { default as ContributionPanel } from './ContributionPanel';
export { default as ArrayVisualization } from '../visualizations/ArrayVisualization';

// Export config components
export { default as ConfigAlgorithmSelector } from './config/AlgorithmSelector';
export { default as ComplexityInfo } from './config/ComplexityInfo';
export { default as ArraySizeControl } from './config/ArraySizeControl';
export { default as SpeedControl } from './config/SpeedControl';
export { default as ControlButtons } from './config/ControlButtons';

// Export metrics components
export { default as CurrentRunMetrics } from './metrics/CurrentRunMetrics';
export { default as AlgorithmComparison } from './metrics/AlgorithmComparison';
export { default as TestControls } from './metrics/TestControls';
export { default as RankingCard } from './metrics/RankingCard';
export { default as WinnerSummary } from './metrics/WinnerSummary';

// Export details components
export { default as DetailsAlgorithmSelector } from './details/AlgorithmSelector';
export { default as AlgorithmDetails } from './details/AlgorithmDetails';
export { default as AlgorithmInfo } from './details/AlgorithmInfo';
export { default as InteractiveTip } from './details/InteractiveTip';
export { default as FunFact } from './details/FunFact';
export { default as DataPanel } from './details/DataPanel';

// Export contribution components
export {
  ContributorStats,
  ContributorList,
  ContributeGuide,
  QuickReferences,
} from './contributions';
