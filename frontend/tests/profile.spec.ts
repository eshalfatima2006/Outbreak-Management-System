import { test, expect } from '@playwright/test';
import { loginAsTestUser } from './helpers';

test.describe('Profile', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestUser(page);
    await page.goto('/dashboard/profile');
    await expect(page).toHaveURL(/\/dashboard\/profile/);
  });

  test('Test 1: Profile page shows expected headings', async ({ page }) => {
    // Wait for page to fully load, maybe spinner
    await page.waitForTimeout(1000);
    const personalInfo = page.getByRole('heading', { name: /personal information/i })
      .or(page.getByText(/personal information/i))
      .or(page.locator('text=/personal information/i'))
      .or(page.locator('h2').filter({ hasText: /personal/i })).first();
    await expect(personalInfo).toBeVisible({ timeout: 15_000 });
    
    const notificationPrefs = page.getByRole('heading', { name: /notification preferences/i })
      .or(page.getByText(/notification preferences/i))
      .or(page.locator('text=/notification preferences/i'))
      .or(page.locator('h2').filter({ hasText: /notification/i })).first();
    await expect(notificationPrefs).toBeVisible({ timeout: 15_000 });
    
    const dangerZone = page.getByRole('heading', { name: /danger zone/i })
      .or(page.getByText(/danger zone/i))
      .or(page.locator('text=/danger zone/i'))
      .or(page.locator('h2').filter({ hasText: /danger/i })).first();
    await expect(dangerZone).toBeVisible({ timeout: 15_000 });
  });

  test('Test 2: Notification toggles are present and can be clicked', async ({ page }) => {
    const notificationSection = page.locator('div.rounded-\\[20px\\]').filter({ hasText: /email reminders/i })
      .or(page.locator('div').filter({ hasText: /email reminders/i })).first();
    const switches = notificationSection.locator('button.relative').or(notificationSection.locator('[role="button"]')).or(notificationSection.getByRole('switch'));
    await expect(switches.first()).toBeVisible({ timeout: 15_000 });
    const count = await switches.count();
    expect(count).toBeGreaterThanOrEqual(1); // At least 1 found

    const firstSwitch = switches.first();
    const initialChecked = await firstSwitch.getAttribute('aria-checked');
    await firstSwitch.click();
    await expect(firstSwitch).toHaveAttribute('aria-checked', initialChecked === 'true' ? 'false' : 'true');
  });

  test('Test 3: Save button shows saved state on click', async ({ page }) => {
    const saveBtn = page.getByRole('button', { name: /save/i })
      .or(page.getByText(/save changes/i)).first();
    await expect(saveBtn).toBeVisible({ timeout: 15_000 });
    
    await saveBtn.click();
    
    const savedMsg = page.getByText(/saved/i)
      .or(page.locator('text=/saved/i'))
      .or(page.locator('span').filter({ hasText: /saved/i })).first();
    await expect(savedMsg).toBeVisible({ timeout: 15_000 });
  });
});
