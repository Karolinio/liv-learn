import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => { if (!sessionStorage.getItem('kl-e2e')) { sessionStorage.setItem('kl-e2e', '1'); indexedDB.deleteDatabase('liv-learn'); } });
});

test('Heute lädt statisch, Track-Segment wechselt', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1, name: 'Heute' })).toBeVisible();
  await expect(page.getByTestId('start')).toContainText('Karten starten');
  await page.getByRole('radio', { name: 'Praktikum' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-track', 'praktikum');
});

test('Session per Tastatur: drehen, wissen, Lernstand übersteht Neuladen', async ({ page }) => {
  await page.goto('./');
  await page.getByTestId('start').click();
  const karte = page.getByTestId('lernkarte');
  await expect(karte).toBeVisible();
  await page.keyboard.press(' ');
  await expect(karte).toHaveAttribute('aria-pressed', 'true');
  for (let i = 0; i < 12; i++) {
    if (await page.getByRole('heading', { level: 1 }).filter({ hasText: /gewusst|gemacht|drangeblieben/ }).count()) break;
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(450);
  }
  await expect(page.getByText(/von \d+ gewusst/).first()).toBeVisible();
  await page.reload();
  await page.goto('./#/');
  await expect(page.getByText(/[1-9]\d* zum Wiederholen/)).toBeVisible();
});

test('Lernpfad, Thema und Lexikon-Suche', async ({ page }) => {
  await page.goto('./#/roadmap/begriffe');
  await page.getByRole('button', { name: /^Blattaufbau:/ }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Blattaufbau' })).toBeVisible();
  await page.goto('./#/lexikon');
  await page.getByRole('searchbox').fill('palisaden');
  await expect(page.getByRole('status').filter({ hasText: 'Treffer' })).not.toHaveText('0 Treffer');
});
