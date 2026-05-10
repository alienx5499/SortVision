import React from 'react';
import { ExternalLink, Crown, Bot, Users, ChevronRight } from 'lucide-react';
import { Github } from '@/components/ui/OptimizedIcons';
import type {
  TranslationKey,
  TranslationParams,
} from '@/config/translationKey';
import type { GitHubContributor } from '../../githubContributor';

type ContributorCardProps = {
  contributor: GitHubContributor;
  index: number;
  isAdmin: boolean;
  isBot: boolean;
  onClick: () => void;
  t: (key: TranslationKey, params?: TranslationParams) => string;
};

const getCardColors = (isAdmin: boolean, isBot: boolean) => {
  if (isAdmin) {
    return {
      border: 'border-emerald-500/30 hover:border-emerald-400/50',
      bg: 'bg-emerald-500/5',
      accent: 'text-emerald-400',
      badge: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
      hoverShadow: 'hover:shadow-emerald-500/20',
    };
  }

  if (isBot) {
    return {
      border: 'border-blue-500/30 hover:border-blue-400/50',
      bg: 'bg-blue-500/5',
      accent: 'text-blue-400',
      badge: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
      hoverShadow: 'hover:shadow-blue-500/20',
    };
  }

  return {
    border: 'border-purple-500/30 hover:border-purple-400/50',
    bg: 'bg-purple-500/5',
    accent: 'text-purple-400',
    badge: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
    hoverShadow: 'hover:shadow-purple-500/20',
  };
};

export const ContributorCard = ({
  contributor,
  index,
  isAdmin,
  isBot,
  onClick,
  t,
}: ContributorCardProps) => {
  const delay = index * 50;
  const colors = getCardColors(isAdmin, isBot);

  return (
    <div
      className={`group/card relative p-4 rounded-lg border ${colors.border} ${colors.bg} transition-all duration-300 hover:scale-105 hover:shadow-lg ${colors.hoverShadow} animate-fade-up animate-once overflow-hidden cursor-pointer`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
    >
      <div className="absolute inset-0 w-0 group-hover/card:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      <div className="flex items-start space-x-3 relative z-10">
        <img
          src={contributor.avatar_url}
          alt={contributor.login}
          className={`size-12 rounded-full border-2 ${colors.border}`}
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className={`font-mono text-sm font-bold ${colors.accent} truncate`}
            >
              {contributor.login}
            </h3>
            {isAdmin && (
              <div
                className={`px-2 py-1 rounded text-xs border ${colors.badge} flex items-center gap-1`}
              >
                <Crown className="size-3" />
                {t('contributions.list.admin')}
              </div>
            )}
            {isBot && (
              <div
                className={`px-2 py-1 rounded text-xs border ${colors.badge} flex items-center gap-1`}
              >
                <Bot className="size-3" />
                {t('contributions.list.bot')}
              </div>
            )}
            {!isAdmin && !isBot && (
              <div
                className={`px-2 py-1 rounded text-xs border ${colors.badge} flex items-center gap-1`}
              >
                <Users className="size-3" />
                {t('contributions.list.communityBadge')}
              </div>
            )}
          </div>

          <div className="text-xs text-slate-400 font-mono mb-2 space-y-1">
            <div className="flex items-center justify-between">
              <span>
                {contributor.contributions} {t('contributions.list.commits')}
              </span>
            </div>
            <div className="text-xs text-slate-500">
              {contributor.type === 'User'
                ? t('contributions.list.developer')
                : contributor.type}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <a
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 text-xs ${colors.accent} hover:underline font-mono transition-colors duration-200`}
              onClick={e => e.stopPropagation()}
            >
              <Github className="size-3" />
              {t('contributions.list.profile')}
              <ExternalLink className="size-3" />
            </a>
            <span
              className={`text-xs ${colors.accent} font-mono flex items-center gap-1 opacity-70 group-hover/card:opacity-100 transition-opacity`}
            >
              {t('contributions.list.details')}
              <ChevronRight className="size-3" />
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 relative z-10">
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${colors.bg} transition-all duration-1000 ease-out`}
            style={{
              width: `${Math.min(100, (contributor.contributions / 50) * 100)}%`,
              transitionDelay: `${delay + 300}ms`,
            }}
          ></div>
        </div>
        <div className="text-xs text-slate-500 font-mono mt-1">
          {t('contributions.list.contributions')}
        </div>
      </div>
    </div>
  );
};
