import React from 'react';
import {
  Laptop,
  ArrowRight,
  LayoutTemplate,
  AlertTriangle,
  Terminal,
  Code,
  Smartphone,
} from 'lucide-react';
import { showMobileViewportGateDevChrome } from './showMobileViewportGateDevChrome';

export type MobileViewportGateViewProps = {
  animationStage: number;
  onContinue: () => void;
  onRequestDesktop: () => void;
};

export const MobileViewportGateView = ({
  animationStage,
  onContinue,
  onRequestDesktop,
}: MobileViewportGateViewProps) => (
  <div
    className={`fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-5 text-center ${
      animationStage === 4
        ? 'animate-fade-out animate-duration-[500ms]'
        : 'animate-fade-in animate-duration-[800ms]'
    }`}
  >
    {showMobileViewportGateDevChrome && (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Code
          className="absolute text-slate-800/30 top-[15%] left-[10%] h-24 w-24 animate-spin animate-infinite animate-duration-[15000ms]"
          aria-hidden="true"
        />
        <Terminal
          className="absolute text-slate-800/20 bottom-[20%] right-[15%] h-20 w-20 animate-spin animate-reverse animate-infinite animate-duration-[20000ms]"
          aria-hidden="true"
        />
        <Smartphone
          className="absolute text-slate-800/20 top-[60%] left-[15%] h-16 w-16 animate-pulse animate-infinite animate-duration-[4000ms]"
          aria-hidden="true"
        />
        <div className="absolute top-[5%] left-[5%] text-slate-800/10 font-mono text-xs">
          {`function isMobile() {`}
          <br />
          {`  return screen.width < 768;`}
          <br />
          {`}`}
        </div>
        <div className="absolute bottom-[8%] right-[5%] text-slate-800/10 font-mono text-xs">
          {`const experience = {`}
          <br />
          {`  mobile: "limited",`}
          <br />
          {`  desktop: "optimal"`}
          <br />
          {`};`}
        </div>
      </div>
    )}

    <div
      className={`mb-6 text-emerald-400 transition-all duration-500 ${
        animationStage >= 1
          ? 'translate-y-0 opacity-100'
          : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="relative">
        <Laptop
          className="h-16 w-16 animate-pulse animate-infinite animate-duration-[3000ms]"
          aria-hidden="true"
        />
        <div className="absolute -top-1 -right-1">
          <AlertTriangle
            className="h-6 w-6 text-amber-400 animate-ping animate-infinite animate-duration-[2000ms] animate-delay-500"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>

    <h1
      className={`text-2xl sm:text-3xl font-mono font-bold mb-4 transition-all duration-500 ${
        animationStage >= 2
          ? 'translate-y-0 opacity-100'
          : 'translate-y-10 opacity-0'
      }`}
    >
      {showMobileViewportGateDevChrome ? (
        <>
          <span className="text-emerald-400">Desktop</span>
          <span className="text-purple-400">.Experience</span>
          <span className="text-slate-400">
            <span className="inline-block animate-bounce animate-infinite animate-duration-[1500ms]">
              (
            </span>
            <span className="inline-block animate-bounce animate-infinite animate-duration-[1500ms] animate-delay-100">
              )
            </span>
          </span>
        </>
      ) : (
        <>
          <span className="text-emerald-400">Desktop</span>{' '}
          <span className="text-white">experience</span>
        </>
      )}
    </h1>

    <p
      className={`text-base leading-relaxed mb-6 text-slate-300 max-w-md font-mono transition-all duration-500 ${
        animationStage >= 2
          ? 'translate-y-0 opacity-100'
          : 'translate-y-10 opacity-0'
      }`}
    >
      {showMobileViewportGateDevChrome && (
        <span className="text-amber-400 animate-pulse animate-infinite animate-duration-[2000ms]">
          //
        </span>
      )}
      {showMobileViewportGateDevChrome ? ' ' : null}
      SortVision provides optimal visualization on larger screens.
      <br />
      <span className="animate-fade-right animate-once animate-duration-[1500ms] animate-delay-[1000ms] inline-block">
        The algorithm animations require more space for best experience.
      </span>
    </p>

    <div
      className={`flex flex-col gap-3 w-full max-w-xs transition-all duration-500 ${
        animationStage >= 3
          ? 'translate-y-0 opacity-100'
          : 'translate-y-10 opacity-0'
      }`}
    >
      <button
        onClick={onContinue}
        className="py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-mono font-semibold text-sm transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-md hover:shadow-emerald-500/25"
      >
        Continue Anyway
        <ArrowRight
          className="h-4 w-4 animate-bounce-x animate-infinite animate-duration-[1500ms]"
          aria-hidden="true"
        />
      </button>

      <button
        onClick={onRequestDesktop}
        className="py-3 px-4 bg-transparent text-slate-400 border border-slate-700 rounded-lg font-mono font-semibold text-sm transition-all hover:border-slate-600 hover:text-slate-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 hover:bg-slate-800/30"
      >
        <LayoutTemplate
          className="h-4 w-4 animate-pulse animate-infinite animate-duration-[2000ms]"
          aria-hidden="true"
        />
        Switch to Desktop Mode
      </button>
    </div>

    <div
      className={`mt-8 text-slate-500 text-xs font-mono transition-all duration-500 ${
        animationStage >= 3
          ? 'translate-y-0 opacity-100 animate-fade-up animate-delay-[1200ms]'
          : 'translate-y-10 opacity-0'
      }`}
    >
      {showMobileViewportGateDevChrome ? (
        <span className="text-slate-600">
          /* You can revisit this choice later */
        </span>
      ) : (
        <span className="text-slate-500">
          You can revisit this choice later.
        </span>
      )}
    </div>
  </div>
);
