import React from 'react';
import { Zap } from 'lucide-react';
import { useLanguage } from '@/context/language';
import { algorithmFactKey } from '@/locales/algorithmMessageKeys';
import type { DetailsAlgorithmProps } from './detailsPanelContracts';

/**
 * FunFact Component
 *
 * Displays a fun fact about the current algorithm
 */
const FunFact = ({ algorithm }: DetailsAlgorithmProps) => {
  const { t } = useLanguage();

  const factKey = algorithmFactKey(algorithm);
  const translated = t(factKey);
  const fact = translated === factKey ? t('details.facts.bubble') : translated;

  return (
    <div className="mt-4 bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-lg border border-slate-700/50 group hover:bg-slate-800/80 transition-colors relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-yellow-500/50 via-orange-500/50 to-red-500/50 rounded transition-all duration-700"></div>

      <div className="text-xs font-bold text-slate-300 mb-3 flex items-center relative">
        <Zap className="mr-2 h-4 w-4 text-yellow-400 group-hover:animate-bounce" />
        <span className="tracking-widest relative">
          {t('details.funFact')}
          <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-yellow-400/0 via-yellow-400/70 to-yellow-400/0"></span>
        </span>
      </div>
      <div className="text-xs text-yellow-400 italic group-hover:text-yellow-300 transition-colors relative">
        {fact}
      </div>
    </div>
  );
};

export default FunFact;
