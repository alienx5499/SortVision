import { memo } from 'react';
import { ChatAssistant } from '@/components/chatbot';
import { FeedbackButton } from '@/components/feedback';
import FeedbackModal from '@/components/feedback/FeedbackModal';
import SettingsModal from '@/components/settings/SettingsModal';
import {
  SponsorFloatingButton,
  SponsorFloatingModal,
} from '@/components/sponsor';
import type {
  MainFooterActions,
  MainFooterOverlay,
} from '../contracts/mainShellContracts';

type MainFooterIntegrationsProps = {
  overlay: MainFooterOverlay;
  actions: MainFooterActions;
};

export const MainFooterIntegrations = memo(
  ({ overlay, actions }: MainFooterIntegrationsProps) => (
    <>
      <ChatAssistant
        isOpen={overlay.isChatOpen}
        onClose={actions.closeChat}
        onToggle={actions.toggleChat}
      />
      <SettingsModal
        isOpen={overlay.isSettingsOpen}
        onClose={actions.closeSettings}
      />
      <SponsorFloatingButton onClick={actions.openSponsor} />
      <SponsorFloatingModal
        isOpen={overlay.isSponsorOpen}
        onClose={actions.closeSponsor}
      />
      <FeedbackButton onClick={actions.openFeedback} />
      <FeedbackModal
        isOpen={overlay.isFeedbackOpen}
        onClose={actions.closeFeedback}
      />
    </>
  )
);

MainFooterIntegrations.displayName = 'MainFooterIntegrations';
