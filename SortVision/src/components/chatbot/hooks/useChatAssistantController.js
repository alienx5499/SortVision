import { useCallback, useEffect, useRef, useState } from 'react';
import { useAlgorithmState } from '@/context/AlgorithmState';
import { useLanguage } from '@/context/LanguageContext';
import { useAudio } from '@/hooks/useAudio';
import { processMessage } from '../assistantEngine';
import { buildChatErrorMessage } from '../chatAssistantErrorMessage';
import {
  useChatAutoScroll,
  useChatWelcomeMessage,
  useTypingIntervalCleanup,
} from './useChatAssistantEffects';

export function useChatAssistantController({ isOpenProp, onClose, onToggle }) {
  const [isOpenState, setIsOpenState] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingInterval, setTypingInterval] = useState(null);
  const [errorCount, setErrorCount] = useState(0);
  const [_retryCount, setRetryCount] = useState(0);

  const { getContextObject, addToHistory } = useAlgorithmState();
  const { language } = useLanguage();
  const { playTypingSound, isAudioEnabled } = useAudio();

  const messagesEndRef = useRef(null);
  const lastTypingSoundRef = useRef(0);
  const handleSendRef = useRef(null);

  useChatWelcomeMessage(language, setMessages);
  useChatAutoScroll(messages, messagesEndRef);
  useTypingIntervalCleanup(typingInterval);

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

  const displayMessageWithTyping = useCallback(
    (text, userInput) => {
      const isInstantResponse =
        text.includes('<div') || text.includes('<p class=');

      if (isInstantResponse) {
        setMessages(prev => [...prev, { role: 'model', content: text }]);
        addToHistory({ question: userInput, answer: text });
        return;
      }

      let displayed = '';
      let i = 0;

      setIsTyping(true);
      setMessages(prev => [...prev, { role: 'model', content: '' }]);

      const interval = setInterval(() => {
        const now = Date.now();

        if (i < text.length) {
          if (now - lastTypingSoundRef.current >= 200 && isAudioEnabled) {
            playTypingSound();
            lastTypingSoundRef.current = now;
          }

          displayed += text[i];
          i++;

          setMessages(prev => {
            const last = prev[prev.length - 1];
            if (last.role === 'model') {
              return [...prev.slice(0, -1), { ...last, content: displayed }];
            }
            return prev;
          });
        } else {
          clearInterval(interval);
          setTypingInterval(null);
          setIsTyping(false);
          addToHistory({ question: userInput, answer: text });
        }
      }, 20);

      setTypingInterval(interval);
    },
    [addToHistory, isAudioEnabled, playTypingSound]
  );

  const handleError = useCallback(
    error => {
      console.error('Error: Chat Error:', error);
      setErrorCount(prev => prev + 1);

      setMessages(prev => [
        ...prev,
        {
          role: 'error',
          content: buildChatErrorMessage(error, errorCount),
        },
      ]);

      setIsTyping(false);
    },
    [errorCount]
  );

  const handleSend = useCallback(
    async (retryAttempt = 0) => {
      const trimmedInput = input.trim();
      if (!trimmedInput || isTyping) return;

      if (typingInterval) {
        clearInterval(typingInterval);
        setTypingInterval(null);
      }

      setInput('');
      setMessages(prev => [...prev, { role: 'user', content: trimmedInput }]);

      const isInstantQuery =
        /^(support|creator|github|help|thank|hi|hello)$/i.test(trimmedInput);
      if (isInstantQuery) {
        setMessages(prev => [
          ...prev,
          {
            role: 'model',
            content: '<div class="animate-pulse text-slate-400">...</div>',
          },
        ]);
      }

      try {
        const context = {
          ...getContextObject(),
          uiLanguage: language || 'en',
        };
        if (process.env.NODE_ENV === 'development') {
          console.log('Context: Context passed to assistant:', context);
        }

        const result = await processMessage(trimmedInput, context);

        if (result.type === 'response') {
          setMessages(prev => prev.filter(msg => !msg.content.includes('...')));
          displayMessageWithTyping(result.content, trimmedInput);
          setRetryCount(0);
        } else {
          handleError(new Error('Invalid response type'));
        }
      } catch (error) {
        setMessages(prev => prev.filter(msg => !msg.content.includes('...')));

        if (
          retryAttempt < 2 &&
          (error.message?.includes('NETWORK_ERROR') ||
            error.message?.includes('TIMEOUT_ERROR') ||
            error.message?.includes('SERVER_ERROR'))
        ) {
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
      isTyping,
      language,
      typingInterval,
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
