/**
 * Complexity Info Component
 *
 * A detailed information panel displaying algorithm complexity metrics.
 */
import React from 'react';
import { Info } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ComplexityInfoEfficiency from './complexityInfo/ComplexityInfoEfficiency';
import ComplexityInfoTimeSection from './complexityInfo/ComplexityInfoTimeSection';
import ComplexityInfoSpaceSection from './complexityInfo/ComplexityInfoSpaceSection';
import ComplexityInfoDescription from './complexityInfo/ComplexityInfoDescription';

const ComplexityInfo = ({ getAlgorithmTimeComplexity }) => {
  const { t } = useLanguage();
  const complexity = getAlgorithmTimeComplexity();

  return (
    <div className="mb-4 relative">
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>

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
            <div
              className="absolute h-1 w-1 rounded-full bg-cyan-500/50 top-[60%] left-[80%] animate-pulse"
              style={{ animationDuration: '3.5s' }}
            ></div>

            <div className="absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent animate-[moveRight_15s_linear_infinite]"></div>
            <div className="absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[moveRight_12s_linear_infinite]"></div>
            <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
          </div>
        </div>

        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

        <label className="font-mono text-sm text-slate-400 mb-2 flex items-center group/label cursor-pointer relative z-10">
          <Info
            className="mr-2 h-4 w-4 text-emerald-400 animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <span className="transition-colors duration-300 group-hover:text-emerald-400">
            // {t('visualizer.complexity.algorithmComplexity')}
          </span>
        </label>

        <ComplexityInfoEfficiency complexity={complexity} t={t} />
        <ComplexityInfoTimeSection complexity={complexity} t={t} />
        <ComplexityInfoSpaceSection complexity={complexity} t={t} />
        <ComplexityInfoDescription complexity={complexity} />
      </div>
    </div>
  );
};

export default ComplexityInfo;
