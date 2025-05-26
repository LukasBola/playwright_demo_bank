import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { loginData } from '../test-data/login.data';

test.describe('Login Tests (Page Object Model)', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('successful login with correct credentials @login @smoke', async () => {
    // Arrange
    const PASSWORD = loginData.password;
    const EXPECTED_USER_NAME = 'Jan Demobankowy';
    // Act
    await loginPage.login(loginData.username, PASSWORD);
    // Assert
    await loginPage.assertUserLoggedIn(EXPECTED_USER_NAME);
    //After assert
    await loginPage.logout();
  });

  test('unsuccessful login with too short username @login', async () => {
    // Arrange
    const TOO_SHORT_LOGIN = 'luksz';
    // Act
    await loginPage.fillLoginForm(TOO_SHORT_LOGIN, loginData.password);
    await loginPage.loginInputField.blur();
    // Assert
    await loginPage.assertLoginIdError();
  });

  test('unsuccessful login with too short password @login', async () => {
    // Arrange
    const TOO_SHORT_PASSWORD = '134';
    // Act
    await loginPage.fillLoginForm(loginData.username, TOO_SHORT_PASSWORD);
    await loginPage.passwordInputField.blur();
    // Assert
    await loginPage.assertLoginPasswordError();
  });
});
