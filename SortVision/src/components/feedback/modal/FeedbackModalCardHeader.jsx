import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export function FeedbackModalCardHeader({ t, isSubmitting }) {
  const titleParts = t('feedback.title').split(' ');

  return (
    <CardHeader className="text-center pr-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <MessageSquare
          className={`h-7 w-7 transition-all duration-300 ${
            isSubmitting
              ? 'text-amber-400 animate-spin'
              : 'text-emerald-400 animate-pulse'
          }`}
          style={{ animationDuration: isSubmitting ? '1s' : '2.5s' }}
        />
        <CardTitle className="text-2xl font-bold font-mono text-white">
          <span className="text-emerald-400">{titleParts[0]}</span>
          <span className="text-purple-400">
            {titleParts[1] ? ` ${titleParts[1]}` : ''}
          </span>
        </CardTitle>
      </div>

      {isSubmitting && (
        <div className="mb-4 animate-in slide-in-from-top-2 duration-300">
          <div className="w-full bg-slate-700 rounded-full h-1 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-400 animate-pulse bg-size-200 animate-shimmer" />
          </div>
          <div
            className="text-xs text-amber-400 font-mono mt-2 animate-pulse"
            style={{ animationDuration: '2s' }}
          >
            {t('feedback.processing')}
          </div>
        </div>
      )}

      <CardDescription className="text-slate-400 font-mono">
        <span className="text-amber-400">//</span> {t('feedback.description')}
        <br />
        <span className="text-amber-400">//</span> {t('feedback.description2')}
      </CardDescription>
    </CardHeader>
  );
}
