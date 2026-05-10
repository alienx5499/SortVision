import React from 'react';
import {
  Sparkles,
  Compass,
  Rocket,
  Diamond,
  Shield,
  Crown,
  Sun,
  GraduationCap,
  Medal,
  Trophy,
  Calendar,
  CheckCircle,
  FileText,
  Zap,
  Bug,
  Users,
  Languages,
  Star,
  History,
  Code2,
  Layers,
  Target,
  AlertCircle,
  TrendingUp,
  Award,
  Gem,
  Swords,
  Sprout,
} from 'lucide-react';
import { BADGE_CONFIG } from './config';
import type { LeaderboardParticipant } from './leaderboardTypes';

type BadgeConfig = {
  tooltip: string;
  color: string;
  icon: string;
  stats?: boolean;
  getStats?: (participant: LeaderboardParticipant) => string;
  minPoints?: number;
  maxPoints?: number;
};

const ICON_MAP = {
  Sparkles,
  Compass,
  Rocket,
  Diamond,
  Shield,
  Crown,
  Sun,
  GraduationCap,
  Medal,
  Trophy,
  Calendar,
  CheckCircle,
  FileText,
  Zap,
  Bug,
  Users,
  Languages,
  Star,
  History,
  Code2,
  Layers,
  Target,
  AlertCircle,
  TrendingUp,
  Award,
  Gem,
  Swords,
  Sprout,
} as const;

type IconName = keyof typeof ICON_MAP;

function BadgeIcon({
  iconName,
  className,
}: {
  iconName: string;
  className?: string;
}) {
  const IconComponent = ICON_MAP[iconName as IconName];
  return IconComponent ? <IconComponent className={className} /> : null;
}

function Badge({
  config,
  participant,
}: {
  config: BadgeConfig;
  participant: LeaderboardParticipant;
}) {
  const tooltipContent =
    config.stats && config.getStats
      ? `${config.tooltip} (${config.getStats(participant)})`
      : config.tooltip;

  return (
    <div
      className={`group relative inline-flex items-center justify-center size-6 rounded-full bg-gray-800/50 hover:bg-gray-800 transition-all duration-200 cursor-help flex-shrink-0 ${config.color}`}
      title={tooltipContent}
    >
      <BadgeIcon
        iconName={config.icon}
        className="size-4 group-hover:scale-110 transition-transform duration-200"
      />
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-200"></div>
    </div>
  );
}

function isPointsBadge(
  config: unknown
): config is { minPoints: number; maxPoints: number } {
  return (
    typeof config === 'object' &&
    config !== null &&
    'minPoints' in config &&
    'maxPoints' in config &&
    typeof (config as { minPoints: unknown }).minPoints === 'number' &&
    typeof (config as { maxPoints: unknown }).maxPoints === 'number'
  );
}

export function getLeaderboardBadges(
  points: number,
  achievements: Record<string, boolean> | undefined,
  participant: LeaderboardParticipant
): BadgeConfig[] {
  const badges: BadgeConfig[] = [];
  const ach = achievements ?? {};

  Object.values(BADGE_CONFIG).forEach(raw => {
    if (!isPointsBadge(raw)) return;
    if (points >= raw.minPoints && points <= raw.maxPoints) {
      badges.push(raw as BadgeConfig);
    }
  });

  if (participant.beginnerIssues >= 10) {
    badges.push(BADGE_CONFIG.BEGINNER_MASTER as BadgeConfig);
  }
  if (participant.intermediateIssues >= 5) {
    badges.push(BADGE_CONFIG.INTERMEDIATE_EXPERT as BadgeConfig);
  }
  if (participant.advancedIssues >= 1) {
    badges.push(BADGE_CONFIG.ADVANCED_ACHIEVER as BadgeConfig);
  }

  if (ach.completedIn24Hours) {
    badges.push(BADGE_CONFIG.SPEED_DEMON as BadgeConfig);
  }
  if (ach.solvedBugs) {
    badges.push(BADGE_CONFIG.BUG_HUNTER as BadgeConfig);
  }
  if (ach.reportedBugs) {
    badges.push(BADGE_CONFIG.BUG_REPORTER as BadgeConfig);
  }
  if (ach.helpedOthers) {
    badges.push(BADGE_CONFIG.TEAM_PLAYER as BadgeConfig);
  }

  if (ach.hasStreakOfFiveDays) {
    badges.push(BADGE_CONFIG.CONSISTENT_CONTRIBUTOR as BadgeConfig);
  }
  if (ach.hasReviewedPRs) {
    badges.push(BADGE_CONFIG.CODE_REVIEWER as BadgeConfig);
  }
  if (ach.improvedDocs) {
    badges.push(BADGE_CONFIG.DOCUMENTATION_HERO as BadgeConfig);
  }

  if (ach.isVeteranContributor) {
    badges.push(BADGE_CONFIG.VETERAN_CONTRIBUTOR as BadgeConfig);
  } else if (ach.isSeasonedDeveloper) {
    badges.push(BADGE_CONFIG.SEASONED_DEVELOPER as BadgeConfig);
  } else if (ach.isCommittedContributor) {
    badges.push(BADGE_CONFIG.COMMITTED_CONTRIBUTOR as BadgeConfig);
  } else if (ach.isRisingStar) {
    badges.push(BADGE_CONFIG.RISING_STAR as BadgeConfig);
  } else if (ach.isNewcomer) {
    badges.push(BADGE_CONFIG.NEWCOMER as BadgeConfig);
  } else if (ach.hasFirstStep) {
    badges.push(BADGE_CONFIG.FIRST_STEP as BadgeConfig);
  }

  if (ach.isPolyglot) {
    badges.push(BADGE_CONFIG.POLYGLOT as BadgeConfig);
  }
  if (ach.isLongTermContributor) {
    badges.push(BADGE_CONFIG.LONG_TERM_CONTRIBUTOR as BadgeConfig);
  }
  if (ach.isQualityFocused) {
    badges.push(BADGE_CONFIG.CODE_QUALITY as BadgeConfig);
  }
  if (ach.isDiverseContributor) {
    badges.push(BADGE_CONFIG.DIVERSE_CONTRIBUTOR as BadgeConfig);
  }
  if (ach.isImpactful) {
    badges.push(BADGE_CONFIG.HIGH_IMPACT as BadgeConfig);
  }

  return badges;
}

export function LeaderboardBadgeList({
  badges,
  participant,
}: {
  badges: BadgeConfig[];
  participant: LeaderboardParticipant;
}) {
  return (
    <>
      {badges.map((badge, idx) => (
        <div key={idx} className="flex-none">
          <Badge config={badge} participant={participant} />
        </div>
      ))}
    </>
  );
}
