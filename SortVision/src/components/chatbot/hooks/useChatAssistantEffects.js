import { useEffect } from 'react';
import { CHAT_WELCOME_MESSAGES } from '../chatAssistantConstants';

export function useChatWelcomeMessage(language, setMessages) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prevMessages => {
        if (prevMessages.length > 0) return prevMessages;
        return [
          {
            role: 'model',
            content:
              CHAT_WELCOME_MESSAGES[language] || CHAT_WELCOME_MESSAGES.en,
          },
        ];
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [language, setMessages]);
}

export function useChatAutoScroll(messages, messagesEndRef) {
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

export function useTypingIntervalCleanup(typingInterval) {
  useEffect(
    () => () => {
      if (typingInterval) {
        clearInterval(typingInterval);
      }
    },
    [typingInterval]
  );
}
