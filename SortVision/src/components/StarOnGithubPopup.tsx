import { useStarOnGithubPopupController } from './starOnGithubPopup/hooks/useStarOnGithubPopupController';
import { StarOnGithubPopupView } from './starOnGithubPopup/sections/StarOnGithubPopupView';

export default function StarOnGithubPopup() {
  const {
    showPopup,
    timeSpent,
    repoStats,
    handleStarClick,
    handleDismiss,
    handleLater,
  } = useStarOnGithubPopupController();

  if (!showPopup) return null;

  return (
    <StarOnGithubPopupView
      repoStats={repoStats}
      timeSpent={timeSpent}
      handleLater={handleLater}
      handleDismiss={handleDismiss}
      handleStarClick={handleStarClick}
    />
  );
}
