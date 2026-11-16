import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['packages/**/*.test.ts', 'apps/web/src/**/*.test.ts'],
    exclude: ['**/node_modules/**', 'apps/web/e2e/**'],
    coverage: {
      provider: 'v8',
      include: ['packages/karten-kern/src/**/*.ts'],
      exclude: ['**/*.test.ts', '**/index.ts', '**/typen.ts'],
      reporter: ['text-summary', 'text'],
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
});
