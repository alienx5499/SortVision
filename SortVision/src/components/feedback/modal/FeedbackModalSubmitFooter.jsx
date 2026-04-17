import React from 'react';
import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, AlertCircle, Loader2, Lock } from 'lucide-react';

export function FeedbackModalSubmitFooter({
  t,
  isSubmitting,
  submitStatus,
  isFormValid,
  shouldLog,
  onPreviewSuccess,
}) {
  return (
    <CardFooter className="flex flex-col gap-4 pt-6">
      <Button
        type="submit"
        className={`w-full h-12 font-mono font-semibold border shadow-lg transition-all duration-500 transform cursor-pointer ${
          isSubmitting
            ? 'bg-amber-500 hover:bg-amber-400 text-slate-900 border-amber-400/50 shadow-amber-500/25 scale-95 animate-pulse'
            : submitStatus === 'error'
              ? 'bg-red-500 hover:bg-red-400 text-white border-red-400/50 shadow-red-500/25 animate-pulse'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-900 border-emerald-400/50 shadow-emerald-500/25 hover:scale-105 hover:shadow-emerald-500/40'
        }`}
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2 animate-in slide-in-from-left-2 duration-300">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="font-mono">Processing feedback...</span>
            <div className="flex gap-1">
              <div
                className="w-1 h-1 bg-slate-900 rounded-full animate-bounce"
                style={{ animationDelay: '0ms' }}
              />
              <div
                className="w-1 h-1 bg-slate-900 rounded-full animate-bounce"
                style={{ animationDelay: '150ms' }}
              />
              <div
                className="w-1 h-1 bg-slate-900 rounded-full animate-bounce"
                style={{ animationDelay: '300ms' }}
              />
            </div>
          </div>
        ) : submitStatus === 'error' ? (
          <div className="flex items-center gap-2 animate-in shake duration-300">
            <AlertCircle className="h-5 w-5" />
            <span className="font-mono">Try Again</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 group">
            <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            <span className="font-mono">{t('feedback.submit')}</span>
          </div>
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-mono">
        <Badge
          variant="outline"
          className="text-xs bg-slate-800 border-emerald-500/30 text-emerald-400 font-mono inline-flex items-center gap-1"
        >
          <Lock className="h-3 w-3" aria-hidden />
          Secure
        </Badge>
        <span>
          <span className="text-amber-400">//</span> Your feedback helps us
          improve SortVision
        </span>
      </div>

      {shouldLog && (
        <Button
          type="button"
          onClick={onPreviewSuccess}
          className="w-full h-8 text-xs bg-amber-600 hover:bg-amber-500 text-slate-900 font-mono border border-amber-500/50 cursor-pointer"
        >
          Preview Success Animation (Dev Only)
        </Button>
      )}
    </CardFooter>
  );
}
