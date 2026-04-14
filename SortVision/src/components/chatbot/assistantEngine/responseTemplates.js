import { ALGORITHM_CODE_EXAMPLES, ALGORITHM_DATA, KEYWORDS } from './constants';
import { containsKeyword, detectIntent } from './intentHandlers';

const generateCodeExamples = (algorithmName, language = 'javascript') => {
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
};

// Enhanced algorithm recommendation system
const generateAlgorithmRecommendation = (query, _context) => {
  const lowerQuery = query.toLowerCase();

  // Use case based recommendations
  if (
    containsKeyword(lowerQuery, ['small', 'few elements', 'simple', 'beginner'])
  ) {
    return `
      <div class="animate-fade-in space-y-2 max-w-full">
        <p class="m-0 font-semibold text-emerald-400">For Small Datasets (≤ 50 elements):</p>
        <div class="space-y-1">
          <p class="m-0 text-sm">1) <strong>Insertion Sort</strong> - Best for small arrays, adaptive</p>
          <p class="m-0 text-sm">2) <strong>Selection Sort</strong> - Simple to understand and implement</p>
          <p class="m-0 text-sm">3) <strong>Bubble Sort</strong> - Educational purposes only</p>
        </div>
        <p class="m-0 text-xs text-blue-300">Tip: Insertion Sort is often the fastest for small datasets!</p>
      </div>`;
  }

  if (
    containsKeyword(lowerQuery, ['large', 'big', 'many elements', 'production'])
  ) {
    return `
      <div class="animate-fade-in space-y-2 max-w-full">
        <p class="m-0 font-semibold text-emerald-400">For Large Datasets (> 1000 elements):</p>
        <div class="space-y-1">
          <p class="m-0 text-sm">1) <strong>Quick Sort</strong> - Fastest average case O(n log n)</p>
          <p class="m-0 text-sm">2) <strong>Merge Sort</strong> - Guaranteed O(n log n), stable</p>
          <p class="m-0 text-sm">3) <strong>Heap Sort</strong> - Guaranteed O(n log n), in-place</p>
        </div>
        <p class="m-0 text-xs text-blue-300">Tip: Quick Sort is the most commonly used in production!</p>
      </div>`;
  }

  if (
    containsKeyword(lowerQuery, ['stable', 'preserve order', 'equal elements'])
  ) {
    return `
      <div class="animate-fade-in space-y-2 max-w-full">
        <p class="m-0 font-semibold text-emerald-400">For Stable Sorting (preserves equal elements order):</p>
        <div class="space-y-1">
          <p class="m-0 text-sm">1) <strong>Merge Sort</strong> - Stable, O(n log n)</p>
          <p class="m-0 text-sm">2) <strong>Insertion Sort</strong> - Stable, O(n²)</p>
          <p class="m-0 text-sm">3) <strong>Bubble Sort</strong> - Stable, O(n²)</p>
        </div>
        <p class="m-0 text-xs text-blue-300">Tip: Merge Sort is the best stable sorting algorithm!</p>
      </div>`;
  }

  if (
    containsKeyword(lowerQuery, [
      'memory',
      'space',
      'in-place',
      'constant space',
    ])
  ) {
    return `
      <div class="animate-fade-in space-y-2 max-w-full">
        <p class="m-0 font-semibold text-emerald-400">For Memory-Efficient Sorting (O(1) space):</p>
        <div class="space-y-1">
          <p class="m-0 text-sm">1) <strong>Heap Sort</strong> - O(n log n), in-place</p>
          <p class="m-0 text-sm">2) <strong>Quick Sort</strong> - O(log n) space for recursion</p>
          <p class="m-0 text-sm">3) <strong>Insertion Sort</strong> - O(1) space, O(n²) time</p>
        </div>
        <p class="m-0 text-xs text-blue-300">Tip: Heap Sort is the most memory-efficient O(n log n) algorithm!</p>
      </div>`;
  }

  return null;
};

function generateThankYouResponse() {
  return `
        <div class="animate-fade-in animate-duration-150 space-y-0.5 max-w-full">
            <p class="m-0 leading-tight break-words">You're welcome! </p>
            <div class="animate-bounce animate-duration-[1000ms]">
                <p class="m-0 text-sm break-words">If you found SortVision helpful, please give us a  star on <a href="https://github.com/alienx5499/SortVision" target="_blank" class="text-blue-400 hover:text-blue-300 underline transition-colors duration-150">GitHub</a>!</p>
            </div>
            <p class="m-0 text-xs text-slate-400 break-words">Your support means a lot to us! </p>
        </div>`;
}

function generateAlgorithmResponse(
  query,
  context,
  conversationContext,
  prioritizeQuery = false
) {
  const { algorithm } = context || {};
  const intents = detectIntent(query);

  // Detect algorithm from query first
  let detectedAlgorithm = null;
  for (const [key, keywords] of Object.entries(KEYWORDS)) {
    if (key.endsWith('Sort') && containsKeyword(query, keywords)) {
      detectedAlgorithm = key;
      break;
    }
  }

  // If prioritizing query and no algorithm found in query, don't use context
  if (prioritizeQuery && !detectedAlgorithm) {
    return null;
  }

  // Use context algorithm if no algorithm detected from query
  if (!detectedAlgorithm && algorithm && algorithm !== 'Unknown') {
    const normalizedAlgorithm = algorithm.toLowerCase().replace(/\s+/g, '');
    // Match algorithm names (bubble -> bubbleSort, merge -> mergeSort, etc.)
    detectedAlgorithm = Object.keys(ALGORITHM_DATA).find(key => {
      const keyName = key.toLowerCase().replace('sort', '');
      return (
        keyName === normalizedAlgorithm ||
        key.toLowerCase() === normalizedAlgorithm
      );
    });
  }

  if (detectedAlgorithm && ALGORITHM_DATA[detectedAlgorithm]) {
    const algoData = ALGORITHM_DATA[detectedAlgorithm];
    const detailLevel = conversationContext.userPreferences.detailLevel;

    // Handle complexity questions
    if (containsKeyword(query, KEYWORDS.complexity)) {
      let complexityInfo = `
                <div class="animate-fade-in space-y-1 max-w-full">
                    <p class="m-0 font-semibold text-emerald-400">${algoData.name} complexity</p>
                    <p class="m-0 text-sm">Time complexity: ${algoData.timeComplexity}</p>
          <p class="m-0 text-sm">Space complexity: ${algoData.spaceComplexity}</p>
          <p class="m-0 text-xs text-slate-300">In practice, this means performance depends on input size and data shape.</p>`;

      if (detailLevel === 'detailed') {
        complexityInfo += `
          <div class="mt-2 p-2 bg-slate-800/30 rounded-lg">
            <p class="m-0 text-xs text-blue-300">Complexity interpretation:</p>
            <p class="m-0 text-xs text-slate-300">${getComplexityExplanation(algoData.timeComplexity, algoData.spaceComplexity)}</p>
                </div>`;
      }

      complexityInfo += `
        <p class="m-0 text-xs text-slate-400">Best for: ${algoData.bestFor}</p>
      </div>`;

      return complexityInfo;
    }

    // Handle step-by-step questions
    if (
      containsKeyword(query, KEYWORDS.steps) ||
      containsKeyword(query, KEYWORDS.howItWorks)
    ) {
      let stepsInfo = `
                <div class="animate-fade-in space-y-1 max-w-full">
                    <p class="m-0 font-semibold text-blue-400">${algoData.name} Steps:</p>
          <p class="m-0 text-sm">${algoData.steps}</p>`;

      if (detailLevel === 'detailed') {
        stepsInfo += `
          <div class="mt-2 p-2 bg-slate-800/30 rounded-lg">
            <p class="m-0 text-xs text-blue-300"> Detailed Process:</p>
            <p class="m-0 text-xs text-slate-300">${getDetailedSteps(algoData.name)}</p>
          </div>`;
      }

      stepsInfo += `
                    <p class="m-0 text-xs text-slate-400">Tip: ${algoData.description}</p>
                </div>`;

      return stepsInfo;
    }

    // Handle example requests
    if (containsKeyword(query, KEYWORDS.examples)) {
      return `
        <div class="animate-fade-in space-y-1 max-w-full">
          <p class="m-0 font-semibold text-purple-400">${algoData.name} Example:</p>
          <p class="m-0 text-sm">Example:</p>
          <pre class="text-xs bg-slate-800/40 p-2 rounded-md whitespace-pre-wrap">${getAlgorithmExample(algoData.name)}</pre>
          <p class="m-0 text-xs text-slate-400">Tip: ${algoData.description}</p>
        </div>`;
    }

    // Handle comparison requests
    if (intents.includes('comparison')) {
      return generateComparisonResponse(algoData, query);
    }

    // General algorithm info with enhanced details
    let generalInfo = `
            <div class="animate-fade-in space-y-1 max-w-full">
                <p class="m-0 font-semibold text-indigo-400">${algoData.name}</p>
                <p class="m-0 text-sm">${algoData.description}</p>
                <div class="flex gap-3 text-xs">
                    <span class="text-emerald-300"> ${algoData.timeComplexity}</span>
                    <span class="text-blue-300"> ${algoData.spaceComplexity}</span>
        </div>`;

    if (detailLevel === 'detailed') {
      generalInfo += `
        <div class="mt-2 p-2 bg-slate-800/30 rounded-lg">
          <p class="m-0 text-xs text-blue-300"> Key Characteristics:</p>
          <p class="m-0 text-xs text-slate-300">${getAlgorithmCharacteristics(algoData.name)}</p>
        </div>`;
    }

    generalInfo += `
                <p class="m-0 text-xs text-slate-400">Best for: ${algoData.bestFor}</p>
            </div>`;

    return generalInfo;
  }

  return null;
}
function getComplexityExplanation(timeComplexity, _spaceComplexity) {
  const explanations = {
    'O(n²)':
      'Quadratic time - performance degrades quickly with input size. Not suitable for large datasets.',
    'O(n log n)':
      'Log-linear time - efficient for most practical purposes. Good balance of performance and simplicity.',
    'O(n)':
      'Linear time - excellent performance, scales linearly with input size.',
    'O(log n)':
      'Logarithmic time - very efficient, performance barely changes with input size.',
    'O(1)':
      'Constant time - optimal performance, always takes the same amount of time.',
    'O(n + k)':
      'Linear time with additional factor - depends on both input size and range of values.',
  };

  return (
    explanations[timeComplexity] ||
    'Complexity analysis helps predict algorithm performance.'
  );
}

function getDetailedSteps(algorithmName) {
  const detailedSteps = {
    'Bubble Sort':
      '1. Start from the first element\n2. Compare with next element\n3. Swap if out of order\n4. Move to next pair\n5. Repeat until no swaps needed\n6. Array is now sorted',
    'Merge Sort':
      '1. Divide array into two halves\n2. Recursively sort left half\n3. Recursively sort right half\n4. Merge sorted halves\n5. Compare elements from both halves\n6. Place smaller element in result\n7. Continue until all elements merged',
    'Quick Sort':
      '1. Choose a pivot element\n2. Partition array around pivot\n3. Elements < pivot go left\n4. Elements > pivot go right\n5. Recursively sort left partition\n6. Recursively sort right partition\n7. Combine results',
    'Heap Sort':
      '1. Build max heap from array\n2. Swap root with last element\n3. Reduce heap size by 1\n4. Heapify the root\n5. Repeat steps 2-4\n6. Array is now sorted',
    'Insertion Sort':
      '1. Start with second element\n2. Compare with previous elements\n3. Shift larger elements right\n4. Insert current element\n5. Move to next element\n6. Repeat until array is sorted',
    'Selection Sort':
      '1. Find minimum element\n2. Swap with first position\n3. Find minimum in remaining array\n4. Swap with second position\n5. Continue for all positions\n6. Array is now sorted',
  };

  return (
    detailedSteps[algorithmName] ||
    'Step-by-step process varies by algorithm implementation.'
  );
}

function getAlgorithmExample(algorithmName) {
  const examples = {
    'Bubble Sort':
      'Array: [64, 34, 25, 12, 22, 11, 90]\nPass 1: [34, 25, 12, 22, 11, 64, 90]\nPass 2: [25, 12, 22, 11, 34, 64, 90]\nPass 3: [12, 22, 11, 25, 34, 64, 90]\nFinal: [11, 12, 22, 25, 34, 64, 90]',
    'Merge Sort':
      'Array: [38, 27, 43, 3, 9, 82, 10]\nDivide: [38, 27, 43] [3, 9, 82, 10]\nSort: [27, 38, 43] [3, 9, 10, 82]\nMerge: [3, 9, 10, 27, 38, 43, 82]',
    'Quick Sort':
      'Array: [10, 7, 8, 9, 1, 5]\nPivot 5: [1, 5, 8, 9, 10, 7]\nLeft: [1] Right: [8, 9, 10, 7]\nPivot 7: [1, 5, 7, 9, 10, 8]\nFinal: [1, 5, 7, 8, 9, 10]',
  };

  return (
    examples[algorithmName] ||
    'Example demonstrates the algorithm working on sample data.'
  );
}

function getAlgorithmCharacteristics(algorithmName) {
  const characteristics = {
    'Bubble Sort':
      '• Stable sorting algorithm\n• In-place sorting\n• Simple to understand\n• Adaptive (performs well on nearly sorted data)\n• Not suitable for large datasets',
    'Merge Sort':
      '• Stable sorting algorithm\n• Not in-place (requires extra memory)\n• Consistent O(n log n) performance\n• Good for large datasets\n• Parallelizable',
    'Quick Sort':
      '• Not stable (can change relative order)\n• In-place sorting\n• Fast average case performance\n• Worst case O(n²) performance\n• Widely used in practice',
    'Heap Sort':
      '• Not stable\n• In-place sorting\n• Guaranteed O(n log n) performance\n• Not adaptive\n• Good for embedded systems',
    'Insertion Sort':
      '• Stable sorting algorithm\n• In-place sorting\n• Adaptive and online\n• Good for small datasets\n• Simple implementation',
    'Selection Sort':
      '• Not stable\n• In-place sorting\n• Simple to implement\n• Not adaptive\n• Minimum number of swaps',
  };

  return (
    characteristics[algorithmName] ||
    'Each algorithm has unique characteristics and trade-offs.'
  );
}

function generateComparisonResponse(algoData, _query) {
  const comparisons = {
    'Bubble Sort':
      'Bubble Sort is simple but slow. Use only for educational purposes or very small datasets.',
    'Merge Sort':
      'Merge Sort is stable and consistent. Great for large datasets where stability matters.',
    'Quick Sort':
      'Quick Sort is fast on average. Best general-purpose sorting algorithm for most cases.',
    'Heap Sort':
      'Heap Sort guarantees O(n log n) performance. Good when you need consistent performance.',
    'Insertion Sort':
      'Insertion Sort is simple and adaptive. Best for small datasets or nearly sorted data.',
    'Selection Sort':
      'Selection Sort minimizes swaps. Use when memory writes are expensive.',
  };

  return `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 font-semibold text-yellow-400">${algoData.name} Comparison:</p>
      <p class="m-0 text-sm">${comparisons[algoData.name] || 'This algorithm has unique characteristics.'}</p>
      <div class="flex gap-3 text-xs">
        <span class="text-emerald-300"> ${algoData.timeComplexity}</span>
        <span class="text-blue-300"> ${algoData.spaceComplexity}</span>
      </div>
      <p class="m-0 text-xs text-slate-400">Best for: ${algoData.bestFor}</p>
    </div>`;
}
function generateHelpResponse() {
  return `
        <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-emerald-400">Hi, I am SortBot, your sorting algorithm assistant.</p>
            <p class="m-0 text-sm">I can explain algorithm behavior, complexity, and when to use each one. Try:</p>
            <div class="grid grid-cols-1 gap-1 mt-2 text-xs">
                <p class="m-0">• "What is bubble sort?"</p>
                <p class="m-0">• "How does merge sort work?"</p>
                <p class="m-0">• "Compare quick sort vs heap sort"</p>
                <p class="m-0">• "What's the complexity of insertion sort?"</p>
            </div>
            <p class="m-0 text-xs text-blue-300">Tip: Pick an algorithm above to start visualizing!</p>
        </div>`;
}

function generateClarificationResponse(context) {
  const { algorithm } = context || {};
  const currentAlgo = algorithm && algorithm !== 'Unknown' ? algorithm : null;

  return `
        <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-yellow-400">I did not fully understand that request.</p>
            ${
              currentAlgo
                ? `<p class="m-0 text-sm">Currently visualizing: <span class="font-semibold text-emerald-300">${currentAlgo}</span></p>`
                : ''
            }
            <div class="text-xs mt-2">
                <p class="m-0">Try one of these:</p>
                <p class="m-0">• "How does this work?"</p>
                <p class="m-0">• "What is the time complexity?"</p>
                <p class="m-0">• "Explain the steps"</p>
            </div>
            <p class="m-0 text-xs text-blue-300">Tip: Or ask about any sorting algorithm!</p>
        </div>`;
}

export {
  generateCodeExamples,
  generateAlgorithmRecommendation,
  generateThankYouResponse,
  generateAlgorithmResponse,
  generateHelpResponse,
  generateClarificationResponse,
};
