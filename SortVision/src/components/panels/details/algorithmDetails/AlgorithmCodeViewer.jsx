import React from 'react';
import { Code2, Loader2 } from 'lucide-react';

const AlgorithmCodeViewer = ({ isLoading, codeContent, algorithm, t }) => {
  return (
    <div className="relative bg-slate-800/50 p-4 rounded border border-slate-700/50 overflow-hidden group/viz transition-all duration-500 hover:border-slate-600 hover:shadow-lg hover:shadow-slate-900/50">
      <div className="absolute inset-0 w-0 group-hover/viz:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-emerald-400/5 to-transparent"></div>

      <div className="text-xs text-slate-400 mb-3 flex items-center justify-between relative z-10">
        <span className="tracking-widest relative group-hover/viz:text-emerald-300 transition-colors duration-300 flex items-center cursor-pointer">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 text-emerald-400 animate-spin" />
          ) : (
            <Code2 className="mr-2 h-4 w-4 text-emerald-400" />
          )}
          <span className="group-hover/viz:tracking-wider transition-all">
            {t('details.algorithmImplementation', {
              algorithm: algorithm.toUpperCase(),
            })}
          </span>
          <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-emerald-400/0 via-emerald-400/70 to-emerald-400/0"></span>
        </span>
      </div>

      <div className="flex justify-center p-3 bg-slate-900/80 rounded relative group/code overflow-hidden transition-all duration-500 hover:shadow-inner hover:bg-slate-900/90">
        <div className="absolute left-2 top-3 bottom-3 text-right pr-2 border-r border-slate-700/50 text-[10px] text-slate-500 font-mono">
          {codeContent.split('\n').map((_, i) => (
            <div
              key={i}
              className="group-hover/code:text-emerald-400 transition-colors"
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div className="pl-8 w-full relative">
          <pre className="text-xs font-mono text-emerald-400 relative group/pre">
            <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-emerald-400/20 group-hover/pre:bg-emerald-400/40 transition-colors"></div>

            <code className="block group-hover/pre:translate-x-1 transition-transform relative">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-32 space-y-4">
                  <div className="flex items-end gap-1">
                    {[12, 20, 8, 24, 15, 18, 10].map((height, index) => (
                      <div
                        key={index}
                        className="w-1.5 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-t-sm animate-sort-bounce"
                        style={{
                          height: `${height}px`,
                          animationDelay: `${index * 0.1}s`,
                          animationDuration: '1.2s',
                        }}
                      />
                    ))}
                  </div>

                  <div className="text-slate-400 text-xs font-mono animate-pulse">
                    {t('details.loadingImplementation', { algorithm })}
                    <span className="animate-ping">...</span>
                  </div>

                  <div className="w-32 h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-pulse" />
                  </div>
                </div>
              ) : (
                codeContent.split('\n').map((line, i) => (
                  <div key={i} className="block whitespace-pre relative">
                    {line}
                    {i === codeContent.split('\n').length - 1 && (
                      <span className="absolute h-3.5 w-1.5 bg-emerald-400 animate-[blink_1s_ease-in-out_infinite] ml-[1px]"></span>
                    )}
                  </div>
                ))
              )}
            </code>

            <div className="absolute inset-0 bg-emerald-400/0 group-hover/pre:bg-emerald-400/5 transition-colors rounded"></div>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmCodeViewer;
