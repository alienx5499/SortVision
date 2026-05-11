'use client';

import { useCallback, useRef, useState, type MouseEvent } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { ChatMessageList } from './ChatMessageList';
import type { ChatModalProps } from './types';

export default function ChatModal({
  isOpen,
  onClose,
  messages,
  input,
  onInputChange,
  onSend,
  messagesEndRef,
  isTyping,
  onSuggestionSelect,
}: ChatModalProps) {
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesPanelRef = useRef<HTMLDivElement>(null);

  const handleDelegatedChatAction = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const btn = target.closest('button[data-sv-action]');
      if (!btn || !messagesPanelRef.current?.contains(btn)) return;

      const action = btn.getAttribute('data-sv-action');
      if (action === 'ask-code') {
        const algorithm = btn.getAttribute('data-sv-algorithm');
        if (algorithm && onSuggestionSelect) {
          onSuggestionSelect(`Show me ${algorithm} code`);
          queueMicrotask(() => inputRef.current?.focus());
        }
        return;
      }

      if (action === 'copy-code') {
        const codeId = btn.getAttribute('data-sv-code-id');
        if (!codeId || !messagesPanelRef.current) return;
        const codeEl = messagesPanelRef.current.querySelector(
          `#${CSS.escape(codeId)}`
        );
        const text = codeEl?.textContent ?? '';
        if (!text) return;
        void navigator.clipboard.writeText(text).catch(() => {
          window.alert(
            'Failed to copy code. Please try selecting and copying manually.'
          );
        });
        return;
      }

      if (action === 'run-code') {
        window.alert(
          'Code cannot run inside the browser. Copy the snippet and run it in your editor or runtime.'
        );
      }
    },
    [onSuggestionSelect]
  );

  const handleSend = async () => {
    if (!input.trim() || isSending || input.length > 200) return;

    setIsSending(true);
    await onSend();
    setIsSending(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 left-4 w-[360px] max-w-[90vw] z-50 transform transition-all duration-500 ease-out animate-in slide-in-from-left-5">
      <Card className="bg-slate-900 border-slate-700 shadow-2xl shadow-red-500/20 rounded-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-red-500/30">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/30 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-500/5 to-transparent animate-pulse [animation-delay:1s]" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full hover:bg-slate-800/80 transition-all duration-300 border border-slate-600 hover:border-red-500/50 group hover:rotate-90 transform"
          aria-label="Close Chat"
        >
          <X className="size-4 text-slate-400 group-hover:text-red-400 transition-colors duration-300" />
        </button>

        <CardHeader className="text-center pr-10 relative py-3">
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <svg
                className="size-7 text-emerald-400 animate-bounce"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                <path d="M12 12V2a10 10 0 0 1 10 10" />
              </svg>
              <div className="absolute inset-0 rounded-full border-2 border-emerald-400/20 animate-ping" />
              <div className="absolute inset-0 rounded-full border-2 border-emerald-400/10 animate-ping [animation-delay:0.5s]" />
            </div>
            <CardTitle className="text-2xl font-bold font-mono text-white relative group">
              <span className="text-emerald-400 transition-colors duration-300 group-hover:text-emerald-300">
                Sort
              </span>
              <span className="text-purple-400 transition-colors duration-300 group-hover:text-purple-300">
                Bot
              </span>
              <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent animate-pulse" />
            </CardTitle>
          </div>
          <CardDescription className="text-slate-400 font-mono group mt-1">
            <span className="text-amber-400 group-hover:text-amber-300 transition-colors duration-300">
              //
            </span>{' '}
            Your sorting algorithm assistant
          </CardDescription>
        </CardHeader>

        <CardContent className="px-4 pb-4 pt-0 relative">
          <div ref={messagesPanelRef} onClick={handleDelegatedChatAction}>
            <ChatMessageList
              messages={messages}
              messagesEndRef={messagesEndRef}
              isTyping={isTyping}
              onSuggestionSelect={onSuggestionSelect}
            />
          </div>

          <div className="relative flex gap-2 items-stretch animate-in slide-in-from-bottom-2">
            <div className="flex-1 relative group">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => onInputChange(e.target.value)}
                onKeyDown={e =>
                  e.key === 'Enter' && !e.shiftKey && void handleSend()
                }
                placeholder="Ask about sorting algorithms..."
                className="w-full px-4 py-2.5 border border-slate-700 rounded-xl bg-slate-800/50 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all duration-300 pr-12 group-hover:border-red-500/30 placeholder:text-xs focus:scale-[1.02] transform"
                disabled={isSending}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 pointer-events-none animate-pulse" />
              {input && (
                <div
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs animate-in fade-in-50 ${
                    input.length > 200 ? 'text-orange-400' : 'text-slate-400'
                  }`}
                >
                  {input.length}/200
                </div>
              )}
              {input.length > 200 && (
                <div className="absolute -top-6 left-0 text-xs text-orange-400 animate-in slide-in-from-bottom-2">
                  Message too long! Please keep it under 200 characters.
                </div>
              )}
            </div>

            <Button
              type="button"
              variant="default"
              size="default"
              onClick={() => void handleSend()}
              disabled={!input.trim() || isSending || input.length > 200}
              className={`
                                px-4 h-[38px] rounded-xl transition-all duration-300
                                flex items-center justify-center gap-2 min-w-[50px] transform
                                ${
                                  input.trim() &&
                                  !isSending &&
                                  input.length <= 200
                                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 hover:scale-105'
                                    : input.length > 200
                                      ? 'bg-orange-500/20 text-orange-400 cursor-not-allowed'
                                      : 'bg-slate-800 text-slate-400 cursor-not-allowed'
                                }
                                ${isSending ? 'animate-pulse' : ''}
                            `}
            >
              {isSending ? (
                <div className="relative">
                  <Loader2 className="size-4 animate-spin" />
                  <div className="absolute inset-0 rounded-full border-2 border-red-400/20 animate-ping" />
                </div>
              ) : (
                <Send
                  className={`size-4 transition-transform duration-300 ${
                    input.trim() ? 'group-hover:translate-x-1' : ''
                  }`}
                />
              )}
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
