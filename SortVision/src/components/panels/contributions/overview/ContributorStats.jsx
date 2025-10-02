import React from 'react';
import { Users, GitCommit, Star, GitFork, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Contributor Stats Component
 *
 * A visually rich component displaying contribution statistics.
 * Features:
 * - Animated background effects and transitions
 * - Real-time contributor metrics
 * - Interactive hover states
 * - Terminal-style design
 * - Visual representations of data
 * - Refresh functionality in header
 */
const ContributorStats = ({ stats, loading, onRefresh }) => {
  const { t } = useLanguage();
  
  const statItems = [
    {
      icon: Users,
      label: t('contributions.stats.contributors'),
      value: stats?.totalContributors || 0,
      color: 'emerald',
      description: t('contributions.stats.amazingDevelopers'),
    },
    {
      icon: GitCommit,
      label: t('contributions.stats.totalCommits'),
      value: stats?.totalCommits || 0,
      color: 'blue',
      description: t('contributions.stats.linesOfImpact'),
    },
    {
      icon: Star,
      label: t('contributions.stats.githubStars'),
      value: stats?.totalStars || 0,
      color: 'yellow',
      description: t('contributions.stats.communityLove'),
    },
    {
      icon: GitFork,
      label: t('contributions.stats.forks'),
      value: stats?.totalForks || 0,
      color: 'purple',
      description: t('contributions.stats.projectCopies'),
    },
  ];

  return (
    <div className="mb-4 relative group">
      {/* Animated background glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/stats overflow-hidden h-full">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Animated grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>

            {/* Floating particles */}
            <div
              className="absolute h-2 w-2 rounded-full bg-emerald-500/50 top-[10%] left-[20%] animate-pulse"
              style={{ animationDuration: '3s' }}
            ></div>
            <div
              className="absolute h-1 w-1 rounded-full bg-blue-500/50 top-[30%] left-[70%] animate-pulse"
              style={{ animationDuration: '2.3s' }}
            ></div>
            <div
              className="absolute h-1.5 w-1.5 rounded-full bg-purple-500/50 top-[70%] left-[30%] animate-pulse"
              style={{ animationDuration: '4s' }}
            ></div>

            {/* Animated code lines */}
            <div className="absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent animate-[moveRight_15s_linear_infinite]"></div>
            <div className="absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[moveRight_12s_linear_infinite]"></div>
            <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
          </div>
        </div>

        {/* Animated corner accent */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-md group-hover/stats:scale-150 transition-transform duration-700"></div>

        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/stats:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

        <div className="font-mono text-sm text-slate-400 mb-4 flex items-center justify-between relative z-10 group-hover/stats:text-emerald-400 transition-colors duration-300">
          <div className="flex items-center">
            <Users
              className="mr-2 h-4 w-4 text-emerald-400 animate-pulse"
              style={{ animationDuration: '4s' }}
            />
            <span className="transition-colors duration-300">
              // {t('contributions.stats.contributorMetrics')}
            </span>
          </div>
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-1 hover:bg-slate-800 rounded transition-colors duration-200 disabled:opacity-50"
              title="Refresh metrics data"
            >
              <RefreshCw
                className={`h-3 w-3 text-slate-500 hover:text-emerald-400 transition-colors ${
                  loading ? 'animate-spin' : ''
                }`}
              />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 relative z-10">
          {statItems.map((item, index) => (
            <StatCard
              key={item.label}
              item={item}
              loading={loading}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Utility functions for StatCard
const getStatCardColors = index => {
  const colorClasses = {
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

  const colorOrder = ['emerald', 'blue', 'yellow', 'purple'];
  return colorClasses[colorOrder[index % colorOrder.length]];
};

const getIconConfig = label => {
  const configs = {
    'GitHub Stars': {
      href: 'https://github.com/alienx5499/SortVision',
      title: 'Star this repo on GitHub',
      group: 'star',
      hoverBg: 'hover:bg-yellow-500/20 hover:shadow-yellow-500/40',
      animation:
        'group-hover/star:animate-ping group-hover/star:drop-shadow-lg',
    },
    Forks: {
      href: 'https://github.com/alienx5499/SortVision/fork',
      title: 'Fork this repo on GitHub',
      group: 'fork',
      hoverBg: 'hover:bg-purple-500/20 hover:shadow-purple-500/40',
      animation:
        'group-hover/fork:rotate-180 group-hover/fork:scale-110 group-hover/fork:drop-shadow-lg',
    },
    'Total Commits': {
      href: 'https://github.com/alienx5499/SortVision/commits/main',
      title: 'View commit history on GitHub',
      group: 'commits',
      hoverBg: 'hover:bg-blue-500/20 hover:shadow-blue-500/40',
      animation:
        'group-hover/commits:animate-pulse group-hover/commits:scale-105',
    },
    Contributors: {
      href: 'https://github.com/alienx5499/SortVision/graphs/contributors',
      title: 'View contributors on GitHub',
      group: 'contributors',
      hoverBg: 'hover:bg-emerald-500/20 hover:shadow-emerald-500/40',
      animation:
        'group-hover/contributors:animate-bounce group-hover/contributors:scale-105',
    },
  };

  return configs[label] || null;
};

// Individual Stat Card Component
const StatCard = ({ item, loading, index }) => {
  const delay = index * 150;

  const { icon: Icon, label, value, description } = item;

  // Color schemes for different stats
  const colors = getStatCardColors(index);

  // Icon configuration for external links
  const iconConfig = getIconConfig(label);

  const handleIconClick = () => {
    // Track icon clicks for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'contributor_stat_click', {
        event_category: 'engagement',
        event_label: label,
      });
    }
  };

  if (loading) {
    // Skeleton state with exact dimensions to prevent CLS
    return (
      <div
        className={`group/card relative p-3 rounded-lg border border-slate-700 bg-slate-800/50 transition-all duration-300 animate-fade-up animate-once overflow-hidden`}
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="flex items-center space-x-3 relative z-10">
          {/* Icon skeleton */}
          <div className="p-2 rounded-md bg-slate-700/50 border border-slate-600 shadow-lg w-10 h-10">
            <div className="w-4 h-4 bg-slate-600 rounded animate-pulse"></div>
          </div>
          <div className="flex-1">
            {/* Number skeleton */}
            <div className="w-16 h-6 bg-slate-700 rounded mb-1 animate-pulse"></div>
            {/* Label skeleton */}
            <div className="w-20 h-4 bg-slate-700/70 rounded mb-1 animate-pulse"></div>
            {/* Description skeleton */}
            <div className="w-24 h-3 bg-slate-700/50 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Progress bar skeleton */}
        <div className="mt-2 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full w-0 bg-slate-700 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group/card relative p-3 rounded-lg border ${colors.border} ${colors.bg} hover:scale-105 transition-all duration-300 animate-fade-up animate-once overflow-hidden`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Card shimmer effect */}
      <div className="absolute inset-0 w-0 group-hover/card:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

      <div className="flex items-center space-x-3 relative z-10">
        {iconConfig ? (
          <a
            href={iconConfig.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group/${iconConfig.group} p-2 rounded-md ${colors.bg} border ${colors.border} ${colors.glow} shadow-lg ${iconConfig.hoverBg} transition-all duration-300 hover:border-opacity-60`}
            title={iconConfig.title}
            onClick={handleIconClick}
          >
            <Icon
              className={`w-4 h-4 ${colors.text} transition-all duration-500 ${iconConfig.animation}`}
            />
          </a>
        ) : (
          <div
            className={`p-2 rounded-md ${colors.bg} border ${colors.border} ${colors.glow} shadow-lg`}
          >
            <Icon className={`w-4 h-4 ${colors.text}`} />
          </div>
        )}
        <div>
          <AnimatedNumber
            loading={loading}
            value={item.value}
            className={`text-lg font-bold ${colors.text} font-mono`}
          />
          <div className="text-xs text-slate-400 font-mono">{item.label}</div>
          <div className="text-[10px] text-slate-500">{item.description}</div>
        </div>
      </div>

      {/* Animated progress bar */}
      <div className="mt-2 h-1 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${colors.bg} animate-pulse`}
          style={{
            width: loading ? '0%' : '100%',
            transition: 'width 1s ease-out',
            transitionDelay: `${delay + 500}ms`,
          }}
        ></div>
      </div>
    </div>
  );
};

// Animated number component
const AnimatedNumber = ({ loading, value, className }) => {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    if (loading) {
      setDisplayValue(0);
      return;
    }
    let start = 0;
    const end = value || 0;
    if (start === end) {
      setDisplayValue(end);
      return;
    }

    const duration = 1200; // total animation time in ms
    const minStepTime = 20; // minimum interval between updates
    const stepTime = Math.max(Math.floor(duration / end), minStepTime);

    const increment = Math.ceil(end / (duration / stepTime));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setDisplayValue(start);
    }, stepTime);

    return () => clearInterval(timer);
  }, [loading, value]);

  if (loading) {
    // Fixed skeleton dimensions to prevent CLS
    return <div className="w-16 h-6 bg-slate-700 rounded animate-pulse"></div>;
  }

  return <div className={className}>{displayValue.toLocaleString()}</div>;
};

export default ContributorStats;
