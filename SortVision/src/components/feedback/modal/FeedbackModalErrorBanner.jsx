import React from 'react';
import { AlertCircle } from 'lucide-react';

export function FeedbackModalErrorBanner({ visible }) {
  if (!visible) return null;

  return (
    <div className="relative p-4 bg-red-900/20 border border-red-500/30 rounded-md animate-in slide-in-from-top-2 shake duration-500">
      <div className="flex items-center gap-3">
        <AlertCircle className="h-5 w-5 text-red-400 animate-pulse shrink-0" />
        <div className="flex-1 min-w-0">
          <span className="text-sm text-red-400 font-mono font-semibold">
            <span className="text-amber-400">//</span> Submission failed. Please
            try again.
          </span>
          <div className="text-xs text-red-300/80 font-mono mt-1">
            Check your connection and retry. Your feedback is important to us!
          </div>
        </div>
      </div>
    </div>
  );
}
