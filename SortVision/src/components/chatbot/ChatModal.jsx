import React, { useState } from 'react';
import { X, Bot, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

const ChatModal = ({
  isOpen,
  onClose,
  messages,
  input,
  onInputChange,
  onSend,
  messagesEndRef,
  isTyping,
}) => {
  const [isSending, setIsSending] = useState(false);

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
        {/* Decorative gradient background with animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/30 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-500/5 to-transparent animate-pulse [animation-delay:1s]" />

        {/* Close button with improved hover effect */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full hover:bg-slate-800/80 transition-all duration-300 border border-slate-600 hover:border-red-500/50 group hover:rotate-90 transform"
          aria-label="Close Chat"
        >
          <X className="h-4 w-4 text-slate-400 group-hover:text-red-400 transition-colors duration-300" />
        </button>

        <CardHeader className="text-center pr-10 relative py-3">
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <Bot className="h-7 w-7 text-emerald-400 animate-bounce" />
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
          {/* Messages container with improved scrollbar and dynamic height */}
          <div
            className={`flex flex-col gap-1.5 overflow-y-auto text-sm bg-slate-800/50 p-2 rounded-lg border border-slate-700 text-slate-100 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800/50 mb-3 transition-all duration-300 ease-in-out min-h-[100px] max-h-[320px]`}
          >
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-1.5 animate-in fade-in-50 duration-500">
                <Bot className="h-12 w-12 mb-1 opacity-50 animate-bounce" />
                <p className="text-center font-mono">
                  // Ask me anything about sorting algorithms
                  <br />
                  // Example: "How does bubble sort work?"
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
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 animate-in zoom-in-50 mt-0.5">
                          <span className="text-xs text-blue-400">You</span>
                        </div>
                      ) : (
                        <Bot className="w-6 h-6 text-emerald-400 flex-shrink-0 animate-in zoom-in-50 mt-0.5" />
                      )}
                      <div
                        className="flex-1"
                        dangerouslySetInnerHTML={{ __html: msg.content }}
                      />
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

          {/* Enhanced input container with better alignment and animations */}
          <div className="relative flex gap-2 items-stretch animate-in slide-in-from-bottom-2">
            <div className="flex-1 relative group">
              <input
                type="text"
                value={input}
                onChange={e => onInputChange(e.target.value)}
                onKeyDown={e =>
                  e.key === 'Enter' && !e.shiftKey && handleSend()
                }
                placeholder="Ask about sorting algorithms..."
                className="w-full px-4 py-2.5 border border-slate-700 rounded-xl bg-slate-800/50 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all duration-300 pr-12 group-hover:border-red-500/30 placeholder:text-xs focus:scale-[1.02] transform"
                disabled={isSending}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 pointer-events-none animate-pulse" />
              {input && (
                <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs animate-in fade-in-50 ${
                  input.length > 200 ? 'text-orange-400' : 'text-slate-400'
                }`}>
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
              onClick={handleSend}
              disabled={!input.trim() || isSending || input.length > 200}
              className={`
                                px-4 h-[38px] rounded-xl transition-all duration-300
                                flex items-center justify-center gap-2 min-w-[50px] transform
                                ${
                                  input.trim() && !isSending && input.length <= 200
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
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <div className="absolute inset-0 rounded-full border-2 border-red-400/20 animate-ping" />
                </div>
              ) : (
                <Send
                  className={`h-4 w-4 transition-transform duration-300 ${
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
};

export default ChatModal;
