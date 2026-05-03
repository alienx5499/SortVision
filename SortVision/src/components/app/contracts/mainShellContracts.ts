import type { Dispatch, SetStateAction } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import type { MobileOverlayContextValue } from '@/components/MobileOverlayContext';

export type MainMobileOverlayValue = MobileOverlayContextValue;

export type MainFooterNavigation = {
  specialMode: 'contributors' | null;
  currentAlgorithm: string;
  getLocalizedUrl: (path: string) => string;
  navigate: NavigateFunction;
};

export type MainFooterOverlay = {
  isChatOpen: boolean;
  isSettingsOpen: boolean;
  isSponsorOpen: boolean;
  isFeedbackOpen: boolean;
};

export type MainFooterActions = {
  setChatOpen: Dispatch<SetStateAction<boolean>>;
  setSettingsOpen: Dispatch<SetStateAction<boolean>>;
  setFeedbackOpen: Dispatch<SetStateAction<boolean>>;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  openFeedback: () => void;
  closeFeedback: () => void;
  openSponsor: () => void;
  closeSponsor: () => void;
};

export type MainShellState = {
  mobileOverlay: MainMobileOverlayValue;
  footerOverlay: MainFooterOverlay;
  footerActions: MainFooterActions;
};
