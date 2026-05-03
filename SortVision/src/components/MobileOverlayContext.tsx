import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from 'react';

export type MobileOverlayContextValue = {
  isMobileOverlayVisible: boolean;
  setMobileOverlayVisible: Dispatch<SetStateAction<boolean>>;
};

export const MobileOverlayContext =
  createContext<MobileOverlayContextValue | null>(null);

export const useMobileOverlay = (): MobileOverlayContextValue => {
  const ctx = useContext(MobileOverlayContext);
  if (!ctx) {
    throw new Error(
      'useMobileOverlay must be used within MobileOverlayContext.Provider'
    );
  }
  return ctx;
};
