import {
  useCallback,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type { ChatMessage } from '../types';
import { useTypingIntervalCleanup } from './useChatAssistantEffects';

type AddHistoryFn = (entry: { question: string; answer: string }) => void;

type UseChatTypingRevealParams = {
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  addToHistory: AddHistoryFn;
  isAudioEnabled: boolean;
  playTypingSound: () => void;
};

export function useChatTypingReveal({
  setMessages,
  addToHistory,
  isAudioEnabled,
  playTypingSound,
}: UseChatTypingRevealParams) {
  const [isTyping, setIsTyping] = useState(false);
  const [typingInterval, setTypingInterval] = useState<ReturnType<
    typeof setInterval
  > | null>(null);
  const lastTypingSoundRef = useRef(0);

  useTypingIntervalCleanup(typingInterval);

  const interruptTyping = useCallback(() => {
    setIsTyping(false);
    setTypingInterval(prev => {
      if (prev) clearInterval(prev);
      return null;
    });
  }, []);

  const displayMessageWithTyping = useCallback(
    (
      text: string,
      userInput: string,
      suggestions?: readonly string[] | undefined
    ) => {
      const suggestionList =
        suggestions && suggestions.length > 0 ? [...suggestions] : undefined;

      const isInstantResponse =
        text.includes('<div') || text.includes('<p class=');

      if (isInstantResponse) {
        setIsTyping(false);
        setTypingInterval(prev => {
          if (prev) clearInterval(prev);
          return null;
        });
        setMessages(prev => [
          ...prev,
          { role: 'model', content: text, suggestions: suggestionList },
        ]);
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
          setMessages(prev => {
            const last = prev[prev.length - 1];
            if (last?.role === 'model') {
              return [
                ...prev.slice(0, -1),
                {
                  ...last,
                  content: text,
                  suggestions: suggestionList,
                },
              ];
            }
            return prev;
          });
          addToHistory({ question: userInput, answer: text });
        }
      }, 20);

      setTypingInterval(interval);
    },
    [addToHistory, isAudioEnabled, playTypingSound, setMessages]
  );

  return {
    isTyping,
    setIsTyping,
    typingInterval,
    displayMessageWithTyping,
    interruptTyping,
  };
}
