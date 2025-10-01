import React from 'react';
import { Lightbulb } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * InteractiveTip Component
 *
 * Displays an interactive tip related to the current algorithm
 */
const InteractiveTip = ({ algorithm }) => {
  const { t } = useLanguage();
  
  // Interactive tips based on algorithm
  const getTip = () => {
    const tips = {
      bubble: t('details.tips.bubble'),
      insertion: t('details.tips.insertion'),
      selection: t('details.tips.selection'),
      quick: t('details.tips.quick'),
      merge: t('details.tips.merge'),
      radix: t('details.tips.radix'),
      heap: t('details.tips.heap'),
      bucket: t('details.tips.bucket'),
    };
    return tips[algorithm];
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-lg border border-slate-700/50 group hover:bg-slate-800/80 transition-colors relative overflow-hidden">
      {/* Animated corner accent */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

      {/* Animated bottom line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-500/50 via-yellow-500/50 to-orange-500/50 rounded transition-all duration-700"></div>

      <div className="text-xs font-bold text-slate-300 mb-3 flex items-center relative">
        <Lightbulb className="mr-2 h-4 w-4 text-amber-400 animate-pulse" />
        <span className="tracking-widest relative">
{t('details.proTip')}
          <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-amber-400/0 via-amber-400/70 to-amber-400/0"></span>
        </span>
      </div>
      <div className="text-xs text-amber-400 italic group-hover:text-amber-300 transition-colors relative">
        {getTip()}
      </div>
    </div>
  );
};

export default InteractiveTip;
