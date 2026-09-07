import { test, expect } from '@playwright/test';
import { loginAsTestUser } from './helpers';

test.describe('Self-Exam Guides', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestUser(page);
    await page.goto('/dashboard/self-exam');
    await expect(page).toHaveURL(/\/dashboard\/self-exam/);
  });

  test('Test 1: Self-exam guides page shows heading and disclaimer', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /self-exam/i })
      .or(page.getByText(/self-exam guides/i))
      .or(page.locator('.font-display')).first();
    await expect(heading).toBeVisible({ timeout: 15_000 });
    
    // Check disclaimer text
    const disclaimer = page.getByText(/for awareness only/i).or(page.locator('div', { hasText: /for awareness only/i })).first();
    await expect(disclaimer).toBeVisible({ timeout: 15_000 });
  });

  test('Test 2: Guide cards are displayed with "Start guide" links', async ({ page }) => {
    const startGuideLinks = page.locator('text=/start guide/i').or(page.getByText(/start guide/i));
    await expect(startGuideLinks.first()).toBeVisible({ timeout: 15_000 });
    const count = await startGuideLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
