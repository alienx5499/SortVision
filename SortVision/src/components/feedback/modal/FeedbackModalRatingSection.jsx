import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FeedbackModalRatingSection({
  t,
  rating,
  hoverRating,
  onHoverRating,
  onSetRating,
}) {
  return (
    <div className="space-y-4 rounded-xl border border-emerald-500/20 bg-gradient-to-b from-slate-800/90 via-slate-900/40 to-slate-900/20 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-medium font-mono text-amber-400 flex items-center gap-2">
            <span className="text-amber-400">$</span> {t('feedback.rating')}
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                rating > 0
                  ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50'
                  : 'bg-red-400 animate-pulse shadow-lg shadow-red-400/50'
              }`}
              style={{ animationDuration: rating > 0 ? 'none' : '2.5s' }}
            />
          </span>
        </div>
        {(hoverRating || rating) > 0 && (
          <span className="text-xs font-mono tabular-nums text-slate-400 border border-slate-600/80 rounded-md px-2 py-0.5 bg-slate-900/60">
            {hoverRating || rating}
            <span className="text-slate-500">/5</span>
          </span>
        )}
      </div>

      <p className="text-xs font-mono text-slate-500 leading-relaxed">
        <span className="text-amber-400">//</span> {t('feedback.ratingHint')}
      </p>

      <div className="flex flex-col gap-4">
        <div
          id="rating-container"
          className="rounded-xl border border-slate-600/80 bg-slate-950/40 px-2 py-4 sm:px-4"
          onMouseLeave={() => onHoverRating(0)}
          role="radiogroup"
          aria-label={t('feedback.ratingAriaGroup')}
          aria-required="true"
        >
          <div className="flex items-end justify-center gap-1 sm:gap-2">
            {[1, 2, 3, 4, 5].map(star => {
              const displayRating = hoverRating > 0 ? hoverRating : rating;
              const isHoverPreview = hoverRating > 0 && star <= hoverRating;
              const showHoverEffect =
                hoverRating > 0 && (hoverRating > rating || rating === 0);
              const isActive = star <= displayRating;

              return (
                <div key={star} className="flex flex-col items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      onSetRating(star);
                      onHoverRating(0);
                    }}
                    onMouseEnter={() => onHoverRating(star)}
                    className={cn(
                      'cursor-pointer rounded-xl p-2 sm:p-2.5 transition-all duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
                      isActive
                        ? isHoverPreview && showHoverEffect
                          ? 'bg-amber-500/25 shadow-[0_0_20px_-4px_rgba(251,191,36,0.5)] border border-amber-400/45'
                          : 'bg-amber-500/15 border border-amber-500/25 shadow-md shadow-amber-900/20'
                        : 'border border-transparent hover:bg-slate-800/90 hover:border-slate-600/60'
                    )}
                    role="radio"
                    aria-checked={star <= rating}
                    aria-label={t('feedback.ratingStarLabel', { n: star })}
                  >
                    <Star
                      className={cn(
                        'h-7 w-7 sm:h-8 sm:w-8 transition-colors duration-200',
                        isActive
                          ? isHoverPreview && showHoverEffect
                            ? 'text-amber-300 fill-amber-300'
                            : 'text-amber-400 fill-amber-400'
                          : 'text-slate-600 fill-transparent stroke-[1.5] hover:text-amber-400/80'
                      )}
                    />
                  </button>
                  <span className="text-[10px] font-mono tabular-nums text-slate-500 select-none">
                    {star}
                  </span>
                </div>
              );
            })}
          </div>

          {(hoverRating || rating) > 0 && (
            <div
              className="mt-4 mx-auto max-w-[220px] h-1 rounded-full bg-slate-800 overflow-hidden border border-slate-700/80"
              aria-hidden
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 transition-[width] duration-300 ease-out"
                style={{
                  width: `${((hoverRating || rating) / 5) * 100}%`,
                }}
              />
            </div>
          )}
        </div>

        <div className="text-center min-h-[28px]">
          {(hoverRating || rating) > 0 ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
              <div className="flex items-center gap-0.5" aria-hidden>
                {[1, 2, 3, 4, 5].map(i => (
                  <Star
                    key={i}
                    className={cn(
                      'h-4 w-4 sm:h-5 sm:w-5',
                      i <= (hoverRating || rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-700 fill-transparent'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-mono font-semibold">
                {(() => {
                  const currentRating = hoverRating || rating;
                  const labels = {
                    1: {
                      text: t('feedback.ratings.poor'),
                      color: 'text-red-400',
                    },
                    2: {
                      text: t('feedback.ratings.fair'),
                      color: 'text-orange-400',
                    },
                    3: {
                      text: t('feedback.ratings.good'),
                      color: 'text-yellow-400',
                    },
                    4: {
                      text: t('feedback.ratings.veryGood'),
                      color: 'text-emerald-400',
                    },
                    5: {
                      text: t('feedback.ratings.excellent'),
                      color: 'text-purple-400',
                    },
                  };
                  const label = labels[currentRating];
                  return <span className={label.color}>{label.text}</span>;
                })()}
              </span>
            </div>
          ) : (
            <p className="text-sm font-mono text-slate-500">
              <span className="text-amber-400">//</span>{' '}
              {t('feedback.ratingCta')}
            </p>
          )}
        </div>

        {rating > 0 && (
          <div className="flex justify-center items-center gap-1.5 text-xs font-mono animate-in fade-in-0 slide-in-from-bottom-1 duration-300 pt-1 border-t border-slate-700/60 text-emerald-400/95">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {t('feedback.ratingSaved')}
          </div>
        )}
      </div>

      <p className="text-xs font-mono text-slate-400 text-center leading-relaxed border-t border-slate-700/50 pt-4">
        <span className="text-amber-400">//</span> {t('feedback.ratingPrompt')}
      </p>
    </div>
  );
}
