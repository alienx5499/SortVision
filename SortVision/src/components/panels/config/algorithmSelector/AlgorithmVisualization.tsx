'use client';

import type { SortingAlgorithmId } from '@/components/sortingVisualizer/algorithmRegistry';
import { renderAlgorithmMiniVisualization } from './AlgorithmVisualizationViews';

export type AlgorithmVisualizationProps = {
  algorithm: SortingAlgorithmId;
};

export default function AlgorithmVisualization({
  algorithm,
}: AlgorithmVisualizationProps) {
  return (
    <div className="mt-4 flex justify-center h-16 relative">
      {renderAlgorithmMiniVisualization(algorithm)}
    </div>
  );
}
