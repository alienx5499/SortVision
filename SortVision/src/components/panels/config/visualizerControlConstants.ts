/** Single place for config control numeric policy (array size, speed). */

export const ARRAY_SIZE_MIN = 10;
export const ARRAY_SIZE_MAX = 200;
export const ARRAY_SIZE_SLIDER_STEP = 1;
export const ARRAY_SIZE_QUICK_DELTA = 10;

export const SPEED_MS_MIN = 1;
export const SPEED_MS_MAX = 1000;
export const SPEED_MS_SLIDER_STEP = 1;

export function normalizedArraySizeRatio(size: number): number {
  return (size - ARRAY_SIZE_MIN) / (ARRAY_SIZE_MAX - ARRAY_SIZE_MIN);
}

export function normalizedSpeedRatio(speedMs: number): number {
  return (speedMs - SPEED_MS_MIN) / (SPEED_MS_MAX - SPEED_MS_MIN);
}
