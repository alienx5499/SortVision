import React from 'react';
import { useMobileOverlay } from '@/components/MobileOverlay';
import ChatButton from './ChatButton';
import ChatModal from './ChatModal';
import { useChatAssistantController } from './hooks/useChatAssistantController';

export default function ChatAssistant({
  isOpen: isOpenProp,
  onClose,
  onToggle,
}) {
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
  const isOpen = controlledIsOpen;

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
