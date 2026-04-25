import React, { useMemo, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  ALGORITHM_THEME_MAP,
  DEFAULT_THEME,
} from './algorithmDetails/constants';
import {
  getAlgorithmDoc,
  getFileExtension,
  getTestCase,
} from './algorithmDetails/helpers';
import useAlgorithmCode from './algorithmDetails/useAlgorithmCode';
import AlgorithmDetailsHeader from './algorithmDetails/AlgorithmDetailsHeader';
import AlgorithmCodeViewer from './algorithmDetails/AlgorithmCodeViewer';

/**
 * AlgorithmDetails Component
 *
 * Displays details of the algorithm with its pseudocode in a
 * code-editor-like interface.
 */
const AlgorithmDetails = ({ algorithm }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('pseudocode');
  const { t } = useLanguage();
  const { codeContent, isLoading } = useAlgorithmCode({
    algorithm,
    selectedLanguage,
  });

  const theme = useMemo(
    () => ALGORITHM_THEME_MAP[algorithm] || DEFAULT_THEME,
    [algorithm]
  );

  const buildExportContent = () => {
    const doc = getAlgorithmDoc(algorithm);
    const test = getTestCase(selectedLanguage);
    return `${doc}
${codeContent}
${test}`;
  };

  const handleExport = () => {
    const ext = getFileExtension(selectedLanguage);
    const content = buildExportContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${algorithm}Sort.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShareUrl = () => {
    const url = `${window.location.origin}${window.location.pathname}?algorithm=${algorithm}&lang=${selectedLanguage}`;
    navigator.clipboard.writeText(url);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(buildExportContent());
  };

  return (
    <div className="relative group mb-8">
      <div
        className={`absolute -inset-2 ${theme.backgroundGlow} rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500`}
      ></div>

      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/algo overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>

            <div
              className={`absolute h-2 w-2 rounded-full ${theme.particle1} top-[10%] left-[20%] animate-pulse`}
              style={{ animationDuration: '3s' }}
            ></div>
            <div
              className={`absolute h-1 w-1 rounded-full ${theme.particle2} top-[30%] left-[70%] animate-pulse`}
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

            <div
              className={`absolute top-[15%] left-0 h-px w-[30%] ${theme.line1} animate-[moveRight_15s_linear_infinite]`}
            ></div>
            <div
              className={`absolute top-[45%] left-0 h-px w-[20%] ${theme.line2} animate-[moveRight_12s_linear_infinite]`}
            ></div>
            <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
          </div>
        </div>

        <div
          className={`absolute -top-10 -right-10 w-20 h-20 ${theme.cornerAccent} rounded-full blur-md group-hover/algo:scale-150 transition-transform duration-700`}
        ></div>

        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/algo:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

        <AlgorithmDetailsHeader
          algorithm={algorithm}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          onExport={handleExport}
          onShareUrl={handleShareUrl}
          onCopyCode={handleCopyCode}
          t={t}
        />

        <AlgorithmCodeViewer
          isLoading={isLoading}
          codeContent={codeContent}
          algorithm={algorithm}
          t={t}
        />
      </div>
    </div>
  );
};

export default AlgorithmDetails;
