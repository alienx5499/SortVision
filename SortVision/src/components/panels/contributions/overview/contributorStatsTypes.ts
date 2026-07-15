import type { LucideIcon } from 'lucide-react';

export type ContributorStatId = 'contributors' | 'commits' | 'stars' | 'forks';

export type ContributorStatThemeColor =
  'emerald' | 'blue' | 'yellow' | 'purple';

export type ContributorStatDisplayItem = {
  id: ContributorStatId;
  icon: LucideIcon;
  label: string;
  value: number;
  description: string;
  color: ContributorStatThemeColor;
};
