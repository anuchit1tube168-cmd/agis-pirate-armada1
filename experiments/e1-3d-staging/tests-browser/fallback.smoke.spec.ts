import { expect, test } from '@playwright/test';

test('WebGL initialization failure keeps the configurator usable', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type: string, ...args: unknown[]) {
      if (type === 'webgl' || type === 'webgl2' || type === 'experimental-webgl') return null;
      return original.call(this, type as never, ...args as never);
    } as typeof HTMLCanvasElement.prototype.getContext;
  });
  await page.goto('/');
  await expect(page.locator('#viewport')).toContainText('3D preview unavailable');
  await expect(page.locator('#status')).toHaveText('3D fallback active');
  await page.getByRole('button', { name: /sphere/i }).click();
  await expect(page.locator('#status')).toContainText('sphere');
});

test('prefers-reduced-motion is surfaced in UI state', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('#status')).toHaveAttribute('data-motion', 'reduced');
});
