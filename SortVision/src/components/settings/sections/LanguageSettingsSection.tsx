import React from 'react';
import { motion } from 'framer-motion';
import { Languages as LanguagesIcon, Check } from 'lucide-react';
import type { LanguageOption } from '../useSettingsPreferences';
import { SettingsSectionHeader } from './SettingsSectionHeader';

type LanguageSettingsSectionProps = {
  title: string;
  description: string;
  language: string;
  languages: LanguageOption[];
  onChangeLanguage: (code: string) => void;
};

export const LanguageSettingsSection = ({
  title,
  description,
  language,
  languages,
  onChangeLanguage,
}: LanguageSettingsSectionProps) => (
  <div className="space-y-4">
    <SettingsSectionHeader
      title={title}
      description={description}
      accentClassName="text-purple-400"
    />
    <div className="grid grid-cols-2 gap-5">
      {languages.map(lang => (
        <motion.button
          key={lang.code}
          whileHover={{
            scale: 1.04,
            boxShadow: '0 4px 32px 0 rgba(168,85,247,0.10)',
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onChangeLanguage(lang.code)}
          className={`relative flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 backdrop-blur-md shadow-md overflow-hidden bg-slate-800/70 ${
            language === lang.code
              ? 'border-[color:var(--color-purple-400)]/60 shadow-[0_2px_24px_0_rgba(168,85,247,0.10)]'
              : 'border-slate-700 hover:border-[color:var(--color-purple-400)]/40'
          }`}
          style={{
            boxShadow:
              language === lang.code
                ? '0 2px 24px 0 rgba(168,85,247,0.10)'
                : undefined,
          }}
        >
          <motion.span
            className="text-xl text-blue-400"
            animate={{
              rotate: language === lang.code ? -20 : 0,
              scale: language === lang.code ? 1.1 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <LanguagesIcon className="h-7 w-7" />
          </motion.span>
          <span
            className={`text-base font-mono font-semibold transition-colors duration-200 ${
              language === lang.code
                ? 'text-[color:var(--color-purple-400)]'
                : 'text-white'
            }`}
          >
            {lang.name}
            <span className="ml-1 text-xs font-bold text-slate-400">
              ({lang.code.toUpperCase()})
            </span>
          </span>
          {language === lang.code && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 right-3 h-6 w-6 rounded-full bg-[color:var(--color-purple-400)]/20 flex items-center justify-center shadow-lg"
            >
              <Check className="h-4 w-4 text-[color:var(--color-purple-400)]" />
            </motion.div>
          )}
          <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-tr from-white/10 via-white/0 to-white/5 opacity-60" />
        </motion.button>
      ))}
    </div>
  </div>
);
