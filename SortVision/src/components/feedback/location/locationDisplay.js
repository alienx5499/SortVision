/**
 * Display helpers for detected location in the feedback UI
 */

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
