import { POPUP_CONFIG } from './config';

type WindowWithGtag = Window & {
  gtag?: (...args: unknown[]) => void;
};

export const trackPopupEvent = (
  eventType: keyof typeof POPUP_CONFIG.ANALYTICS_EVENTS | string,
  timeSpent: number,
  additionalData: Record<string, unknown> = {}
) => {
  if (typeof window === 'undefined') return;

  const w = window as WindowWithGtag;
  if (!w.gtag) return;

  const eventName =
    POPUP_CONFIG.ANALYTICS_EVENTS[
      eventType as keyof typeof POPUP_CONFIG.ANALYTICS_EVENTS
    ];
  if (!eventName) return;

  w.gtag('event', eventName, {
    event_category: 'engagement',
    event_label: `github_popup_${eventType}`,
    value: Math.floor(timeSpent / 60),
    ...additionalData,
  });
};
