import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { PaymentPage } from '../pages/payment.page';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let loginPage: LoginPage;
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    pulpitPage = new PulpitPage(page);
    await loginPage.goto();
    await loginPage.login(loginData.username, loginData.password);
    await pulpitPage.sideMenu.goToPayments();
  });

  test('should send transfer and show confirmation message @payment @integration', async ({
    page,
  }) => {
    // Arrange
    const recipientName = 'Jan Nowak';
    const accountNumber = '12 3456 7890 1345 6789 0242 54354';
    const transferAmount = '222';
    const expectedTransferMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${recipientName}`;
    const paymentPage = new PaymentPage(page);

    // Act
    await paymentPage.fillTransferForm(
      recipientName,
      accountNumber,
      transferAmount,
    );
    await paymentPage.submitTransfer();
    await paymentPage.closeConfirmation();

    // Assert
    await paymentPage.assertTransferMessage(expectedTransferMessage);
  });
});
