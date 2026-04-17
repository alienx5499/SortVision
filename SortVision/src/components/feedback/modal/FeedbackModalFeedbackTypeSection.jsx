import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bug, Sparkles, Lightbulb, FileText } from 'lucide-react';

export function FeedbackModalFeedbackTypeSection({ t, value, onValueChange }) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="feedback-type"
        className="text-sm font-medium font-mono text-emerald-400 flex items-center gap-2"
      >
        <span className="text-amber-400">$</span> {t('feedback.feedbackType')}
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
      <Select value={value} onValueChange={onValueChange} name="feedbackType">
        <SelectTrigger
          id="feedback-type"
          name="feedbackType"
          className="bg-slate-800 border-slate-600 text-white focus:border-emerald-500 focus:ring-emerald-500/20 font-mono"
        >
          <SelectValue placeholder="Select feedback type..." />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-600">
          <SelectItem
            value="Bug"
            className="text-white hover:bg-slate-700 font-mono cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Bug className="h-4 w-4 text-red-400 shrink-0" aria-hidden />
              <span className="text-red-400">{t('feedback.types.bug')}</span>
            </div>
          </SelectItem>
          <SelectItem
            value="Feature Request"
            className="text-white hover:bg-slate-700 font-mono cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Sparkles
                className="h-4 w-4 text-emerald-400 shrink-0"
                aria-hidden
              />
              <span className="text-emerald-400">
                {t('feedback.types.feature')}
              </span>
            </div>
          </SelectItem>
          <SelectItem
            value="Suggestion"
            className="text-white hover:bg-slate-700 font-mono cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Lightbulb
                className="h-4 w-4 text-purple-400 shrink-0"
                aria-hidden
              />
              <span className="text-purple-400">
                {t('feedback.types.suggestion')}
              </span>
            </div>
          </SelectItem>
          <SelectItem
            value="Other"
            className="text-white hover:bg-slate-700 font-mono cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <FileText
                className="h-4 w-4 text-amber-400 shrink-0"
                aria-hidden
              />
              <span className="text-amber-400">
                {t('feedback.types.general')}
              </span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
