export type { PanelTranslate } from '../shared/panelTranslate';

// Re-export algorithm components from DetailsPanel
export { default as AlgorithmInfo } from '../DetailsPanel/AlgorithmInfo';
export { default as InteractiveTip } from '../DetailsPanel/InteractiveTip';
export { default as FunFact } from '../DetailsPanel/FunFact';
export { default as DataPanel } from '../DetailsPanel/DataPanel';

// Re-export types from DetailsPanel
export type {
  DataPanelProps,
  DetailsAlgorithmProps,
  DetailsAlgorithmSelectorProps,
  DetailsPanelProps,
  DetailsTranslate,
} from '../DetailsPanel/detailsPanelContracts';

// AlgorithmSelector and AlgorithmDetails remain in details/ as wrappers
export { default as AlgorithmSelector } from './AlgorithmSelector';
export { default as AlgorithmDetails } from './AlgorithmDetails';

export type { AlgorithmSelectorProps } from './AlgorithmSelector';
export type {
  DetailsAlgoChoice,
  DetailsAlgorithmCategoryDefinition,
  DetailsSelectorGroup,
} from './detailsAlgorithmSelectorTypes';
export type { DetailsAlgorithmCategoryColumnProps } from './DetailsAlgorithmCategoryColumn';
export type { AlgorithmCodeViewerProps } from './algorithmDetails/AlgorithmCodeViewer';
export type { AlgorithmDetailsHeaderProps } from './algorithmDetails/AlgorithmDetailsHeader';
export type { UseAlgorithmCodeParams } from './algorithmDetails/useAlgorithmCode';
export type { LanguageSelectorProps } from './LanguageSelector';
