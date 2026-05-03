import type { ContributorStatId } from './contributorStatsTypes';

export type ContributorStatIconLinkConfig = {
  href: string;
  title: string;
  group: string;
  hoverBg: string;
  animation: string;
};

const LINK_CONFIG: Record<ContributorStatId, ContributorStatIconLinkConfig> = {
  stars: {
    href: 'https://github.com/alienx5499/SortVision',
    title: 'Star this repo on GitHub',
    group: 'star',
    hoverBg: 'hover:bg-yellow-500/20 hover:shadow-yellow-500/40',
    animation: 'group-hover/star:animate-ping group-hover/star:drop-shadow-lg',
  },
  forks: {
    href: 'https://github.com/alienx5499/SortVision/fork',
    title: 'Fork this repo on GitHub',
    group: 'fork',
    hoverBg: 'hover:bg-purple-500/20 hover:shadow-purple-500/40',
    animation:
      'group-hover/fork:rotate-180 group-hover/fork:scale-110 group-hover/fork:drop-shadow-lg',
  },
  commits: {
    href: 'https://github.com/alienx5499/SortVision/commits/main',
    title: 'View commit history on GitHub',
    group: 'commits',
    hoverBg: 'hover:bg-blue-500/20 hover:shadow-blue-500/40',
    animation:
      'group-hover/commits:animate-pulse group-hover/commits:scale-105',
  },
  contributors: {
    href: 'https://github.com/alienx5499/SortVision/graphs/contributors',
    title: 'View contributors on GitHub',
    group: 'contributors',
    hoverBg: 'hover:bg-emerald-500/20 hover:shadow-emerald-500/40',
    animation:
      'group-hover/contributors:animate-bounce group-hover/contributors:scale-105',
  },
};

export function getContributorStatIconLinkConfig(
  id: ContributorStatId
): ContributorStatIconLinkConfig {
  return LINK_CONFIG[id];
}
