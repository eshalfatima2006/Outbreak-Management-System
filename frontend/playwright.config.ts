/**
 * playwright.config.ts
 *
 * Playwright test runner configuration for the MedBuddy application.
 * Tests run against the local dev server at http://localhost:3001.
 *
 * Key decisions:
 *  - Chromium only (per spec) to keep CI fast.
 *  - fullyParallel: true for fast local runs; workers=1 in CI to avoid flakiness.
 *  - HTML report is generated but NOT auto-opened (open: 'never') so CI doesn't hang.
 *  - JUnit XML is also emitted for CI integration.
 *  - trace / screenshot / video are only kept on failure to keep artifacts small.
 *  - Global timeout per test: 90 s (generous for Supabase auth round-trips).
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 90_000,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'],
  ],

  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
