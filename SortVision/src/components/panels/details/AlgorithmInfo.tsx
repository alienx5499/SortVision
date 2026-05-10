import React, { useMemo, type ReactNode } from 'react';
import { GitBranch, Zap, Brain, Cpu, Lightbulb, History } from 'lucide-react';
import { useLanguage } from '@/context/language';
import type { SortingAlgorithmId } from '@/components/sortingVisualizer/algorithmRegistry';
import type { DetailsAlgorithmProps } from './detailsPanelContracts';

type AlgorithmMeta = {
  category: string;
  related: string[];
  inventor: string;
  year: string;
  category_icon: ReactNode;
};

const ALGORITHM_META: Record<SortingAlgorithmId, AlgorithmMeta> = {
  bubble: {
    category: 'Exchange Sort',
    related: ['Cocktail Sort', 'Comb Sort'],
    inventor: 'Unknown',
    year: '1956',
    category_icon: <GitBranch className="size-4 text-blue-400" />,
  },
  insertion: {
    category: 'Insertion Sort',
    related: ['Shell Sort', 'Tree Sort'],
    inventor: 'John Mauchly',
    year: '1946',
    category_icon: <Zap className="size-4 text-yellow-400" />,
  },
  selection: {
    category: 'Selection Sort',
    related: ['Heap Sort', 'Cycle Sort'],
    inventor: 'Unknown',
    year: '1960s',
    category_icon: <Brain className="size-4 text-purple-400" />,
  },
  quick: {
    category: 'Divide & Conquer',
    related: ['Quick Select', 'Dual-Pivot Quicksort'],
    inventor: 'Tony Hoare',
    year: '1959',
    category_icon: <Cpu className="size-4 text-green-400" />,
  },
  merge: {
    category: 'Divide & Conquer',
    related: ['Timsort', 'Natural Merge Sort'],
    inventor: 'John von Neumann',
    year: '1945',
    category_icon: <Cpu className="size-4 text-green-400" />,
  },
  radix: {
    category: 'Non-Comparative',
    related: ['Counting Sort', 'Bucket Sort'],
    inventor: 'Herman Hollerith',
    year: '1887',
    category_icon: <Lightbulb className="size-4 text-amber-400" />,
  },
  heap: {
    category: 'Selection Sort',
    related: ['Binary Heap', 'Priority Queue'],
    inventor: 'J. W. J. Williams',
    year: '1964',
    category_icon: <Brain className="size-4 text-indigo-400" />,
  },
  bucket: {
    category: 'Distribution Sort',
    related: ['Radix Sort', 'Counting Sort'],
    inventor: 'Unknown',
    year: '1956',
    category_icon: <Lightbulb className="size-4 text-pink-400" />,
  },
};

/**
 * AlgorithmInfo Component
 *
 * Displays information about the algorithm including:
 * - Category
 * - Related algorithms
 * - Historical context
 */
const AlgorithmInfo = ({ algorithm }: DetailsAlgorithmProps) => {
  const { t } = useLanguage();

  const meta = useMemo(
    () => ALGORITHM_META[algorithm] ?? ALGORITHM_META.bubble,
    [algorithm]
  );

  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-lg border border-slate-700/50 group hover:bg-slate-800/80 transition-colors relative overflow-hidden">
        <div className="absolute -top-10 -right-10 size-20 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-emerald-500/50 via-teal-500/50 to-blue-500/50 rounded transition-all duration-700"></div>

        <div className="text-xs font-bold text-slate-300 mb-3 flex items-center relative">
          {meta.category_icon}
          <span className="ml-2">{meta.category}</span>
        </div>

        <div className="text-sm text-slate-400">
          <p className="mb-2">{t('details.relatedAlgorithms')}:</p>
          <ul className="list-disc list-inside space-y-1">
            {meta.related.map((algo, index) => (
              <li key={index} className="text-slate-500">
                {algo}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-lg border border-slate-700/50 group hover:bg-slate-800/80 transition-colors relative overflow-hidden">
        <div className="absolute -top-10 -right-10 size-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-rose-500/50 rounded transition-all duration-700"></div>

        <div className="text-xs font-bold text-slate-300 mb-3 flex items-center relative">
          <History className="size-4 text-purple-400" />
          <span className="ml-2">{t('details.historicalContext')}</span>
        </div>

        <div className="text-sm text-slate-400">
          <p className="mb-2">
            {t('details.inventedBy')}:{' '}
            <span className="text-purple-400">{meta.inventor}</span>
          </p>
          <p>
            {t('details.year')}:{' '}
            <span className="text-purple-400">{meta.year}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmInfo;
