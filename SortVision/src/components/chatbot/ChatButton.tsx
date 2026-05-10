'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Bot, Code } from 'lucide-react';
import { useLanguage } from '@/context/language';
import type { ChatButtonProps } from './types';

export default function ChatButton({
  isOpen,
  onClick,
  hasUnreadMessages,
}: ChatButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-6 left-6 z-50 group">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-red-400/30 animate-ping [animation-duration:2s] scale-110" />
        <div className="absolute inset-0 rounded-full bg-red-400/20 animate-ping [animation-duration:3s] scale-125" />

        <Button
          type="button"
          variant="default"
          size="icon"
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
                        relative size-16 rounded-full shadow-2xl
                        transition-all duration-500
                        bg-gradient-to-br from-red-400 via-red-500 to-red-600
                        hover:from-red-300 hover:via-red-400 hover:to-red-500
                        border-2 border-red-300/60 hover:border-red-200/80
                        overflow-hidden
                        group-hover:scale-110 group-hover:rotate-3
                        active:scale-95
                        ${isOpen ? 'rotate-180' : 'rotate-0'}
                    `}
          aria-label="Toggle Chat"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-300/40 via-transparent to-red-300/30 animate-pulse" />
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div
              className="absolute top-2 right-2 size-1 bg-white rounded-full animate-ping"
              style={{ animationDelay: '0.5s' }}
            />
            <div
              className="absolute bottom-3 left-3 size-0.5 bg-red-200 rounded-full animate-ping"
              style={{ animationDelay: '1s' }}
            />
            <div
              className="absolute top-1/2 left-2 size-0.5 bg-white rounded-full animate-ping"
              style={{ animationDelay: '1.5s' }}
            />

            <Code
              className="absolute -bottom-1 -right-1 size-4 text-red-200/40 animate-spin"
              style={{ animationDuration: '3s' }}
            />
            <Code
              className="absolute -top-1 -left-1 size-3 text-red-200/30 animate-spin-reverse"
              style={{ animationDuration: '4s' }}
            />
          </div>

          <div
            className={`
                        relative z-10 transition-all duration-500 transform
                        ${isOpen ? 'rotate-180 scale-90' : 'rotate-0 scale-100'}
                        ${
                          isHovered
                            ? 'scale-125 rotate-12 drop-shadow-2xl'
                            : 'scale-100 rotate-0'
                        }
                    `}
          >
            {isOpen ? (
              <X className="size-6 text-slate-900" />
            ) : (
              <div className="relative">
                <Bot className="size-6 text-slate-900" />
                {hasUnreadMessages && (
                  <span className="absolute -top-1 -right-1 size-3 bg-emerald-400 rounded-full animate-pulse">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
                  </span>
                )}
              </div>
            )}
          </div>
        </Button>

        <div
          className={`absolute bottom-full left-0 mb-3 transition-all duration-300 ${
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <div className="bg-slate-900/95 backdrop-blur-sm text-red-400 text-sm px-4 py-2 rounded-xl whitespace-nowrap shadow-2xl border border-red-500/30 font-mono relative">
            <div className="flex items-center gap-2">
              <span className="text-amber-400">//</span>
              <span>{t('chat.askAboutSorting')}</span>
            </div>
            <div className="absolute top-full left-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900/95"></div>

            <div className="absolute inset-0 rounded-xl bg-red-400/10 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
