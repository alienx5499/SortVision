import React from 'react';
import { CheckCircle2 } from 'lucide-react';

/**
 * Full-screen thank-you state after successful feedback submit.
 */
export function FeedbackModalSuccessOverlay({ open, t }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-slate-950/98 via-emerald-950/20 to-slate-950/98 backdrop-blur-lg animate-in fade-in-0 duration-700">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-300 rounded-full animate-ping opacity-40"
            style={{
              top: `${(i * 37 + 13) % 100}%`,
              left: `${(i * 53 + 7) % 100}%`,
              animationDelay: `${(i % 8) * 0.35}s`,
              animationDuration: `${2 + (i % 4) * 0.45}s`,
            }}
          />
        ))}
      </div>

      <div className="relative text-center space-y-10 animate-in zoom-in-50 duration-700 delay-300">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-emerald-400 rounded-full animate-ping"
                style={{
                  top: `${50 + 35 * Math.cos((i * 22.5 * Math.PI) / 180)}%`,
                  left: `${50 + 35 * Math.sin((i * 22.5 * Math.PI) / 180)}%`,
                  animationDelay: `${i * 80}ms`,
                  animationDuration: '2.5s',
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-purple-400 rounded-full animate-ping"
                style={{
                  top: `${50 + 20 * Math.cos((i * 45 * Math.PI) / 180)}%`,
                  left: `${50 + 20 * Math.sin((i * 45 * Math.PI) / 180)}%`,
                  animationDelay: `${i * 150}ms`,
                  animationDuration: '1.8s',
                }}
              />
            ))}
          </div>
          <div className="relative bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full p-10 shadow-2xl shadow-emerald-500/60 animate-bounce border-4 border-emerald-300/50">
            <CheckCircle2 className="h-28 w-28 text-white drop-shadow-2xl" />
            <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
          </div>
        </div>

        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-600 delay-600">
          <div className="space-y-2">
            <h2 className="text-5xl font-bold font-mono text-white drop-shadow-lg">
              <span className="text-emerald-400 animate-pulse">Thank</span>{' '}
              <span
                className="text-purple-400 animate-pulse"
                style={{ animationDelay: '0.5s' }}
              >
                You!
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-purple-400 mx-auto rounded-full animate-pulse" />
          </div>

          <p className="text-2xl text-slate-200 font-mono leading-relaxed">
            <span className="text-amber-400 animate-pulse">//</span>{' '}
            {t('feedback.success')}
          </p>

          <div className="flex items-center justify-center gap-3 text-lg text-slate-300 font-mono bg-slate-800/50 px-6 py-3 rounded-full border border-emerald-500/30">
            <CheckCircle2
              className="h-5 w-5 text-emerald-400 animate-pulse shrink-0"
              aria-hidden
            />
            <span>Helping us improve SortVision</span>
          </div>
        </div>

        <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-500 delay-1000">
          <p className="text-sm text-slate-500 font-mono">
            <span className="text-amber-400">//</span> Redirecting back to
            SortVision...
          </p>
        </div>
      </div>
    </div>
  );
}
