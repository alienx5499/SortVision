import React from 'react';
import dynamic from 'next/dynamic';
import { Code2, Loader2 } from 'lucide-react';
import { getMonacoLanguage } from './helpers';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
});

const AlgorithmCodeViewer = ({
  isLoading,
  codeContent,
  algorithm,
  selectedLanguage,
  loadError,
  onRetry,
  t,
}) => {
  const monacoLanguage = getMonacoLanguage(selectedLanguage);

  const handleEditorWillMount = monaco => {
    const hasHaskell = monaco.languages
      .getLanguages()
      .some(lang => lang.id === 'haskell');

    if (hasHaskell) return;

    monaco.languages.register({ id: 'haskell' });
    monaco.languages.setMonarchTokensProvider('haskell', {
      defaultToken: '',
      tokenizer: {
        root: [
          [/--.*$/, 'comment'],
          [/\{-/, { token: 'comment', next: '@comment' }],
          [/"([^"\\]|\\.)*$/, 'string.invalid'],
          [/"/, { token: 'string.quote', next: '@string' }],
          [
            /\b(module|where|import|qualified|as|hiding|data|type|newtype|class|instance|deriving|let|in|if|then|else|case|of|do)\b/,
            'keyword',
          ],
          [/\b(True|False|Nothing|Just)\b/, 'constant.language'],
          [/\b(Int|Integer|Float|Double|Char|String|Bool|IO)\b/, 'type'],
          [/[A-Z][\w']*/, 'type.identifier'],
          [/[a-z_][\w']*/, 'identifier'],
          [/[[\](){}.,;]/, 'delimiter'],
          [/[-+*/=<>:&|!$%^~]+/, 'operator'],
          [/\d+/, 'number'],
        ],
        comment: [
          [/[^{-]+/, 'comment'],
          [/{-/, 'comment', '@push'],
          [/-}/, 'comment', '@pop'],
          [/[{-]/, 'comment'],
        ],
        string: [
          [/[^\\"]+/, 'string'],
          [/\\./, 'string.escape'],
          [/"/, { token: 'string.quote', next: '@pop' }],
        ],
      },
    });
  };

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

      <div className="p-3 bg-slate-900/80 rounded relative group/code overflow-hidden transition-all duration-500 hover:shadow-inner hover:bg-slate-900/90">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-40 space-y-4">
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
          <div className="overflow-hidden rounded border border-slate-700/60">
            {loadError && (
              <div className="flex items-center justify-between gap-3 px-3 py-2 text-xs border-b border-slate-700/60 bg-amber-500/10 text-amber-300">
                <span>{loadError}</span>
                <button
                  type="button"
                  onClick={onRetry}
                  className="px-2 py-1 rounded border border-amber-400/40 hover:border-amber-300 hover:text-amber-200 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}
            <MonacoEditor
              height="360px"
              language={monacoLanguage}
              value={codeContent}
              theme="vs-dark"
              beforeMount={handleEditorWillMount}
              options={{
                readOnly: true,
                lineNumbers: 'on',
                minimap: { enabled: false },
                fontSize: 12,
                fontFamily:
                  "'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                scrollBeyondLastLine: false,
                renderLineHighlight: 'line',
                wordWrap: 'off',
                tabSize: 2,
                automaticLayout: true,
                padding: { top: 10, bottom: 10 },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AlgorithmCodeViewer;
