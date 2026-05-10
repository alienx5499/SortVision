'use client';

import { getContributorStatCardColors } from './contributorStatCardColors';
import { getContributorStatIconLinkConfig } from './contributorStatIconLinks';
import type { ContributorStatDisplayItem } from './contributorStatsTypes';
import { ContributorStatAnimatedNumber } from './ContributorStatAnimatedNumber';

export type ContributorStatCardProps = {
  item: ContributorStatDisplayItem;
  loading: boolean;
  index: number;
};

function trackContributorStatClick(statId: string) {
  if (typeof window === 'undefined') return;
  const w = window as Window & {
    gtag?: (
      command: string,
      action: string,
      params?: Record<string, string>
    ) => void;
  };
  if (w.gtag) {
    w.gtag('event', 'contributor_stat_click', {
      event_category: 'engagement',
      event_label: statId,
    });
  }
}

export function ContributorStatCard({
  item,
  loading,
  index,
}: ContributorStatCardProps) {
  const delay = index * 150;
  const { icon: Icon, id, label, value, description } = item;
  const colors = getContributorStatCardColors(item.color);
  const iconConfig = getContributorStatIconLinkConfig(id);

  const handleIconClick = () => {
    trackContributorStatClick(id);
  };

  if (loading) {
    return (
      <div
        className="group/card relative p-3 rounded-lg border border-slate-700 bg-slate-800/50 transition-all duration-300 animate-fade-up animate-once overflow-hidden"
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="flex items-center space-x-3 relative z-10">
          <div className="p-2 rounded-md bg-slate-700/50 border border-slate-600 shadow-lg size-10">
            <div className="size-4 bg-slate-600 rounded animate-pulse"></div>
          </div>
          <div className="flex-1">
            <div className="w-16 h-6 bg-slate-700 rounded mb-1 animate-pulse"></div>
            <div className="w-20 h-4 bg-slate-700/70 rounded mb-1 animate-pulse"></div>
            <div className="w-24 h-3 bg-slate-700/50 rounded animate-pulse"></div>
          </div>
        </div>

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
      <div className="absolute inset-0 w-0 group-hover/card:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

      <div className="flex items-center space-x-3 relative z-10">
        <a
          href={iconConfig.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group/${iconConfig.group} p-2 rounded-md ${colors.bg} border ${colors.border} ${colors.glow} shadow-lg ${iconConfig.hoverBg} transition-all duration-300 hover:border-opacity-60`}
          title={iconConfig.title}
          onClick={handleIconClick}
        >
          <Icon
            className={`size-4 ${colors.text} transition-all duration-500 ${iconConfig.animation}`}
          />
        </a>
        <div>
          <ContributorStatAnimatedNumber
            loading={loading}
            value={value}
            className={`text-lg font-bold ${colors.text} font-mono`}
          />
          <div className="text-xs text-slate-400 font-mono">{label}</div>
          <div className="text-[10px] text-slate-500">{description}</div>
        </div>
      </div>

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
}
