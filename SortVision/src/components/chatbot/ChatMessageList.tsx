'use client';

import type { RefObject } from 'react';
import { Bot } from 'lucide-react';
import type { ChatMessage } from './types';

interface ChatMessageListProps {
  messages: ChatMessage[];
  messagesEndRef: RefObject<HTMLDivElement | null>;
  isTyping: boolean;
  onSuggestionSelect?: (text: string) => void;
}

function sanitizeChatHtml(html: string): string {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function ChatMessageList({
  messages,
  messagesEndRef,
  isTyping,
  onSuggestionSelect,
}: ChatMessageListProps) {
  return (
    <div
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      className="flex flex-col gap-1.5 overflow-y-auto text-sm bg-slate-800/50 p-2 rounded-lg border border-slate-700 text-slate-100 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800/50 mb-3 transition-all duration-300 ease-in-out min-h-[100px] max-h-[320px]"
    >
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-1.5 animate-in fade-in-50 duration-500">
          <Bot className="size-12 w-12 mb-1 opacity-50 animate-bounce" />
          <p className="text-center font-mono">
            // Ask me anything about sorting algorithms
            <br />
            // Example: &quot;How does bubble sort work?&quot;
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg transition-all duration-300 animate-in slide-in-from-bottom-2 fade-in-50 hover:scale-[1.02] transform
                ${
                  msg.role === 'user'
                    ? 'bg-blue-600/20 text-left ml-3 hover:bg-blue-600/30 hover:shadow-blue-500/20'
                    : msg.role === 'error'
                      ? 'bg-red-500/20 text-left mr-3 hover:bg-red-500/30 hover:shadow-red-500/20'
                      : 'bg-emerald-500/20 text-left mr-3 hover:bg-emerald-500/30 hover:shadow-emerald-500/20'
                }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start gap-2">
                {msg.role === 'user' ? (
                  <div className="size-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 animate-in zoom-in-50 mt-0.5">
                    <span className="text-xs text-blue-400">You</span>
                  </div>
                ) : (
                  <Bot className="size-6 text-emerald-400 flex-shrink-0 animate-in zoom-in-50 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sanitizeChatHtml(msg.content),
                    }}
                  />
                  {msg.role === 'model' &&
                    msg.suggestions &&
                    msg.suggestions.length > 0 &&
                    onSuggestionSelect && (
                      <div className="mt-2 flex flex-col gap-1.5 border-t border-slate-600/40 pt-2">
                        <p className="m-0 text-xs text-blue-300">
                          You might also ask:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.suggestions.map((s, si) => (
                            <button
                              key={`${idx}-s-${si}`}
                              type="button"
                              className="text-left text-xs px-2 py-1 rounded-md bg-slate-700/90 text-slate-200 hover:bg-slate-600 hover:text-white transition-colors max-w-full break-words"
                              onClick={() => {
                                onSuggestionSelect(s);
                              }}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 p-2 animate-in slide-in-from-bottom-2 fade-in-50">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-xs">Thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} className="h-0" />
        </div>
      )}
    </div>
  );
}
