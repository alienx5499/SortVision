import React from 'react';
import { Book, ExternalLink, FileText } from 'lucide-react';
import { useLanguage } from '../../../../context/LanguageContext';

/**
 * Quick References Component
 *
 * A component displaying quick access links for contributors with:
 * - Contribution guidelines
 * - GitHub issues
 * - Code of conduct
 * - Terminal-style design
 * - Interactive hover states
 */
const QuickReferences = () => {
  const { t } = useLanguage();
  const quickLinks = [
    {
      title: t('contributions.guide.contributionGuidelines'),
      url: 'https://github.com/alienx5499/SortVision/blob/main/CONTRIBUTING.md',
      icon: Book,
      description: t('contributions.guide.detailedRules'),
    },
    {
      title: t('contributions.guide.githubIssues'),
      url: 'https://github.com/alienx5499/SortVision/issues',
      icon: ExternalLink,
      description: t('contributions.guide.findIssues'),
    },
    {
      title: t('contributions.guide.codeOfConduct'),
      url: 'https://github.com/alienx5499/SortVision/blob/main/CODE_OF_CONDUCT.md',
      icon: FileText,
      description: t('contributions.guide.communityGuidelines'),
    },
  ];

  return (
    <div className="mb-4 relative group">
      {/* Animated background glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/refs overflow-hidden h-full">
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
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-md group-hover/refs:scale-150 transition-transform duration-700"></div>

        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/refs:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

        <div className="font-mono text-sm text-slate-400 mb-4 flex items-center relative z-10 group-hover/refs:text-emerald-400 transition-colors duration-300">
          <Book
            className="mr-2 h-4 w-4 text-emerald-400 animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <span className="transition-colors duration-300">
            // {t('contributions.guide.quickReferences')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
          {quickLinks.map((link, index) => (
            <QuickLinkCard key={link.title} link={link} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Quick Link Card Component
const QuickLinkCard = ({ link, index }) => {
  const Icon = link.icon;
  const delay = index * 150;

  return (
    <a
      href={link.url}
      target={link.url.startsWith('http') ? '_blank' : '_self'}
      rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`group/link block p-4 rounded-lg border border-slate-700 bg-slate-800/50 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 hover:scale-105 animate-fade-up animate-once overflow-hidden`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Link shimmer effect */}
      <div className="absolute inset-0 w-0 group-hover/link:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-purple-400/5 to-transparent"></div>

      <div className="flex items-center space-x-3 relative z-10">
        <div className="p-2 rounded-md border border-purple-500/30 bg-purple-500/10">
          <Icon className="w-4 h-4 text-purple-400" />
        </div>
        <div>
          <h4 className="font-mono text-sm font-bold text-white group-hover/link:text-purple-400 transition-colors">
            {link.title}
          </h4>
          <p className="text-xs text-slate-400">{link.description}</p>
        </div>
      </div>
    </a>
  );
};

export default QuickReferences;
