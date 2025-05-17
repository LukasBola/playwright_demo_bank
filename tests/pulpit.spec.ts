import { test, expect } from "@playwright/test";

test.describe("Pulpit tests", () => {

    // test.describe.configure({ retries: 3 })

    test("quick payment data", async ({ page }) => {
        
        await page.goto("https://demo-bank.vercel.app/");
        await page.getByTestId("login-input").fill("lukaszbo");
        await page.getByTestId("password-input").fill("1345lsda");
        await page.getByTestId("login-button").click();

        await page.waitForLoadState("load");

        await page.locator('#widget_1_transfer_receiver').selectOption('2');
        await page.locator('#widget_1_transfer_amount').fill('150');
        await page.locator('#widget_1_transfer_title').fill('zwrot srodkow');
        await page.getByRole('button', { name: 'wykonaj' }).click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 150,00PLN - zwrot srodkow');
        
    });

        test("successful mobile top-up", async ({ page }) => {
        
        await page.goto("https://demo-bank.vercel.app/");
        await page.getByTestId("login-input").fill("lukaszbo");
        await page.getByTestId("password-input").fill("1345lsda");
        await page.getByTestId("login-button").click();

        await page.waitForLoadState("load");

        await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
        await page.locator('#widget_1_topup_amount').fill('150');
        await page.getByRole('button', { name: 'doładuj telefon' }).click();
        // await page.locator('#uniform-widget_1_topup_agreement span').click();
        await page.getByRole('checkbox', { name: ' zapoznałem się z regulaminem i akceptuję warunki' }).check();
        await page.getByRole('button',{ name: 'doładuj telefon' }).click();
        await page.getByTestId('close-button').click();
        

        await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 150,00PLN na numer 500 xxx xxx');
        
    });

});
