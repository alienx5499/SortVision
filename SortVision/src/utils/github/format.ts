/**
 * Format number for display (1000 -> 1k, 1000000 -> 1M)
 */
export const formatCount = (count: number): string => {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace('.0', '')}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1).replace('.0', '')}k`;
  }
  return count.toString();
};
