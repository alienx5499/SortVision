/**
 * React context providers and hooks (algorithm runtime state, i18n).
 */
export {
  AlgorithmStateProvider,
  useAlgorithmState,
  type CurrentBarState,
  type AlgorithmBarHighlightStep,
  type AlgorithmScalarStep,
  type AlgorithmStepState,
  type AlgorithmContextStepSnapshot,
  type AlgorithmContextSnapshot,
  type AlgorithmChatHistoryEntry,
  type AlgorithmHistoryEntry,
  type AlgorithmStateContextValue,
} from './algorithm-state';

export { LanguageProvider, useLanguage, LanguageContext } from './language';
