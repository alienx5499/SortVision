import type { LucideIcon } from 'lucide-react';
import type { PanelTranslate } from '../../shared/panelTranslate';

export type GuideStepColor =
  'emerald' | 'blue' | 'purple' | 'yellow' | 'green' | 'pink';

export type GuideStep = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  command: string;
  color: GuideStepColor;
  phase: number;
};

export type GuidePhase = {
  id: number;
  title: string;
  description: string;
};

export type TranslateFn = PanelTranslate;
