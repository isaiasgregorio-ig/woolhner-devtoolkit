import { expect, test } from '@playwright/test';

test.describe('Tool - Cloudflare cron helper', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cloudflare-cron-helper');
  });

  test('Has title', async ({ page }) => {
    await expect(page).toHaveTitle('Cloudflare cron helper - Woolhner DevToolkit');
  });

  test('Explains valid expressions and exports a triggers snippet', async ({ page }) => {
    await expect(page.getByTestId('cloudflare-cron-output')).toHaveValue(/crons = \[/);
    await expect(page.getByText('Every 5 minutes')).toBeVisible();
  });

  test('Rejects an invalid expression', async ({ page }) => {
    await page.getByTestId('cloudflare-cron-input').fill('not a cron expression');

    await expect(page.getByText('Invalid expression')).toBeVisible();
    await expect(page.getByTestId('cloudflare-cron-output')).toHaveCount(0);
  });
});
