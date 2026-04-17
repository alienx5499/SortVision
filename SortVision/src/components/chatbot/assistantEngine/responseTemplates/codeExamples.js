import { ALGORITHM_CODE_EXAMPLES } from '../constants';

export function generateCodeExamples(algorithmName, language = 'javascript') {
  const algorithmKey = algorithmName.toLowerCase().replace(/\s+/g, '') + 'Sort';
  const codeExamples = ALGORITHM_CODE_EXAMPLES[algorithmKey];

  if (!codeExamples) {
    // If no specific algorithm, show a selection of popular algorithms
    if (algorithmName === 'Bubble Sort' || algorithmName === 'Unknown') {
      return `
        <div class="animate-fade-in space-y-2 max-w-full">
          <p class="m-0 font-semibold text-purple-400">Choose an Algorithm to See Code Examples</p>
          <p class="m-0 text-sm text-slate-300">Select an algorithm from the dropdown above, or ask for a specific one:</p>
          <div class="grid grid-cols-1 gap-2 mt-2">
            <button onclick="askForCode('Bubble Sort')" class="px-3 py-2 bg-slate-700 text-white text-sm rounded hover:bg-slate-600 transition-colors text-left">
              Bubble Sort - Simple O(n²) algorithm
            </button>
            <button onclick="askForCode('Merge Sort')" class="px-3 py-2 bg-slate-700 text-white text-sm rounded hover:bg-slate-600 transition-colors text-left">
               Merge Sort - Efficient O(n log n) algorithm
            </button>
            <button onclick="askForCode('Quick Sort')" class="px-3 py-2 bg-slate-700 text-white text-sm rounded hover:bg-slate-600 transition-colors text-left">
              Quick Sort - Fast average case O(n log n)
            </button>
          </div>
          <p class="m-0 text-xs text-blue-300">Tip: Or type "show me [algorithm name] code" for a specific algorithm!</p>
        </div>`;
    }

    return `
      <div class="animate-fade-in space-y-1 max-w-full">
        <p class="m-0 text-yellow-400">Code examples not available for ${algorithmName}</p>
        <p class="m-0 text-sm">Try asking about Bubble Sort, Merge Sort, or Quick Sort!</p>
      </div>`;
  }

  const code = codeExamples[language] || codeExamples.javascript;
  const languageName = language.charAt(0).toUpperCase() + language.slice(1);

  // Generate a unique ID for this code block
  const codeId = `code-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

  return `
    <div class="animate-fade-in space-y-2 max-w-full">
      <p class="m-0 font-semibold text-purple-400">${algorithmName} Implementation in ${languageName}</p>
      <div class="bg-slate-800 rounded-lg p-3 overflow-x-auto">
        <pre id="${codeId}" class="text-xs text-green-300 font-mono whitespace-pre-wrap"><code>${code}</code></pre>
      </div>
      <div class="flex flex-wrap gap-2">
        <button onclick="copyCodeById('${codeId}')" class="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
          Copy code
        </button>
        <button onclick="runCode('${algorithmName}', '${language}')" class="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors">
          Run code
        </button>
      </div>
      <p class="m-0 text-xs text-slate-400">Tip: Click the buttons above to copy or run this code!</p>
    </div>`;
}
