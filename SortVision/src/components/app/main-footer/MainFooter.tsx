import { memo } from 'react';
import { Heart } from 'lucide-react';
import type { PanelTranslate } from '@/components/panels/shared/panelTranslate';
import type {
  MainFooterActions,
  MainFooterNavigation,
  MainFooterOverlay,
} from '../contracts/mainShellContracts';
import { MAIN_SHELL_PROFILE } from './mainShellProfile';
import { MainFooterIntegrations } from './MainFooterIntegrations';
import { MainFooterToolbar } from './MainFooterToolbar';

type MainFooterProps = {
  t: PanelTranslate;
  navigation: MainFooterNavigation;
  overlay: MainFooterOverlay;
  actions: MainFooterActions;
};

const MainFooter = memo(
  ({ t, navigation, overlay, actions }: MainFooterProps) => (
    <footer className="mt-8 sm:mt-10 text-slate-500 text-[10px] sm:text-xs font-mono text-center animate-fade-up animate-once animate-duration-[800ms] animate-delay-700">
      <span className="text-slate-600">/**</span> {t('main.builtWith')}{' '}
      <span
        aria-hidden="true"
        className="inline-flex animate-pulse text-rose-400 align-middle"
        style={{ animationDuration: '1.4s' }}
      >
        <Heart className="h-3.5 w-3.5 fill-current" />
      </span>{' '}
      {t('main.by')}{' '}
      <a
        href={MAIN_SHELL_PROFILE.github.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Visit Prabal Patra's GitHub"
        className="text-slate-400 hover:text-emerald-400 transition-colors underline underline-offset-2"
      >
        @{MAIN_SHELL_PROFILE.github.handle}
      </a>{' '}
      <span className="text-slate-600">*/</span>
      <MainFooterToolbar t={t} navigation={navigation} />
      <MainFooterIntegrations overlay={overlay} actions={actions} />
    </footer>
  )
);

MainFooter.displayName = 'MainFooter';

export default MainFooter;
