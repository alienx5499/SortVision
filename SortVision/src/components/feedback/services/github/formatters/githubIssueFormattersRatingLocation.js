import { buildMarkdownSection, isKnown } from './formatterUtils';

export const getRatingDisplay = rating => {
  if (rating === 0) return '⭐ Not rated';
  const stars = '⭐'.repeat(rating);
  const labels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];
  return `${stars} ${rating}/5 - ${labels[rating]}`;
};

// Format location information like "Bengaluru, India, Asia Pacific"
export const formatLocationInfo = locationData => {
  if (!locationData) {
    return 'Location: Not detected';
  }

  const parts = [];
  // Same order as UI: City, Country, Region
  if (isKnown(locationData.city)) parts.push(locationData.city);
  if (isKnown(locationData.country)) parts.push(locationData.country);
  if (isKnown(locationData.region)) parts.push(locationData.region);

  const location = parts.length > 0 ? parts.join(', ') : 'Unknown';
  const method = locationData.detectionMethod || 'Unknown';
  const accuracy = locationData.accuracy || 'unknown';

  return `📍 **Location:** ${location} (via ${method}, ${accuracy} accuracy)`;
};

export const formatLocationDetails = locationData => {
  if (!locationData) {
    return '';
  }

  const lines = [];

  if (isKnown(locationData.ip))
    lines.push(`- **IP Address:** ${locationData.ip}`);

  if (isKnown(locationData.country)) {
    const countryCode = isKnown(locationData.countryCode)
      ? ` (${locationData.countryCode})`
      : '';
    lines.push(`- **Country:** ${locationData.country}${countryCode}`);
  }

  if (isKnown(locationData.region))
    lines.push(`- **Region/State:** ${locationData.region}`);

  if (isKnown(locationData.city))
    lines.push(`- **City:** ${locationData.city}`);

  if (locationData.latitude && locationData.longitude) {
    lines.push(
      `- **Coordinates:** ${locationData.latitude}, ${locationData.longitude}`
    );
  }

  if (isKnown(locationData.timezone))
    lines.push(`- **Timezone:** ${locationData.timezone}`);

  if (isKnown(locationData.isp)) lines.push(`- **ISP:** ${locationData.isp}`);

  if (isKnown(locationData.org) && locationData.org !== locationData.isp) {
    lines.push(`- **Organization:** ${locationData.org}`);
  }

  if (isKnown(locationData.asn)) lines.push(`- **ASN:** ${locationData.asn}`);
  lines.push(
    `- **Detection Method:** ${locationData.detectionMethod || 'Unknown'}`
  );
  lines.push(`- **Accuracy Level:** ${locationData.accuracy || 'unknown'}`);
  lines.push(
    `- **Detected At:** ${locationData.detectedAt || new Date().toISOString()}`
  );

  return buildMarkdownSection('🌍 Location Information', lines.join('\n'));
};
