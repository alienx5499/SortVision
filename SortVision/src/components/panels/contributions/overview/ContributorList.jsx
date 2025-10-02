import React, { useState, useEffect } from 'react';
import {
  Github,
  ExternalLink,
  Crown,
  Bot,
  Filter,
  Search,
  Users,
  RefreshCw,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ContributorDetailModal from './ContributorDetailModal';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

/**
 * Contributor List Component
 *
 * A sophisticated component for displaying and filtering contributors.
 * Features:
 * - Animated background effects and transitions
 * - Filter and search functionality
 * - Admin and bot badges
 * - Terminal-style contributor cards
 * - Interactive hover states
 * - Responsive grid layout
 */
const ContributorList = ({
  contributors,
  loading,
  onRefresh,
  projectAdmins = [],
  botUsers = [],
  authenticatedFetch,
  getCachedContributorStats,
}) => {
  const { getLocalizedUrl, t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContributor, setSelectedContributor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  // Check if URL contains a contributor username
  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    
    // Handle language prefixes - check if first segment is a language code
    const supportedLanguages = ['en', 'es', 'hi', 'fr', 'de', 'zh'];
    let pathWithoutLanguage = pathParts;
    if (pathParts.length > 0 && supportedLanguages.includes(pathParts[0])) {
      pathWithoutLanguage = pathParts.slice(1);
    }
    
    if (
      pathWithoutLanguage.length >= 3 &&
      pathWithoutLanguage[0] === 'contributions' &&
      pathWithoutLanguage[1] === 'overview'
    ) {
      const contributorUsername = pathWithoutLanguage[2];
      if (contributorUsername && contributors.length > 0) {
        const contributor = contributors.find(
          c => c.login === contributorUsername
        );
        if (contributor) {
          setSelectedContributor(contributor);
          setIsModalOpen(true);
        }
      }
    }
  }, [location.pathname, contributors]);

  const handleContributorClick = contributor => {
    setSelectedContributor(contributor);
    setIsModalOpen(true);
    // Update URL to include contributor username
    navigate(getLocalizedUrl(`contributions/overview/${contributor.login}`), { replace: true });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContributor(null);
    // Remove contributor from URL when closing modal
    navigate(getLocalizedUrl('contributions/overview'), { replace: true });
  };

  // Filter contributors based on selected filter and search term
  const filteredContributors = contributors.filter(contributor => {
    const matchesSearch = contributor.login
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    switch (filter) {
      case 'admins':
        return matchesSearch && projectAdmins.includes(contributor.login);
      case 'bots':
        return matchesSearch && botUsers.includes(contributor.login);
      case 'community':
        return (
          matchesSearch &&
          !projectAdmins.includes(contributor.login) &&
          !botUsers.includes(contributor.login)
        );
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="mb-4 relative group">
      {/* Animated background glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/list overflow-hidden">
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
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-md group-hover/list:scale-150 transition-transform duration-700"></div>

        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/list:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

        <div className="font-mono text-sm text-slate-400 mb-4 flex items-center relative z-10 group-hover/list:text-emerald-400 transition-colors duration-300">
          <Github
            className="mr-2 h-4 w-4 text-emerald-400 animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <span className="transition-colors duration-300 mr-auto">
            // contributor list
          </span>
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-1 hover:bg-slate-800 rounded transition-colors duration-200 disabled:opacity-50"
              title="Refresh contributors data"
            >
              <RefreshCw
                className={`h-3 w-3 text-slate-500 hover:text-emerald-400 transition-colors ${
                  loading ? 'animate-spin' : ''
                }`}
              />
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 relative z-10">
          {/* Filter Selector */}
          <div className="flex-1">
            <label className="font-mono text-xs text-slate-400 mb-2 block flex items-center">
              <Filter className="mr-2 h-3 w-3 text-emerald-400" />
              {t('contributions.list.filterByType')}
            </label>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full h-10 bg-slate-800/90 border-slate-700 text-emerald-400 font-mono">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800/95 border-slate-700 text-emerald-400 font-mono">
                <SelectItem value="all">{t('contributions.list.allContributors')}</SelectItem>
                <SelectItem value="admins">{t('contributions.list.projectAdmins')}</SelectItem>
                <SelectItem value="community">{t('contributions.list.community')}</SelectItem>
                <SelectItem value="bots">{t('contributions.list.bots')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Input */}
          <div className="flex-1">
            <label className="font-mono text-xs text-slate-400 mb-2 block flex items-center">
              <Search className="mr-2 h-3 w-3 text-emerald-400" />
              {t('contributions.list.searchContributors')}
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder={t('contributions.list.typeUsername')}
                className="w-full h-10 bg-slate-800/90 border border-slate-700 rounded-md px-3 text-emerald-400 font-mono text-sm placeholder-slate-500 focus:border-emerald-500 focus:outline-none transition-colors"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="font-mono text-xs text-slate-400 mb-4 relative z-10">
          <span className="text-emerald-400">
            {filteredContributors.length}
          </span>{' '}
          {t('contributions.list.contributorsFound')}
        </div>

        {/* Contributors Grid */}
        {loading ? (
          <LoadingGrid />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            {filteredContributors.map((contributor, index) => (
              <ContributorCard
                key={contributor.login}
                contributor={contributor}
                index={index}
                isAdmin={projectAdmins.includes(contributor.login)}
                isBot={botUsers.includes(contributor.login)}
                onClick={() => handleContributorClick(contributor)}
                t={t}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredContributors.length === 0 && (
          <div className="text-center py-12 relative z-10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              <Github className="w-8 h-8 text-slate-500" />
            </div>
            <p className="text-slate-400 font-mono text-sm">
              {t('contributions.list.noContributorsFound')}
            </p>
            <p className="text-slate-500 font-mono text-xs mt-1">
              Try adjusting your filters
            </p>
          </div>
        )}

        {/* Contributor Detail Modal */}
        <ContributorDetailModal
          contributor={selectedContributor}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isAdmin={
            selectedContributor &&
            projectAdmins.includes(selectedContributor.login)
          }
          isBot={
            selectedContributor && botUsers.includes(selectedContributor.login)
          }
          authenticatedFetch={authenticatedFetch}
          getCachedContributorStats={getCachedContributorStats}
        />
      </div>
    </div>
  );
};

// Individual Contributor Card Component
const ContributorCard = ({ contributor, index, isAdmin, isBot, onClick, t }) => {
  const delay = index * 50;

  const getCardColors = () => {
    if (isAdmin) {
      return {
        border: 'border-emerald-500/30 hover:border-emerald-400/50',
        bg: 'bg-emerald-500/5',
        accent: 'text-emerald-400',
        badge: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
      };
    }
    if (isBot) {
      return {
        border: 'border-blue-500/30 hover:border-blue-400/50',
        bg: 'bg-blue-500/5',
        accent: 'text-blue-400',
        badge: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
      };
    }
    return {
      border: 'border-purple-500/30 hover:border-purple-400/50',
      bg: 'bg-purple-500/5',
      accent: 'text-purple-400',
      badge: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
    };
  };

  const colors = getCardColors();

  return (
    <div
      className={`group/card relative p-4 rounded-lg border ${colors.border} ${colors.bg} transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-${colors.color}-500/20 animate-fade-up animate-once overflow-hidden cursor-pointer`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
    >
      {/* Card shimmer effect */}
      <div className="absolute inset-0 w-0 group-hover/card:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

      {/* Interactive indicator */}
      <div
        className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-${colors.color}-400 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 animate-pulse`}
      ></div>

      <div className="flex items-start space-x-3 relative z-10">
        <img
          src={contributor.avatar_url}
          alt={contributor.login}
          className={`w-12 h-12 rounded-full border-2 ${colors.border}`}
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
                <Crown className="w-3 h-3" />
                {t('contributions.list.admin')}
              </div>
            )}
            {isBot && (
              <div
                className={`px-2 py-1 rounded text-xs border ${colors.badge} flex items-center gap-1`}
              >
                <Bot className="w-3 h-3" />
                {t('contributions.list.bot')}
              </div>
            )}
            {!isAdmin && !isBot && (
              <div
                className={`px-2 py-1 rounded text-xs border ${colors.badge} flex items-center gap-1`}
              >
                <Users className="w-3 h-3" />
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
              {contributor.type === 'User' ? t('contributions.list.developer') : contributor.type}
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
              <Github className="w-3 h-3" />
              {t('contributions.list.profile')}
              <ExternalLink className="w-3 h-3" />
            </a>
            <span
              className={`text-xs ${colors.accent} font-mono flex items-center gap-1 opacity-70 group-hover/card:opacity-100 transition-opacity`}
            >
              {t('contributions.list.details')}
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Contribution Bar */}
      <div className="mt-4 relative z-10">
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${colors.bg} transition-all duration-1000 ease-out`}
            style={{
              width: `${Math.min(
                100,
                (contributor.contributions / 50) * 100
              )}%`,
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

// Loading Grid Component
const LoadingGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="p-4 rounded-lg border border-slate-800 bg-slate-900/50 animate-pulse"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-slate-700 rounded mb-2"></div>
            <div className="h-3 bg-slate-800 rounded mb-2 w-2/3"></div>
            <div className="h-3 bg-slate-800 rounded w-1/2"></div>
          </div>
        </div>
        <div className="mt-4 h-2 bg-slate-800 rounded"></div>
      </div>
    ))}
  </div>
);

export default ContributorList;
