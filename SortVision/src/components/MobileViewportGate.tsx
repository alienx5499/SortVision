import React from 'react';
import { MobileViewportGateView } from './mobileViewportGate/MobileViewportGateView';
import { useMobileViewportGateController } from './mobileViewportGate/useMobileViewportGateController';

const MobileViewportGate = () => {
  const {
    animationStage,
    isMobileOverlayVisible,
    handleContinue,
    handleRequestDesktop,
  } = useMobileViewportGateController();

  if (!isMobileOverlayVisible) return null;

  return (
    <MobileViewportGateView
      animationStage={animationStage}
      onContinue={handleContinue}
      onRequestDesktop={handleRequestDesktop}
    />
  );
};

export default MobileViewportGate;
export { MobileOverlayContext, useMobileOverlay } from './MobileOverlayContext';
