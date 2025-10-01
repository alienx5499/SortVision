import React, { useState, useEffect } from 'react';
import {
  Info,
  Terminal,
  Code2,
  Loader2,
  ArrowDownToLine,
  Link2,
  Copy,
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/context/LanguageContext';

/**
 * AlgorithmDetails Component
 *
 * Displays details of the algorithm with its pseudocode in a
 * code-editor-like interface.
 */
const AlgorithmDetails = ({ algorithm }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('pseudocode');
  const [codeContent, setCodeContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const loadCode = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/code/${algorithm}/${selectedLanguage}/${algorithm}Sort.${getFileExtension(
            selectedLanguage
          )}`
        );
        if (!response.ok) {
          console.error(
            `Failed to load code: ${response.status} ${response.statusText}`
          );
          setCodeContent(getPlaceholderContent());
        } else {
          const content = await response.text();
          setCodeContent(content.trim() || getPlaceholderContent());
        }
      } catch (error) {
        console.error('Error loading code:', error);
        setCodeContent(getPlaceholderContent());
      }
      setIsLoading(false);
    };

    loadCode();
  }, [algorithm, selectedLanguage]);

  const getFileExtension = language => {
    switch (language) {
      case 'python':
        return 'py';
      case 'javascript':
        return 'js';
      case 'typescript':
        return 'ts';
      case 'java':
        return 'java';
      case 'cpp':
        return 'cpp';
      case 'golang':
        return 'go';
      case 'rust':
        return 'rs';
      case 'csharp':
        return 'cs';
      case 'dart':
        return 'dart';
      case 'kotlin':
        return 'kt';
      case 'swift':
        return 'swift';
      case 'php':
        return 'php';
      case 'ruby':
        return 'rb';
      case 'scala':
        return 'scala';
      case 'c':
        return 'c';
      case 'r':
        return 'r';
      case 'lua':
        return 'lua';
      case 'haskell':
        return 'hs';
      case 'julia':
        return 'jl';
      case 'pseudocode':
        return 'txt';
      default:
        return 'txt';
    }
  };

  const getPlaceholderContent = () => {
    const placeholders = [
      '🚀 Code implementation coming soon...',
      '👩‍💻 Want to contribute? Check our GitHub!',
      '🎯 This algorithm needs your expertise!',
      '✨ Implementation in progress...',
      '🌟 Be the first to implement this!',
      '🔮 The code will appear here soon...',
      '🎨 Your code could be here!',
      '🌈 Implementation needed - Join us!',
    ];
    return placeholders[Math.floor(Math.random() * placeholders.length)];
  };

  // Get explicit color classes based on algorithm
  const getCornerAccentClass = () => {
    switch (algorithm) {
      case 'bubble':
        return 'bg-gradient-to-br from-red-500/20 to-orange-500/20';
      case 'insertion':
        return 'bg-gradient-to-br from-orange-500/20 to-amber-500/20';
      case 'selection':
        return 'bg-gradient-to-br from-yellow-500/20 to-yellow-500/20';
      case 'quick':
        return 'bg-gradient-to-br from-green-500/20 to-emerald-500/20';
      case 'merge':
        return 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20';
      case 'radix':
        return 'bg-gradient-to-br from-purple-500/20 to-indigo-500/20';
      case 'heap':
        return 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20';
      case 'bucket':
        return 'bg-gradient-to-br from-pink-500/20 to-rose-500/20';
      default:
        return 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20';
    }
  };

  const getBackgroundGlowClass = () => {
    switch (algorithm) {
      case 'bubble':
        return 'bg-gradient-to-r from-red-500/30 via-orange-500/30 to-purple-500/30';
      case 'insertion':
        return 'bg-gradient-to-r from-orange-500/30 via-amber-500/30 to-purple-500/30';
      case 'selection':
        return 'bg-gradient-to-r from-yellow-500/30 via-yellow-500/30 to-purple-500/30';
      case 'quick':
        return 'bg-gradient-to-r from-green-500/30 via-emerald-500/30 to-purple-500/30';
      case 'merge':
        return 'bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-purple-500/30';
      case 'radix':
        return 'bg-gradient-to-r from-purple-500/30 via-indigo-500/30 to-purple-500/30';
      case 'heap':
        return 'bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-indigo-500/30';
      case 'bucket':
        return 'bg-gradient-to-r from-pink-500/30 via-rose-500/30 to-pink-500/30';
      default:
        return 'bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-purple-500/30';
    }
  };

  const getParticlesAndLinesClasses = () => {
    switch (algorithm) {
      case 'bubble':
        return {
          particle1: 'bg-red-500/50',
          particle2: 'bg-orange-500/50',
          line1:
            'bg-gradient-to-r from-transparent via-red-500/30 to-transparent',
          line2:
            'bg-gradient-to-r from-transparent via-orange-500/30 to-transparent',
        };
      case 'insertion':
        return {
          particle1: 'bg-orange-500/50',
          particle2: 'bg-amber-500/50',
          line1:
            'bg-gradient-to-r from-transparent via-orange-500/30 to-transparent',
          line2:
            'bg-gradient-to-r from-transparent via-amber-500/30 to-transparent',
        };
      case 'selection':
        return {
          particle1: 'bg-yellow-500/50',
          particle2: 'bg-yellow-500/50',
          line1:
            'bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent',
          line2:
            'bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent',
        };
      case 'quick':
        return {
          particle1: 'bg-green-500/50',
          particle2: 'bg-emerald-500/50',
          line1:
            'bg-gradient-to-r from-transparent via-green-500/30 to-transparent',
          line2:
            'bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent',
        };
      case 'merge':
        return {
          particle1: 'bg-blue-500/50',
          particle2: 'bg-cyan-500/50',
          line1:
            'bg-gradient-to-r from-transparent via-blue-500/30 to-transparent',
          line2:
            'bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent',
        };
      case 'radix':
        return {
          particle1: 'bg-purple-500/50',
          particle2: 'bg-indigo-500/50',
          line1:
            'bg-gradient-to-r from-transparent via-purple-500/30 to-transparent',
          line2:
            'bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent',
        };
      case 'heap':
        return {
          particle1: 'bg-indigo-500/50',
          particle2: 'bg-purple-500/50',
          line1:
            'bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent',
          line2:
            'bg-gradient-to-r from-transparent via-purple-500/30 to-transparent',
        };
      case 'bucket':
        return {
          particle1: 'bg-pink-500/50',
          particle2: 'bg-rose-500/50',
          line1:
            'bg-gradient-to-r from-transparent via-pink-500/30 to-transparent',
          line2:
            'bg-gradient-to-r from-transparent via-rose-500/30 to-transparent',
        };
      default:
        return {
          particle1: 'bg-emerald-500/50',
          particle2: 'bg-teal-500/50',
          line1:
            'bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent',
          line2:
            'bg-gradient-to-r from-transparent via-teal-500/30 to-transparent',
        };
    }
  };

  const cornerAccentClass = getCornerAccentClass();
  const backgroundGlowClass = getBackgroundGlowClass();
  const { particle1, particle2, line1, line2 } = getParticlesAndLinesClasses();

  // --- Export functionality ---
  const getAlgorithmDoc = () => {
    // Simple documentation string; can be expanded per algorithm/language
    return `/**\n * ${
      algorithm.charAt(0).toUpperCase() + algorithm.slice(1)
    } Sort\n *\n * Description: Implements the ${algorithm} sort algorithm.\n *\n * Time Complexity: O(n^2) in worst case (varies by algorithm)\n * Space Complexity: O(1) or O(n) (varies by algorithm)\n */\n`;
  };

  const getTestCase = () => {
    // Simple test case string; can be expanded per language
    switch (selectedLanguage) {
      case 'python':
        return '\ndef test():\n    arr = [5, 2, 9, 1]\n    bubbleSort(arr)\n    assert arr == [1, 2, 5, 9]\n';
      case 'javascript':
        return '\n// Test\nconst arr = [5, 2, 9, 1];\nbubbleSort(arr);\nconsole.assert(JSON.stringify(arr) === JSON.stringify([1,2,5,9]));\n';
      case 'java':
        return '\n// Test\npublic static void main(String[] args) {\n    int[] arr = {5,2,9,1};\n    bubbleSort(arr);\n    assert java.util.Arrays.equals(arr, new int[]{1,2,5,9});\n}\n';
      case 'dart':
        return '\n// Test\nvoid main() {\n  List<int> arr = [5, 2, 9, 1];\n  bubbleSort(arr);\n  assert(listEquals(arr, [1, 2, 5, 9]));\n}\n';
      case 'kotlin':
        return '\n// Test\nfun main() {\n    val arr = intArrayOf(5, 2, 9, 1)\n    bubbleSort(arr)\n    assert(arr.contentEquals(intArrayOf(1, 2, 5, 9)))\n}\n';
      case 'swift':
        return '\n// Test\nvar arr = [5, 2, 9, 1]\nbubbleSort(&arr)\nassert(arr == [1, 2, 5, 9])\n';
      case 'php':
        return '\n// Test\n$arr = [5, 2, 9, 1];\nbubbleSort($arr);\nassert($arr === [1, 2, 5, 9]);\n';
      case 'ruby':
        return '\n# Test\narr = [5, 2, 9, 1]\nbubble_sort(arr)\nraise "Test failed" unless arr == [1, 2, 5, 9]\n';
      case 'scala':
        return '\n// Test\nval arr = Array(5, 2, 9, 1)\nbubbleSort(arr)\nassert(arr.sameElements(Array(1, 2, 5, 9)))\n';
      case 'c':
        return '\n// Test\nint main() {\n    int arr[] = {5, 2, 9, 1};\n    int n = 4;\n    bubbleSort(arr, n);\n    // Verify arr is [1, 2, 5, 9]\n    return 0;\n}\n';
      case 'r':
        return '\n# Test\narr <- c(5, 2, 9, 1)\narr <- bubble_sort(arr)\nstopifnot(identical(arr, c(1, 2, 5, 9)))\n';
      case 'lua':
        return '\n-- Test\nlocal arr = {5, 2, 9, 1}\nbubbleSort(arr)\nassert(table.concat(arr, ",") == "1,2,5,9")\n';
      case 'haskell':
        return '\n-- Test\nmain :: IO ()\nmain = do\n    let arr = [5, 2, 9, 1]\n    let sorted = bubbleSort arr\n    if sorted == [1, 2, 5, 9] then putStrLn "Test passed" else error "Test failed"\n';
      case 'julia':
        return '\n# Test\narr = [5, 2, 9, 1]\nbubble_sort!(arr)\n@assert arr == [1, 2, 5, 9]\n';
      case 'pseudocode':
        return '\n// Test\narray = [5, 2, 9, 1]\nbubbleSort(array)\nassert array == [1, 2, 5, 9]\n';
      default:
        return '\n// Test case placeholder\n';
    }
  };

  const handleExport = () => {
    const ext = getFileExtension(selectedLanguage);
    const doc = getAlgorithmDoc();
    const test = getTestCase();
    const content = `${doc}\n${codeContent}\n${test}`;
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

  // --- Share via URL functionality ---
  const handleShareUrl = () => {
    const url = `${window.location.origin}${window.location.pathname}?algorithm=${algorithm}&lang=${selectedLanguage}`;
    navigator.clipboard.writeText(url);
  };

  // --- Copy to Clipboard functionality ---
  const handleCopyCode = () => {
    const doc = getAlgorithmDoc();
    const test = getTestCase();
    const content = `${doc}\n${codeContent}\n${test}`;
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="relative group mb-8">
      {/* Animated background glow effect */}
      <div
        className={`absolute -inset-2 ${backgroundGlowClass} rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500`}
      ></div>

      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/algo overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Animated grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>

            {/* Floating particles */}
            <div
              className={`absolute h-2 w-2 rounded-full ${particle1} top-[10%] left-[20%] animate-pulse`}
              style={{ animationDuration: '3s' }}
            ></div>
            <div
              className={`absolute h-1 w-1 rounded-full ${particle2} top-[30%] left-[70%] animate-pulse`}
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

            {/* Animated code lines */}
            <div
              className={`absolute top-[15%] left-0 h-px w-[30%] ${line1} animate-[moveRight_15s_linear_infinite]`}
            ></div>
            <div
              className={`absolute top-[45%] left-0 h-px w-[20%] ${line2} animate-[moveRight_12s_linear_infinite]`}
            ></div>
            <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
          </div>
        </div>

        {/* Animated corner accent */}
        <div
          className={`absolute -top-10 -right-10 w-20 h-20 ${cornerAccentClass} rounded-full blur-md group-hover/algo:scale-150 transition-transform duration-700`}
        ></div>

        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/algo:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

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
              onClick={handleExport}
              className="p-2 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors text-emerald-400 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              title="Export code with documentation and test case"
              aria-label="Export code"
            >
              <ArrowDownToLine className="w-4 h-4" />
            </button>
            <button
              onClick={handleShareUrl}
              className="p-2 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors text-blue-400 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              title="Share via URL"
              aria-label="Share via URL"
            >
              <Link2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopyCode}
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

        {/* Algorithm visualization with enhanced effects */}
        <div className="relative bg-slate-800/50 p-4 rounded border border-slate-700/50 overflow-hidden group/viz transition-all duration-500 hover:border-slate-600 hover:shadow-lg hover:shadow-slate-900/50">
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 w-0 group-hover/viz:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-emerald-400/5 to-transparent"></div>

          {/* Interactive header with hover effect */}
          <div className="text-xs text-slate-400 mb-3 flex items-center justify-between relative z-10">
            <span className="tracking-widest relative group-hover/viz:text-emerald-300 transition-colors duration-300 flex items-center cursor-pointer">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 text-emerald-400 animate-spin" />
              ) : (
                <Code2 className="mr-2 h-4 w-4 text-emerald-400" />
              )}
              <span className="group-hover/viz:tracking-wider transition-all">
{t('details.algorithmImplementation', { algorithm: algorithm.toUpperCase() })}
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-emerald-400/0 via-emerald-400/70 to-emerald-400/0"></span>
            </span>
          </div>

          {/* Code editor with enhanced styling */}
          <div className="flex justify-center p-3 bg-slate-900/80 rounded relative group/code overflow-hidden transition-all duration-500 hover:shadow-inner hover:bg-slate-900/90">
            {/* Enhanced line numbers */}
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

            {/* Code with enhanced animations */}
            <div className="pl-8 w-full relative">
              <pre className="text-xs font-mono text-emerald-400 relative group/pre">
                {/* Left border accent */}
                <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-emerald-400/20 group-hover/pre:bg-emerald-400/40 transition-colors"></div>

                {/* Code content with hover effect */}
                <code className="block group-hover/pre:translate-x-1 transition-transform relative">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-32 space-y-4">
                      {/* Mini sorting bars for algorithm loading */}
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

                      {/* Loading text */}
                      <div className="text-slate-400 text-xs font-mono animate-pulse">
{t('details.loadingImplementation', { algorithm })}
                        <span className="animate-ping">...</span>
                      </div>

                      {/* Progress indicator */}
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

                {/* Hover highlight effect */}
                <div className="absolute inset-0 bg-emerald-400/0 group-hover/pre:bg-emerald-400/5 transition-colors rounded"></div>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmDetails;
