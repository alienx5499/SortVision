/**
 * Location Detection Service for SortVision Feedback System
 * Provides accurate geolocation using multiple IP-based services
 */

/**
 * Check if logging should be enabled using same logic as devTools
 */
const shouldLog = () => {
  // More reliable check for debug parameter (same as index.html)
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const debugParam = getQueryParam('cr7');
  const hasDebugParam = debugParam === 'goat';

  // Check if we're on a production domain (secure validation)
  const hostname = window.location.hostname.toLowerCase();
  const isProductionDomain =
    hostname.endsWith('.vercel.app') ||
    hostname === 'vercel.app' ||
    hostname.endsWith('.netlify.app') ||
    hostname === 'netlify.app' ||
    hostname.endsWith('.github.io') ||
    hostname === 'github.io' ||
    hostname.endsWith('.sortvision.com') ||
    hostname === 'sortvision.com';

  // Always block access on production domains
  if (isProductionDomain && hasDebugParam) {
    console.log(
      '%c SortVision DevTools Access Denied\n DevTools not available in production',
      'background: #991b1b; color: #ffffff; padding: 6px 10px; border-radius: 4px; font-weight: bold; font-size: 14px; border-left: 3px solid #f87171;'
    );
    return false;
  }

  // Allow in development mode OR with debug parameter (if not production)
  return process.env.NODE_ENV !== 'production' || hasDebugParam;
};

/**
 * Get user's location information using multiple geolocation services
 * @returns {Promise<Object>} Location data including IP, country, region, city, etc.
 */
export const detectUserLocation = async () => {
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
  if (shouldLog()) {
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
};

/**
 * Primary service: IP-API.com (free, reliable, detailed)
 */
const detectWithIPApi = async () => {
  // eslint-disable-line no-unused-vars
  const response = await fetch(
    'https://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,lat,lon,timezone,isp,org,as,query',
    {
      timeout: 5000,
    }
  );

  if (!response.ok) {
    throw new Error(`IP-API request failed: ${response.status}`);
  }

  const data = await response.json();

  if (data.status === 'fail') {
    throw new Error(`IP-API error: ${data.message}`);
  }

  return {
    ip: data.query,
    country: data.country,
    countryCode: data.countryCode,
    region: data.regionName,
    regionCode: data.region,
    city: data.city,
    latitude: data.lat,
    longitude: data.lon,
    timezone: data.timezone,
    isp: data.isp,
    org: data.org,
    asn: data.as,
    detectionMethod: 'IP-API',
    accuracy: 'high',
  };
};

/**
 * Secondary service: IPInfo.io (reliable, good coverage)
 */
const detectWithIPInfo = async () => {
  // eslint-disable-line no-unused-vars
  const response = await fetch('https://ipinfo.io/json', {
    timeout: 5000,
  });

  if (!response.ok) {
    throw new Error(`IPInfo request failed: ${response.status}`);
  }

  const data = await response.json();

  const [lat, lon] = (data.loc || ',').split(',');

  return {
    ip: data.ip,
    country: data.country,
    countryCode: data.country,
    region: data.region,
    regionCode: data.region,
    city: data.city,
    latitude: lat ? parseFloat(lat) : null,
    longitude: lon ? parseFloat(lon) : null,
    timezone: data.timezone,
    isp: data.org,
    org: data.org,
    asn: data.org,
    detectionMethod: 'IPInfo',
    accuracy: 'high',
  };
};

/**
 * Third service: IPGeolocation.io (backup service)
 */
const detectWithIPGeolocation = async () => {
  // eslint-disable-line no-unused-vars
  const response = await fetch(
    'https://api.ipgeolocation.io/ipgeo?apiKey=free',
    {
      timeout: 5000,
    }
  );

  if (!response.ok) {
    throw new Error(`IPGeolocation request failed: ${response.status}`);
  }

  const data = await response.json();

  return {
    ip: data.ip,
    country: data.country_name,
    countryCode: data.country_code2,
    region: data.state_prov,
    regionCode: data.state_prov,
    city: data.city,
    latitude: data.latitude ? parseFloat(data.latitude) : null,
    longitude: data.longitude ? parseFloat(data.longitude) : null,
    timezone: data.time_zone?.name,
    isp: data.isp,
    org: data.organization,
    asn: data.asn,
    detectionMethod: 'IPGeolocation',
    accuracy: 'medium',
  };
};

/**
 * Fourth service: FreeGeoIP (simple fallback)
 */
const detectWithFreeGeoIP = async () => {
  // eslint-disable-line no-unused-vars
  const response = await fetch('https://freegeoip.app/json/', {
    timeout: 5000,
  });

  if (!response.ok) {
    throw new Error(`FreeGeoIP request failed: ${response.status}`);
  }

  const data = await response.json();

  return {
    ip: data.ip,
    country: data.country_name,
    countryCode: data.country_code,
    region: data.region_name,
    regionCode: data.region_code,
    city: data.city,
    latitude: data.latitude,
    longitude: data.longitude,
    timezone: data.time_zone,
    isp: 'Unknown',
    org: 'Unknown',
    asn: 'Unknown',
    detectionMethod: 'FreeGeoIP',
    accuracy: 'medium',
  };
};

/**
 * Enhanced detection using browser APIs and timezone
 */
const enhanceTimezoneDetection = async () => {
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
    if (shouldLog()) {
      console.log('Enhanced detection partially failed:', error);
    }
  }

  return enhancedData;
};

/**
 * Extract browser information
 */
const getBrowserInfo = userAgent => {
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  if (userAgent.includes('Opera')) return 'Opera';
  return 'Unknown';
};

/**
 * Extract OS information
 */
const getOSInfo = userAgent => {
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac OS')) return 'macOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS')) return 'iOS';
  return 'Unknown';
};

/**
 * Fallback: Timezone-based region detection
 */
const detectWithTimezone = () => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let region = 'Unknown';
    let country = 'Unknown';
    let city = 'Unknown';

    // Enhanced timezone parsing
    const timezoneParts = timezone.split('/');
    if (timezoneParts.length >= 2) {
      const continent = timezoneParts[0];
      const cityName = timezoneParts[timezoneParts.length - 1].replace(
        /_/g,
        ' '
      );
      city = cityName;

      // Map continents to regions and extract countries from timezone
      switch (continent) {
        case 'America':
          region = 'Americas';
          if (
            timezone.includes('New_York') ||
            timezone.includes('Chicago') ||
            timezone.includes('Denver') ||
            timezone.includes('Los_Angeles') ||
            timezone.includes('Detroit') ||
            timezone.includes('Phoenix')
          ) {
            country = 'United States';
          } else if (
            timezone.includes('Toronto') ||
            timezone.includes('Vancouver') ||
            timezone.includes('Montreal')
          ) {
            country = 'Canada';
          } else if (
            timezone.includes('Mexico') ||
            timezone.includes('Tijuana') ||
            timezone.includes('Cancun')
          ) {
            country = 'Mexico';
          } else if (
            timezone.includes('Sao_Paulo') ||
            timezone.includes('Rio')
          ) {
            country = 'Brazil';
          } else if (timezone.includes('Buenos_Aires')) {
            country = 'Argentina';
          } else if (timezone.includes('Santiago')) {
            country = 'Chile';
          } else if (timezone.includes('Bogota')) {
            country = 'Colombia';
          } else {
            country = 'Americas';
          }
          break;

        case 'Europe':
          region = 'Europe';
          if (timezone.includes('London')) {
            country = 'United Kingdom';
          } else if (timezone.includes('Paris')) {
            country = 'France';
          } else if (
            timezone.includes('Berlin') ||
            timezone.includes('Munich')
          ) {
            country = 'Germany';
          } else if (timezone.includes('Rome') || timezone.includes('Milan')) {
            country = 'Italy';
          } else if (
            timezone.includes('Madrid') ||
            timezone.includes('Barcelona')
          ) {
            country = 'Spain';
          } else if (timezone.includes('Amsterdam')) {
            country = 'Netherlands';
          } else if (timezone.includes('Stockholm')) {
            country = 'Sweden';
          } else if (timezone.includes('Oslo')) {
            country = 'Norway';
          } else if (timezone.includes('Copenhagen')) {
            country = 'Denmark';
          } else if (timezone.includes('Helsinki')) {
            country = 'Finland';
          } else if (timezone.includes('Zurich')) {
            country = 'Switzerland';
          } else if (timezone.includes('Vienna')) {
            country = 'Austria';
          } else if (timezone.includes('Brussels')) {
            country = 'Belgium';
          } else if (timezone.includes('Dublin')) {
            country = 'Ireland';
          } else if (timezone.includes('Lisbon')) {
            country = 'Portugal';
          } else if (timezone.includes('Warsaw')) {
            country = 'Poland';
          } else if (timezone.includes('Prague')) {
            country = 'Czech Republic';
          } else if (timezone.includes('Budapest')) {
            country = 'Hungary';
          } else if (timezone.includes('Athens')) {
            country = 'Greece';
          } else if (timezone.includes('Moscow')) {
            country = 'Russia';
          } else {
            country = 'Europe';
          }
          break;

        case 'Asia':
          region = 'Asia Pacific';
          if (timezone.includes('Tokyo')) {
            country = 'Japan';
          } else if (
            timezone.includes('Shanghai') ||
            timezone.includes('Hong_Kong') ||
            timezone.includes('Beijing')
          ) {
            country = 'China';
          } else if (
            timezone.includes('Kolkata') ||
            timezone.includes('Mumbai') ||
            timezone.includes('Delhi')
          ) {
            country = 'India';
          } else if (timezone.includes('Seoul')) {
            country = 'South Korea';
          } else if (timezone.includes('Singapore')) {
            country = 'Singapore';
          } else if (timezone.includes('Bangkok')) {
            country = 'Thailand';
          } else if (timezone.includes('Kuala_Lumpur')) {
            country = 'Malaysia';
          } else if (timezone.includes('Manila')) {
            country = 'Philippines';
          } else if (timezone.includes('Jakarta')) {
            country = 'Indonesia';
          } else if (timezone.includes('Ho_Chi_Minh')) {
            country = 'Vietnam';
          } else if (timezone.includes('Dubai')) {
            country = 'United Arab Emirates';
          } else if (timezone.includes('Riyadh')) {
            country = 'Saudi Arabia';
          } else if (
            timezone.includes('Tel_Aviv') ||
            timezone.includes('Jerusalem')
          ) {
            country = 'Israel';
          } else if (timezone.includes('Istanbul')) {
            country = 'Turkey';
          } else {
            country = 'Asia';
          }
          break;

        case 'Africa':
          region = 'Africa';
          if (timezone.includes('Cairo')) {
            country = 'Egypt';
          } else if (timezone.includes('Lagos')) {
            country = 'Nigeria';
          } else if (
            timezone.includes('Johannesburg') ||
            timezone.includes('Cape_Town')
          ) {
            country = 'South Africa';
          } else if (timezone.includes('Nairobi')) {
            country = 'Kenya';
          } else if (timezone.includes('Casablanca')) {
            country = 'Morocco';
          } else {
            country = 'Africa';
          }
          break;

        case 'Australia':
        case 'Pacific':
          region = 'Australia/Oceania';
          if (
            timezone.includes('Sydney') ||
            timezone.includes('Melbourne') ||
            timezone.includes('Brisbane') ||
            timezone.includes('Perth') ||
            timezone.includes('Adelaide')
          ) {
            country = 'Australia';
          } else if (
            timezone.includes('Auckland') ||
            timezone.includes('Wellington')
          ) {
            country = 'New Zealand';
          } else {
            country = 'Oceania';
          }
          break;

        default:
          region = 'Other';
          country = 'Unknown';
      }
    }

    return {
      ip: 'Browser-detected',
      country: country,
      countryCode: 'Unknown',
      region: region,
      regionCode: 'Unknown',
      city: city,
      latitude: null,
      longitude: null,
      timezone: timezone,
      isp: 'Unknown',
      org: 'Unknown',
      asn: 'Unknown',
      detectionMethod: 'Timezone Analysis',
      accuracy: 'low',
    };
  } catch (error) {
    console.error('Timezone detection failed:', error);
    return {
      country: 'Unknown',
      region: 'Unknown',
      city: 'Unknown',
      timezone: 'Unknown',
      detectionMethod: 'Failed',
      accuracy: 'none',
    };
  }
};

/**
 * Get simplified region for dropdown selection
 * @param {Object} locationData - Full location data
 * @returns {string} - Simplified region name
 */
export const getSimplifiedRegion = locationData => {
  if (!locationData || !locationData.region) {
    return 'Other';
  }

  const region = locationData.region.toLowerCase();

  if (
    region.includes('america') ||
    region.includes('united states') ||
    region.includes('canada') ||
    region.includes('mexico')
  ) {
    return 'Americas';
  } else if (
    region.includes('europe') ||
    region.includes('uk') ||
    region.includes('britain') ||
    region.includes('france') ||
    region.includes('germany')
  ) {
    return 'Europe';
  } else if (
    region.includes('asia') ||
    region.includes('pacific') ||
    region.includes('china') ||
    region.includes('japan') ||
    region.includes('india')
  ) {
    return 'Asia Pacific';
  } else if (region.includes('africa')) {
    return 'Africa';
  } else if (
    region.includes('australia') ||
    region.includes('oceania') ||
    region.includes('new zealand')
  ) {
    return 'Australia/Oceania';
  } else if (region.includes('middle east') || region.includes('gulf')) {
    return 'Middle East';
  } else {
    return 'Other';
  }
};

/**
 * Format location data for display like "Bengaluru, India, Asia Pacific"
 * @param {Object} locationData - Location data
 * @returns {string} - Formatted location string
 */
export const formatLocationString = locationData => {
  if (!locationData) {
    return 'Unknown Location';
  }

  const parts = [];

  // Add city if available and not 'Unknown'
  if (locationData.city && locationData.city !== 'Unknown') {
    parts.push(locationData.city);
  }

  // Add country if available and not 'Unknown'
  if (locationData.country && locationData.country !== 'Unknown') {
    parts.push(locationData.country);
  }

  // Add region if available and not 'Unknown'
  if (locationData.region && locationData.region !== 'Unknown') {
    parts.push(locationData.region);
  }

  // If no parts, show detection method
  if (parts.length === 0) {
    return `Detected via ${locationData.detectionMethod || 'Unknown Method'}`;
  }

  return parts.join(', ');
};

/**
 * Get location accuracy indicator
 * @param {Object} locationData - Location data
 * @returns {Object} - Accuracy info with color and text
 */
export const getLocationAccuracy = locationData => {
  if (!locationData || !locationData.accuracy) {
    return { level: 'none', color: 'text-red-400', text: 'No location data' };
  }

  switch (locationData.accuracy) {
    case 'high':
      return {
        level: 'high',
        color: 'text-emerald-400',
        text: 'High accuracy',
      };
    case 'medium':
      return {
        level: 'medium',
        color: 'text-amber-400',
        text: 'Medium accuracy',
      };
    case 'low':
      return { level: 'low', color: 'text-orange-400', text: 'Low accuracy' };
    default:
      return { level: 'none', color: 'text-red-400', text: 'Unknown accuracy' };
  }
};
