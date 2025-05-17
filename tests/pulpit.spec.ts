import { test, expect } from '@playwright/test';

//Arrange
// constants
const BASE_URL = 'https://demo-bank.vercel.app/';
const LOGIN = 'lukaszbo';
const PASSWORD = '1345lsda';
const TRANSFER_AMOUNT = '150';
const TRANSFER_TITLE = 'zwrot srodkow';
const TOPUP_RECEIVER = '500 xxx xxx';
const TOPUP_AMOUNT = '150';

// locators
const LOGIN_INPUT_LOCATOR = 'login-input';
const PASSWORD_INPUT_LOCATOR = 'password-input';
const LOGIN_BUTTON_LOCATOR = 'login-button';
const TRANSFER_RECEIVER_LOCATOR = '#widget_1_transfer_receiver';
const TRANSFER_AMOUNT_LOCATOR = '#widget_1_transfer_amount';
const TRANSFER_TITLE_LOCATOR = '#widget_1_transfer_title';
const CLOSE_BUTTON_LOCATOR = 'close-button';
const SHOW_MESSAGES_LOCATOR = '#show_messages';
const TOPUP_RECEIVER_LOCATOR = '#widget_1_topup_receiver';
const TOPUP_AMOUNT_LOCATOR = '#widget_1_topup_amount';

const expectedTransferMessage = `Przelew wykonany! Chuck Demobankowy - ${TRANSFER_AMOUNT},00PLN - zwrot srodkow`;
const expectedTopupMessage = `Doładowanie wykonane! ${TOPUP_AMOUNT},00PLN na numer 500 xxx xxx`;

test.describe('Pulpit tests', () => {
  // test.describe.configure({ retries: 3 })

  test('quick payment data', async ({ page }) => {
    // Act
    await page.goto(BASE_URL);
    await page.getByTestId(LOGIN_INPUT_LOCATOR).fill(LOGIN);
    await page.getByTestId(PASSWORD_INPUT_LOCATOR).fill(PASSWORD);
    await page.getByTestId(LOGIN_BUTTON_LOCATOR).click();
    await page.waitForLoadState('load');
    await page.locator(TRANSFER_RECEIVER_LOCATOR).selectOption('2');
    await page.locator(TRANSFER_AMOUNT_LOCATOR).fill(TRANSFER_AMOUNT);
    await page.locator(TRANSFER_TITLE_LOCATOR).fill(TRANSFER_TITLE);
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId(CLOSE_BUTTON_LOCATOR).click();

    // Assert
    await expect(page.locator(SHOW_MESSAGES_LOCATOR)).toHaveText(
      expectedTransferMessage,
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    // Act
    await page.goto(BASE_URL);
    await page.getByTestId(LOGIN_INPUT_LOCATOR).fill(LOGIN);
    await page.getByTestId(PASSWORD_INPUT_LOCATOR).fill(PASSWORD);
    await page.getByTestId(LOGIN_BUTTON_LOCATOR).click();
    await page.waitForLoadState('load');
    await page.locator(TOPUP_RECEIVER_LOCATOR).selectOption(TOPUP_RECEIVER);
    await page.locator(TOPUP_AMOUNT_LOCATOR).fill(TOPUP_AMOUNT);
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page
      .getByRole('checkbox', {
        name: ' zapoznałem się z regulaminem i akceptuję warunki',
      })
      .check();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId(CLOSE_BUTTON_LOCATOR).click();

    // Assert
    await expect(page.locator(SHOW_MESSAGES_LOCATOR)).toHaveText(
      expectedTopupMessage,
    );
  });
});
