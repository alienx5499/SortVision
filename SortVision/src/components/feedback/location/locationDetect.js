/**
 * Main entry: compose timezone + browser-derived location for feedback
 */

import { shouldAllowSortVisionVerboseLogging } from '../utils/sortVisionVerboseLogging';
import { enhanceTimezoneDetection } from './locationEnhance';
import { detectWithTimezone } from './locationTimezone';

/**
 * Get user's location information using multiple geolocation services
 * @returns {Promise<Object>} Location data including IP, country, region, city, etc.
 */
export async function detectUserLocation() {
  const locationData = {
    ip: 'Unknown',
    country: 'Unknown',
    countryCode: 'Unknown',
    region: 'Unknown',
    regionCode: 'Unknown',
    city: 'Unknown',
    latitude: null,
    longitude: null,
    timezone: 'Unknown',
    isp: 'Unknown',
    org: 'Unknown',
    asn: 'Unknown',
    detectionMethod: 'Unknown',
    accuracy: 'low',
    detectedAt: new Date().toISOString(),
  };

  // For development: Use timezone-based detection due to CSP restrictions
  // In production, external APIs can be enabled by updating CSP headers
  if (shouldAllowSortVisionVerboseLogging()) {
    console.log('🌍 Using timezone-based location detection (CSP-safe)');
  }

  try {
    const timezoneResult = detectWithTimezone();
    const enhancedResult = await enhanceTimezoneDetection();

    return {
      ...locationData,
      ...timezoneResult,
      ...enhancedResult,
      detectionMethod: 'Enhanced Timezone + Browser APIs',
      accuracy: 'medium',
    };
  } catch (error) {
    console.error('❌ All location detection failed:', error);
    return {
      ...locationData,
      ...detectWithTimezone(),
    };
  }
}
