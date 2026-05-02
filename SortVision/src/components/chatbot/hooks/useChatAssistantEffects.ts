import {
  useEffect,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from 'react';
import { CHAT_WELCOME_MESSAGES } from '../welcomeMessages';
import type { ChatMessage } from '../types';

export function useChatWelcomeMessage(
  language: string,
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>
) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prevMessages => {
        if (prevMessages.length > 0) return prevMessages;
        return [
          {
            role: 'model',
            content:
              (CHAT_WELCOME_MESSAGES as Record<string, string>)[language] ||
              CHAT_WELCOME_MESSAGES.en,
          },
        ];
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [language, setMessages]);
}

export function useChatAutoScroll(
  messages: ChatMessage[],
  messagesEndRef: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    };

    if (messages.length > 0) {
      scrollToBottom();
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, messagesEndRef]);
}

export function useTypingIntervalCleanup(
  typingInterval: ReturnType<typeof setInterval> | null
) {
  useEffect(
    () => () => {
      if (typingInterval) {
        clearInterval(typingInterval);
      }
    },
    [typingInterval]
  );
}
