import { INTENT_PATTERNS, KEYWORDS } from './constants';

const ALGORITHM_ALIAS_MAP = {
  bubbleSort: ['bubble', 'bubblesort', 'bubble sort'],
  mergeSort: ['merge', 'mergesort', 'merge sort'],
  quickSort: ['quick', 'quicksort', 'quick sort'],
  heapSort: ['heap', 'heapsort', 'heap sort'],
  insertionSort: ['insertion', 'insertionsort', 'insertion sort'],
  selectionSort: ['selection', 'selectionsort', 'selection sort'],
  radixSort: ['radix', 'radixsort', 'radix sort'],
  bucketSort: ['bucket', 'bucketsort', 'bucket sort'],
};

const INTENT_KEYWORD_HINTS = {
  complexity: ['complexity', 'big o', 'o(', 'tc', 'sc', 'time complexity'],
  comparison: ['compare', 'vs', 'versus', 'better', 'faster', 'slower'],
  step: ['step', 'steps', 'how does', 'how to', 'process'],
  example: ['example', 'sample', 'demo', 'show me'],
  question: ['what', 'why', 'how', 'which', '?'],
  request: ['please', 'can you', 'show', 'explain', 'tell me'],
};

const SORTING_DOMAIN_TERMS = [
  'sort',
  'sorting',
  'algorithm',
  'array',
  'compare',
  'swap',
  'complexity',
  'big o',
  'time complexity',
  'space complexity',
  'merge',
  'quick',
  'heap',
  'bubble',
  'insertion',
  'selection',
  'radix',
  'bucket',
];

const normalizeText = value =>
  value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const fastContainsKeyword = (query, keywords) => {
  const normalizedQuery = normalizeText(query);
  return keywords.some(keyword => {
    const normalizedKeyword = normalizeText(keyword);
    if (!normalizedKeyword) return false;
    return normalizedQuery.includes(normalizedKeyword);
  });
};

const containsKeyword = (query, keywords) =>
  keywords.some(keyword => {
    const normalizedKeyword = normalizeText(keyword);
    if (!normalizedKeyword) return false;
    return normalizeText(query).includes(normalizedKeyword);
  });

const detectIntent = query => {
  const intentScores = new Map();
  const normalizedQuery = normalizeText(query);

  for (const [intent, pattern] of Object.entries(INTENT_PATTERNS)) {
    if (pattern.test(query)) {
      intentScores.set(intent, (intentScores.get(intent) || 0) + 2);
    }
  }

  for (const [intent, hints] of Object.entries(INTENT_KEYWORD_HINTS)) {
    if (hints.some(hint => normalizedQuery.includes(normalizeText(hint)))) {
      intentScores.set(intent, (intentScores.get(intent) || 0) + 1);
    }
  }

  return Array.from(intentScores.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([intent]) => intent);
};

// Extract algorithm mentions from query
const extractAlgorithms = query => {
  const normalizedQuery = normalizeText(query);
  const tokens = normalizedQuery.split(' ');
  const matched = [];

  for (const [algorithmKey, aliases] of Object.entries(ALGORITHM_ALIAS_MAP)) {
    const hasAlias = aliases.some(alias =>
      normalizedQuery.includes(normalizeText(alias))
    );
    const hasPrefixMatch = tokens.some(
      token =>
        token.length >= 3 &&
        algorithmKey.toLowerCase().includes(token) &&
        token !== 'sort'
    );

    if (hasAlias || hasPrefixMatch) {
      matched.push(algorithmKey);
    }
  }

  // Fallback to keyword map if no match from aliases
  if (matched.length === 0) {
    for (const [key, keywords] of Object.entries(KEYWORDS)) {
      if (key.endsWith('Sort') && containsKeyword(query, keywords)) {
        matched.push(key);
      }
    }
  }

  return Array.from(new Set(matched));
};

const detectPrimaryAlgorithm = (query, contextAlgorithm) => {
  const detectedAlgorithms = extractAlgorithms(query);
  if (detectedAlgorithms.length > 0) {
    return detectedAlgorithms[0];
  }

  if (!contextAlgorithm || contextAlgorithm === 'Unknown') {
    return null;
  }

  const normalizedContext = normalizeText(contextAlgorithm).replace(
    ' sort',
    ''
  );
  return (
    Object.keys(ALGORITHM_ALIAS_MAP).find(key =>
      normalizeText(key.replace('Sort', '')).includes(normalizedContext)
    ) || null
  );
};

const isSortingRelatedQuery = query => {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return false;

  if (SORTING_DOMAIN_TERMS.some(term => normalizedQuery.includes(term))) {
    return true;
  }

  const keywordMatches = Object.values(KEYWORDS).some(keywordList =>
    keywordList.some(keyword =>
      normalizedQuery.includes(normalizeText(keyword))
    )
  );

  if (keywordMatches) {
    return true;
  }

  return extractAlgorithms(query).length > 0;
};

const updateContext = (query, context, conversationContext) => {
  conversationContext.lastQuestion = query;
  conversationContext.sessionStats.questionsAsked++;

  if (context?.algorithm) {
    conversationContext.lastAlgorithm = context.algorithm;
    conversationContext.sessionStats.algorithmsDiscussed.add(context.algorithm);
  }

  // Detect topics covered
  const intents = detectIntent(query);
  intents.forEach(intent =>
    conversationContext.sessionStats.topicsCovered.add(intent)
  );

  // Update user preferences based on query patterns
  if (containsKeyword(query, KEYWORDS.beginner)) {
    conversationContext.userPreferences.detailLevel = 'detailed';
  } else if (containsKeyword(query, KEYWORDS.advanced)) {
    conversationContext.userPreferences.detailLevel = 'brief';
  }

  if (containsKeyword(query, KEYWORDS.examples)) {
    conversationContext.userPreferences.showExamples = true;
  }
};

const generateFollowUpSuggestions = (query, context, algorithm) => {
  const targetAlgorithm =
    detectPrimaryAlgorithm(query, algorithm || context?.algorithm) || null;
  const suggestions = [];
  const intents = detectIntent(query);

  if (intents.includes('question') || intents.includes('request')) {
    if (targetAlgorithm) {
      const prettyName = targetAlgorithm.replace('Sort', ' Sort');
      suggestions.push(`What is the time complexity of ${prettyName}?`);
      suggestions.push(`How does ${prettyName} work step by step?`);
      suggestions.push(`When should I use ${prettyName}?`);
    } else {
      suggestions.push('What is bubble sort?');
      suggestions.push('Compare merge sort vs quick sort');
      suggestions.push('Show me all sorting algorithms');
    }
  }

  if (intents.includes('comparison')) {
    suggestions.push('Which algorithm is fastest?');
    suggestions.push('What are the trade-offs?');
  }

  if (intents.includes('complexity')) {
    suggestions.push('What about space complexity?');
    suggestions.push('How does complexity impact real performance?');
  }

  return Array.from(new Set(suggestions)).slice(0, 3);
};

export {
  fastContainsKeyword,
  containsKeyword,
  detectIntent,
  extractAlgorithms,
  detectPrimaryAlgorithm,
  isSortingRelatedQuery,
  updateContext,
  generateFollowUpSuggestions,
};
