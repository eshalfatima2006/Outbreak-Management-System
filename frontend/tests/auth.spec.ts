/**
 * tests/auth.spec.ts – Authentication Tests
 *
 * Covers the /auth/sign-in page behaviour:
 *
 *  Test 1 – Page renders all UI elements (no credentials needed).
 *  Test 2 – Invalid credentials show an inline error and stay on sign-in.
 *  Test 3 – Valid credentials redirect to /dashboard and greeting is shown.
 *
 * ⚠️  DO NOT add account-creation tests here – Supabase email verification
 *     is ENABLED; automated sign-up will fail.
 *
 * Selectors confirmed from src/app/auth/sign-in/page.tsx:
 *  - data-testid="signin-email"     → <input type="email" …>
 *  - data-testid="signin-password"  → <input type="password" …>
 *  - data-testid="signin-submit"    → <button type="submit">Sign in</button>
 *  - Error div: <div class="…bg-red-50 border border-red-200 text-red-700">
 *  - Greeting: <h1>Good morning/afternoon/evening, {name}</h1>
 */

import { test, expect } from '@playwright/test';
import { TEST_EMAIL, TEST_PASSWORD } from './helpers';

test.describe('Authentication', () => {
  // ── Test 1: Login page renders all required elements ──────────────────────
  test('Test 1: Login page renders heading, inputs, submit, and forgot-password link', async ({ page }) => {
    await page.goto('/auth/sign-in');
    await expect(page).toHaveURL(/\/auth\/sign-in/, { timeout: 15_000 });

    // Heading – "Welcome back"
    await expect(
      page.getByRole('heading', { name: /welcome back/i })
    ).toBeVisible({ timeout: 15_000 });

    // Sub-text
    await expect(page.getByText(/sign in to continue your streak/i)).toBeVisible();

    // Email input
    const emailInput = page
      .getByTestId('signin-email')
      .or(page.locator('input[type="email"]'));
    await expect(emailInput.first()).toBeVisible();

    // Password input
    const passwordInput = page
      .getByTestId('signin-password')
      .or(page.locator('input[type="password"]'));
    await expect(passwordInput.first()).toBeVisible();

    // Submit button (enabled by default)
    const submitBtn = page
      .getByTestId('signin-submit')
      .or(page.getByRole('button', { name: /sign in/i }));
    await expect(submitBtn.first()).toBeVisible();
    await expect(submitBtn.first()).toBeEnabled();

    // Forgot password link
    await expect(
      page.getByRole('link', { name: /forgot password/i })
    ).toBeVisible();

    // "New here?" → "Create an account" link
    await expect(
      page.getByRole('link', { name: /create an account/i })
    ).toBeVisible();
  });

  // ── Test 2: Invalid credentials show error and stay on sign-in ───────────
  test('Test 2: Invalid credentials show error message and do not redirect', async ({ page }) => {
    await page.goto('/auth/sign-in');

    const emailInput = page
      .getByTestId('signin-email')
      .or(page.locator('input[type="email"]'));
    await emailInput.first().fill('wrong@example.com');

    const passwordInput = page
      .getByTestId('signin-password')
      .or(page.locator('input[type="password"]'));
    await passwordInput.first().fill('wrongpassword123');

    const submitBtn = page
      .getByTestId('signin-submit')
      .or(page.getByRole('button', { name: /sign in/i }));
    await submitBtn.first().click({ force: true });

    // Give Supabase time to respond
    await page.waitForTimeout(3_000);

    // Must still be on the sign-in page
    await expect(page).toHaveURL(/\/auth\/sign-in/);

    // Error message: sign-in/page.tsx renders a red div with Supabase's error text
    // Matches: "Invalid login credentials", "Email not confirmed", etc.
    const errorDiv = page
      .locator('.bg-red-50')
      .or(page.locator('[role="alert"]'))
      .or(page.locator('text=/invalid|incorrect|failed|credentials/i').first());
    await expect(errorDiv.first()).toBeVisible({ timeout: 10_000 });
  });

  // ── Test 3: Valid credentials redirect to dashboard with greeting ─────────
  test('Test 3: Valid credentials redirect to /dashboard and show time-of-day greeting', async ({ page }) => {
    await page.goto('/auth/sign-in');

    const emailInput = page
      .getByTestId('signin-email')
      .or(page.locator('input[type="email"]'));
    await emailInput.first().fill(TEST_EMAIL);

    const passwordInput = page
      .getByTestId('signin-password')
      .or(page.locator('input[type="password"]'));
    await passwordInput.first().fill(TEST_PASSWORD);

    const submitBtn = page
      .getByTestId('signin-submit')
      .or(page.getByRole('button', { name: /sign in/i }));
    await submitBtn.first().click({ force: true });

    // Supabase auth → Next.js router.push('/dashboard')
    await page.waitForURL('**/dashboard', { timeout: 30_000 });
    await expect(page).toHaveURL(/\/dashboard/);

    // Dashboard page.tsx: getGreeting() → "Good morning|afternoon|evening"
    await expect(
      page.getByRole('heading', { name: /Good (morning|afternoon|evening)/i })
    ).toBeVisible({ timeout: 15_000 });
  });
});
