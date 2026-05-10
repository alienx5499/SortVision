import { memo } from 'react';
import {
  Terminal,
  Users,
  Github,
  Linkedin,
  Twitter,
} from '@/components/ui/OptimizedIcons';
import type { PanelTranslate } from '@/components/panels/shared/panelTranslate';
import type { MainFooterNavigation } from '../contracts/mainShellContracts';
import { MAIN_SHELL_PROFILE } from './mainShellProfile';

type MainFooterToolbarProps = {
  t: PanelTranslate;
  navigation: MainFooterNavigation;
};

export const MainFooterToolbar = memo(
  ({ t, navigation }: MainFooterToolbarProps) => (
    <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-2 sm:px-4">
      <button
        type="button"
        onClick={() => {
          if (navigation.specialMode === 'contributors') {
            if (navigation.currentAlgorithm) {
              navigation.navigate(
                navigation.getLocalizedUrl(
                  `algorithms/config/${navigation.currentAlgorithm}`
                )
              );
            } else {
              navigation.navigate(
                navigation.getLocalizedUrl('algorithms/config/bubble')
              );
            }
          } else {
            navigation.navigate(
              navigation.getLocalizedUrl('contributions/overview')
            );
          }
        }}
        className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 hover:scale-110 transition-all duration-300 text-[10px] sm:text-xs"
        aria-label={
          navigation.specialMode === 'contributors'
            ? 'Return to SortVision main interface'
            : 'View SortVision contributors'
        }
      >
        {navigation.specialMode === 'contributors' ? (
          <Terminal className="size-3 sm:size-4" aria-hidden="true" />
        ) : (
          <Users className="size-3 sm:size-4" aria-hidden="true" />
        )}
        <span>
          {navigation.specialMode === 'contributors'
            ? t('main.sortVision')
            : t('main.contributors')}
        </span>
      </button>

      <a
        href={MAIN_SHELL_PROFILE.github.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Visit Prabal Patra's GitHub"
        className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 hover:scale-110 transition-all duration-300 text-[10px] sm:text-xs"
        aria-label="View Prabal Patra's GitHub profile"
      >
        <Github className="size-3 sm:size-4" aria-hidden="true" />
        <span>{t('main.github')}</span>
      </a>

      <a
        href={MAIN_SHELL_PROFILE.linkedin.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-slate-400 hover:text-blue-400 hover:scale-110 transition-all duration-300 text-[10px] sm:text-xs"
        aria-label="Connect with the developer on LinkedIn"
      >
        <Linkedin className="size-3 sm:size-4" aria-hidden="true" />
        <span>{t('main.linkedin')}</span>
      </a>

      <a
        href={MAIN_SHELL_PROFILE.sponsors.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-slate-400 hover:text-pink-400 hover:scale-110 transition-all duration-300 text-[10px] sm:text-xs"
      >
        <span className="text-base sm:text-lg">♥</span>
        <span>{t('main.sponsor')}</span>
      </a>

      <a
        href={MAIN_SHELL_PROFILE.buyMeACoffee.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-slate-400 hover:text-yellow-400 hover:scale-110 transition-all duration-300 text-[10px] sm:text-xs"
        aria-label="Support the developer with a donation"
      >
        <span>{t('main.buyMeACoffee')}</span>
      </a>

      <a
        href={MAIN_SHELL_PROFILE.twitter.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-slate-400 hover:text-sky-400 hover:scale-110 transition-all duration-300 text-[10px] sm:text-xs"
        aria-label="Follow the developer on X (Twitter)"
      >
        <Twitter className="size-3 sm:size-4" aria-hidden="true" />
        <span>{t('main.twitter')}</span>
      </a>
    </div>
  )
);

MainFooterToolbar.displayName = 'MainFooterToolbar';
