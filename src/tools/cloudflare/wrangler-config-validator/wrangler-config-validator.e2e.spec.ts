import { expect, test } from '@playwright/test';

test.describe('Tool - Wrangler config validator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/wrangler-config-validator');
  });

  test('Has title', async ({ page }) => {
    await expect(page).toHaveTitle('Wrangler config validator - Woolhner DevToolkit');
  });

  test('Reports a valid configuration', async ({ page }) => {
    await expect(page.getByText('Configuration is valid.')).toBeVisible();
  });

  test('Reports an invalid configuration', async ({ page }) => {
    await page.getByTestId('wrangler-validator-input').fill('name = "API"');

    await expect(page.getByText('Configuration is valid.')).toHaveCount(0);
    await expect(page.locator('.issues li')).not.toHaveCount(0);
  });
});
