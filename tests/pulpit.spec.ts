import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
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
    await page.waitForLoadState('load');
  });

  test('quick payment data', async ({ page }) => {
    const RECEIVER_ID = '2';
    const TRANSFER_AMOUNT = '150';
    const TRANSFER_TITLE = 'zwrot srodkow';
    const expectedTransferMessage = `Przelew wykonany! Chuck Demobankowy - ${TRANSFER_AMOUNT},00PLN - zwrot srodkow`;

    // Act
    await pulpitPage.fillQuickPayment(
      RECEIVER_ID,
      TRANSFER_AMOUNT,
      TRANSFER_TITLE,
    );
    await pulpitPage.submitQuickPayment();
    await pulpitPage.closePopup();

    // Assert
    await pulpitPage.assertTransferMessage(expectedTransferMessage);
  });

  test('successful mobile top-up', async ({ page }) => {
    const TOP_UP_RECEIVER = '500 xxx xxx';
    const TOP_UP_AMOUNT = '150';
    const expectedTopUpMessage = `Doładowanie wykonane! ${TOP_UP_AMOUNT},00PLN na numer ${TOP_UP_RECEIVER}`;

    // Act
    await pulpitPage.fillMobileTopUp(TOP_UP_RECEIVER, TOP_UP_AMOUNT);
    await pulpitPage.submitMobileTopUp();
    await pulpitPage.acceptTopUpAgreement();
    await pulpitPage.submitMobileTopUp();
    await pulpitPage.closePopup();

    // Assert
    await pulpitPage.assertTopUpMessage(expectedTopUpMessage);
  });

  test('correct balance successful mobile top-up', async ({ page }) => {
    const TOP_UP_RECEIVER = '500 xxx xxx';
    const TOP_UP_AMOUNT = '150';
    const expectedTopUpMessage = `Doładowanie wykonane! ${TOP_UP_AMOUNT},00PLN na numer ${TOP_UP_RECEIVER}`;
    const initialBalance = await pulpitPage.getBalance();
    const expectedBalance = initialBalance - Number(TOP_UP_AMOUNT);

    // Act
    await pulpitPage.fillMobileTopUp(TOP_UP_RECEIVER, TOP_UP_AMOUNT);
    await pulpitPage.submitMobileTopUp();
    await pulpitPage.acceptTopUpAgreement();
    await pulpitPage.submitMobileTopUp();
    await pulpitPage.closePopup();

    // Assert
    await pulpitPage.assertTopUpMessage(expectedTopUpMessage);
    await pulpitPage.assertBalance(expectedBalance);
  });
});
