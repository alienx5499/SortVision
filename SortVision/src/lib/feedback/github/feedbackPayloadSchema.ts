import { z } from 'zod';
import type { EnhancedFeedbackPayload } from '../types';

const scrollPositionSchema = z.object({
  x: z.number(),
  y: z.number(),
});

const feedbackSessionDataSchema = z.object({
  sessionId: z.string(),
  timeSpentOnSite: z.number(),
  sessionStartTime: z.string(),
  submissionTime: z.string(),
  userAgent: z.string(),
  screenResolution: z.string(),
  viewportSize: z.string(),
  language: z.string(),
  appLocale: z.string(),
  languages: z.array(z.string()),
  timezone: z.string(),
  colorDepth: z.number(),
  pixelRatio: z.number(),
});

const feedbackDeviceInfoSchema = z.object({
  deviceType: z.string(),
  isMobile: z.boolean(),
  isTablet: z.boolean(),
  platform: z.string(),
  vendor: z.string(),
  cookieEnabled: z.boolean(),
  onlineStatus: z.boolean(),
  doNotTrack: z.string(),
});

const feedbackNetworkInfoSchema = z.object({
  effectiveType: z.string(),
  downlink: z.union([z.number(), z.string()]),
  rtt: z.union([z.number(), z.string()]),
  saveData: z.boolean(),
});

const feedbackPerformanceInfoSchema = z.object({
  domContentLoaded: z.number(),
  pageLoad: z.number(),
  dnsLookup: z.number(),
  tcpConnect: z.number(),
  serverResponse: z.number(),
});

const feedbackBrowserCapabilitiesSchema = z.object({
  localStorage: z.boolean(),
  sessionStorage: z.boolean(),
  webGL: z.boolean(),
  touchSupport: z.boolean(),
  geolocation: z.boolean(),
  webWorkers: z.boolean(),
  websockets: z.boolean(),
  indexedDB: z.boolean(),
  serviceWorker: z.boolean(),
  pushNotifications: z.boolean(),
});

const feedbackPageContextSchema = z.object({
  url: z.string(),
  pathname: z.string(),
  search: z.string(),
  hash: z.string(),
  referrer: z.string(),
  title: z.string(),
  scrollPosition: scrollPositionSchema,
  documentHeight: z.number(),
});

const feedbackMemoryInfoSchema = z.object({
  usedJSHeapSize: z.number(),
  totalJSHeapSize: z.number(),
  jsHeapSizeLimit: z.number(),
});

const feedbackErrorLogEntrySchema = z
  .object({
    message: z.string().optional(),
    timestamp: z.string().optional(),
    stack: z.string().optional(),
  })
  .catchall(z.unknown());

const feedbackAccessibilityInfoSchema = z.object({
  reduceMotion: z.boolean(),
  highContrast: z.boolean(),
  darkMode: z.boolean(),
  forcedColors: z.boolean(),
});

/** Location telemetry: required core fields; extra keys allowed (browser enrichment). */
const feedbackLocationDataSchema = z
  .object({
    country: z.string(),
    region: z.string(),
    city: z.string(),
    timezone: z.string(),
    detectionMethod: z.string(),
    accuracy: z.string(),
  })
  .catchall(z.unknown());

/**
 * Full POST body from the feedback client. Unknown top-level keys are stripped.
 */
export const enhancedFeedbackPayloadSchema = z
  .object({
    name: z.string().min(1, 'Missing or invalid feedback name'),
    email: z.string(),
    feedbackType: z.string().min(1, 'Missing or invalid feedback type'),
    detailedFeedback: z.string().min(1, 'Missing or invalid detailed feedback'),
    rating: z.number().finite().min(0).max(5),
    region: z.string(),
    followUp: z.boolean(),
    locationData: z.union([z.null(), feedbackLocationDataSchema]),
    sessionData: feedbackSessionDataSchema,
    deviceInfo: feedbackDeviceInfoSchema,
    networkInfo: feedbackNetworkInfoSchema,
    performanceInfo: feedbackPerformanceInfoSchema.nullable(),
    browserCapabilities: feedbackBrowserCapabilitiesSchema,
    pageContext: feedbackPageContextSchema,
    memoryInfo: feedbackMemoryInfoSchema.nullable(),
    errorHistory: z.array(feedbackErrorLogEntrySchema),
    featureUsage: z.record(z.string(), z.unknown()).nullable(),
    accessibilityInfo: feedbackAccessibilityInfoSchema,
  })
  .strict();

function formatZodIssues(error: z.ZodError): string {
  return error.issues
    .map(issue => {
      const path = issue.path.length ? issue.path.join('.') : '(root)';
      return `${path}: ${issue.message}`;
    })
    .join('; ');
}

/**
 * Validate untrusted JSON and return a typed `EnhancedFeedbackPayload` for issue creation.
 */
export function assertEnhancedFeedbackPayload(
  raw: unknown
): EnhancedFeedbackPayload {
  const result = enhancedFeedbackPayloadSchema.safeParse(raw);
  if (!result.success) {
    throw new Error(formatZodIssues(result.error));
  }
  return result.data as EnhancedFeedbackPayload;
}
