import { test, expect } from '@playwright/test';
import { loginAsTestUser } from './helpers';

test.describe('Exercise', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestUser(page);
  });

  test('Test 1: /dashboard/exercise shows Standard and Low-impact filter pills', async ({ page }) => {
    await page.goto('/dashboard/exercise');
    await expect(page).toHaveURL(/\/dashboard\/exercise/);

    const heading = page.getByText(/exercise/i).or(page.locator('.font-display')).first();
    await expect(heading).toBeVisible({ timeout: 15_000 });

    const stdBtn = page.locator('button.pill').filter({ hasText: /standard/i })
      .or(page.locator('text=/standard/i'))
      .or(page.getByText(/standard/i)).first();
    const lowBtn = page.locator('button.pill').filter({ hasText: /low-impact/i })
      .or(page.locator('text=/low-impact/i'))
      .or(page.getByText(/low-impact/i)).first();

    await expect(stdBtn).toBeVisible({ timeout: 15_000 });
    await expect(lowBtn).toBeVisible({ timeout: 15_000 });
    await expect(stdBtn).toHaveClass(/selected/);
  });

  test('Test 2: Clicking "Low-impact" filter selects it', async ({ page }) => {
    await page.goto('/dashboard/exercise');
    const lowBtn = page.locator('button.pill').filter({ hasText: /low-impact/i })
      .or(page.locator('text=/low-impact/i'))
      .or(page.getByText(/low-impact/i)).first();
    await lowBtn.click();
    await expect(lowBtn).toHaveClass(/selected/);
  });

  test('Test 3: Clicking a workout card navigates to /dashboard/exercise/{slug}', async ({ page }) => {
    await page.goto('/dashboard/exercise');
    const firstWorkoutLink = page.getByText(/view workout/i).or(page.locator('a').filter({ hasText: /view workout/i })).first();
    await expect(firstWorkoutLink).toBeVisible({ timeout: 15_000 });
    await firstWorkoutLink.click();
    await expect(page).toHaveURL(/\/dashboard\/exercise\/.+/);
  });
});
