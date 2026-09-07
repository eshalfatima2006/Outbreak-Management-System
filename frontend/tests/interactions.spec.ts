import { test, expect } from '@playwright/test';
import { loginAsTestUser } from './helpers';

test.describe('Interactions & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestUser(page);
  });

  test('Test 1: Theme toggle changes background or soft-passes if absent', async ({ page }) => {
    await page.goto('/dashboard');
    
    const themeBtn = page.getByRole('button', { name: /theme|dark mode|light mode/i })
      .or(page.locator('button[aria-label*="theme" i]'))
      .or(page.locator('button[aria-label*="dark mode" i]'));

    const isVisible = await themeBtn.first().isVisible().catch(() => false);
    if (!isVisible) {
      console.log('Theme toggle not found. Soft passing per requirement.');
      test.skip();
      return;
    }

    const body = page.locator('body');
    const initialBg = await body.evaluate(el => window.getComputedStyle(el).backgroundColor);
    
    await themeBtn.first().click();
    await page.waitForTimeout(500);
    
    const newBg = await body.evaluate(el => window.getComputedStyle(el).backgroundColor);
    expect(newBg).not.toBe(initialBg);
  });

  test('Test 2: Profile notification toggles are interactive (aria-checked)', async ({ page }) => {
    await page.goto('/dashboard/profile');
    
    const notificationSection = page.locator('div.rounded-\\[20px\\]', { hasText: 'Email reminders' }).first();
    const firstToggle = notificationSection.locator('button.relative').or(notificationSection.locator('[role="button"]')).or(notificationSection.getByRole('switch')).first();
    await expect(firstToggle).toBeVisible({ timeout: 15_000 });
    
    const initialChecked = await firstToggle.getAttribute('aria-checked');
    await firstToggle.click();
    await page.waitForTimeout(300);
    
    const newChecked = await firstToggle.getAttribute('aria-checked');
    expect(newChecked).not.toBe(initialChecked);
  });
});
