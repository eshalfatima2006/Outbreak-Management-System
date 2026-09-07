import { test, expect } from '@playwright/test';
import { loginAsTestUser } from './helpers';

test.describe('Diet & Nutrition', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestUser(page);
  });

  test('Test 1: /dashboard/diet shows sub-nav tabs and day pills', async ({ page }) => {
    await page.goto('/dashboard/diet');
    await expect(page).toHaveURL(/\/dashboard\/diet/);

    const heading = page.getByRole('heading', { name: /diet plan/i })
      .or(page.getByText(/diet plan/i))
      .or(page.locator('.font-display')).first();
    await expect(heading).toBeVisible({ timeout: 15_000 });

    const tabs = ['plan', 'foods', 'meals', 'grocery'];
    for (const tab of tabs) {
      const tabLink = page.locator(`text=/${tab}/i`).or(page.getByText(new RegExp(tab, 'i'))).first();
      await expect(tabLink).toBeVisible({ timeout: 15_000 });
    }

    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    for (const day of days) {
      const dayPill = page.locator('button.pill').filter({ hasText: new RegExp(day, 'i') })
        .or(page.locator(`text=/${day}/i`))
        .or(page.getByText(new RegExp(day, 'i'))).first();
      await expect(dayPill).toBeVisible({ timeout: 15_000 });
    }

    const tueBtn = page.locator('button.pill').filter({ hasText: /tue/i })
      .or(page.locator('text=/tue/i'))
      .or(page.getByText(/tue/i)).first();
    await tueBtn.click();
    await expect(tueBtn).toHaveClass(/selected/);
  });

  test('Test 2: Foods tab navigates to food library', async ({ page }) => {
    await page.goto('/dashboard/diet');
    const foodsTab = page.locator('text=/foods/i').or(page.getByText(/foods/i)).first();
    await foodsTab.click();
    await expect(page).toHaveURL(/\/dashboard\/diet\/foods/);
  });

  test('Test 3: Meals page shows date picker and Add meal buttons', async ({ page }) => {
    await page.goto('/dashboard/diet/meals');
    await expect(page).toHaveURL(/\/dashboard\/diet\/meals/);

    const datePicker = page.locator('input[type="date"]').or(page.locator('input')).first();
    await expect(datePicker).toBeVisible({ timeout: 15_000 });

    const addMealBtns = page.getByRole('button', { name: /add meal/i }).or(page.locator('text=/add meal/i')).or(page.getByText(/add meal/i));
    await expect(addMealBtns.first()).toBeVisible({ timeout: 15_000 });
    const count = await addMealBtns.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('Test 4: Grocery tab navigates to grocery list', async ({ page }) => {
    await page.goto('/dashboard/diet');
    const groceryTab = page.locator('text=/grocery/i').or(page.getByText(/grocery/i)).first();
    await groceryTab.click();
    await expect(page).toHaveURL(/\/dashboard\/diet\/grocery/);
  });
});
