import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAlgorithmState } from '@/context/AlgorithmState';
import { useLanguage } from '@/context/LanguageContext';
import { useAudio } from '@/hooks/useAudio';
import { useMobileOverlay } from '@/components/MobileOverlay';
import { processMessage } from './assistantEngine';
import ChatButton from './ChatButton';
import ChatModal from './ChatModal';

const CHAT_WELCOME_MESSAGES = {
  en: "Hello! I'm SortBot, your sorting algorithm assistant. How can I help you today?",
  es: 'Hola. Soy SortBot, tu asistente de algoritmos de ordenamiento. ¿En qué te ayudo hoy?',
  hi: 'नमस्ते। मैं SortBot हूँ, आपका sorting algorithm assistant। आज मैं आपकी कैसे मदद कर सकता हूँ?',
  fr: "Bonjour. Je suis SortBot, votre assistant d'algorithmes de tri. Comment puis-je vous aider aujourd'hui ?",
  de: 'Hallo. Ich bin SortBot, dein Assistent fuer Sortieralgorithmen. Wie kann ich dir heute helfen?',
  zh: '你好。我是 SortBot，你的排序算法助手。今天我可以帮你什么？',
  bn: 'হ্যালো। আমি SortBot, তোমার sorting algorithm assistant। আজ কীভাবে সাহায্য করতে পারি?',
  ja: 'こんにちは。SortBotです。ソートアルゴリズムの学習を手伝います。今日は何を知りたいですか？',
  jp: 'こんにちは。SortBotです。ソートアルゴリズムの学習を手伝います。今日は何を知りたいですか？',
};

export default function ChatAssistant({
  isOpen: isOpenProp,
  onClose,
  onToggle,
}) {
  const [isOpenState, setIsOpenState] = useState(false);
  const isOpen = typeof isOpenProp === 'boolean' ? isOpenProp : isOpenState;
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingInterval, setTypingInterval] = useState(null);
  const [errorCount, setErrorCount] = useState(0);
  const [_retryCount, setRetryCount] = useState(0);

  const { getContextObject, addToHistory } = useAlgorithmState();
  const { language } = useLanguage();
  const { playTypingSound, isAudioEnabled } = useAudio();
  const { isMobileOverlayVisible } = useMobileOverlay();

  const messagesEndRef = useRef(null);
  const lastTypingSoundRef = useRef(0);

  // Initialize with welcome message
  useEffect(() => {
    console.log('OK: ChatAssistant mounted');

    // Add welcome message with delay
    const timer = setTimeout(() => {
      setMessages([
        {
          role: 'model',
          content: CHAT_WELCOME_MESSAGES[language] || CHAT_WELCOME_MESSAGES.en,
        },
      ]);
    }, 1000);

    return () => clearTimeout(timer);
  }, [language]);

  // Scroll to bottom on new messages
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    };

    if (messages.length > 0) {
      scrollToBottom();
      // Double-check scroll position after any images/content loads
      setTimeout(scrollToBottom, 100);
    }
  }, [messages]);

  // Clean up typing interval on unmount
  useEffect(() => {
    return () => {
      if (typingInterval) {
        clearInterval(typingInterval);
      }
    };
  }, [typingInterval]);

  // Handle chat open/close with animation
  const toggleChat = useCallback(() => {
    if (typeof isOpenProp === 'boolean') {
      // For controlled state, use onToggle if provided, otherwise fallback to onClose
      if (onToggle) {
        onToggle();
      } else if (isOpen && onClose) {
        onClose();
      }
    } else {
      setIsOpenState(prev => !prev);
    }

    // Enable audio interaction and reset error count when opening
    if (!isOpen) {
      // Enable audio interaction
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      document.dispatchEvent(event);

      // Reset error count on new session
      setErrorCount(0);
    }
  }, [isOpen, isOpenProp, onClose, onToggle]);

  // Enhanced message display with typing animation
  const displayMessageWithTyping = useCallback(
    (text, userInput) => {
      // Check if this is a pre-computed instant response (contains HTML)
      const isInstantResponse =
        text.includes('<div') || text.includes('<p class=');

      if (isInstantResponse) {
        // Show instant response without typing animation
        setMessages(prev => [...prev, { role: 'model', content: text }]);
        addToHistory({ question: userInput, answer: text });
        return;
      }

      // For other responses, use typing animation
      let displayed = '';
      let i = 0;

      setIsTyping(true);
      setMessages(prev => [...prev, { role: 'model', content: '' }]);

      const interval = setInterval(() => {
        const now = Date.now();

        if (i < text.length) {
          // Play typing sound with rate limiting
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
      }, 20); // Faster typing for better responsiveness

      setTypingInterval(interval);
    },
    [isAudioEnabled, playTypingSound, addToHistory]
  );

  // Enhanced error handling with better user feedback
  const handleError = useCallback(
    error => {
      console.error('Error: Chat Error:', error);
      setErrorCount(prev => prev + 1);

      let errorMessage = '';

      if (error.message?.includes('TIMEOUT_ERROR')) {
        errorMessage = `
          <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-orange-400"> Request Timeout</p>
            <p class="m-0 text-sm">The request took too long to process. Let me help you with local knowledge instead!</p>
            <p class="m-0 text-xs text-blue-300">Tip: Try asking about specific algorithms!</p>
          </div>`;
      } else if (error.message?.includes('NETWORK_ERROR')) {
        errorMessage = `
          <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-yellow-400"> Connection Issue</p>
            <p class="m-0 text-sm">I'm having trouble connecting. Let me help you with local knowledge instead!</p>
            <p class="m-0 text-xs text-blue-300">Tip: Try asking about specific algorithms!</p>
          </div>`;
      } else if (error.message?.includes('RATE_LIMIT')) {
        errorMessage = `
          <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-orange-400"> Rate Limit Reached</p>
            <p class="m-0 text-sm">I'm getting too many requests. Please wait a moment and try again!</p>
            <p class="m-0 text-xs text-blue-300">Tip: In the meantime, try exploring the algorithms above!</p>
          </div>`;
      } else if (error.message?.includes('SERVER_ERROR')) {
        errorMessage = `
          <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-red-400"> Server Issue</p>
            <p class="m-0 text-sm">There's a temporary server issue. Let me help you with local knowledge instead!</p>
            <p class="m-0 text-xs text-blue-300">Tip: Try asking about specific algorithms!</p>
          </div>`;
      } else {
        errorMessage =
          errorCount > 2
            ? `
            <div class="animate-fade-in space-y-1 max-w-full">
              <p class="m-0 text-red-400"> Persistent Issue</p>
              <p class="m-0 text-sm">I'm having trouble connecting. Please try again later or refresh the page.</p>
              <p class="m-0 text-xs text-blue-300">Tip: In the meantime, explore the algorithms above!</p>
            </div>`
            : `
            <div class="animate-fade-in space-y-1 max-w-full">
              <p class="m-0 text-yellow-400"> Temporary Issue</p>
              <p class="m-0 text-sm">I encountered an error. Let me try to help you again.</p>
              <p class="m-0 text-xs text-blue-300">Tip: Try asking about specific algorithms!</p>
            </div>`;
      }

      setMessages(prev => [
        ...prev,
        {
          role: 'error',
          content: errorMessage,
        },
      ]);

      setIsTyping(false);
    },
    [errorCount]
  );

  // Enhanced message sending with validation and retry mechanism
  const handleSend = useCallback(
    async (retryAttempt = 0) => {
      const trimmedInput = input.trim();
      if (!trimmedInput || isTyping) return;

      // Clear previous interval if exists
      if (typingInterval) {
        clearInterval(typingInterval);
        setTypingInterval(null);
      }

      setInput('');
      setMessages(prev => [...prev, { role: 'user', content: trimmedInput }]);

      // Show immediate feedback for instant responses
      const isInstantQuery =
        /^(support|creator|github|help|thank|hi|hello)$/i.test(trimmedInput);
      if (isInstantQuery) {
        // Add a brief loading indicator
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
        console.log('Context: Context passed to assistant:', context);

        const result = await processMessage(trimmedInput, context);

        if (result.type === 'response') {
          // Remove loading indicator if it exists
          setMessages(prev => {
            const filtered = prev.filter(msg => !msg.content.includes('...'));
            return filtered;
          });

          displayMessageWithTyping(result.content, trimmedInput);
          setRetryCount(0); // Reset retry count on success
        } else {
          handleError(new Error('Invalid response type'));
        }
      } catch (error) {
        // Remove loading indicator on error
        setMessages(prev => {
          const filtered = prev.filter(msg => !msg.content.includes('...'));
          return filtered;
        });

        // Retry logic for certain errors
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

          // Wait a bit before retrying
          setTimeout(
            () => {
              handleSend(retryAttempt + 1);
            },
            1000 * (retryAttempt + 1)
          ); // Exponential backoff
        } else {
          handleError(error);
        }
      }
    },
    [
      input,
      isTyping,
      typingInterval,
      language,
      getContextObject,
      displayMessageWithTyping,
      handleError,
    ]
  );

  if (isMobileOverlayVisible) return null;

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={toggleChat} />
      <ChatModal
        isOpen={isOpen}
        onClose={onClose ? onClose : () => setIsOpenState(false)}
        messages={messages}
        input={input}
        onInputChange={setInput}
        onSend={handleSend}
        messagesEndRef={messagesEndRef}
        isTyping={isTyping}
      />
    </>
  );
}
