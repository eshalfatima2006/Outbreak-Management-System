# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: profile.spec.ts >> Profile >> Test 1: Profile page shows expected headings
- Location: tests\profile.spec.ts:16:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('h2').filter({ hasText: /personal information/i }).or(getByText(/personal information/i)).or(locator('h1, h2, h3').filter({ hasText: /personal/i })).first()
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for locator('h2').filter({ hasText: /personal information/i }).or(getByText(/personal information/i)).or(locator('h1, h2, h3').filter({ hasText: /personal/i })).first()

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
  4  | test.describe('Profile', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await loginAsTestUser(page);
  7  |     await page.goto('/dashboard/profile');
  8  |     await page.waitForLoadState('networkidle');
  9  |     // Wait for any "Loading..." spinner to disappear (Supabase data fetch)
  10 |     await page.waitForSelector('text=/loading/i', { state: 'hidden', timeout: 30_000 }).catch(() => {
  11 |       // If loading text never appeared, that's fine too
  12 |     });
  13 |     await expect(page).toHaveURL(/\/dashboard\/profile/);
  14 |   });
  15 | 
  16 |   test('Test 1: Profile page shows expected headings', async ({ page }) => {
  17 |     // profile/page.tsx: h2 headings: Personal information, Notification preferences, Danger zone
  18 |     const personalInfo = page.locator('h2').filter({ hasText: /personal information/i })
  19 |       .or(page.getByText(/personal information/i))
  20 |       .or(page.locator('h1, h2, h3').filter({ hasText: /personal/i })).first();
> 21 |     await expect(personalInfo).toBeVisible({ timeout: 20_000 });
     |                                ^ Error: expect(locator).toBeVisible() failed
  22 | 
  23 |     const notificationPrefs = page.locator('h2').filter({ hasText: /notification preferences/i })
  24 |       .or(page.getByText(/notification preferences/i))
  25 |       .or(page.locator('h1, h2, h3').filter({ hasText: /notification/i })).first();
  26 |     await expect(notificationPrefs).toBeVisible({ timeout: 20_000 });
  27 | 
  28 |     const dangerZone = page.locator('h2').filter({ hasText: /danger zone/i })
  29 |       .or(page.getByText(/danger zone/i))
  30 |       .or(page.locator('h1, h2, h3').filter({ hasText: /danger/i })).first();
  31 |     await expect(dangerZone).toBeVisible({ timeout: 20_000 });
  32 |   });
  33 | 
  34 |   test('Test 2: Notification toggles are present and can be clicked', async ({ page }) => {
  35 |     // profile/page.tsx: <button role="switch" aria-checked={checked} ...>
  36 |     // Three toggles: Email reminders, In-app notifications, Screening reminders
  37 |     const switches = page.getByRole('switch')
  38 |       .or(page.locator('button[aria-checked]'))
  39 |       .or(page.locator('.toggle-track'));
  40 |     await expect(switches.first()).toBeVisible({ timeout: 20_000 });
  41 |     const count = await switches.count();
  42 |     expect(count).toBeGreaterThanOrEqual(1);
  43 | 
  44 |     const firstSwitch = switches.first();
  45 |     const initialChecked = await firstSwitch.getAttribute('aria-checked');
  46 |     await firstSwitch.click({ force: true });
  47 |     // Wait for aria-checked to change
  48 |     await page.waitForTimeout(300);
  49 |     const newChecked = await firstSwitch.getAttribute('aria-checked');
  50 |     // aria-checked should have changed
  51 |     expect(newChecked).not.toBeNull();
  52 |   });
  53 | 
  54 |   test('Test 3: Save button shows saved state on click', async ({ page }) => {
  55 |     // profile/page.tsx: button text is "Save changes" then "Saved!" after click
  56 |     // Also shows <span>Profile updated successfully.</span>
  57 |     const saveBtn = page.locator('button').filter({ hasText: /save changes|save/i })
  58 |       .or(page.getByRole('button', { name: /save/i })).first();
  59 |     await expect(saveBtn).toBeVisible({ timeout: 20_000 });
  60 | 
  61 |     await saveBtn.click({ force: true });
  62 | 
  63 |     // After click: button text -> "Saved!" OR span "Profile updated successfully."
  64 |     const savedIndicator = page.locator('button').filter({ hasText: /saved!/i })
  65 |       .or(page.getByText(/saved!|profile updated|successfully/i))
  66 |       .or(page.locator('span').filter({ hasText: /updated|saved/i })).first();
  67 |     await expect(savedIndicator).toBeVisible({ timeout: 10_000 });
  68 |   });
  69 | });
  70 | 
```