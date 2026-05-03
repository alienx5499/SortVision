import React from 'react';
import { ArrowDownToLine, Copy, Info, Link2 } from 'lucide-react';
import type { SortingAlgorithmId } from '@/components/sortingVisualizer/algorithmRegistry';
import type { DetailsTranslate } from '../detailsPanelContracts';
import LanguageSelector from '../LanguageSelector';

export type AlgorithmDetailsHeaderProps = {
  algorithm: SortingAlgorithmId;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  onExport: () => void;
  onShareUrl: () => void;
  onCopyCode: () => void;
  t: DetailsTranslate;
};

const AlgorithmDetailsHeader = ({
  algorithm,
  selectedLanguage,
  setSelectedLanguage,
  onExport,
  onShareUrl,
  onCopyCode,
  t,
}: AlgorithmDetailsHeaderProps) => {
  return (
    <div className="font-mono text-sm text-slate-400 mb-4 flex items-center justify-between relative z-10 group-hover/algo:text-emerald-400 transition-colors duration-300">
      <div className="flex items-center">
        <Info
          className="mr-2 h-4 w-4 text-emerald-400 animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <span className="transition-colors duration-300">
          // {t('details.algorithmDetails', { algorithm })}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onExport}
          className="p-2 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors text-emerald-400 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          title="Export code with documentation and test case"
          aria-label="Export code"
        >
          <ArrowDownToLine className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onShareUrl}
          className="p-2 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors text-blue-400 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          title="Share via URL"
          aria-label="Share via URL"
        >
          <Link2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onCopyCode}
          className="p-2 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors text-purple-400 hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          title="Copy code to clipboard"
          aria-label="Copy code to clipboard"
        >
          <Copy className="w-4 h-4" />
        </button>
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
      </div>
    </div>
  );
};

export default AlgorithmDetailsHeader;
