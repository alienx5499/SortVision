import React, { useEffect, useState } from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const SPARKLE_COUNT = 10;

/**
 * Full-screen thank-you state after successful feedback submit.
 * Motion is toned down when prefers-reduced-motion is set (fewer layers, no sparkles / rings).
 */
export function FeedbackModalSuccessOverlay({ open, t }) {
  const [motionOk, setMotionOk] = useState(() =>
    typeof window !== 'undefined'
      ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : true
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setMotionOk(!mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-950 to-emerald-950/30 backdrop-blur-xl',
        motionOk && 'feedback-success-overlay-enter'
      )}
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className={cn(
            'absolute -left-20 top-1/4 h-[28rem] w-[28rem] rounded-full bg-emerald-500/15 blur-3xl',
            motionOk ? 'feedback-success-blob' : 'opacity-30'
          )}
        />
        <div
          className={cn(
            'absolute -right-24 bottom-1/4 h-[26rem] w-[26rem] rounded-full bg-violet-500/12 blur-3xl',
            motionOk ? 'feedback-success-blob-delayed' : 'opacity-25'
          )}
        />
      </div>

      <div className="relative mx-auto max-w-lg px-6 text-center">
        <div className="relative flex min-h-[11rem] items-center justify-center sm:min-h-[12rem]">
          {motionOk && (
            <>
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/40 sm:h-36 sm:w-36 feedback-success-ring"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/25 sm:h-36 sm:w-36 feedback-success-ring"
                style={{ animationDelay: '180ms' }}
                aria-hidden
              />

              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0"
                aria-hidden
              >
                {[...Array(SPARKLE_COUNT)].map((_, i) => (
                  <div
                    key={i}
                    className="feedback-success-sparkle absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-emerald-200/90 shadow-sm shadow-emerald-400/40"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${
                        i * (360 / SPARKLE_COUNT)
                      }deg) translateY(-6.25rem)`,
                      animationDelay: `${60 + i * 55}ms`,
                    }}
                  />
                ))}
              </div>
            </>
          )}

          <div
            className={cn(
              'relative flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 p-6 shadow-[0_0_0_1px_rgba(52,211,153,0.35),0_25px_50px_-12px_rgba(16,185,129,0.45)] sm:p-8',
              motionOk && 'feedback-success-icon-pop'
            )}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-white/10 to-transparent"
              aria-hidden
            />
            <CheckCircle2
              className="relative h-16 w-16 text-white drop-shadow-md sm:h-20 sm:w-20"
              strokeWidth={1.75}
              aria-hidden
            />
          </div>
        </div>

        <div
          className={cn(
            'mt-8 space-y-5 sm:mt-10',
            motionOk && 'feedback-success-content'
          )}
        >
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center gap-2">
              <Sparkles
                className="h-6 w-6 text-emerald-400/90 sm:h-7 sm:w-7"
                aria-hidden
              />
              <h2 className="bg-gradient-to-r from-emerald-300 via-emerald-200 to-violet-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl font-mono">
                Thank you
              </h2>
            </div>
            <div className="mx-auto h-px w-24 max-w-[12rem] bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />
          </div>

          <p className="text-lg leading-relaxed text-slate-200 sm:text-xl font-mono">
            <span className="text-amber-400/90">//</span>{' '}
            {t('feedback.success')}
          </p>

          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/25 bg-slate-900/60 px-5 py-2.5 text-slate-300 font-mono text-sm sm:text-base backdrop-blur-sm">
            <CheckCircle2
              className="h-4 w-4 shrink-0 text-emerald-400"
              aria-hidden
            />
            <span>Helping us improve SortVision</span>
          </div>
        </div>

        <p
          className={cn(
            'mt-8 text-xs text-slate-500 font-mono sm:text-sm',
            motionOk && 'feedback-success-content-late'
          )}
        >
          <span className="text-amber-500/80">//</span> Redirecting back to
          SortVision…
        </p>
      </div>
    </div>
  );
}
