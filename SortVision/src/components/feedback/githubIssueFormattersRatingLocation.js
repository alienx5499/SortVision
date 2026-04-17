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
  if (locationData.city && locationData.city !== 'Unknown')
    parts.push(locationData.city);
  if (locationData.country && locationData.country !== 'Unknown')
    parts.push(locationData.country);
  if (locationData.region && locationData.region !== 'Unknown')
    parts.push(locationData.region);

  const location = parts.length > 0 ? parts.join(', ') : 'Unknown';
  const method = locationData.detectionMethod || 'Unknown';
  const accuracy = locationData.accuracy || 'unknown';

  return `📍 **Location:** ${location} (via ${method}, ${accuracy} accuracy)`;
};

export const formatLocationDetails = locationData => {
  if (!locationData) {
    return '';
  }

  let details = '\n## 🌍 Location Information\n\n';

  if (locationData.ip && locationData.ip !== 'Unknown') {
    details += `- **IP Address:** ${locationData.ip}\n`;
  }

  if (locationData.country && locationData.country !== 'Unknown') {
    details += `- **Country:** ${locationData.country}`;
    if (locationData.countryCode && locationData.countryCode !== 'Unknown') {
      details += ` (${locationData.countryCode})`;
    }
    details += '\n';
  }

  if (locationData.region && locationData.region !== 'Unknown') {
    details += `- **Region/State:** ${locationData.region}\n`;
  }

  if (locationData.city && locationData.city !== 'Unknown') {
    details += `- **City:** ${locationData.city}\n`;
  }

  if (locationData.latitude && locationData.longitude) {
    details += `- **Coordinates:** ${locationData.latitude}, ${locationData.longitude}\n`;
  }

  if (locationData.timezone && locationData.timezone !== 'Unknown') {
    details += `- **Timezone:** ${locationData.timezone}\n`;
  }

  if (locationData.isp && locationData.isp !== 'Unknown') {
    details += `- **ISP:** ${locationData.isp}\n`;
  }

  if (
    locationData.org &&
    locationData.org !== 'Unknown' &&
    locationData.org !== locationData.isp
  ) {
    details += `- **Organization:** ${locationData.org}\n`;
  }

  if (locationData.asn && locationData.asn !== 'Unknown') {
    details += `- **ASN:** ${locationData.asn}\n`;
  }

  details += `- **Detection Method:** ${
    locationData.detectionMethod || 'Unknown'
  }\n`;
  details += `- **Accuracy Level:** ${locationData.accuracy || 'unknown'}\n`;
  details += `- **Detected At:** ${
    locationData.detectedAt || new Date().toISOString()
  }\n`;

  return details;
};
