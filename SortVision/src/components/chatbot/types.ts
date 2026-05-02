/**
 * Public TypeScript contracts for the SortBot UI and assistant engine.
 */
import type { RefObject } from 'react';

export type ChatMessageRole = 'user' | 'model' | 'error';

export type ChatMessage = {
  role: ChatMessageRole;
  content: string;
  /** Follow-up prompts; rendered by the UI (not embedded in HTML). */
  suggestions?: readonly string[];
};

export type AssistantProcessResult = {
  type: string;
  content?: string;
  suggestions?: string[];
};

/** Context passed from the visualizer / UI into the assistant engine. */
export type SortingAssistantContext = {
  algorithm?: string;
  step?: number | unknown;
  array?: number[];
  uiLanguage?: string;
};

export type ConversationDetailLevel = 'brief' | 'medium' | 'detailed';

/** Mutable conversation state updated by the engine during a session. */
export type ConversationContextState = {
  lastAlgorithm: string | null;
  lastQuestion: string | null;
  abuseCount: number;
  forceLocalOnly: boolean;
  userPreferences: {
    detailLevel: ConversationDetailLevel;
    showExamples: boolean;
    showComplexity: boolean;
  };
  sessionStats: {
    questionsAsked: number;
    algorithmsDiscussed: Set<string>;
    topicsCovered: Set<string>;
  };
};

export type CachedAssistantResponse = {
  content: string;
  timestamp: number;
  suggestions?: string[];
};

export type ChatApiMessagePart = { text: string };

export type ChatApiClientMessage = {
  role: string;
  parts?: ChatApiMessagePart[];
  content?: string;
};

/** Per-chat session: history, preferences, and cache (no module singletons). */
export type AssistantSession = {
  messageHistory: ChatApiClientMessage[];
  conversationContext: ConversationContextState;
  responseCache: Map<string, CachedAssistantResponse>;
};

export class AbuseBlockError extends Error {
  readonly forceLocalOnly: boolean;
  readonly retryAfterMs: number;

  constructor(
    message: string,
    opts?: { forceLocalOnly?: boolean; retryAfterMs?: number }
  ) {
    super(message);
    this.name = 'AbuseBlockError';
    this.forceLocalOnly = opts?.forceLocalOnly === true;
    this.retryAfterMs = Number(opts?.retryAfterMs || 0);
  }
}

export type ChatAssistantProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onToggle?: () => void;
};

export type ChatModalProps = {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  input: string;
  onInputChange: (value: string) => void;
  onSend: (retryAttempt?: number) => void | Promise<void>;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  isTyping: boolean;
  onSuggestionSelect?: (text: string) => void;
};

export type ChatButtonProps = {
  isOpen: boolean;
  onClick: () => void;
  hasUnreadMessages?: boolean;
};
