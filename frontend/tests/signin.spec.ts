/**
 * signin.spec.ts -- Sign-in Flow Tests
 *
 * Test 1: User can sign in successfully with valid credentials and
 *         be redirected to /dashboard.
 * Test 2: Greeting heading is visible immediately after sign-in.
 * Test 3: Invalid credentials show an error message (no redirect).
 *
 * Selectors mirror helpers.ts (data-testid attributes on the SignInForm
 * component) so they stay consistent across all spec files.
 */
import { test, expect } from '@playwright/test';
import { EXISTING_ACCOUNT_EMAIL, TEST_PASSWORD } from './helpers';

test.describe('Sign-in Flow', () => {
  test('User can sign in successfully', async ({ page }) => {
    // Navigate to the sign-in page
    await page.goto('/auth/sign-in');
    await expect(page).toHaveURL(/\/auth\/sign-in/);

    // Fill in credentials using data-testid selectors (set on the form inputs)
    // Fallback to CSS attribute selectors if testids are not present
    const emailInput = page
      .getByTestId('signin-email')
      .or(page.locator('input[type="email"]'));
    await emailInput.first().fill(EXISTING_ACCOUNT_EMAIL);

    const passwordInput = page
      .getByTestId('signin-password')
      .or(page.locator('input[type="password"]'));
    await passwordInput.first().fill(TEST_PASSWORD);

    // Click the submit button
    const submitBtn = page
      .getByTestId('signin-submit')
      .or(page.getByRole('button', { name: /sign in/i }));
    await submitBtn.first().click({ force: true });

    // Wait for redirect to /dashboard (Supabase auth can take a moment)
    await page.waitForURL('**/dashboard', { timeout: 30_000 });

    // Confirm the URL
    await expect(page).toHaveURL(/\/dashboard/);

    // Confirm the greeting heading is visible (matches time-of-day variants)
    await expect(
      page.getByRole('heading', { name: /Good (morning|afternoon|evening)/i })
    ).toBeVisible({ timeout: 15_000 });
  });

  test('Invalid credentials show an error and stay on sign-in page', async ({ page }) => {
    await page.goto('/auth/sign-in');

    const emailInput = page
      .getByTestId('signin-email')
      .or(page.locator('input[type="email"]'));
    await emailInput.first().fill('wrong@email.com');

    const passwordInput = page
      .getByTestId('signin-password')
      .or(page.locator('input[type="password"]'));
    await passwordInput.first().fill('wrongpassword');

    const submitBtn = page
      .getByTestId('signin-submit')
      .or(page.getByRole('button', { name: /sign in/i }));
    await submitBtn.first().click({ force: true });

    // Should NOT be redirected to /dashboard
    await page.waitForTimeout(3_000); // allow any async response

    // Still on the sign-in page
    await expect(page).toHaveURL(/\/auth\/sign-in/);

    // An error/alert message should be visible (pattern covers common wording)
    const errorMsg = page
      .locator('[role="alert"]')
      .or(page.locator('text=/invalid|incorrect|failed|error/i').first());
    await expect(errorMsg.first()).toBeVisible({ timeout: 10_000 });
  });
});
