import {
  CACHE_DURATION,
  INSTANT_RESPONSES,
  FAST_KEYWORDS,
  KEYWORDS,
} from './assistantEngine/constants';
import {
  fastContainsKeyword,
  containsKeyword,
  extractAlgorithms,
  isSortingRelatedQuery,
  updateContext,
} from './assistantEngine/intentHandlers';
import {
  generateCodeExamples,
  generateThankYouResponse,
  generateClarificationResponse,
} from './assistantEngine/responseTemplates';
import { shouldUseRemoteAI } from './assistantEngine/aiClient';
import { ABUSE_THRESHOLD, isAbusiveQuery } from './assistantEngine/moderation';
import { LOCALIZED_HELP_SNIPPETS } from './assistantEngine/templates/localizedHelp';
import {
  conversationContext,
  messageHistory,
  responseCache,
} from './assistantEngine/core/state';
import { resolveLocalResponse } from './assistantEngine/resolvers/localResponse';
import { resolveRemoteResponse } from './assistantEngine/resolvers/remoteResponse';

export async function processMessage(query, context) {
  const cleanQuery = query.trim();
  const uiLanguage = (context?.uiLanguage || 'en').toLowerCase();
  const isEnglishMode = uiLanguage === 'en';

  if (!cleanQuery) {
    return {
      type: 'response',
      content: LOCALIZED_HELP_SNIPPETS[uiLanguage] || INSTANT_RESPONSES.help,
    };
  }

  const lowerCaseQuery = cleanQuery.toLowerCase();

  if (fastContainsKeyword(lowerCaseQuery, FAST_KEYWORDS.support)) {
    return { type: 'response', content: INSTANT_RESPONSES.support };
  }

  if (fastContainsKeyword(lowerCaseQuery, FAST_KEYWORDS.creator)) {
    return { type: 'response', content: INSTANT_RESPONSES.creator };
  }

  if (fastContainsKeyword(lowerCaseQuery, FAST_KEYWORDS.github)) {
    return { type: 'response', content: INSTANT_RESPONSES.github };
  }

  if (fastContainsKeyword(lowerCaseQuery, FAST_KEYWORDS.help)) {
    return {
      type: 'response',
      content: LOCALIZED_HELP_SNIPPETS[uiLanguage] || INSTANT_RESPONSES.help,
    };
  }

  if (fastContainsKeyword(lowerCaseQuery, FAST_KEYWORDS.thankYou)) {
    return { type: 'response', content: generateThankYouResponse() };
  }

  if (fastContainsKeyword(lowerCaseQuery, FAST_KEYWORDS.code)) {
    const algorithm = context?.algorithm || 'Bubble Sort';
    const language = lowerCaseQuery.includes('python')
      ? 'python'
      : lowerCaseQuery.includes('java')
        ? 'java'
        : lowerCaseQuery.includes('cpp') || lowerCaseQuery.includes('c++')
          ? 'cpp'
          : 'javascript';
    return {
      type: 'response',
      content: generateCodeExamples(algorithm, language),
    };
  }

  if (cleanQuery.length <= 2 || /^[^a-zA-Z]*$/.test(cleanQuery)) {
    return {
      type: 'response',
      content: generateClarificationResponse(context),
    };
  }

  if (isAbusiveQuery(cleanQuery)) {
    conversationContext.abuseCount += 1;
    if (conversationContext.abuseCount >= ABUSE_THRESHOLD) {
      conversationContext.forceLocalOnly = true;
      return {
        type: 'response',
        content: `
          <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-red-400">Impressive consistency. That's strike ${conversationContext.abuseCount}.</p>
            <p class="m-0 text-sm">Remote mode is now disabled for this session.</p>
            <p class="m-0 text-xs text-blue-300">Ask a sorting-related question respectfully and I will answer in local mode.</p>
          </div>`,
      };
    }

    const attemptsLeft = ABUSE_THRESHOLD - conversationContext.abuseCount;
    return {
      type: 'response',
      content: `
        <div class="animate-fade-in space-y-1 max-w-full">
          <p class="m-0 text-red-400">That language is not accepted here.</p>
          <p class="m-0 text-sm">This assistant is for sorting algorithms, not insults.</p>
          <p class="m-0 text-xs text-blue-300">${attemptsLeft} warning${attemptsLeft === 1 ? '' : 's'} before remote mode is disabled.</p>
        </div>`,
    };
  }

  if (isEnglishMode && !isSortingRelatedQuery(cleanQuery)) {
    return {
      type: 'response',
      content: `
        <div class="animate-fade-in space-y-1 max-w-full">
          <p class="m-0 text-yellow-400">Ah yes, exactly what a sorting assistant was built for.</p>
          <p class="m-0 text-sm">I only handle sorting algorithms, not side quests.</p>
          <p class="m-0 text-xs text-blue-300">Try something like: "merge sort complexity", "quick sort steps", or "which sort should I use?"</p>
        </div>`,
    };
  }

  const mentionedAlgorithms = extractAlgorithms(cleanQuery);
  const looksLikeUnknownSortQuery =
    isEnglishMode &&
    lowerCaseQuery.includes('sort') &&
    mentionedAlgorithms.length === 0 &&
    !containsKeyword(lowerCaseQuery, KEYWORDS.comparison) &&
    !containsKeyword(lowerCaseQuery, KEYWORDS.complexity);

  if (looksLikeUnknownSortQuery) {
    return {
      type: 'response',
      content: `
        <div class="animate-fade-in space-y-1 max-w-full">
          <p class="m-0 text-yellow-400">I could not identify that sorting algorithm.</p>
          <p class="m-0 text-sm">Try one of the supported algorithms: bubble sort, insertion sort, selection sort, merge sort, quick sort, heap sort, radix sort, or bucket sort.</p>
          <p class="m-0 text-xs text-blue-300">Tip: You can ask things like "merge sort tc" or "how does quick sort work?"</p>
        </div>`,
    };
  }

  updateContext(cleanQuery, context, conversationContext);

  const cacheKey = `${cleanQuery.toLowerCase()}_${context?.algorithm || 'none'}`;
  const cachedResponse = responseCache.get(cacheKey);
  if (
    cachedResponse &&
    Date.now() - cachedResponse.timestamp < CACHE_DURATION
  ) {
    return { type: 'response', content: cachedResponse.content };
  }

  const useRemoteAI =
    shouldUseRemoteAI() && conversationContext.forceLocalOnly !== true;

  if (!useRemoteAI) {
    return resolveLocalResponse({
      cleanQuery,
      lowerCaseQuery,
      context,
      conversationContext,
      responseCache,
      cacheKey,
    });
  }

  return resolveRemoteResponse({
    query,
    cleanQuery,
    lowerCaseQuery,
    context,
    conversationContext,
    messageHistory,
  });
}
