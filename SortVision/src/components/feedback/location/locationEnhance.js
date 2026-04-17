/**
 * Enriches timezone/locale-derived signals for feedback telemetry
 */

import { shouldAllowSortVisionVerboseLogging } from '../sortVisionVerboseLogging';
import { getBrowserInfo, getOSInfo } from './locationBrowser';

/**
 * Enhanced detection using browser APIs and timezone
 */
export async function enhanceTimezoneDetection() {
  const enhancedData = {};

  try {
    // Get more detailed timezone information
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const locale = navigator.language || navigator.languages[0];
    const platform = navigator.platform;
    const userAgent = navigator.userAgent;

    // Enhanced timezone parsing
    enhancedData.timezone = timeZone;
    enhancedData.locale = locale;
    enhancedData.platform = platform;

    // Extract more location info from locale
    const localeRegex = /([a-z]{2})-([A-Z]{2})/;
    const localeMatch = locale.match(localeRegex);
    if (localeMatch) {
      enhancedData.languageCode = localeMatch[1];
      enhancedData.countryCodeFromLocale = localeMatch[2];

      // Map country codes to country names
      const countryMap = {
        US: 'United States',
        CA: 'Canada',
        GB: 'United Kingdom',
        AU: 'Australia',
        DE: 'Germany',
        FR: 'France',
        IT: 'Italy',
        ES: 'Spain',
        NL: 'Netherlands',
        SE: 'Sweden',
        NO: 'Norway',
        DK: 'Denmark',
        FI: 'Finland',
        CH: 'Switzerland',
        AT: 'Austria',
        BE: 'Belgium',
        IE: 'Ireland',
        PT: 'Portugal',
        PL: 'Poland',
        CZ: 'Czech Republic',
        HU: 'Hungary',
        GR: 'Greece',
        BG: 'Bulgaria',
        RO: 'Romania',
        JP: 'Japan',
        KR: 'South Korea',
        CN: 'China',
        IN: 'India',
        TH: 'Thailand',
        SG: 'Singapore',
        MY: 'Malaysia',
        PH: 'Philippines',
        ID: 'Indonesia',
        VN: 'Vietnam',
        BR: 'Brazil',
        AR: 'Argentina',
        MX: 'Mexico',
        CL: 'Chile',
        CO: 'Colombia',
        ZA: 'South Africa',
        EG: 'Egypt',
        NG: 'Nigeria',
        KE: 'Kenya',
        MA: 'Morocco',
        RU: 'Russia',
        UA: 'Ukraine',
        TR: 'Turkey',
        IL: 'Israel',
        SA: 'Saudi Arabia',
        AE: 'United Arab Emirates',
        NZ: 'New Zealand',
      };

      if (countryMap[localeMatch[2]]) {
        enhancedData.countryFromLocale = countryMap[localeMatch[2]];
      }
    }

    // Try to get connection information
    if ('connection' in navigator) {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
      if (connection) {
        enhancedData.connectionType = connection.effectiveType;
        enhancedData.networkDownlink = connection.downlink;
      }
    }

    // Get screen information (can indicate region preferences)
    enhancedData.screenResolution = `${screen.width}x${screen.height}`;
    enhancedData.colorDepth = screen.colorDepth;
    enhancedData.timezonOffset = new Date().getTimezoneOffset();

    // Browser and OS detection
    enhancedData.browser = getBrowserInfo(userAgent);
    enhancedData.os = getOSInfo(userAgent);
  } catch (error) {
    if (shouldAllowSortVisionVerboseLogging()) {
      console.log('Enhanced detection partially failed:', error);
    }
  }

  return enhancedData;
}
