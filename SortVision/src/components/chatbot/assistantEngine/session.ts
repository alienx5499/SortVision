import type {
  AssistantSession,
  CachedAssistantResponse,
  ChatApiClientMessage,
  ConversationContextState,
} from '../types';

function createInitialConversationContext(): ConversationContextState {
  return {
    lastAlgorithm: null,
    lastQuestion: null,
    abuseCount: 0,
    forceLocalOnly: false,
    userPreferences: {
      detailLevel: 'medium',
      showExamples: true,
      showComplexity: true,
    },
    sessionStats: {
      questionsAsked: 0,
      algorithmsDiscussed: new Set(),
      topicsCovered: new Set(),
    },
  };
}

/** Creates isolated session state for one chat widget / browser tab (production-safe). */
export function createAssistantSession(): AssistantSession {
  return {
    messageHistory: [] as ChatApiClientMessage[],
    conversationContext: createInitialConversationContext(),
    responseCache: new Map<string, CachedAssistantResponse>(),
  };
}
