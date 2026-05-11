'use client';

import type { ArrayVisualizationProps } from './arrayVisualizationContracts';
import { ArrayVisualizationView } from './sections/ArrayVisualizationView';

export default function ArrayVisualization(props: ArrayVisualizationProps) {
  return <ArrayVisualizationView {...props} />;
}

export type { ArrayVisualizationProps } from './arrayVisualizationContracts';
