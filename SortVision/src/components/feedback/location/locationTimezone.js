/**
 * Timezone-based region inference (CSP-safe)
 */

/**
 * Fallback: Timezone-based region detection
 */
export function detectWithTimezone() {
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
}
