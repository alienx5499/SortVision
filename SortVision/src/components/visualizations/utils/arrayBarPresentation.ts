import type { SortingAlgorithmId } from '@/components/sortingVisualizer/algorithmRegistry';
import type { VisualizerBarHighlight } from '@/components/sortingVisualizer/visualizerBarState';
import { getIdleBarGradientForAlgorithm } from '../arrayVisualizationTheme';

export type BarLayoutMetrics = {
  widthPercent: number;
  heightPx: number;
};

export function getBarLayoutMetrics(
  value: number,
  arrayLength: number
): BarLayoutMetrics {
  return {
    widthPercent: Math.max(100 / arrayLength - 1, 2),
    heightPx: Math.max(value * 2.5, 5),
  };
}

export type BarStyleState = {
  barColor: string;
  barGlow: string;
};

export function getBarStyleState(
  index: number,
  currentBar: VisualizerBarHighlight,
  displayedAlgorithm: SortingAlgorithmId,
  hoveredBarIndex: number | null
): BarStyleState {
  let barColor = 'bg-gradient-to-t from-blue-600 via-cyan-500 to-indigo-400';
  let barGlow = 'shadow-[0_0_10px_rgba(59,130,246,0.5)]';

  if (currentBar.compare === index) {
    barColor = 'bg-gradient-to-t from-amber-600 to-amber-400';
    barGlow = 'shadow-[0_0_12px_rgba(245,158,11,0.6)]';
  }
  if (currentBar.swap === index) {
    barColor = 'bg-gradient-to-t from-red-600 to-red-400';
    barGlow = 'shadow-[0_0_12px_rgba(239,68,68,0.6)]';
  }

  if (currentBar.compare !== index && currentBar.swap !== index) {
    barColor = getIdleBarGradientForAlgorithm(displayedAlgorithm);
  }

  if (hoveredBarIndex === index) {
    barGlow = 'shadow-[0_0_15px_rgba(255,255,255,0.7)]';
  }

  return { barColor, barGlow };
}
