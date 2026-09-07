import { test, expect } from '@playwright/test';
import { loginAsTestUser } from './helpers';

test.describe('Progress', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestUser(page);
    await page.goto('/dashboard/progress');
    await expect(page).toHaveURL(/\/dashboard\/progress/);
  });

  test('Test 1: Progress page shows current and longest streaks', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /progress/i })
      .or(page.getByText(/progress/i))
      .or(page.locator('.font-display')).first();
    await expect(heading).toBeVisible({ timeout: 15_000 });

    const currentStreak = page.getByText(/current streak/i).or(page.locator('p', { hasText: /current streak/i })).first();
    await expect(currentStreak).toBeVisible({ timeout: 15_000 });

    const longestStreak = page.getByText(/longest streak/i).or(page.locator('p', { hasText: /longest streak/i })).first();
    await expect(longestStreak).toBeVisible({ timeout: 15_000 });
  });

  test('Test 2: Achievement badges section is visible', async ({ page }) => {
    const badgesHeading = page.getByRole('heading', { name: /achievement badges/i })
      .or(page.getByText(/achievement badges/i))
      .or(page.locator('h2', { hasText: /achievement badges/i })).first();
    await expect(badgesHeading).toBeVisible({ timeout: 15_000 });
  });

  test('Test 3: Export PDF button triggers toast', async ({ page }) => {
    const reportHeading = page.getByRole('heading', { name: /health report/i })
      .or(page.getByText(/health report/i))
      .or(page.locator('h2', { hasText: /health report/i })).first();
    await expect(reportHeading).toBeVisible({ timeout: 15_000 });
    
    const exportBtn = page.getByRole('button', { name: /export/i })
      .or(page.getByText(/export pdf/i)).first();
    await expect(exportBtn).toBeVisible({ timeout: 15_000 });
    
    await exportBtn.click();
    
    const toast = page.locator('text=/successfully/i').or(page.getByText(/successfully/i)).first();
    await expect(toast).toBeVisible({ timeout: 15_000 });
  });
});
