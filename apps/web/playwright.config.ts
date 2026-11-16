import { defineConfig } from '@playwright/test';

// Einmalig: npx playwright install chromium
export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  fullyParallel: false,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4180/', headless: true, viewport: { width: 390, height: 844 }, launchOptions: { executablePath: process.env.PW_CHROMIUM || undefined, args: process.env.PW_CHROMIUM ? ['--no-sandbox'] : [] } },
  webServer: {
    command: 'npx vite preview --host 127.0.0.1 --port 4180 --strictPort',
    cwd: '.',
    url: 'http://127.0.0.1:4180/',
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
