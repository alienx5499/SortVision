'use client';

import { useMemo } from 'react';
import type { SortingAlgorithmId } from '@/components/sortingVisualizer/algorithmRegistry';
import { renderAlgorithmMiniVisualization } from './AlgorithmVisualizationViews';

export type AlgorithmVisualizationProps = {
  algorithm: SortingAlgorithmId;
};

export default function AlgorithmVisualization({
  algorithm,
}: AlgorithmVisualizationProps) {
  const visualization = useMemo(
    () => renderAlgorithmMiniVisualization(algorithm),
    [algorithm]
  );

  return (
    <div
      key={algorithm}
      className="mt-4 flex justify-center h-16 relative [&_*]:transition-none"
    >
      {visualization}
    </div>
  );
}
