import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Sun, Moon, Monitor, Contrast, Check } from 'lucide-react';
import { themes, type ThemeId } from '@/utils/themeUtils';
import { SettingsSectionHeader } from './SettingsSectionHeader';

const themeIconMap: Record<ThemeId, LucideIcon> = {
  light: Sun,
  dark: Moon,
  contrast: Contrast,
  system: Monitor,
};

const themeIconColor: Record<ThemeId, string> = {
  light: 'text-yellow-300',
  dark: 'text-purple-400',
  contrast: 'text-emerald-400',
  system: 'text-blue-400',
};

type ThemeSettingsSectionProps = {
  title: string;
  description: string;
  theme: ThemeId;
  onChangeTheme: (theme: ThemeId) => void;
};

export const ThemeSettingsSection = ({
  title,
  description,
  theme,
  onChangeTheme,
}: ThemeSettingsSectionProps) => (
  <div className="space-y-4">
    <SettingsSectionHeader
      title={title}
      description={description}
      accentClassName="text-purple-400"
    />
    <div className="grid grid-cols-2 gap-5">
      {themes.map(themeOption => {
        const Icon = themeIconMap[themeOption.id];
        const iconColor = themeIconColor[themeOption.id];
        return (
          <motion.button
            key={themeOption.id}
            whileHover={{
              scale: 1.04,
              boxShadow: '0 4px 32px 0 rgba(168,85,247,0.10)',
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChangeTheme(themeOption.id)}
            className={`relative flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 backdrop-blur-md shadow-md overflow-hidden bg-slate-800/70 ${
              theme === themeOption.id
                ? 'border-[color:var(--color-purple-400)]/60 shadow-[0_2px_24px_0_rgba(168,85,247,0.10)]'
                : 'border-slate-700 hover:border-[color:var(--color-purple-400)]/40'
            }`}
            style={{
              boxShadow:
                theme === themeOption.id
                  ? '0 2px 24px 0 rgba(168,85,247,0.10)'
                  : undefined,
            }}
          >
            <motion.span
              className={`text-xl ${iconColor}`}
              animate={{
                rotate: theme === themeOption.id ? -20 : 0,
                scale: theme === themeOption.id ? 1.1 : 1,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {Icon ? <Icon className="size-7" /> : null}
            </motion.span>
            <span
              className={`text-base font-mono font-semibold transition-colors duration-200 ${
                theme === themeOption.id
                  ? 'text-[color:var(--color-purple-400)]'
                  : 'text-white'
              }`}
            >
              {themeOption.name}
            </span>
            {theme === themeOption.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 right-3 size-6 rounded-full bg-[color:var(--color-purple-400)]/20 flex items-center justify-center shadow-lg"
              >
                <Check className="size-4 text-[color:var(--color-purple-400)]" />
              </motion.div>
            )}
            <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-tr from-white/10 via-white/0 to-white/5 opacity-60" />
          </motion.button>
        );
      })}
    </div>
  </div>
);
