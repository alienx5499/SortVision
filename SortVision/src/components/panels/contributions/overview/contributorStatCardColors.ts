import type { ContributorStatThemeColor } from './contributorStatsTypes';

type StatCardColorSet = {
  bg: string;
  border: string;
  text: string;
  glow: string;
};

const COLOR_CLASSES: Record<ContributorStatThemeColor, StatCardColorSet> = {
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
    glow: 'shadow-emerald-500/20',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
    glow: 'shadow-blue-500/20',
  },
  yellow: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    text: 'text-yellow-400',
    glow: 'shadow-yellow-500/20',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    text: 'text-purple-400',
    glow: 'shadow-purple-500/20',
  },
};

export function getContributorStatCardColors(
  color: ContributorStatThemeColor
): StatCardColorSet {
  return COLOR_CLASSES[color];
}
