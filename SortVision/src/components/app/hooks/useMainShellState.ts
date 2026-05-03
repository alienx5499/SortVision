import { useState } from 'react';
import type { MainShellState } from '../contracts/mainShellContracts';

export const useMainShellState = (): MainShellState => {
  const [isMobileOverlayVisible, setMobileOverlayVisible] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isFeedbackOpen, setFeedbackOpen] = useState(false);
  const [isSponsorOpen, setSponsorOpen] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);

  return {
    mobileOverlay: {
      isMobileOverlayVisible,
      setMobileOverlayVisible,
    },
    footerOverlay: {
      isChatOpen,
      isSettingsOpen,
      isSponsorOpen,
      isFeedbackOpen,
    },
    footerActions: {
      setChatOpen,
      setSettingsOpen,
      setFeedbackOpen,
      openChat: () => setChatOpen(true),
      closeChat: () => setChatOpen(false),
      toggleChat: () => setChatOpen(prev => !prev),
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
      openFeedback: () => setFeedbackOpen(true),
      closeFeedback: () => setFeedbackOpen(false),
      openSponsor: () => setSponsorOpen(true),
      closeSponsor: () => setSponsorOpen(false),
    },
  };
};
