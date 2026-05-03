import type { LucideIcon } from 'lucide-react';
import { CheckCircle, Code2, Lightbulb } from 'lucide-react';
import type { PanelTranslate } from '../../shared/panelTranslate';

export type BestPracticeItem = {
  type: 'do' | 'dont';
  text: string;
  example: string;
};

export type BestPracticeCategory = {
  id: string;
  title: string;
  icon: LucideIcon;
  color: 'emerald' | 'blue' | 'yellow';
  summary: string;
  practices: BestPracticeItem[];
};

export function buildBestPracticeCategories(
  t: PanelTranslate
): BestPracticeCategory[] {
  return [
    {
      id: 'code-quality',
      title: t('contributions.guide.codeQuality'),
      icon: Code2,
      color: 'emerald',
      summary: t('contributions.guide.codeQualityDesc'),
      practices: [
        {
          type: 'do',
          text: t('contributions.guide.useDescriptiveNames'),
          example: 'const sortingSpeed = 50;',
        },
        {
          type: 'do',
          text: t('contributions.guide.keepFunctionsSmall'),
          example: 'function bubbleSort(array) { ... }',
        },
        {
          type: 'dont',
          text: t('contributions.guide.avoidMagicNumbers'),
          example: 'const DEFAULT_SIZE = 30;',
        },
      ],
    },
    {
      id: 'react-practices',
      title: t('contributions.guide.reactPractices'),
      icon: CheckCircle,
      color: 'blue',
      summary: t('contributions.guide.reactPracticesDesc'),
      practices: [
        {
          type: 'do',
          text: t('contributions.guide.useFunctionalComponents'),
          example: 'const Component = () => { ... };',
        },
        {
          type: 'do',
          text: t('contributions.guide.includeDependencies'),
          example: 'useEffect(() => {}, [dependency]);',
        },
        {
          type: 'dont',
          text: t('contributions.guide.avoidInlineStyles'),
          example: 'className="bg-slate-900"',
        },
      ],
    },
    {
      id: 'performance',
      title: t('contributions.guide.performanceTips'),
      icon: Lightbulb,
      color: 'yellow',
      summary: t('contributions.guide.performanceTipsDesc'),
      practices: [
        {
          type: 'do',
          text: t('contributions.guide.memoizeCalculations'),
          example: 'useMemo(() => calculate(), [data]);',
        },
        {
          type: 'do',
          text: t('contributions.guide.useCallback'),
          example: 'useCallback(() => {}, []);',
        },
        {
          type: 'dont',
          text: t('contributions.guide.importSpecific'),
          example: 'import { specific } from "lib";',
        },
      ],
    },
  ];
}
