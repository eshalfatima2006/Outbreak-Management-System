# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: interactions.spec.ts >> Interactions & Accessibility >> Test 2: Profile notification toggles are interactive (aria-checked)
- Location: tests\interactions.spec.ts:33:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('switch').or(locator('button[aria-checked]')).or(locator('.toggle-track')).first()
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('switch').or(locator('button[aria-checked]')).or(locator('.toggle-track')).first()

```

```yaml
- complementary:
  - img
  - text: MedBuddy
  - navigation:
    - link "Dashboard":
      - /url: /dashboard
    - link "Self exam":
      - /url: /dashboard/self-exam
    - link "Warning signs":
      - /url: /dashboard/warning-signs
    - link "Diet":
      - /url: /dashboard/diet
    - link "Plan":
      - /url: /dashboard/diet
    - link "Foods":
      - /url: /dashboard/diet/foods
    - link "Meals":
      - /url: /dashboard/diet/meals
    - link "Grocery":
      - /url: /dashboard/diet/grocery
    - link "Exercise":
      - /url: /dashboard/exercise
    - link "Progress":
      - /url: /dashboard/progress
    - link "Screening":
      - /url: /dashboard/screening
    - link "Community":
      - /url: /dashboard/community
    - link "Notifications":
      - /url: /dashboard/notifications
    - link "Profile":
      - /url: /dashboard/profile
  - text: EF Eshal Fatima 18 to 39
  - button "Sign out"
- main:
  - button "Switch to dark mode":
    - img
  - img
  - img
  - text: 0 day streak
  - link "Notifications":
    - /url: /dashboard/notifications
  - text: EF
  - heading "Profile & settings" [level=1]
  - text: Full name
  - textbox: Eshal Fatima
  - text: Email
  - textbox [disabled]: hafizaeshal.fatima@gmail.com
  - text: Date of birth
  - textbox
  - text: Gender
  - combobox:
    - option "Female" [selected]
    - option "Male"
    - option "Prefer not to say"
  - text: Region
  - combobox:
    - option "USA"
    - option "South Asia" [selected]
    - option "European Union"
  - text: Language
  - combobox:
    - option "English" [selected]
    - option "Urdu (Phase 2)" [disabled]
  - button "Save changes"
  - heading "Notification preferences" [level=2]
  - text: Email reminders
  - button
  - text: Web notifications Get reminders as browser push, even when MedBuddy isn't open.
  - button
  - heading "Accessibility" [level=2]
  - text: Large text Scales up text and controls across the app.
  - button "Toggle large text"
  - text: High contrast Stronger text and border contrast throughout.
  - button "Toggle high contrast"
  - heading "Your data" [level=2]
  - paragraph: Download a copy of everything MedBuddy stores about you.
  - button "Export my data"
  - heading "Danger zone" [level=2]
  - paragraph: Deleting your account permanently removes your data within 30 days.
  - button "Delete account"
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { loginAsTestUser } from './helpers';
  3  | 
  4  | test.describe('Interactions & Accessibility', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await loginAsTestUser(page);
  7  |   });
  8  | 
  9  |   test('Test 1: Theme toggle changes background or soft-passes if absent', async ({ page }) => {
  10 |     await page.goto('/dashboard');
  11 |     
  12 |     const themeBtn = page.getByRole('button', { name: /theme|dark mode|light mode/i })
  13 |       .or(page.locator('button[aria-label*="theme" i]'))
  14 |       .or(page.locator('button[aria-label*="dark mode" i]'));
  15 | 
  16 |     const isVisible = await themeBtn.first().isVisible().catch(() => false);
  17 |     if (!isVisible) {
  18 |       console.log('Theme toggle not found. Soft passing per requirement.');
  19 |       test.skip();
  20 |       return;
  21 |     }
  22 | 
  23 |     const body = page.locator('body');
  24 |     const initialBg = await body.evaluate(el => window.getComputedStyle(el).backgroundColor);
  25 |     
  26 |     await themeBtn.first().click();
  27 |     await page.waitForTimeout(500);
  28 |     
  29 |     const newBg = await body.evaluate(el => window.getComputedStyle(el).backgroundColor);
  30 |     expect(newBg).not.toBe(initialBg);
  31 |   });
  32 | 
  33 |   test('Test 2: Profile notification toggles are interactive (aria-checked)', async ({ page }) => {
  34 |     await page.goto('/dashboard/profile');
  35 |     await page.waitForLoadState('networkidle');
  36 |     // Wait for loading spinner to disappear (Supabase data fetch)
  37 |     await page.waitForSelector('text=/loading/i', { state: 'hidden', timeout: 30_000 }).catch(() => {});
  38 | 
  39 |     // profile/page.tsx: toggles use role="switch" and aria-checked
  40 |     const firstToggle = page.getByRole('switch')
  41 |       .or(page.locator('button[aria-checked]'))
  42 |       .or(page.locator('.toggle-track')).first();
> 43 |     await expect(firstToggle).toBeVisible({ timeout: 20_000 });
     |                               ^ Error: expect(locator).toBeVisible() failed
  44 | 
  45 |     const initialChecked = await firstToggle.getAttribute('aria-checked');
  46 |     await firstToggle.click({ force: true });
  47 |     await page.waitForTimeout(300);
  48 | 
  49 |     const newChecked = await firstToggle.getAttribute('aria-checked');
  50 |     expect(newChecked).not.toBe(initialChecked);
  51 |   });
  52 | });
  53 | 
```