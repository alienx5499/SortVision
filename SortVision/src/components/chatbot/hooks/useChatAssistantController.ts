import { useCallback, useEffect, useRef, useState } from 'react';
import { useAlgorithmState } from '@/context/algorithm-state';
import { useLanguage } from '@/context/language';
import { useAudio } from '@/hooks/audio';
import { createAssistantSession, processMessage } from '../assistantEngine';
import { buildChatErrorMessage } from '../errorMessage';
import type {
  AssistantProcessResult,
  AssistantSession,
  ChatMessage,
} from '../types';
import { isInstantChatQuery } from '../instantQuery';
import {
  useChatAutoScroll,
  useChatWelcomeMessage,
} from './useChatAssistantEffects';
import { useChatTypingReveal } from './useChatTypingReveal';
import { useRetryScheduler } from './useRetryScheduler';

type ControllerParams = {
  isOpenProp?: boolean;
  onClose?: () => void;
  onToggle?: () => void;
};

const LOADING_PLACEHOLDER_HTML =
  '<div class="animate-pulse text-slate-400">...</div>';

function isRetriableAssistantError(message: string | undefined): boolean {
  if (!message) return false;
  return (
    message.includes('NETWORK_ERROR') ||
    message.includes('TIMEOUT_ERROR') ||
    message.includes('SERVER_ERROR')
  );
}

export function useChatAssistantController({
  isOpenProp,
  onClose,
  onToggle,
}: ControllerParams) {
  const [isOpenState, setIsOpenState] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [errorCount, setErrorCount] = useState(0);
  const [, setRetryCount] = useState(0);

  const { getContextObject, addToHistory } = useAlgorithmState();
  const { language } = useLanguage();
  const { playTypingSound, isAudioEnabled } = useAudio();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const assistantSessionRef = useRef<AssistantSession | null>(null);
  const isSendingRef = useRef(false);
  const activeRequestIdRef = useRef(0);
  const handleSendRef = useRef<
    ((prompt: string, retryAttempt?: number) => void | Promise<void>) | null
  >(null);

  useChatWelcomeMessage(language, setMessages);
  useChatAutoScroll(messages, messagesEndRef);

  const { isTyping, setIsTyping, displayMessageWithTyping, interruptTyping } =
    useChatTypingReveal({
      setMessages,
      addToHistory,
      isAudioEnabled,
      playTypingSound,
    });
  const { schedule, cancelAll } = useRetryScheduler();

  const isOpen = typeof isOpenProp === 'boolean' ? isOpenProp : isOpenState;

  const toggleChat = useCallback(() => {
    if (typeof isOpenProp === 'boolean') {
      if (onToggle) {
        onToggle();
      } else if (isOpen && onClose) {
        onClose();
      }
    } else {
      setIsOpenState(prev => !prev);
    }

    if (!isOpen) {
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      document.dispatchEvent(event);
      setErrorCount(0);
    }
  }, [isOpen, isOpenProp, onClose, onToggle]);

  const handleError = useCallback(
    (error: unknown) => {
      console.error('Error: Chat Error:', error);
      const normalizedError =
        error instanceof Error ? error : new Error(String(error));
      setErrorCount(prev => {
        const nextCount = prev + 1;
        setMessages(messagesPrev => [
          ...messagesPrev,
          {
            role: 'error',
            content: buildChatErrorMessage(normalizedError, nextCount),
          },
        ]);
        return nextCount;
      });

      setIsTyping(false);
    },
    [setIsTyping]
  );

  const sendWithPrompt = useCallback(
    async (prompt: string, retryAttempt = 0) => {
      const trimmedInput = prompt.trim();
      if (!trimmedInput || isTyping || isSendingRef.current) return;
      if (retryAttempt === 0) {
        cancelAll();
      }
      const requestId = ++activeRequestIdRef.current;
      isSendingRef.current = true;

      interruptTyping();

      if (retryAttempt === 0) {
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: trimmedInput }]);
      }

      if (isInstantChatQuery(trimmedInput)) {
        setMessages(prev => [
          ...prev,
          {
            role: 'model',
            content: LOADING_PLACEHOLDER_HTML,
          },
        ]);
      }

      try {
        if (assistantSessionRef.current === null) {
          assistantSessionRef.current = createAssistantSession();
        }
        const assistantSession = assistantSessionRef.current;

        const context = {
          ...getContextObject(),
          uiLanguage: language || 'en',
        };
        if (process.env.NODE_ENV === 'development') {
          console.log('Context: Context passed to assistant:', context);
        }

        const result = (await processMessage(
          trimmedInput,
          context,
          assistantSession
        )) as AssistantProcessResult;

        if (activeRequestIdRef.current !== requestId) {
          return;
        }

        if (result.type === 'response' && result.content != null) {
          setMessages(prev =>
            prev.filter(msg => msg.content !== LOADING_PLACEHOLDER_HTML)
          );
          displayMessageWithTyping(
            result.content,
            trimmedInput,
            result.suggestions
          );
          setRetryCount(0);
          cancelAll();
        } else {
          cancelAll();
          handleError(new Error('Invalid response type'));
        }
      } catch (error) {
        if (activeRequestIdRef.current !== requestId) {
          return;
        }
        setMessages(prev =>
          prev.filter(msg => msg.content !== LOADING_PLACEHOLDER_HTML)
        );

        const err = error instanceof Error ? error : new Error(String(error));

        if (retryAttempt < 2 && isRetriableAssistantError(err.message)) {
          setRetryCount(prev => prev + 1);
          setMessages(prev => [
            ...prev,
            {
              role: 'error',
              content: `
              <div class="animate-fade-in space-y-1 max-w-full">
                <p class="m-0 text-yellow-400"> Retrying... (${retryAttempt + 1}/2)</p>
                <p class="m-0 text-sm">Let me try that again for you.</p>
              </div>`,
            },
          ]);

          schedule(
            () => {
              handleSendRef.current?.(trimmedInput, retryAttempt + 1);
            },
            1000 * (retryAttempt + 1)
          );
        } else {
          cancelAll();
          handleError(error);
        }
      } finally {
        if (activeRequestIdRef.current === requestId) {
          isSendingRef.current = false;
        }
      }
    },
    [
      displayMessageWithTyping,
      getContextObject,
      handleError,
      interruptTyping,
      isTyping,
      language,
      schedule,
      cancelAll,
    ]
  );

  const handleSend = useCallback(
    async (retryAttempt = 0) => {
      const prompt = input.trim();
      if (!prompt) return;
      await sendWithPrompt(prompt, retryAttempt);
    },
    [input, sendWithPrompt]
  );

  useEffect(() => {
    handleSendRef.current = sendWithPrompt;
  }, [sendWithPrompt]);

  return {
    controlledIsOpen: isOpen,
    setIsOpenState,
    input,
    setInput,
    messages,
    isTyping,
    messagesEndRef,
    toggleChat,
    handleSend,
  };
}
