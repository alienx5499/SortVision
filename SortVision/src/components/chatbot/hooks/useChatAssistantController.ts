import { useCallback, useEffect, useRef, useState } from 'react';
import { useAlgorithmState } from '@/context/AlgorithmState';
import { useLanguage } from '@/context/LanguageContext';
import { useAudio } from '@/hooks/useAudio';
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

type ControllerParams = {
  isOpenProp?: boolean;
  onClose?: () => void;
  onToggle?: () => void;
};

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
  const handleSendRef = useRef<
    ((retryAttempt?: number) => void | Promise<void>) | null
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
      setErrorCount(prev => prev + 1);

      setMessages(prev => [
        ...prev,
        {
          role: 'error',
          content: buildChatErrorMessage(
            error instanceof Error ? error : new Error(String(error)),
            errorCount
          ),
        },
      ]);

      setIsTyping(false);
    },
    [errorCount, setIsTyping]
  );

  const handleSend = useCallback(
    async (retryAttempt = 0) => {
      const trimmedInput = input.trim();
      if (!trimmedInput || isTyping) return;

      interruptTyping();

      setInput('');
      setMessages(prev => [...prev, { role: 'user', content: trimmedInput }]);

      if (isInstantChatQuery(trimmedInput)) {
        setMessages(prev => [
          ...prev,
          {
            role: 'model',
            content: '<div class="animate-pulse text-slate-400">...</div>',
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

        if (result.type === 'response' && result.content != null) {
          setMessages(prev => prev.filter(msg => !msg.content.includes('...')));
          displayMessageWithTyping(
            result.content,
            trimmedInput,
            result.suggestions
          );
          setRetryCount(0);
        } else {
          handleError(new Error('Invalid response type'));
        }
      } catch (error) {
        setMessages(prev => prev.filter(msg => !msg.content.includes('...')));

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

          setTimeout(
            () => {
              handleSendRef.current?.(retryAttempt + 1);
            },
            1000 * (retryAttempt + 1)
          );
        } else {
          handleError(error);
        }
      }
    },
    [
      displayMessageWithTyping,
      getContextObject,
      handleError,
      input,
      interruptTyping,
      isTyping,
      language,
    ]
  );

  useEffect(() => {
    handleSendRef.current = handleSend;
  }, [handleSend]);

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
