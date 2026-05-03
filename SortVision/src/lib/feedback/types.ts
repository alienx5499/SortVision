import type {
  TranslationKey,
  TranslationParams,
} from '@/config/translationKey';

export type FeedbackTranslateParams = TranslationParams;

/** i18n helper shape aligned with `LanguageContext` / `PanelTranslate`. */
export type FeedbackTranslateFn = (
  key: TranslationKey,
  params?: TranslationParams
) => string;

/** Values shown in standalone `FeedbackForm` status banner. */
export type FeedbackBannerStatus = 'success' | 'error';

/** Modal + standalone form submission lifecycle. */
export type FeedbackSubmitState = FeedbackBannerStatus | null;

export interface FeedbackFormData {
  name: string;
  email: string;
  feedbackType: string;
  detailedFeedback: string;
  rating: number;
  region: string;
  followUp: boolean;
}

export type FeedbackFormField = keyof FeedbackFormData;

export type SetFeedbackField = <K extends FeedbackFormField>(
  field: K,
  value: FeedbackFormData[K]
) => void;

/** Client telemetry: timezone / locale–derived location (CSP-safe path). */
export interface FeedbackLocationData {
  ip?: string;
  country: string;
  countryCode?: string;
  region: string;
  regionCode?: string;
  city: string;
  latitude?: number | null;
  longitude?: number | null;
  timezone: string;
  isp?: string;
  org?: string;
  asn?: string;
  detectionMethod: string;
  accuracy: string;
  detectedAt?: string;
  countryFromLocale?: string;
  browser?: string;
  os?: string;
  locale?: string;
  platform?: string;
  connectionType?: string;
  networkDownlink?: number;
  screenResolution?: string;
  colorDepth?: number;
  /** Preserved field name from browser enhancement (historical typo in data). */
  timezonOffset?: number;
  languageCode?: string;
  countryCodeFromLocale?: string;
  detectionDetails?: {
    browser?: string;
    os?: string;
    locale?: string;
    platform?: string;
    connectionType?: string;
    screenResolution?: string;
  };
}

export interface FeedbackSessionData {
  sessionId: string;
  timeSpentOnSite: number;
  sessionStartTime: string;
  submissionTime: string;
  userAgent: string;
  screenResolution: string;
  viewportSize: string;
  language: string;
  appLocale: string;
  languages: string[];
  timezone: string;
  colorDepth: number;
  pixelRatio: number;
}

export interface FeedbackDeviceInfo {
  deviceType: string;
  isMobile: boolean;
  isTablet: boolean;
  platform: string;
  vendor: string;
  cookieEnabled: boolean;
  onlineStatus: boolean;
  doNotTrack: string;
}

export interface FeedbackNetworkInfo {
  effectiveType: string;
  downlink: number | string;
  rtt: number | string;
  saveData: boolean;
}

export interface FeedbackPerformanceInfo {
  domContentLoaded: number;
  pageLoad: number;
  dnsLookup: number;
  tcpConnect: number;
  serverResponse: number;
}

export interface FeedbackBrowserCapabilities {
  localStorage: boolean;
  sessionStorage: boolean;
  webGL: boolean;
  touchSupport: boolean;
  geolocation: boolean;
  webWorkers: boolean;
  websockets: boolean;
  indexedDB: boolean;
  serviceWorker: boolean;
  pushNotifications: boolean;
}

export interface FeedbackPageContext {
  url: string;
  pathname: string;
  search: string;
  hash: string;
  referrer: string;
  title: string;
  scrollPosition: { x: number; y: number };
  documentHeight: number;
}

export interface FeedbackMemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

export interface FeedbackErrorLogEntry {
  message?: string;
  timestamp?: string;
  stack?: string;
}

export interface FeedbackAccessibilityInfo {
  reduceMotion: boolean;
  highContrast: boolean;
  darkMode: boolean;
  forcedColors: boolean;
}

export interface EnhancedFeedbackPayload extends FeedbackFormData {
  locationData: FeedbackLocationData | null;
  sessionData: FeedbackSessionData;
  deviceInfo: FeedbackDeviceInfo;
  networkInfo: FeedbackNetworkInfo;
  performanceInfo: FeedbackPerformanceInfo | null;
  browserCapabilities: FeedbackBrowserCapabilities;
  pageContext: FeedbackPageContext;
  memoryInfo: FeedbackMemoryInfo | null;
  errorHistory: FeedbackErrorLogEntry[];
  featureUsage: Record<string, unknown> | null;
  accessibilityInfo: FeedbackAccessibilityInfo;
}

export interface BuildEnhancedFeedbackPayloadInput {
  formData: FeedbackFormData;
  locationData: FeedbackLocationData | null;
  sessionId: string;
  timeSpentOnSite: number;
  persistentSessionStart: number;
  appLocale: string;
}

export interface SubmitFeedbackSuccess {
  success: true;
  issueNumber?: number;
  issueUrl?: string;
  data: unknown;
}

export type SubmitFeedbackResult = SubmitFeedbackSuccess;

export interface GitHubIssueDraft {
  title: string;
  body: string;
  labels: string[];
  assignees: string[];
}

export interface LocationAccuracyDisplay {
  level: string;
  color: string;
  text: string;
}
