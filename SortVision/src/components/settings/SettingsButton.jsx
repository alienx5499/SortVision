import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SettingsModal from './SettingsModal';
import { useMobileOverlay } from '@/components/MobileOverlay';

const SettingsButton = ({ onClick }) => {
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
      {/* Enhanced Floating Settings Button */}
      <div className="fixed top-6 left-6 z-50 group">
        <div className="relative">
          {/* Outer Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-[color:var(--color-purple-400)]/30 animate-ping [animation-duration:2s] scale-110" />
          <div className="absolute inset-0 rounded-full bg-purple-400/20 animate-ping [animation-duration:3s] scale-125" />
          
          {/* Main Button */}
          <Button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative h-16 w-16 rounded-full shadow-2xl transition-all duration-500 bg-gradient-to-br from-[color:var(--color-purple-400)] via-purple-400 to-purple-600 hover:from-purple-300 hover:via-purple-400 hover:to-purple-500 border-2 border-purple-300/60 hover:border-purple-200/80 overflow-hidden group-hover:scale-110 group-hover:rotate-3 active:scale-95"
            aria-label="Open Settings"
          >
            {/* Inner Glow Effects */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-300/40 via-transparent to-purple-300/30 animate-pulse" />
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
            
            {/* Sparkle Effects */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-purple-200 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-2 w-0.5 h-0.5 bg-white rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
            </div>
            
            {/* Icon */}
            <Settings2 className={`h-8 w-8 relative z-10 transition-all duration-500 text-slate-900 drop-shadow-lg ${
              isHovered 
                ? 'scale-125 rotate-12 drop-shadow-2xl' 
                : 'scale-100 rotate-0'
            }`} />
          </Button>
          
          {/* Enhanced Tooltip */}
          {isHovered && !isOpen && (
            <div className="absolute top-full left-0 mt-3 transition-all duration-300">
              <div className="bg-slate-900 backdrop-blur-sm text-[color:var(--color-purple-400)] text-sm px-4 py-2 rounded-xl whitespace-nowrap shadow-2xl border border-purple-500/30 font-mono relative">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">//</span> 
                  <span>Settings</span>
                  <span className="text-purple-300">⚙️</span>
                </div>
                {/* Tooltip Arrow */}
                <div className="absolute -top-2 left-6 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-slate-900"></div>
                
                {/* Tooltip Glow */}
                <div className="absolute inset-0 rounded-xl bg-[color:var(--color-purple-400)]/10 animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Settings Modal */}
      {!onClick && <SettingsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default SettingsButton; 