/**
 * tests/smoke.spec.ts – Quick Health Check
 *
 * Purpose: Verify the app is alive and the /auth/sign-in page loads
 *          correctly before any other tests run.
 *
 * This file intentionally has NO beforeEach / login – it is the fastest
 * possible sanity check (no Supabase call required).
 *
 * FR covered: baseline availability
 */

import { test, expect } from '@playwright/test';

test.describe('Smoke – App Health Check', () => {
  // ── Test 1: Sign-in page loads and key elements are present ───────────────
  test('Login page loads and all form elements are visible', async ({ page }) => {
    const response = await page.goto('/auth/sign-in');

    // Page should respond with 200 (not a 5xx server error)
    expect(response?.status()).toBeLessThan(500);

    // URL should settle on /auth/sign-in
    await expect(page).toHaveURL(/\/auth\/sign-in/, { timeout: 15_000 });

    // ── Heading ──────────────────────────────────────────────────────────────
    // sign-in/page.tsx: <h1 className="font-display text-2xl font-medium">Welcome back</h1>
    await expect(
      page.getByRole('heading', { name: /welcome back/i })
    ).toBeVisible({ timeout: 15_000 });

    // ── Email input ───────────────────────────────────────────────────────────
    // sign-in/page.tsx: data-testid="signin-email" type="email"
    const emailInput = page
      .getByTestId('signin-email')
      .or(page.locator('input[type="email"]'));
    await expect(emailInput.first()).toBeVisible({ timeout: 15_000 });

    // ── Password input ────────────────────────────────────────────────────────
    // sign-in/page.tsx: data-testid="signin-password" type="password"
    const passwordInput = page
      .getByTestId('signin-password')
      .or(page.locator('input[type="password"]'));
    await expect(passwordInput.first()).toBeVisible({ timeout: 15_000 });

    // ── Submit button ─────────────────────────────────────────────────────────
    // sign-in/page.tsx: data-testid="signin-submit" text "Sign in"
    const submitBtn = page
      .getByTestId('signin-submit')
      .or(page.getByRole('button', { name: /sign in/i }));
    await expect(submitBtn.first()).toBeVisible({ timeout: 15_000 });

    // ── Forgot password link ──────────────────────────────────────────────────
    // sign-in/page.tsx: <Link href="/auth/forgot-password">Forgot password?</Link>
    await expect(
      page.getByRole('link', { name: /forgot password/i })
    ).toBeVisible({ timeout: 15_000 });
  });
});
