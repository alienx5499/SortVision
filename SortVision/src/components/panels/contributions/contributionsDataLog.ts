/**
 * Contributions panel data layer: centralized logging policy (OSS / production).
 */
export function isContributionsDataVerbose(): boolean {
  return (
    process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true' ||
    process.env.NODE_ENV === 'development'
  );
}

export function contributionsDataDebug(
  message: string,
  ...args: unknown[]
): void {
  if (!isContributionsDataVerbose()) return;
  console.log(`[contributions] ${message}`, ...args);
}

export function contributionsDataWarn(
  message: string,
  ...args: unknown[]
): void {
  if (!isContributionsDataVerbose()) return;
  console.warn(`[contributions] ${message}`, ...args);
}
