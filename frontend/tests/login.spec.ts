/**
 * login.spec.ts -- Login Page Load Tests
 *
 * Verifies that the /auth/sign-in page renders all expected UI elements
 * without requiring authentication.
 *
 * Selectors use data-testid (matching the sign-in form component) and
 * fall back to semantic role / CSS attribute selectors where testids are
 * not available.
 */
import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('Login page loads correctly', async ({ page }) => {
    // Navigate
    await page.goto('/auth/sign-in');

    // URL assertion
    await expect(page).toHaveURL(/\/auth\/sign-in/);

    // Email input
    // Primary: data-testid used by the SignInForm component
    // Fallback: CSS attribute selector
    const emailInput = page
      .getByTestId('signin-email')
      .or(page.locator('input[type="email"]'));
    await expect(emailInput.first()).toBeVisible({ timeout: 15_000 });

    // Password input
    const passwordInput = page
      .getByTestId('signin-password')
      .or(page.locator('input[type="password"]'));
    await expect(passwordInput.first()).toBeVisible({ timeout: 15_000 });

    // Submit button
    // Primary: data-testid; Secondary: role + accessible name pattern
    const submitBtn = page
      .getByTestId('signin-submit')
      .or(page.getByRole('button', { name: /sign in/i }));
    await expect(submitBtn.first()).toBeVisible({ timeout: 15_000 });
  });
});
