export {
  useMainShellState,
  useMainRouteState,
  useMainShortcuts,
  useMainTabNavigation,
  useTypingSubtitle,
  type MainRouteState,
} from './hooks';

export type {
  MainShellState,
  MainFooterActions,
  MainFooterNavigation,
  MainFooterOverlay,
  MainMobileOverlayValue,
} from './contracts/mainShellContracts';

export { MainHeader } from './main-header';
export { MainFooter, MAIN_SHELL_PROFILE } from './main-footer';
