import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('Pulpit tests', () => {
  // test.describe.configure({ retries: 3 })

  test.beforeEach(async ({ page }) => {
    const LOGIN = loginData.username;
    const PASSWORD = loginData.password;
    const LOGIN_INPUT_LOCATOR = 'login-input';
    const PASSWORD_INPUT_LOCATOR = 'password-input';
    const LOGIN_BUTTON_LOCATOR = 'login-button';

    await page.goto('/');
    await page.getByTestId(LOGIN_INPUT_LOCATOR).fill(LOGIN);
    await page.getByTestId(PASSWORD_INPUT_LOCATOR).fill(PASSWORD);
    await page.getByTestId(LOGIN_BUTTON_LOCATOR).click();
    await page.waitForLoadState('load');
    await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('should send transfer and show confirmation message', async ({
    page,
  }) => {
    // Arrange
    const recipientName = 'Jan Nowak';
    const accountNumber = '12 3456 7890 1345 6789 0242 54354';
    const transferAmount = '222';
    const closeButtonLocator = 'close-button';
    const transferAmountInputLocator = 'form_amount';
    const accountTransferInputLocator = 'form_account_to';
    const transferRecipientLocator = 'transfer_receiver';
    const expectedTransferMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${recipientName}`;
    const SHOW_MESSAGES_LOCATOR = '#show_messages';
    const CLOSE_BUTTON_LOCATOR = 'close-button';

    // Act
    await page.getByTestId(transferRecipientLocator).fill(recipientName);
    await page.getByTestId(accountTransferInputLocator).fill(accountNumber);
    await page.getByTestId(transferAmountInputLocator).fill(transferAmount);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId(closeButtonLocator).click();

    // Assert
    await expect(page.locator(SHOW_MESSAGES_LOCATOR)).toHaveText(
      expectedTransferMessage,
    );
  });
});
