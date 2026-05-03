import type { ComponentType, ReactNode } from 'react';
import type { SortingAlgorithmId } from '@/components/sortingVisualizer/algorithmRegistry';
import type { VisualizerBarHighlight } from '@/components/sortingVisualizer/visualizerBarState';
import type { PanelTranslate } from '../shared/panelTranslate';

/** Single-run counters + duration (metrics tab + ranking cards). */
export type SortRunMetrics = {
  swaps: number;
  comparisons: number;
  time: string | number;
};

/** One row from “test all” / comparison state (includes rank from controller). */
export type SortedMetricListEntry = {
  algo: string;
  metrics: SortRunMetrics;
  rank: number;
};

export type MetricsTranslate = PanelTranslate;

export type MetricsPanelProps = {
  metrics: SortRunMetrics;
  sortedMetrics: SortedMetricListEntry[];
  isSorting: boolean;
  currentTestingAlgo: SortingAlgorithmId | null;
  testAllAlgorithms: () => void | Promise<void>;
  stopSorting: () => void;
  algorithm: SortingAlgorithmId;
  array: number[];
  currentBar: VisualizerBarHighlight;
  isStopped: boolean;
};

export type CurrentRunMetricsProps = {
  metrics: SortRunMetrics;
  sortedMetrics: SortedMetricListEntry[];
  algorithm: SortingAlgorithmId;
  array: number[];
};

export type AlgorithmComparisonProps = {
  sortedMetrics: SortedMetricListEntry[];
  isSorting: boolean;
  currentTestingAlgo: SortingAlgorithmId | null;
  testAllAlgorithms: () => void | Promise<void>;
  stopSorting: () => void;
  algorithm: SortingAlgorithmId;
};

export type TestControlsProps = {
  isSorting: boolean;
  currentTestingAlgo: SortingAlgorithmId | null;
  testAllAlgorithms: () => void | Promise<void>;
  stopSorting: () => void;
};

export type RankingCardProps = {
  algo: string;
  metrics: SortRunMetrics;
  rank: number;
  algorithm: SortingAlgorithmId;
  currentAlgoMetrics: SortRunMetrics | undefined;
};

export type RankingCardMetricsRowProps = {
  Icon: ComponentType<{ className?: string }>;
  label: string;
  value: ReactNode;
};
