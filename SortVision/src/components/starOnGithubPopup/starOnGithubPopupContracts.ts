/** Live repo stats shown in the GitHub star popup. */
export type GithubStarRepoStats = {
  stars: number;
  starFormatted: string;
};

export type StarOnGithubPopupViewProps = {
  repoStats: GithubStarRepoStats;
  timeSpent: number;
  handleLater: () => void;
  handleDismiss: () => void;
  handleStarClick: () => void;
};

export type UseStarOnGithubPopupControllerResult = {
  showPopup: boolean;
  timeSpent: number;
  repoStats: GithubStarRepoStats;
  handleStarClick: () => void;
  handleDismiss: () => void;
  handleLater: () => void;
};
