import { ALGORITHM_DATA, KEYWORDS } from '../constants';
import { containsKeyword, detectIntent } from '../intentHandlers';

export function generateAlgorithmResponse(
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
