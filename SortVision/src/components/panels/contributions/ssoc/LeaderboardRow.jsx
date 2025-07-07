import React from 'react';
import { 
  Crown, ExternalLink, Link2, User, Sparkles, Compass, Rocket, Diamond, Shield,
  Sun, GraduationCap, Medal, Trophy, Calendar, CheckCircle, FileText,
  Zap, Bug, Users, Languages, Star, History, Code2, Layers, Target, AlertCircle,
  TrendingUp, Award, Gem, Swords, Sprout
} from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { BADGE_CONFIG } from './config';

const getTopThreeStyles = (index) => {
  switch(index) {
    case 0:
      return 'bg-gradient-to-r from-yellow-500/10 via-transparent to-transparent';
    case 1:
      return 'bg-gradient-to-r from-slate-400/10 via-transparent to-transparent';
    case 2:
      return 'bg-gradient-to-r from-amber-700/10 via-transparent to-transparent';
    default:
      return '';
  }
};

const getRankStyles = (index) => {
  switch(index) {
    case 0:
      return 'text-yellow-400 animate-text-shimmer bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 bg-clip-text text-transparent bg-[length:200%_100%]';
    case 1:
      return 'text-slate-300 animate-text-shimmer bg-gradient-to-r from-slate-500 via-slate-200 to-slate-500 bg-clip-text text-transparent bg-[length:200%_100%]';
    case 2:
      return 'text-amber-600 animate-text-shimmer bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 bg-clip-text text-transparent bg-[length:200%_100%]';
    default:
      return 'text-indigo-300 hover:text-indigo-200 transition-colors duration-200';
  }
};

const BadgeIcon = ({ iconName, className }) => {
  const icons = {
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
    Sprout
  };
  const IconComponent = icons[iconName];
  return IconComponent ? <IconComponent className={className} /> : null;
};

const Badge = ({ config, participant }) => {
  const tooltipContent = config.stats && config.getStats ? 
    `${config.tooltip} (${config.getStats(participant)})` : 
    config.tooltip;

  return (
    <div
      className={`group relative inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-800/50 hover:bg-gray-800 transition-all duration-200 cursor-help flex-shrink-0 ${config.color}`}
      title={tooltipContent}
    >
      <BadgeIcon iconName={config.icon} className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-200"></div>
    </div>
  );
};

const getBadges = (points, achievements = {}, participant) => {
  const badges = [];
  
  // Add rank badge based on points
  Object.values(BADGE_CONFIG).forEach(config => {
    if ('minPoints' in config && points >= config.minPoints && points <= config.maxPoints) {
      badges.push(config);
    }
  });

  // Add achievement badges based on issue counts
  if (participant.beginnerIssues >= 10) {
    badges.push(BADGE_CONFIG.BEGINNER_MASTER);
  }
  if (participant.intermediateIssues >= 5) {
    badges.push(BADGE_CONFIG.INTERMEDIATE_EXPERT);
  }
  if (participant.advancedIssues >= 1) {
    badges.push(BADGE_CONFIG.ADVANCED_ACHIEVER);
  }

  // Add special achievement badges
  if (achievements.completedIn24Hours) {
    badges.push(BADGE_CONFIG.SPEED_DEMON);
  }
  if (achievements.solvedBugs) {
    badges.push(BADGE_CONFIG.BUG_HUNTER);
  }
  if (achievements.reportedBugs) {
    badges.push(BADGE_CONFIG.BUG_REPORTER);
  }
  if (achievements.helpedOthers) {
    badges.push(BADGE_CONFIG.TEAM_PLAYER);
  }

  // Add additional achievement badges
  if (achievements.hasStreakOfFiveDays) {
    badges.push(BADGE_CONFIG.CONSISTENT_CONTRIBUTOR);
  }
  if (achievements.hasReviewedPRs) {
    badges.push(BADGE_CONFIG.CODE_REVIEWER);
  }
  if (achievements.improvedDocs) {
    badges.push(BADGE_CONFIG.DOCUMENTATION_HERO);
  }

  // Add progress-based badges (highest milestone only)
  if (achievements.isVeteranContributor) {
    badges.push(BADGE_CONFIG.VETERAN_CONTRIBUTOR);
  } else if (achievements.isSeasonedDeveloper) {
    badges.push(BADGE_CONFIG.SEASONED_DEVELOPER);
  } else if (achievements.isCommittedContributor) {
    badges.push(BADGE_CONFIG.COMMITTED_CONTRIBUTOR);
  } else if (achievements.isRisingStar) {
    badges.push(BADGE_CONFIG.RISING_STAR);
  } else if (achievements.isNewcomer) {
    badges.push(BADGE_CONFIG.NEWCOMER);
  } else if (achievements.hasFirstStep) {
    badges.push(BADGE_CONFIG.FIRST_STEP);
  }

  // Add new diversity and category badges
  if (achievements.isPolyglot) {
    badges.push(BADGE_CONFIG.POLYGLOT);
  }
  if (achievements.isLongTermContributor) {
    badges.push(BADGE_CONFIG.LONG_TERM_CONTRIBUTOR);
  }
  if (achievements.isQualityFocused) {
    badges.push(BADGE_CONFIG.CODE_QUALITY);
  }
  if (achievements.isDiverseContributor) {
    badges.push(BADGE_CONFIG.DIVERSE_CONTRIBUTOR);
  }
  if (achievements.isImpactful) {
    badges.push(BADGE_CONFIG.HIGH_IMPACT);
  }

  return badges;
};

const LeaderboardRow = ({ participant, index }) => {
  const handleIssueClick = (difficulty) => {
    const label = difficulty === 'Advanced' ? 'Advance' : difficulty;
    window.open(
      `https://github.com/alienx5499/SortVision/issues?q=is%3Aissue+is%3Aclosed+assignee%3A${participant.githubId}+label%3A${label}+label%3A%22SSOC+S4%22`,
      '_blank'
    );
  };

  const badges = getBadges(participant.totalPoints, participant.achievements, participant);

  return (
    <tr 
      className={`border-t border-white/5 transition-all duration-300 hover:bg-indigo-900/20 hover:shadow-lg hover:shadow-indigo-900/10 relative group/row isolate
        ${index < 3 ? getTopThreeStyles(index) : ''}`}
      style={{ zIndex: 1 }}
    >
      <td className="px-6 py-4 w-24">
        <div className="flex items-center gap-2 font-semibold">
          {index === 0 && (
            <Crown className="w-4 h-4 text-yellow-500 animate-pulse" />
          )}
          <span className={`${getRankStyles(index)} ${index >= 3 ? 'rank-4-plus' : ''}`}>
            #{index + 1}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <a 
            href={`https://github.com/${participant.githubId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group hover:scale-105 transition-transform duration-200 isolate z-10"
          >
            {participant.avatarUrl ? (
              <img
                src={participant.avatarUrl}
                alt={participant.contributorName}
                className="w-10 h-10 rounded-full ring-2 ring-white/10 group-hover:ring-white/30 transition-all duration-200"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center ring-2 ring-white/10 group-hover:ring-white/30">
                <User className="w-6 h-6 text-gray-400" />
              </div>
            )}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-200"></div>
          </a>
          <div className="flex flex-col gap-2">
            <a 
              href={`https://github.com/${participant.githubId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group isolate z-10"
            >
              <div className={`font-semibold flex items-center gap-2 ${getRankStyles(index)} ${index >= 3 ? 'rank-4-plus' : ''} group-hover:scale-105 transition-transform duration-200`}>
                {participant.contributorName}
                <ExternalLink className="w-3 h-3 transition-all duration-200 group-hover:scale-110 group-hover:rotate-12" />
              </div>
              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200 tracking-wide">
                @{participant.githubId}
              </div>
            </a>
            <div className="flex flex-wrap gap-1.5 w-32 mt-2">
              {badges.map((badge, idx) => (
                <div key={idx} className="flex-none">
                  <Badge config={badge} participant={participant} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </td>
      <td className="px-2 py-4 text-center">
        <div 
          onClick={() => handleIssueClick('Beginner')}
          className="group/btn inline-block w-full py-2 px-4 rounded-md hover:bg-green-500/10 active:bg-green-500/20 cursor-pointer transition-all duration-200 isolate z-10 relative"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleIssueClick('Beginner')}
        >
          <span className="beginner-issues flex items-center justify-center gap-2 group-hover/btn:scale-105">
            {participant.beginnerIssues}
            <Link2 className="w-3 h-3 opacity-50 group-hover/btn:opacity-100 transition-all duration-200" />
          </span>
        </div>
      </td>
      <td className="px-2 py-4 text-center">
        <div 
          onClick={() => handleIssueClick('Intermediate')}
          className="group/btn inline-block w-full py-2 px-4 rounded-md hover:bg-yellow-500/10 active:bg-yellow-500/20 cursor-pointer transition-all duration-200 isolate z-10 relative"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleIssueClick('Intermediate')}
        >
          <span className="intermediate-issues flex items-center justify-center gap-2 group-hover/btn:scale-105">
            {participant.intermediateIssues}
            <Link2 className="w-3 h-3 opacity-50 group-hover/btn:opacity-100 transition-all duration-200" />
          </span>
        </div>
      </td>
      <td className="px-2 py-4 text-center">
        <div 
          onClick={() => handleIssueClick('Advanced')}
          className="group/btn inline-block w-full py-2 px-4 rounded-md hover:bg-red-500/10 active:bg-red-500/20 cursor-pointer transition-all duration-200 isolate z-10 relative"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleIssueClick('Advanced')}
        >
          <span className="advanced-issues flex items-center justify-center gap-2 group-hover/btn:scale-105">
            {participant.advancedIssues}
            <Link2 className="w-3 h-3 opacity-50 group-hover/btn:opacity-100 transition-all duration-200" />
          </span>
        </div>
      </td>
      <td className={`px-6 py-4 text-right font-semibold tracking-wider ${getRankStyles(index)} ${index >= 3 ? 'rank-4-plus' : ''}`}>
        {participant.totalPoints}
      </td>
    </tr>
  );
};

export default LeaderboardRow; 