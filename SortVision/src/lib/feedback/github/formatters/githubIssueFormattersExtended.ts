import type {
  FeedbackAccessibilityInfo,
  FeedbackErrorLogEntry,
  FeedbackMemoryInfo,
} from '../../types';
import { boolLabel, buildMarkdownSection } from './formatterUtils';

export function formatMemoryInfo(
  memoryInfo: FeedbackMemoryInfo | null | undefined
): string {
  if (!memoryInfo) return '';

  const memoryUsage = (
    (memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) *
    100
  ).toFixed(1);
  const memoryStatus =
    Number(memoryUsage) > 80
      ? '🔴 High'
      : Number(memoryUsage) > 50
        ? '🟡 Medium'
        : '🟢 Low';

  return buildMarkdownSection(
    '🧠 Memory Information',
    `**💾 Used Heap:** ${memoryInfo.usedJSHeapSize}MB
**📦 Total Heap:** ${memoryInfo.totalJSHeapSize}MB
**🏗️ Heap Limit:** ${memoryInfo.jsHeapSizeLimit}MB
**📊 Usage:** ${memoryUsage}% ${memoryStatus}`
  );
}

export function formatErrorHistory(
  errorHistory: FeedbackErrorLogEntry[] | null | undefined
): string {
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
}

interface FeatureUsageEntry {
  count?: number;
  lastUsed?: string | number;
}

export function formatFeatureUsage(
  featureUsage: Record<string, unknown> | null | undefined
): string {
  if (!featureUsage) return '';

  const usageList = Object.entries(featureUsage)
    .map(([feature, data]) => {
      if (
        typeof data === 'object' &&
        data !== null &&
        'count' in data &&
        typeof (data as FeatureUsageEntry).count === 'number'
      ) {
        const entry = data as FeatureUsageEntry;
        return `**${feature}:** ${entry.count} times (Last used: ${new Date(
          entry.lastUsed as string | number | Date
        ).toLocaleString()})`;
      }
      return `**${feature}:** ${String(data)}`;
    })
    .join('\n');

  return buildMarkdownSection('🎯 Feature Usage Analytics', usageList);
}

export function formatAccessibilityInfo(
  accessibilityInfo: FeedbackAccessibilityInfo | null | undefined
): string {
  if (!accessibilityInfo) return '';

  return buildMarkdownSection(
    '♿ Accessibility Preferences',
    `**🎬 Reduce Motion:** ${boolLabel(accessibilityInfo.reduceMotion, '✅ Enabled', '❌ Disabled')}
**🌗 Dark Mode:** ${boolLabel(accessibilityInfo.darkMode, '🌙 Preferred', '☀️ Light mode')}
**🔆 High Contrast:** ${boolLabel(accessibilityInfo.highContrast, '✅ Enabled', '❌ Disabled')}
**🎨 Forced Colors:** ${boolLabel(accessibilityInfo.forcedColors, '✅ Active', '❌ Inactive')}`
  );
}
