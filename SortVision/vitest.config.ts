/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'src/components/sortingVisualizer/hooks/useSortingState.ts',
        'src/components/sortingVisualizer/hooks/useSortingActions.ts',
        'src/components/sortingVisualizer/hooks/useVisualizerRouteSync.ts',
        'src/components/sortingVisualizer/sortingIntegration.test.ts',
      ],
      exclude: ['src/test/**'],
    },
  },
});
