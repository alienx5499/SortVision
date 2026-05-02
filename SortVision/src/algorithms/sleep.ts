/**
 * Non-blocking delay between visualization steps.
 */
export function delayStep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
