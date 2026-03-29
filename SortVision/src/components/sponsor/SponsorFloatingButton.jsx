import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMobileOverlay } from '@/components/MobileOverlay';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Floating sponsor control — same motion/layout as FeedbackButton, rose/amber
 * palette; top-right so it does not stack on the feedback FAB (bottom-right).
 */
const SponsorFloatingButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isMobileOverlayVisible } = useMobileOverlay();
  const { t } = useLanguage();

  if (isMobileOverlayVisible) return null;

  return (
    <div className="fixed top-4 right-6 z-50 group max-sm:top-[max(1rem,env(safe-area-inset-top))]">
      <div className="relative">
        {/* Outer Glow Ring — rose/amber (distinct from feedback emerald) */}
        <div className="absolute inset-0 rounded-full bg-rose-400/25 animate-ping [animation-duration:2s] scale-110" />
        <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping [animation-duration:3s] scale-125" />

        <Button
          type="button"
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative h-16 w-16 rounded-full shadow-2xl transition-all duration-500 bg-gradient-to-br from-rose-500 via-rose-400 to-amber-500 hover:from-rose-400 hover:via-rose-500 hover:to-amber-400 border-2 border-rose-200/50 hover:border-amber-200/80 overflow-hidden group-hover:scale-110 group-hover:rotate-3 active:scale-95"
          aria-label={t('main.sponsor')}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-300/30 via-transparent to-rose-300/25 animate-pulse" />
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div
              className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping"
              style={{ animationDelay: '0.5s' }}
            />
            <div
              className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-rose-200 rounded-full animate-ping"
              style={{ animationDelay: '1s' }}
            />
            <div
              className="absolute top-1/2 left-2 w-0.5 h-0.5 bg-white rounded-full animate-ping"
              style={{ animationDelay: '1.5s' }}
            />
          </div>

          <Heart
            className={`h-8 w-8 relative z-10 transition-all duration-500 fill-rose-950/20 text-rose-950 drop-shadow-lg ${
              isHovered
                ? 'scale-125 rotate-12 drop-shadow-2xl'
                : 'scale-100 rotate-0'
            }`}
            strokeWidth={1.75}
          />
        </Button>

        {/* Tooltip below button — same pattern as SettingsButton (top-full + mt-3) */}
        <div
          className={`absolute top-full right-0 mt-3 transition-all duration-300 ${
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <div className="bg-slate-900/95 backdrop-blur-sm text-rose-300 text-sm px-4 py-2 rounded-xl whitespace-nowrap shadow-2xl border border-rose-500/35 font-mono relative">
            <div className="flex items-center gap-2">
              <span className="text-amber-400">//</span>
              <span>{t('main.sponsor')}</span>
              <span className="text-rose-200">♥</span>
            </div>
            <div className="absolute -top-2 right-6 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-slate-900/95" />
            <div className="absolute inset-0 rounded-xl bg-rose-400/10 animate-pulse" />
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-rose-300 rounded-full animate-ping opacity-60"
              style={{
                top: `${20 + 40 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                left: `${20 + 40 * Math.sin((i * 60 * Math.PI) / 180)}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorFloatingButton;
