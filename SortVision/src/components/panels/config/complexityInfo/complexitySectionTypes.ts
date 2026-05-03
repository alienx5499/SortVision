import type { AlgorithmComplexityProfile } from '@/components/sortingVisualizer/usePerformanceMetrics';
import type { PanelTranslate } from '../../shared/panelTranslate';

export type ComplexityTranslate = PanelTranslate;

export type ComplexitySectionProps = {
  complexity: AlgorithmComplexityProfile;
  t: ComplexityTranslate;
};
