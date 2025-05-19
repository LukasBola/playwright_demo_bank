import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
  // locators
  const LOGIN_INPUT_LOCATOR = 'login-input';
  const PASSWORD_INPUT_LOCATOR = 'password-input';
  const LOGIN_BUTTON_LOCATOR = 'login-button';
  const USER_NAME_LOCATOR = 'user-name';
  const LOGOUT_BUTTON_LOCATOR = 'logout-button';
  const LOGIN = 'lukaszbo';

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const PASSWORD = '1345lsda';
    const EXPECTED_USER_NAME = 'Jan Demobankowy';
    // Act
    await page.getByTestId(LOGIN_INPUT_LOCATOR).fill(LOGIN);
    await page.getByTestId(PASSWORD_INPUT_LOCATOR).fill(PASSWORD);
    await page.getByTestId(LOGIN_BUTTON_LOCATOR).click();

    await expect(page.getByTestId(USER_NAME_LOCATOR)).toBeVisible();
    // Assert
    await expect(page.getByTestId(USER_NAME_LOCATOR)).toHaveText(
      EXPECTED_USER_NAME,
    );
    //After assert
    await page.getByTestId(USER_NAME_LOCATOR).click();
    await page.getByTestId(LOGOUT_BUTTON_LOCATOR).click();
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const SHORT_LOGIN = 'luksz';
    const EXPECTED_LOGIN_ERROR = 'identyfikator ma min. 8 znaków';
    const ERROR_LOGIN_ID_LOCATOR = 'error-login-id';
    // Act
    await page.getByTestId(LOGIN_INPUT_LOCATOR).fill(SHORT_LOGIN);
    await page.getByTestId(LOGIN_INPUT_LOCATOR).blur();
    await page.getByTestId(ERROR_LOGIN_ID_LOCATOR).isVisible();
    // Assert
    await expect(page.getByTestId(ERROR_LOGIN_ID_LOCATOR)).toHaveText(
      EXPECTED_LOGIN_ERROR,
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const SHORT_PASSWORD = '134';
    const ERROR_LOGIN_PASSWORD_LOCATOR = 'error-login-password';
    const EXPECTED_PASSWORD_ERROR = 'hasło ma min. 8 znaków';
    // Act
    await page.getByTestId(LOGIN_INPUT_LOCATOR).fill(LOGIN);
    await page.getByTestId(PASSWORD_INPUT_LOCATOR).fill(SHORT_PASSWORD);
    await page.getByTestId(PASSWORD_INPUT_LOCATOR).blur();

    // Assert
    await expect(page.getByTestId(ERROR_LOGIN_PASSWORD_LOCATOR)).toHaveText(
      EXPECTED_PASSWORD_ERROR,
    );
  });
});
