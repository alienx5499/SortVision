import { boolLabel, buildMarkdownSection } from './formatterUtils';

export const formatMemoryInfo = memoryInfo => {
  if (!memoryInfo) return '';

  const memoryUsage = (
    (memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) *
    100
  ).toFixed(1);
  const memoryStatus =
    memoryUsage > 80 ? '🔴 High' : memoryUsage > 50 ? '🟡 Medium' : '🟢 Low';

  return buildMarkdownSection(
    '🧠 Memory Information',
    `**💾 Used Heap:** ${memoryInfo.usedJSHeapSize}MB
**📦 Total Heap:** ${memoryInfo.totalJSHeapSize}MB
**🏗️ Heap Limit:** ${memoryInfo.jsHeapSizeLimit}MB
**📊 Usage:** ${memoryUsage}% ${memoryStatus}`
  );
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

  return buildMarkdownSection('⚠️ Recent Errors (Last 5)', errorList);
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

  return buildMarkdownSection('🎯 Feature Usage Analytics', usageList);
};

export const formatAccessibilityInfo = accessibilityInfo => {
  if (!accessibilityInfo) return '';

  return buildMarkdownSection(
    '♿ Accessibility Preferences',
    `**🎬 Reduce Motion:** ${boolLabel(accessibilityInfo.reduceMotion, '✅ Enabled', '❌ Disabled')}
**🌗 Dark Mode:** ${boolLabel(accessibilityInfo.darkMode, '🌙 Preferred', '☀️ Light mode')}
**🔆 High Contrast:** ${boolLabel(accessibilityInfo.highContrast, '✅ Enabled', '❌ Disabled')}
**🎨 Forced Colors:** ${boolLabel(accessibilityInfo.forcedColors, '✅ Active', '❌ Inactive')}`
  );
};
