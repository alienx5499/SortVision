export const formatSessionData = sessionData => {
  if (!sessionData) return '';

  const formatTime = seconds => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return `
## 📊 Session Analytics

**🆔 Session ID:** \`${sessionData.sessionId}\`
**⏱️ Time on Site:** ${formatTime(sessionData.timeSpentOnSite)} *(${
    sessionData.timeSpentOnSite > 300
      ? 'Engaged user'
      : sessionData.timeSpentOnSite > 60
        ? 'Active session'
        : 'Quick visit'
  })*
**🕐 Session Started:** ${new Date(
    sessionData.sessionStartTime
  ).toLocaleString()}
**📤 Submitted:** ${new Date(sessionData.submissionTime).toLocaleString()}
**🖥️ Screen:** ${sessionData.screenResolution} (Viewport: ${
    sessionData.viewportSize
  })
**🎨 Color Depth:** ${sessionData.colorDepth}bit, **Pixel Ratio:** ${
    sessionData.pixelRatio
  }x
**🌐 Language:** ${sessionData.language} (Available: ${
    sessionData.languages?.join(', ') || 'N/A'
  })
**🕐 Timezone:** ${sessionData.timezone}`;
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

  return `
## 📱 Device & Browser Information

**📱 Device Type:** ${deviceInfo.deviceType} (Mobile: ${
    deviceInfo.isMobile ? '✅' : '❌'
  }, Tablet: ${deviceInfo.isTablet ? '✅' : '❌'})
**💻 Platform:** ${deviceInfo.platform}
**🏢 Vendor:** ${deviceInfo.vendor}
**🌐 Online Status:** ${deviceInfo.onlineStatus ? '🟢 Online' : '🔴 Offline'}
**🍪 Cookies:** ${deviceInfo.cookieEnabled ? '✅ Enabled' : '❌ Disabled'}
**🔒 Do Not Track:** ${deviceInfo.doNotTrack}

### Browser Capabilities
**✅ Supported:** ${supportedFeatures || 'None detected'}
**❌ Unsupported:** ${unsupportedFeatures || 'All supported'}`;
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

  return `
## 🌐 Network Information

**📶 Connection:** ${networkInfo.effectiveType} ${connectionQuality}
**⬇️ Downlink:** ${networkInfo.downlink}Mbps
**⏱️ RTT:** ${networkInfo.rtt}ms
**💾 Data Saver:** ${networkInfo.saveData ? '✅ Enabled' : '❌ Disabled'}`;
};

export const formatPerformanceInfo = performanceInfo => {
  if (!performanceInfo) return '';

  return `
## ⚡ Performance Metrics

**🏠 DOM Content Loaded:** ${performanceInfo.domContentLoaded}ms
**📄 Page Load:** ${performanceInfo.pageLoad}ms
**🔍 DNS Lookup:** ${performanceInfo.dnsLookup}ms
**🔗 TCP Connect:** ${performanceInfo.tcpConnect}ms
**📡 Server Response:** ${performanceInfo.serverResponse}ms`;
};

export const formatPageContext = pageContext => {
  if (!pageContext) return '';

  return `
## 📄 Page Context

**📍 Current Page:** ${pageContext.pathname}
**🔗 Full URL:** ${pageContext.url}
**🔍 Query Parameters:** ${pageContext.search || 'None'}
**⚓ Hash:** ${pageContext.hash || 'None'}
**👈 Referrer:** ${pageContext.referrer}
**📜 Page Title:** ${pageContext.title}
**📏 Scroll Position:** ${pageContext.scrollPosition.x}, ${
    pageContext.scrollPosition.y
  }
**📐 Document Height:** ${pageContext.documentHeight}px`;
};
