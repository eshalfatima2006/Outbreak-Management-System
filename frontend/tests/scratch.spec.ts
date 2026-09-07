import { test } from '@playwright/test';
import { loginAsTestUser } from './helpers';

test('debug diet', async ({ page }) => {
  await loginAsTestUser(page);
  await page.goto('/dashboard/diet');
  await page.waitForTimeout(2000);
  const text = await page.locator('body').textContent();
  console.log('Body text:', text?.substring(0, 500));
  const html = await page.content();
  console.log('Body html length:', html.length);
  const addMealsBtns = await page.locator('button').allTextContents();
  console.log('All buttons texts:', addMealsBtns.filter(t => t.toLowerCase().includes('meal')));
});
