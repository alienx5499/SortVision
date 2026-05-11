import type { SortingAlgorithmId } from '@/components/sortingVisualizer/algorithmRegistry';

export function getArrayVizWatermarkClasses(algorithm: SortingAlgorithmId): {
  text: string;
  glow: string;
} {
  switch (algorithm) {
    case 'bubble':
      return { text: 'text-red-400', glow: 'shadow-red-500/30' };
    case 'insertion':
      return { text: 'text-orange-400', glow: 'shadow-orange-500/30' };
    case 'selection':
      return { text: 'text-yellow-400', glow: 'shadow-yellow-500/30' };
    case 'quick':
      return { text: 'text-green-400', glow: 'shadow-green-500/30' };
    case 'merge':
      return { text: 'text-blue-400', glow: 'shadow-blue-500/30' };
    case 'radix':
      return { text: 'text-purple-400', glow: 'shadow-purple-500/30' };
    case 'heap':
      return { text: 'text-indigo-400', glow: 'shadow-indigo-500/30' };
    case 'bucket':
      return { text: 'text-pink-400', glow: 'shadow-pink-500/30' };
    default:
      return { text: 'text-emerald-400', glow: 'shadow-emerald-500/30' };
  }
}

const IDLE_BAR_BY_ALGO: Record<SortingAlgorithmId, string> = {
  bubble: 'bg-gradient-to-t from-blue-600 via-cyan-500 to-indigo-400',
  insertion: 'bg-gradient-to-t from-indigo-600 via-blue-500 to-cyan-400',
  selection: 'bg-gradient-to-t from-cyan-600 via-blue-500 to-indigo-400',
  quick: 'bg-gradient-to-t from-blue-600 via-indigo-500 to-cyan-400',
  merge: 'bg-gradient-to-t from-indigo-600 via-blue-500 to-cyan-400',
  radix: 'bg-gradient-to-t from-blue-600 via-cyan-500 to-indigo-400',
  heap: 'bg-gradient-to-t from-indigo-600 via-blue-500 to-cyan-400',
  bucket: 'bg-gradient-to-t from-blue-600 via-indigo-500 to-cyan-400',
};

export function getIdleBarGradientForAlgorithm(
  displayedAlgorithm: SortingAlgorithmId
): string {
  return (
    IDLE_BAR_BY_ALGO[displayedAlgorithm] ??
    'bg-gradient-to-t from-blue-600 via-cyan-500 to-indigo-400'
  );
}

const BG_TINT_BY_ALGO: Partial<Record<SortingAlgorithmId, string>> = {
  bubble: 'from-red-500/10',
  insertion: 'from-orange-500/10',
  selection: 'from-amber-500/10',
  quick: 'from-green-500/10',
  merge: 'from-blue-500/10',
  radix: 'from-cyan-500/10',
  heap: 'from-indigo-500/10',
  bucket: 'from-pink-500/10',
};

export function algorithmBackgroundTintClass(
  displayedAlgorithm: SortingAlgorithmId
): string | null {
  const tint = BG_TINT_BY_ALGO[displayedAlgorithm];
  return tint ? `bg-gradient-to-t ${tint} to-transparent` : null;
}
