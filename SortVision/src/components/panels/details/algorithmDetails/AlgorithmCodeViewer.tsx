import React, { useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { loader } from '@monaco-editor/react';
import { Code2 } from 'lucide-react';
import * as monaco from 'monaco-editor';
import { getMonacoLanguage } from './languageMappings';
import { GooeyLoader } from '@/components/ui/loader-10';
import type { SortingAlgorithmId } from '@/components/sortingVisualizer/algorithmRegistry';
import type {
  TranslationKey,
  TranslationParams,
} from '@/config/translationKey';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
});
// Force local Monaco runtime instead of remote loader fetches.
loader.config({ monaco });

const monacoGlobal = globalThis as typeof globalThis & {
  MonacoEnvironment?: {
    getWorker?: (_workerId: string, label: string) => Worker;
  };
};

if (
  typeof window !== 'undefined' &&
  !monacoGlobal.MonacoEnvironment?.getWorker
) {
  monacoGlobal.MonacoEnvironment = {
    getWorker(_workerId: string, label: string) {
      if (label === 'json') {
        return new Worker(
          new URL(
            'monaco-editor/esm/vs/language/json/json.worker.js',
            import.meta.url
          ),
          { type: 'module' }
        );
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return new Worker(
          new URL(
            'monaco-editor/esm/vs/language/css/css.worker.js',
            import.meta.url
          ),
          { type: 'module' }
        );
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return new Worker(
          new URL(
            'monaco-editor/esm/vs/language/html/html.worker.js',
            import.meta.url
          ),
          { type: 'module' }
        );
      }
      if (label === 'typescript' || label === 'javascript') {
        return new Worker(
          new URL(
            'monaco-editor/esm/vs/language/typescript/ts.worker.js',
            import.meta.url
          ),
          { type: 'module' }
        );
      }
      return new Worker(
        new URL(
          'monaco-editor/esm/vs/editor/editor.worker.js',
          import.meta.url
        ),
        { type: 'module' }
      );
    },
  };
}

type MonacoLike = {
  languages: {
    getLanguages: () => { id: string }[];
    register: (def: { id: string }) => void;
    setMonarchTokensProvider: (
      id: string,
      provider: Record<string, unknown>
    ) => void;
  };
};

export type AlgorithmCodeViewerProps = {
  isLoading: boolean;
  codeContent: string;
  algorithm: SortingAlgorithmId;
  selectedLanguage: string;
  loadError: string;
  onRetry: () => void;
  t: (key: TranslationKey, params?: TranslationParams) => string;
};

const AlgorithmCodeViewer = ({
  isLoading,
  codeContent,
  algorithm,
  selectedLanguage,
  loadError,
  onRetry,
  t,
}: AlgorithmCodeViewerProps) => {
  const monacoLanguage = getMonacoLanguage(selectedLanguage);
  const showLoader = isLoading;

  const handleEditorWillMount = useCallback((monaco: MonacoLike) => {
    const hasPseudocode = monaco.languages
      .getLanguages()
      .some(lang => lang.id === 'pseudocode');
    if (!hasPseudocode) {
      monaco.languages.register({ id: 'pseudocode' });
      monaco.languages.setMonarchTokensProvider('pseudocode', {
        defaultToken: '',
        tokenizer: {
          root: [
            [/\/\/.*$/, 'comment'],
            [/--.*$/, 'comment'],
            [/#.*$/, 'comment'],
            [/\/\*/, { token: 'comment', next: '@blockComment' }],
            [
              /\b(procedure|function|return|if|then|else|end if|for|while|do|end for|end while|break|swap|append)\b/i,
              'keyword',
            ],
            [/\b(true|false|null)\b/i, 'constant.language'],
            [/\b(and|or|not)\b/i, 'keyword.operator'],
            [/\b[A-Za-z_][\w]*\b/, 'identifier'],
            [/\d+(\.\d+)?/, 'number'],
            [/[-+*/=<>!]+/, 'operator'],
            [/[[\](){}.,;:]/, 'delimiter'],
            [/"[^"]*"/, 'string'],
          ],
          blockComment: [
            [/[^/*]+/, 'comment'],
            [/[*]\//, 'comment', '@pop'],
            [/[/]/, 'comment'],
            [/[*]/, 'comment'],
          ],
        },
      });
    }

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
  }, []);

  const editorOptions = useMemo(
    () =>
      ({
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
        folding: false,
        links: false,
        contextmenu: false,
        selectionHighlight: false,
        occurrencesHighlight: 'off',
        renderValidationDecorations: 'off',
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
      }) as const,
    []
  );

  return (
    <div className="relative bg-slate-800/50 p-4 rounded border border-slate-700/50 overflow-hidden group/viz transition-all duration-500 hover:border-slate-600 hover:shadow-lg hover:shadow-slate-900/50">
      <div className="absolute inset-0 w-0 group-hover/viz:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-emerald-400/5 to-transparent"></div>

      <div className="text-xs text-slate-400 mb-3 flex items-center justify-between relative z-10">
        <span className="tracking-widest relative group-hover/viz:text-emerald-300 transition-colors duration-300 flex items-center cursor-pointer">
          {showLoader ? (
            <GooeyLoader className="mr-1.5 scale-[0.35] origin-left -my-3" />
          ) : (
            <Code2 className="mr-2 size-4 text-emerald-400" />
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
        {showLoader ? (
          <div className="flex flex-col items-center justify-center w-full min-h-[250px] space-y-4">
            <GooeyLoader
              className="scale-75 sm:scale-90"
              primaryColor="#34d399"
              secondaryColor="#6ee7b7"
              borderColor="#334155"
            />
            <div className="text-slate-400 text-xs font-mono animate-pulse">
              {t('details.loadingImplementation', { algorithm })}
              <span className="animate-ping">...</span>
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
              options={editorOptions}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AlgorithmCodeViewer;
