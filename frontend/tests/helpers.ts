/**
 * tests/helpers.ts – Shared test utilities for MedBuddy Playwright suite.
 *
 * Rules enforced here:
 *  - NEVER create new accounts (Supabase email verification is ENABLED).
 *  - Always use the pre-verified test user defined below.
 *  - loginAsTestUser() is the single source of truth for the login flow;
 *    every spec file's beforeEach should call it (except auth.spec.ts itself).
 *
 * Selector strategy (priority order):
 *  1. data-testid  (set on signin-email, signin-password, signin-submit)
 *  2. getByRole / getByPlaceholder / getByText
 *  3. CSS attribute selectors as fallback (e.g. input[type="email"])
 */

import { type Page } from '@playwright/test';

// ─── Pre-verified test user ───────────────────────────────────────────────────
export const TEST_EMAIL    = 'hafizaeshal.fatima@gmail.com';
export const TEST_PASSWORD = '12345678';

// Alias used in some older spec files that imported EXISTING_ACCOUNT_EMAIL
export const EXISTING_ACCOUNT_EMAIL = TEST_EMAIL;

// ─── Core login helper ────────────────────────────────────────────────────────

/**
 * loginAsTestUser
 *
 * Navigates to /auth/sign-in, fills in the pre-verified test credentials,
 * submits the form, and waits for the redirect to /dashboard.
 *
 * Uses data-testid selectors that match the sign-in form component
 * (sign-in/page.tsx: data-testid="signin-email|signin-password|signin-submit").
 * Falls back to CSS attribute selectors so the helper remains robust even if
 * testid attributes are temporarily removed.
 */
export async function loginAsTestUser(page: Page): Promise<void> {
  // Check if already logged in / on dashboard
  if (page.url().includes('/dashboard')) {
    console.log('Already logged in, skipping login');
    return;
  }

  await page.goto('/auth/sign-in');

  // Email input - robust fallback strategy
  const emailInput = page
    .getByTestId('signin-email')
    .or(page.getByPlaceholder(/email/i))
    .or(page.locator('input[type="email"]'))
    .or(page.locator('input[name="email"]'))
    .or(page.getByLabel(/email/i));
    
  await emailInput.first().waitFor({ state: 'visible', timeout: 15_000 });
  await emailInput.first().fill(TEST_EMAIL);

  // Password input - robust fallback strategy
  const passwordInput = page
    .getByTestId('signin-password')
    .or(page.getByPlaceholder(/password/i))
    .or(page.locator('input[type="password"]'))
    .or(page.locator('input[name="password"]'))
    .or(page.getByLabel(/password/i));
    
  await passwordInput.first().fill(TEST_PASSWORD);

  // Submit button - robust fallback strategy
  const submitBtn = page
    .getByTestId('signin-submit')
    .or(page.locator('button[type="submit"]'))
    .or(page.getByRole('button', { name: /sign in/i }))
    .or(page.locator('text="Sign in"'));
    
  await submitBtn.first().click({ force: true });

  // Supabase auth can take a moment; wait up to 30 s for the redirect
  await page.waitForURL(/\/dashboard/, { timeout: 30_000 });
}
