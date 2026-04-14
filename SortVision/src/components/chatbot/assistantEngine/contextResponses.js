import { ALGORITHM_DATA, KEYWORDS } from './constants';
import { containsKeyword, detectIntent } from './intentHandlers';
import {
  generateAlgorithmResponse,
  generateHelpResponse,
} from './responseTemplates';

const generateFollowUpResponse = (lastAlgorithm, _context) => {
  const algoData =
    ALGORITHM_DATA[lastAlgorithm.toLowerCase().replace(/\s+/g, '')];
  if (!algoData) return null;

  return `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 text-emerald-400">More about ${algoData.name}:</p>
      <p class="m-0 text-sm">${algoData.description}</p>
      <div class="flex gap-3 text-xs">
        <span class="text-emerald-300">Time: ${algoData.timeComplexity}</span>
        <span class="text-blue-300">Space: ${algoData.spaceComplexity}</span>
      </div>
      <p class="m-0 text-xs text-slate-400">Best for: ${algoData.bestFor}</p>
      <div class="mt-2 text-xs text-blue-300">
        <p class="m-0">Tip: Try asking: "What are the steps?" or "Show me an example"</p>
      </div>
    </div>`;
};

const generateResetResponse = conversationContext => {
  conversationContext.lastAlgorithm = null;
  conversationContext.lastQuestion = null;
  conversationContext.sessionStats.questionsAsked = 0;
  conversationContext.sessionStats.algorithmsDiscussed.clear();
  conversationContext.sessionStats.topicsCovered.clear();

  return `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 text-emerald-400">Conversation reset.</p>
      <p class="m-0 text-sm">I'm ready to help you learn about sorting algorithms from scratch!</p>
      <div class="text-xs mt-2">
        <p class="m-0">• "What is bubble sort?"</p>
        <p class="m-0">• "How does merge sort work?"</p>
        <p class="m-0">• "Compare all algorithms"</p>
      </div>
      <p class="m-0 text-xs text-blue-300">Tip: Select an algorithm above to start visualizing!</p>
    </div>`;
};

const generateContextualResponse = (
  query,
  context,
  conversationContext,
  generateClarificationResponse
) => {
  const intents = detectIntent(query);

  if (intents.includes('followUp') && conversationContext.lastAlgorithm) {
    return generateFollowUpResponse(conversationContext.lastAlgorithm, context);
  }

  if (intents.includes('clarification')) {
    return generateClarificationResponse(context);
  }

  if (containsKeyword(query, KEYWORDS.reset)) {
    return generateResetResponse(conversationContext);
  }

  return null;
};

const generateFallbackResponse = (query, context, conversationContext) => {
  const { algorithm, step, array } = context || {};

  if (containsKeyword(query, KEYWORDS.general)) {
    return generateHelpResponse();
  }

  if (
    containsKeyword(query, KEYWORDS.current) &&
    algorithm &&
    algorithm !== 'Unknown'
  ) {
    return generateContextualResponse(
      query,
      context,
      conversationContext,
      () => null
    );
  }

  const algorithmResponse = generateAlgorithmResponse(
    query,
    context,
    conversationContext,
    false
  );
  if (algorithmResponse) {
    return algorithmResponse;
  }

  if (algorithm && algorithm !== 'Unknown') {
    const normalizedAlgorithm = algorithm.toLowerCase().replace(/\s+/g, '');
    const detectedAlgorithm = Object.keys(ALGORITHM_DATA).find(key => {
      const keyName = key.toLowerCase().replace('sort', '');
      return (
        keyName === normalizedAlgorithm ||
        key.toLowerCase() === normalizedAlgorithm
      );
    });

    const algoData = detectedAlgorithm
      ? ALGORITHM_DATA[detectedAlgorithm]
      : null;
    const displayName = algoData ? algoData.name : algorithm;

    if (array && array.length > 0) {
      return `
                <div class="animate-fade-in space-y-1 max-w-full">
                    <p class="m-0 text-emerald-400">Currently visualizing: <span class="font-semibold">${displayName}</span></p>
                    <p class="m-0 text-sm">Array: [${array
                      .slice(0, 10)
                      .join(', ')}${array.length > 10 ? '...' : ''}]</p>
                    ${
                      step !== undefined
                        ? `<p class="m-0 text-xs text-slate-400">Step: ${step}</p>`
                        : ''
                    }
                    ${
                      algoData
                        ? `<p class="m-0 text-xs text-slate-300">Time: ${algoData.timeComplexity} | Space: ${algoData.spaceComplexity}</p>`
                        : ''
                    }
                    <p class="m-0 text-xs text-blue-300">Tip: Try asking about complexity, steps, or how this algorithm works!</p>
                </div>`;
    }

    return `
            <div class="animate-fade-in space-y-1 max-w-full">
                <p class="m-0 text-emerald-400">Algorithm: <span class="font-semibold">${displayName}</span></p>
                ${
                  algoData
                    ? `<p class="m-0 text-sm">${algoData.description}</p>`
                    : '<p class="m-0 text-sm">Ready to visualize! Click play to see it in action.</p>'
                }
                ${
                  algoData
                    ? `<p class="m-0 text-xs text-slate-300">Time: ${algoData.timeComplexity} | Space: ${algoData.spaceComplexity}</p>`
                    : ''
                }
                <p class="m-0 text-xs text-blue-300">Tip: Ask me about complexity, steps, or how it works!</p>
            </div>`;
  }

  if (containsKeyword(query, KEYWORDS.comparison)) {
    return `
            <div class="animate-fade-in space-y-1 max-w-full">
                <p class="m-0 font-semibold text-yellow-400">Algorithm Comparison Tips:</p>
                <p class="m-0 text-sm">• Bubble Sort: Simple but slow O(n²)</p>
                <p class="m-0 text-sm">• Merge Sort: Stable, consistent O(n log n)</p>
                <p class="m-0 text-sm">• Quick Sort: Fast average case O(n log n)</p>
                <p class="m-0 text-sm">• Heap Sort: Guaranteed O(n log n)</p>
                <p class="m-0 text-xs text-blue-300">Tip: Select an algorithm to see it in action!</p>
            </div>`;
  }

  return `
        <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-emerald-400">I'm here to help with sorting algorithms! </p>
            <p class="m-0 text-sm">You can ask me about:</p>
            <p class="m-0 text-xs">• How algorithms work • Time/space complexity • Algorithm steps • Comparisons</p>
            <p class="m-0 text-xs text-blue-300">Tip: Select an algorithm and start visualizing!</p>
        </div>`;
};

export { generateContextualResponse, generateFallbackResponse };
