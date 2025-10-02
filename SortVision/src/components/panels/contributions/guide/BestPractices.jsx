import React, { useState } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  Code2,
  Lightbulb,
  ChevronDown,
} from 'lucide-react';
import { useLanguage } from '../../../../context/LanguageContext';

/**
 * Best Practices Component - Compact Version
 *
 * A collapsible guide for coding standards and best practices.
 * Features collapsible sections to minimize scrolling.
 */
const BestPractices = () => {
  const { t } = useLanguage();
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = sectionId => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const practiceCategories = [
    {
      id: 'code-quality',
      title: t('contributions.guide.codeQuality'),
      icon: Code2,
      color: 'emerald',
      summary: t('contributions.guide.codeQualityDesc'),
      practices: [
        {
          type: 'do',
          text: t('contributions.guide.useDescriptiveNames'),
          example: 'const sortingSpeed = 50;',
        },
        {
          type: 'do',
          text: t('contributions.guide.keepFunctionsSmall'),
          example: 'function bubbleSort(array) { ... }',
        },
        {
          type: 'dont',
          text: t('contributions.guide.avoidMagicNumbers'),
          example: 'const DEFAULT_SIZE = 30;',
        },
      ],
    },
    {
      id: 'react-practices',
      title: t('contributions.guide.reactPractices'),
      icon: CheckCircle,
      color: 'blue',
      summary: t('contributions.guide.reactPracticesDesc'),
      practices: [
        {
          type: 'do',
          text: t('contributions.guide.useFunctionalComponents'),
          example: 'const Component = () => { ... };',
        },
        {
          type: 'do',
          text: t('contributions.guide.includeDependencies'),
          example: 'useEffect(() => {}, [dependency]);',
        },
        {
          type: 'dont',
          text: t('contributions.guide.avoidInlineStyles'),
          example: 'className="bg-slate-900"',
        },
      ],
    },
    {
      id: 'performance',
      title: t('contributions.guide.performanceTips'),
      icon: Lightbulb,
      color: 'yellow',
      summary: t('contributions.guide.performanceTipsDesc'),
      practices: [
        {
          type: 'do',
          text: t('contributions.guide.memoizeCalculations'),
          example: 'useMemo(() => calculate(), [data]);',
        },
        {
          type: 'do',
          text: t('contributions.guide.useCallback'),
          example: 'useCallback(() => {}, []);',
        },
        {
          type: 'dont',
          text: t('contributions.guide.importSpecific'),
          example: 'import { specific } from "lib";',
        },
      ],
    },
  ];

  return (
    <div className="mb-4 relative group">
      {/* Animated background glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-yellow-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/practices overflow-hidden">
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
              className="absolute h-1.5 w-1.5 rounded-full bg-yellow-500/50 top-[70%] left-[30%] animate-pulse"
              style={{ animationDuration: '4s' }}
            ></div>

            {/* Animated code lines */}
            <div className="absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent animate-[moveRight_15s_linear_infinite]"></div>
            <div className="absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[moveRight_12s_linear_infinite]"></div>
            <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
          </div>
        </div>

        {/* Animated corner accent */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-md group-hover/practices:scale-150 transition-transform duration-700"></div>

        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/practices:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-yellow-500/50 rounded transition-all duration-700"></div>

        {/* Header */}
        <div className="font-mono text-sm text-slate-400 mb-4 flex items-center relative z-10 group-hover/practices:text-emerald-400 transition-colors duration-300">
          <CheckCircle
            className="mr-2 h-4 w-4 text-emerald-400 animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <span className="transition-colors duration-300">
            // {t('contributions.guide.bestPractices')}
          </span>
        </div>

        {/* Collapsible Practice Categories */}
        <div className="space-y-3 relative z-10">
          {practiceCategories.map((category, index) => (
            <CollapsibleSection
              key={category.id}
              category={category}
              isExpanded={expandedSections[category.id]}
              onToggle={() => toggleSection(category.id)}
              index={index}
            />
          ))}
        </div>

        {/* Quick Guidelines - Always Visible */}
        <div className="mt-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700 relative z-10">
          <h4 className="font-mono text-xs font-bold text-emerald-400 mb-2">
            {t('contributions.guide.quickGuidelines')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-400 font-mono">
            <div>{t('contributions.guide.followPatterns')}</div>
            <div>{t('contributions.guide.clearCommits')}</div>
            <div>{t('contributions.guide.testChanges')}</div>
            <div>{t('contributions.guide.keepFocused')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Collapsible Section Component
const CollapsibleSection = ({ category, isExpanded, onToggle, index }) => {
  const { t } = useLanguage();
  const colorClasses = {
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      text: 'text-emerald-400',
    },
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      text: 'text-blue-400',
    },
    yellow: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20',
      text: 'text-yellow-400',
    },
  };

  const colors = colorClasses[category.color] || colorClasses.emerald;
  const Icon = category.icon;

  return (
    <div
      className={`rounded-lg border ${colors.border} ${colors.bg} transition-all duration-300 animate-fade-up animate-once`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header - Always Visible */}
      <button
        onClick={onToggle}
        className="w-full p-3 flex items-center justify-between hover:bg-slate-800/20 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <div
            className={`p-1.5 rounded-md ${colors.bg} border ${colors.border}`}
          >
            <Icon className={`w-3 h-3 ${colors.text}`} />
          </div>
          <div className="text-left">
            <h3 className={`font-mono text-sm font-bold ${colors.text}`}>
              {category.title}
            </h3>
            <p className="font-mono text-xs text-slate-500 mt-0.5">
              {category.summary}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Content - Collapsible */}
      {isExpanded && (
        <div className="px-3 pb-3 border-t border-slate-700/50 animate-fade-down animate-once">
          <div className="pt-3 space-y-2">
            {category.practices.map((practice, practiceIndex) => (
              <div
                key={practiceIndex}
                className="flex items-start space-x-2 p-2 rounded bg-slate-800/30"
              >
                {practice.type === 'do' ? (
                  <CheckCircle className="h-3 w-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <div
                    className={`font-mono text-xs font-medium ${
                      practice.type === 'do'
                        ? 'text-emerald-400'
                        : 'text-red-400'
                    }`}
                  >
{t(practice.type === 'do' ? 'contributions.guide.do' : 'contributions.guide.dont')} {practice.text}
                  </div>
                  <div className="font-mono text-xs text-slate-500 mt-1 bg-slate-900/50 p-1 rounded border-l-2 border-slate-600">
                    {practice.example}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BestPractices;
