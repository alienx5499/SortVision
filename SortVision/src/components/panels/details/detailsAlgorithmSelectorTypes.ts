import type { SortingAlgorithmId } from '@/components/sortingVisualizer/algorithmRegistry';

export type DetailsCategoryTitleKey =
  'details.basicSorts' | 'details.efficientSorts' | 'details.specialSorts';

export type DetailsSelectorGroup = 'basic' | 'efficient' | 'special';

export type DetailsAlgoChoice = {
  id: SortingAlgorithmId;
  label: string;
  padClass: 'px-2' | 'px-3';
  dotSelected: string;
  dotIdle: string;
  btnSelected: string;
  btnIdle: string;
  shimmerVia: string;
};

export type DetailsAlgorithmCategoryDefinition = {
  group: DetailsSelectorGroup;
  groupClass: 'group/basic' | 'group/efficient' | 'group/special';
  titleKey: DetailsCategoryTitleKey;
  activeWhen: readonly SortingAlgorithmId[];
  boxActive: string;
  boxIdle: string;
  titleAccentClass: string;
  titleHoverClass: string;
  underlineGradient: string;
  cornerGradient: string;
  particleClasses: [string, string, string];
  line1Via: string;
  line2Via: string;
  algorithms: DetailsAlgoChoice[];
};
