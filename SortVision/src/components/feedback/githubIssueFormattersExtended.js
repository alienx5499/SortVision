export const formatMemoryInfo = memoryInfo => {
  if (!memoryInfo) return '';

  const memoryUsage = (
    (memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) *
    100
  ).toFixed(1);
  const memoryStatus =
    memoryUsage > 80 ? '🔴 High' : memoryUsage > 50 ? '🟡 Medium' : '🟢 Low';

  return `
## 🧠 Memory Information

**💾 Used Heap:** ${memoryInfo.usedJSHeapSize}MB
**📦 Total Heap:** ${memoryInfo.totalJSHeapSize}MB
**🏗️ Heap Limit:** ${memoryInfo.jsHeapSizeLimit}MB
**📊 Usage:** ${memoryUsage}% ${memoryStatus}`;
};

export const formatErrorHistory = errorHistory => {
  if (!errorHistory || errorHistory.length === 0) return '';

  const errorList = errorHistory
    .map(
      (error, index) =>
        `${index + 1}. **${error.message || 'Unknown Error'}** at ${
          error.timestamp || 'Unknown time'
        }\n   \`${error.stack || 'No stack trace'}\``
    )
    .join('\n');

  return `
## ⚠️ Recent Errors (Last 5)

${errorList}`;
};

export const formatFeatureUsage = featureUsage => {
  if (!featureUsage) return '';

  const usageList = Object.entries(featureUsage)
    .map(([feature, data]) => {
      if (typeof data === 'object' && data.count) {
        return `**${feature}:** ${data.count} times (Last used: ${new Date(
          data.lastUsed
        ).toLocaleString()})`;
      }
      return `**${feature}:** ${data}`;
    })
    .join('\n');

  return `
## 🎯 Feature Usage Analytics

${usageList}`;
};

export const formatAccessibilityInfo = accessibilityInfo => {
  if (!accessibilityInfo) return '';

  return `
## ♿ Accessibility Preferences

**🎬 Reduce Motion:** ${
    accessibilityInfo.reduceMotion ? '✅ Enabled' : '❌ Disabled'
  }
**🌗 Dark Mode:** ${
    accessibilityInfo.darkMode ? '🌙 Preferred' : '☀️ Light mode'
  }
**🔆 High Contrast:** ${
    accessibilityInfo.highContrast ? '✅ Enabled' : '❌ Disabled'
  }
**🎨 Forced Colors:** ${
    accessibilityInfo.forcedColors ? '✅ Active' : '❌ Inactive'
  }`;
};
