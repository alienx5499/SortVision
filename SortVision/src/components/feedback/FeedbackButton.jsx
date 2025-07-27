import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeedbackModal from './FeedbackModal';
import { useMobileOverlay } from '@/components/MobileOverlay';
import { useTranslation } from 'react-i18next';


const FeedbackButton = ({ onClick }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isMobileOverlayVisible } = useMobileOverlay();

  if (isMobileOverlayVisible) return null;

  const handleClick = () => {
    if (onClick) onClick();
    else setIsOpen(true);
  };

  return (
    <>
      {/* Enhanced Floating Feedback Button */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <div className="relative">
          {/* Outer Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping [animation-duration:2s] scale-110" />
          <div className="absolute inset-0 rounded-full bg-purple-400/20 animate-ping [animation-duration:3s] scale-125" />
          
          {/* Main Button */}
          <Button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative h-16 w-16 rounded-full shadow-2xl transition-all duration-500 bg-gradient-to-br from-emerald-500 via-emerald-400 to-emerald-600 hover:from-emerald-300 hover:via-emerald-400 hover:to-emerald-500 border-2 border-emerald-300/60 hover:border-emerald-200/80 overflow-hidden group-hover:scale-110 group-hover:rotate-3 active:scale-95"
            aria-label="Open Feedback Form"
          >
            {/* Inner Glow Effects */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300/40 via-transparent to-purple-300/30 animate-pulse" />
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
            
            {/* Sparkle Effects */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-emerald-200 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-2 w-0.5 h-0.5 bg-white rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
            </div>
            
            {/* Icon */}
            <MessageSquare className={`h-8 w-8 relative z-10 transition-all duration-500 text-slate-900 drop-shadow-lg ${
              isHovered 
                ? 'scale-125 rotate-12 drop-shadow-2xl' 
                : 'scale-100 rotate-0'
            }`} />
          </Button>
          
          {/* Enhanced Tooltip */}
          <div className={`absolute bottom-full right-0 mb-3 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}>
            <div className="bg-slate-900/95 backdrop-blur-sm text-emerald-400 text-sm px-4 py-2 rounded-xl whitespace-nowrap shadow-2xl border border-emerald-500/30 font-mono relative">
              <div className="flex items-center gap-2">
                <span className="text-amber-400">//</span> 
                <span>{t('feedback.sendFeedback')}</span>
                <span className="text-emerald-300">💬</span>
              </div>
              {/* Tooltip Arrow */}
              <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900/95"></div>
              
              {/* Tooltip Glow */}
              <div className="absolute inset-0 rounded-xl bg-emerald-400/10 animate-pulse"></div>
            </div>
          </div>
          
          {/* Floating Particles Around Button */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-emerald-300 rounded-full animate-ping opacity-60"
                style={{
                  top: `${20 + 40 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                  left: `${20 + 40 * Math.sin((i * 60 * Math.PI) / 180)}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {!onClick && <FeedbackModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default FeedbackButton; 