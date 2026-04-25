import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Terminal } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getCurrentRunDerivedMetrics } from './currentRunMetrics/helpers';
import PrimaryMetricsGrid from './currentRunMetrics/PrimaryMetricsGrid';
import AdvancedMetricsGrid from './currentRunMetrics/AdvancedMetricsGrid';
import PerformanceSection from './currentRunMetrics/PerformanceSection';

const CurrentRunMetrics = ({ metrics, sortedMetrics, algorithm, array }) => {
  const { t } = useLanguage();

  const derived = getCurrentRunDerivedMetrics({
    metrics,
    sortedMetrics,
    algorithm,
    arrayLength: array.length,
  });

  return (
    <div className="bg-slate-900 p-4 rounded border border-slate-800 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-[gradient_8s_ease_infinite] bg-[length:200%_100%]"></div>
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

      <div className="font-mono text-sm text-slate-400 mb-4 flex items-center justify-between relative z-10">
        <div className="flex items-center group cursor-pointer hover:text-emerald-400 transition-colors">
          <Terminal className="mr-2 h-4 w-4 text-emerald-400 group-hover:animate-spin" />
          // {t('metrics.currentRunMetrics')}
        </div>
        <Badge
          variant="outline"
          className="bg-slate-800/50 text-emerald-400 font-mono border-emerald-500/30 group-hover:bg-slate-800 transition-all duration-300"
        >
          {algorithm}_sort()
        </Badge>
      </div>

      <PrimaryMetricsGrid metrics={metrics} t={t} />
      <AdvancedMetricsGrid derived={derived} t={t} />
      <PerformanceSection
        metrics={metrics}
        algorithm={algorithm}
        derived={derived}
        t={t}
      />
    </div>
  );
};

export default CurrentRunMetrics;
