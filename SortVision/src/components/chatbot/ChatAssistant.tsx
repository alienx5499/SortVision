'use client';

import { useMobileOverlay } from '@/components/MobileViewportGate';
import type { ChatAssistantProps } from './types';
import ChatButton from './ChatButton';
import ChatModal from './ChatModal';
import { useChatAssistantController } from './hooks/useChatAssistantController';

export default function ChatAssistant({
  isOpen: isOpenProp,
  onClose,
  onToggle,
}: ChatAssistantProps) {
  const { isMobileOverlayVisible } = useMobileOverlay();
  const {
    controlledIsOpen,
    setIsOpenState,
    input,
    setInput,
    messages,
    isTyping,
    messagesEndRef,
    toggleChat,
    handleSend,
  } = useChatAssistantController({
    isOpenProp,
    onClose,
    onToggle,
  });

  if (isMobileOverlayVisible) return null;

  return (
    <>
      <ChatButton isOpen={controlledIsOpen} onClick={toggleChat} />
      <ChatModal
        isOpen={controlledIsOpen}
        onClose={onClose ?? (() => setIsOpenState(false))}
        messages={messages}
        input={input}
        onInputChange={setInput}
        onSend={handleSend}
        messagesEndRef={messagesEndRef}
        isTyping={isTyping}
        onSuggestionSelect={setInput}
      />
    </>
  );
}
