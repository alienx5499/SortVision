export const POINTS_CONFIG = {
  Beginner: 20,
  Intermediate: 30,
  Advanced: 40
};

export const EXCLUDED_USERS = ['alienx5499', 'dependabot[bot]', 'dependabot-preview[bot]'];

export const FILTER_OPTIONS = {
  ALL: 'all',
  TOP_10: 'top10',
  ADVANCED: 'advanced',
  INTERMEDIATE: 'intermediate',
  BEGINNER: 'beginner'
};

export const GITHUB_API_CONFIG = {
  BASE_URL: 'https://api.github.com',
  REPO_OWNER: process.env.NEXT_PUBLIC_GITHUB_REPO_OWNER,
  REPO_NAME: process.env.NEXT_PUBLIC_GITHUB_REPO_NAME
};

export const BADGE_CONFIG = {
  // Rank badges based on total points
  NOVICE: {
    minPoints: 0,
    maxPoints: 50,
    icon: 'Sparkles',
    tooltip: 'Novice - Taking First Steps',
    color: 'text-emerald-300'
  },
  EXPLORER: {
    minPoints: 51,
    maxPoints: 100,
    icon: 'Compass',
    tooltip: 'Explorer - Discovering New Challenges',
    color: 'text-cyan-400'
  },
  SKILLED: {
    minPoints: 101,
    maxPoints: 200,
    icon: 'Rocket',
    tooltip: 'Skilled - Rising Through Ranks',
    color: 'text-yellow-400'
  },
  EXPERT: {
    minPoints: 201,
    maxPoints: 300,
    icon: 'Diamond',
    tooltip: 'Expert - Valuable Contributor',
    color: 'text-purple-400'
  },
  MASTER: {
    minPoints: 301,
    maxPoints: 400,
    icon: 'Shield',
    tooltip: 'Master - Elite Guardian',
    color: 'text-blue-500'
  },
  GRANDMASTER: {
    minPoints: 401,
    maxPoints: 500,
    icon: 'Crown',
    tooltip: 'Grandmaster - Supreme Leader',
    color: 'text-orange-500'
  },
  LEGENDARY: {
    minPoints: 501,
    maxPoints: Infinity,
    icon: 'Sun',
    tooltip: 'Legendary - Radiant Force',
    color: 'text-amber-500'
  },
  // Achievement badges based on issue counts
  BEGINNER_MASTER: {
    condition: 'beginnerIssues10Plus',
    icon: 'GraduationCap',
    tooltip: 'Beginner Master - Solved 10+ beginner issues',
    color: 'text-green-400'
  },
  INTERMEDIATE_EXPERT: {
    condition: 'intermediateIssues5Plus',
    icon: 'Medal',
    tooltip: 'Intermediate Expert - Solved 5+ intermediate issues',
    color: 'text-yellow-500'
  },
  ADVANCED_ACHIEVER: {
    condition: 'advancedIssues1Plus',
    icon: 'Trophy',
    tooltip: 'Advanced Achiever - Solved advanced level issues',
    color: 'text-red-400'
  },
  // Special achievement badges
  SPEED_DEMON: {
    condition: 'completedIn24Hours',
    icon: 'Zap',
    tooltip: 'Speed Demon - Completed tasks within 24 hours',
    color: 'text-yellow-300'
  },
  BUG_HUNTER: {
    condition: 'solvedBugs',
    icon: 'Bug',
    tooltip: 'Bug Hunter - Solved critical bugs',
    color: 'text-red-400',
    stats: true,
    getStats: (participant) => `${participant.bugsSolved} bugs fixed`
  },
  BUG_REPORTER: {
    condition: 'reportedBugs',
    icon: 'AlertCircle',
    tooltip: 'Bug Reporter - Found and reported bugs',
    color: 'text-orange-400',
    stats: true,
    getStats: (participant) => `${participant.bugsReported} bugs reported`
  },
  TEAM_PLAYER: {
    condition: 'helpedOthers',
    icon: 'Users',
    tooltip: 'Team Player - Helped other contributors',
    color: 'text-indigo-400'
  },
  // Additional achievement badges
  CONSISTENT_CONTRIBUTOR: {
    condition: 'hasStreakOfFiveDays',
    icon: 'Calendar',
    tooltip: 'Consistent Contributor - Active for 5+ consecutive days',
    color: 'text-blue-300'
  },
  CODE_REVIEWER: {
    condition: 'hasReviewedPRs',
    icon: 'CheckCircle',
    tooltip: 'Code Reviewer - Helped review pull requests',
    color: 'text-purple-300'
  },
  DOCUMENTATION_HERO: {
    condition: 'improvedDocs',
    icon: 'FileText',
    tooltip: 'Documentation Hero - Improved project documentation',
    color: 'text-teal-400'
  },
  // New diversity and category badges
  POLYGLOT: {
    condition: 'isPolyglot',
    icon: 'Languages',
    tooltip: 'Polyglot - Contributed in 3+ programming languages',
    color: 'text-pink-400'
  },
  // Progress-based contributor badges (based on total issues solved)
  FIRST_STEP: {
    condition: 'hasFirstStep',
    icon: 'Star',
    tooltip: 'First Step - Solved your first issue!',
    color: 'text-yellow-200'
  },
  NEWCOMER: {
    condition: 'isNewcomer',
    icon: 'Sprout',
    tooltip: 'Newcomer - Solved 2-4 issues',
    color: 'text-emerald-300'
  },
  RISING_STAR: {
    condition: 'isRisingStar',
    icon: 'TrendingUp',
    tooltip: 'Rising Star - Solved 5+ issues',
    color: 'text-green-400'
  },
  COMMITTED_CONTRIBUTOR: {
    condition: 'isCommittedContributor',
    icon: 'Award',
    tooltip: 'Committed Contributor - Solved 10+ issues',
    color: 'text-blue-400'
  },
  SEASONED_DEVELOPER: {
    condition: 'isSeasonedDeveloper',
    icon: 'Gem',
    tooltip: 'Seasoned Developer - Solved 15+ issues',
    color: 'text-purple-400'
  },
  VETERAN_CONTRIBUTOR: {
    condition: 'isVeteranContributor',
    icon: 'Swords',
    tooltip: 'Veteran Contributor - Solved 20+ issues',
    color: 'text-orange-500'
  },
  LONG_TERM_CONTRIBUTOR: {
    condition: 'isLongTermContributor',
    icon: 'History',
    tooltip: 'Long-term Contributor - Active for 30+ days',
    color: 'text-blue-400'
  },
  CODE_QUALITY: {
    condition: 'isQualityFocused',
    icon: 'Code2',
    tooltip: 'Code Quality Champion - Focuses on code improvement',
    color: 'text-green-300'
  },
  DIVERSE_CONTRIBUTOR: {
    condition: 'isDiverseContributor',
    icon: 'Layers',
    tooltip: 'Diverse Contributor - Solved various types of issues',
    color: 'text-violet-400'
  },
  HIGH_IMPACT: {
    condition: 'isImpactful',
    icon: 'Target',
    tooltip: 'High Impact - Modified 10+ files across the project',
    color: 'text-orange-400'
  }
}; 