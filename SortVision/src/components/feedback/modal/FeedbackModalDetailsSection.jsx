import React from 'react';
import { Timer } from 'lucide-react';

export function FeedbackModalDetailsSection({
  t,
  value,
  onChange,
  showSessionTimer,
  sessionTimeLabel,
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor="detailed-feedback"
          className="text-sm font-medium font-mono text-emerald-400 flex items-center gap-2"
        >
          <span className="text-amber-400">$</span>{' '}
          {t('feedback.detailedFeedback')}
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              value
                ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50'
                : 'bg-red-400 animate-pulse shadow-lg shadow-red-400/50'
            }`}
            style={{
              animationDuration: value ? 'none' : '2.5s',
            }}
          />
        </label>
        {showSessionTimer && sessionTimeLabel && (
          <span className="text-xs font-mono text-amber-400 bg-amber-900/20 px-2 py-1 rounded border border-amber-500/30 inline-flex items-center gap-1 shrink-0">
            <Timer className="h-3 w-3" aria-hidden />
            {sessionTimeLabel}
          </span>
        )}
      </div>

      <textarea
        id="detailed-feedback"
        name="detailedFeedback"
        autoComplete="off"
        placeholder="// Type your detailed feedback here..."
        value={value}
        onChange={onChange}
        className="flex min-h-[120px] w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-200 font-mono"
        required
      />
    </div>
  );
}
