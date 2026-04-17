import React from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export function FeedbackModalIdentityFields({ t, name, email, onFieldChange }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2 min-w-0">
        <label
          htmlFor="name"
          className="text-sm font-medium font-mono text-emerald-400 flex items-center gap-2"
        >
          <span className="text-amber-400">$</span> {t('feedback.name')}
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              name
                ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50'
                : 'bg-red-400 animate-pulse shadow-lg shadow-red-400/50'
            }`}
            style={{ animationDuration: name ? 'none' : '2.5s' }}
          />
        </label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          placeholder={t('feedback.namePlaceholder')}
          value={name}
          onChange={e => onFieldChange('name', e.target.value)}
          className="transition-all duration-200 bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20 font-mono"
          required
        />
      </div>

      <div className="space-y-2 min-w-0">
        <div className="flex items-center justify-between gap-3 min-h-[1.75rem]">
          <label
            htmlFor="email"
            className="text-sm font-medium font-mono text-emerald-400 flex items-center gap-2 min-w-0"
          >
            <span className="text-amber-400">$</span>
            <span className="truncate">{t('feedback.emailLabel')}</span>
          </label>
          <Badge
            variant="outline"
            className="shrink-0 text-[10px] uppercase tracking-wide border-slate-600 text-slate-400 font-mono py-0"
          >
            {t('feedback.optional')}
          </Badge>
        </div>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder={t('feedback.emailPlaceholder')}
          value={email}
          onChange={e => onFieldChange('email', e.target.value)}
          className="transition-all duration-200 bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20 font-mono w-full"
          aria-describedby="feedback-email-hint"
        />
        <p
          id="feedback-email-hint"
          className="text-xs font-mono text-slate-500 leading-snug"
        >
          <span className="text-amber-400">//</span> {t('feedback.emailHint')}
        </p>
      </div>
    </div>
  );
}
