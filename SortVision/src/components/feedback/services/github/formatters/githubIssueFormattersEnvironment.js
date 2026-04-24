import { boolLabel, buildMarkdownSection } from './formatterUtils';

export const formatSessionData = sessionData => {
  if (!sessionData) return '';

  const formatTime = seconds => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const engagementLabel =
    sessionData.timeSpentOnSite > 300
      ? 'Engaged user'
      : sessionData.timeSpentOnSite > 60
        ? 'Active session'
        : 'Quick visit';

  const lines = [
    `**🆔 Session ID:** \`${sessionData.sessionId}\``,
    `**⏱️ Time on Site:** ${formatTime(sessionData.timeSpentOnSite)} *(${engagementLabel})*`,
    `**🕐 Session Started:** ${new Date(sessionData.sessionStartTime).toLocaleString()}`,
    `**📤 Submitted:** ${new Date(sessionData.submissionTime).toLocaleString()}`,
    `**🖥️ Screen:** ${sessionData.screenResolution} (Viewport: ${sessionData.viewportSize})`,
    `**🎨 Color Depth:** ${sessionData.colorDepth}bit, **Pixel Ratio:** ${sessionData.pixelRatio}x`,
    `**🌐 Language:** ${sessionData.language} (Available: ${sessionData.languages?.join(', ') || 'N/A'})`,
    `**🕐 Timezone:** ${sessionData.timezone}`,
  ];

  return buildMarkdownSection('📊 Session Analytics', lines.join('\n'));
};

export const formatDeviceInfo = (deviceInfo, browserCapabilities) => {
  if (!deviceInfo) return '';

  const caps = browserCapabilities || {};
  const supportedFeatures = Object.entries(caps)
    .filter(([, supported]) => supported)
    .map(([feature]) => feature)
    .join(', ');

  const unsupportedFeatures = Object.entries(caps)
    .filter(([, supported]) => !supported)
    .map(([feature]) => feature)
    .join(', ');

  const lines = [
    `**📱 Device Type:** ${deviceInfo.deviceType} (Mobile: ${boolLabel(deviceInfo.isMobile, '✅', '❌')}, Tablet: ${boolLabel(deviceInfo.isTablet, '✅', '❌')})`,
    `**💻 Platform:** ${deviceInfo.platform}`,
    `**🏢 Vendor:** ${deviceInfo.vendor}`,
    `**🌐 Online Status:** ${boolLabel(deviceInfo.onlineStatus, '🟢 Online', '🔴 Offline')}`,
    `**🍪 Cookies:** ${boolLabel(deviceInfo.cookieEnabled, '✅ Enabled', '❌ Disabled')}`,
    `**🔒 Do Not Track:** ${deviceInfo.doNotTrack}`,
    '',
    '### Browser Capabilities',
    `**✅ Supported:** ${supportedFeatures || 'None detected'}`,
    `**❌ Unsupported:** ${unsupportedFeatures || 'All supported'}`,
  ];

  return buildMarkdownSection(
    '📱 Device & Browser Information',
    lines.join('\n')
  );
};

export const formatNetworkInfo = networkInfo => {
  if (!networkInfo) return '';

  const connectionQuality =
    networkInfo.effectiveType === '4g'
      ? '🟢 Excellent'
      : networkInfo.effectiveType === '3g'
        ? '🟡 Good'
        : networkInfo.effectiveType === '2g'
          ? '🟠 Poor'
          : '⚪ Unknown';

  const lines = [
    `**📶 Connection:** ${networkInfo.effectiveType} ${connectionQuality}`,
    `**⬇️ Downlink:** ${networkInfo.downlink}Mbps`,
    `**⏱️ RTT:** ${networkInfo.rtt}ms`,
    `**💾 Data Saver:** ${boolLabel(networkInfo.saveData, '✅ Enabled', '❌ Disabled')}`,
  ];

  return buildMarkdownSection('🌐 Network Information', lines.join('\n'));
};

export const formatPerformanceInfo = performanceInfo => {
  if (!performanceInfo) return '';

  const lines = [
    `**🏠 DOM Content Loaded:** ${performanceInfo.domContentLoaded}ms`,
    `**📄 Page Load:** ${performanceInfo.pageLoad}ms`,
    `**🔍 DNS Lookup:** ${performanceInfo.dnsLookup}ms`,
    `**🔗 TCP Connect:** ${performanceInfo.tcpConnect}ms`,
    `**📡 Server Response:** ${performanceInfo.serverResponse}ms`,
  ];

  return buildMarkdownSection('⚡ Performance Metrics', lines.join('\n'));
};

export const formatPageContext = pageContext => {
  if (!pageContext) return '';

  const lines = [
    `**📍 Current Page:** ${pageContext.pathname}`,
    `**🔗 Full URL:** ${pageContext.url}`,
    `**🔍 Query Parameters:** ${pageContext.search || 'None'}`,
    `**⚓ Hash:** ${pageContext.hash || 'None'}`,
    `**👈 Referrer:** ${pageContext.referrer}`,
    `**📜 Page Title:** ${pageContext.title}`,
    `**📏 Scroll Position:** ${pageContext.scrollPosition.x}, ${pageContext.scrollPosition.y}`,
    `**📐 Document Height:** ${pageContext.documentHeight}px`,
  ];

  return buildMarkdownSection('📄 Page Context', lines.join('\n'));
};
