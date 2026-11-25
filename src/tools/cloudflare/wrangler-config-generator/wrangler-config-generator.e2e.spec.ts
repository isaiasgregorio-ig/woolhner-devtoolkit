import { expect, test } from '@playwright/test';

test.describe('Tool - Wrangler config generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/wrangler-config-generator');
  });

  test('Has title', async ({ page }) => {
    await expect(page).toHaveTitle('Wrangler config generator - Woolhner DevToolkit');
  });

  test('Generates a wrangler.toml from the form', async ({ page }) => {
    const output = page.getByTestId('wrangler-output');

    await expect(output).toHaveValue(/name = "woolhner-worker"/);
    await page.getByTestId('wrangler-name').fill('my-worker');
    await expect(output).toHaveValue(/name = "my-worker"/);
    await expect(output).toHaveValue(/compatibility_date = "2026-01-01"/);
  });

  test('Hides the output when validation fails', async ({ page }) => {
    await page.getByTestId('wrangler-name').fill('Invalid Name');

    await expect(page.getByTestId('wrangler-output')).toHaveCount(0);
  });
});
