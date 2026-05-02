import { ALGORITHM_DATA, KEYWORDS } from '../constants';
import type {
  CachedAssistantResponse,
  ConversationContextState,
  SortingAssistantContext,
} from '../../types';
import {
  generateContextualResponse,
  generateFallbackResponse,
} from '../contextResponses';
import {
  generateAlgorithmRecommendation,
  generateAlgorithmResponse,
  generateClarificationResponse,
} from '../responseTemplates';
import {
  containsKeyword,
  generateFollowUpSuggestions,
} from '../intentHandlers';

type ResolveLocalResponseArgs = {
  cleanQuery: string;
  lowerCaseQuery: string;
  context: SortingAssistantContext | undefined;
  conversationContext: ConversationContextState;
  responseCache: Map<string, CachedAssistantResponse>;
  cacheKey: string;
};

const resolveLocalResponse = ({
  cleanQuery,
  lowerCaseQuery,
  context,
  conversationContext,
  responseCache,
  cacheKey,
}: ResolveLocalResponseArgs) => {
  const recommendation = generateAlgorithmRecommendation(cleanQuery, context);
  if (recommendation) {
    return { type: 'response' as const, content: recommendation };
  }

  const contextualResponse = generateContextualResponse(
    cleanQuery,
    context,
    conversationContext,
    generateClarificationResponse
  );
  if (contextualResponse) {
    responseCache.set(cacheKey, {
      content: contextualResponse,
      timestamp: Date.now(),
    });
    return { type: 'response' as const, content: contextualResponse };
  }

  if (
    containsKeyword(lowerCaseQuery, KEYWORDS.quadratic) ||
    /o\s*\(\s*n\s*(\^?2|²)\s*\)/i.test(lowerCaseQuery) ||
    lowerCaseQuery.includes('n squared') ||
    lowerCaseQuery.includes('quadratic complexity') ||
    lowerCaseQuery.includes('square time complexity')
  ) {
    const quadraticAlgos = ['bubbleSort', 'insertionSort', 'selectionSort'];
    const listItems = quadraticAlgos
      .map(key => {
        const algo = ALGORITHM_DATA[key];
        return `<p class="m-0 text-sm">• ${algo.name}: ${algo.description}</p>`;
      })
      .join('\n');

    return {
      type: 'response' as const,
      content: `
                <div class="animate-fade-in space-y-1 max-w-full">
                    <p class="m-0 text-emerald-400">Sorting algorithms with O(n²) complexity:</p>
                    ${listItems}
                    <p class="m-0 text-xs text-slate-400">These are simple but slow on large datasets. Best for learning and small inputs.</p>
                </div>`,
    };
  }

  if (
    /o\s*\(\s*n\s*log\s*n\s*\)/i.test(lowerCaseQuery) ||
    lowerCaseQuery.includes('n log n') ||
    lowerCaseQuery.includes('nlogn') ||
    lowerCaseQuery.includes('log linear') ||
    lowerCaseQuery.includes('logarithmic linear')
  ) {
    const nlognAlgos = ['mergeSort', 'quickSort', 'heapSort'];
    const listItems = nlognAlgos
      .map(key => {
        const algo = ALGORITHM_DATA[key];
        return `<p class="m-0 text-sm">• ${algo.name}: ${algo.description}</p>`;
      })
      .join('\n');

    return {
      type: 'response' as const,
      content: `
                <div class="animate-fade-in space-y-1 max-w-full">
                    <p class="m-0 text-emerald-400">Sorting algorithms with O(n log n) complexity:</p>
                    ${listItems}
                    <p class="m-0 text-xs text-slate-400">These are efficient algorithms widely used in practice for large datasets.</p>
                </div>`,
    };
  }

  const algorithmResponse = generateAlgorithmResponse(
    lowerCaseQuery,
    context,
    conversationContext,
    true
  );
  if (algorithmResponse) {
    const suggestions = generateFollowUpSuggestions(
      cleanQuery,
      context,
      context?.algorithm
    );
    return {
      type: 'response' as const,
      content: algorithmResponse,
      suggestions:
        suggestions.length > 0 ? suggestions.map(s => String(s)) : undefined,
    };
  }

  const localResponse = generateFallbackResponse(
    lowerCaseQuery,
    context,
    conversationContext
  );
  return { type: 'response' as const, content: localResponse };
};

export { resolveLocalResponse };
