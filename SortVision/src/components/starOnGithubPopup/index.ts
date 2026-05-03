export { default as StarOnGithubPopup } from '../StarOnGithubPopup';
export { StarOnGithubPopupView } from './sections/StarOnGithubPopupView';
export { useStarOnGithubPopupController } from './hooks/useStarOnGithubPopupController';

export type {
  GithubStarRepoStats,
  StarOnGithubPopupViewProps,
  UseStarOnGithubPopupControllerResult,
} from './starOnGithubPopupContracts';

export {
  getInitialPopupVisibility,
  isGithubPopupTestMode,
} from './utils/popupFlags';
export { formatStarCountDisplay } from './utils/formatStarCount';
