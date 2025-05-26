import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly loginInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly userName: Locator;
  private readonly logoutButton: Locator;
  private readonly errorLoginId: Locator;
  private readonly errorLoginPassword: Locator;

  static readonly DEFAULT_LOGIN_ERROR = 'identyfikator ma min. 8 znaków';
  static readonly DEFAULT_PASSWORD_ERROR = 'hasło ma min. 8 znaków';

  constructor(page: Page) {
    this.page = page;
    this.loginInput = page.getByTestId('login-input');
    this.passwordInput = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-button');
    this.userName = page.getByTestId('user-name');
    this.logoutButton = page.getByTestId('logout-button');
    this.errorLoginId = page.getByTestId('error-login-id');
    this.errorLoginPassword = page.getByTestId('error-login-password');
  }

  get loginInputField(): Locator {
    return this.loginInput;
  }
  get passwordInputField(): Locator {
    return this.passwordInput;
  }
  get loginButtonField(): Locator {
    return this.loginButton;
  }
  get userNameField(): Locator {
    return this.userName;
  }
  get logoutButtonField(): Locator {
    return this.logoutButton;
  }
  get errorLoginIdField(): Locator {
    return this.errorLoginId;
  }
  get errorLoginPasswordField(): Locator {
    return this.errorLoginPassword;
  }

  async goto(url: string = '/'): Promise<void> {
    await this.page.goto(url);
  }

  async fillLoginForm(username: string, password: string): Promise<void> {
    await this.loginInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submitLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillLoginForm(username, password);
    await this.submitLogin();
    await this.page.waitForLoadState('load');
  }

  async logout(): Promise<void> {
    await this.userName.click();
    await this.logoutButton.click();
    await this.logoutButton.isHidden();
  }

  async assertUserLoggedIn(expectedName: string): Promise<void> {
    await expect(this.userName).toBeVisible();
    await expect(this.userName).toHaveText(expectedName);
  }

  async assertLoginIdError(
    expectedError: string = LoginPage.DEFAULT_LOGIN_ERROR,
  ): Promise<void> {
    await expect(this.errorLoginId).toBeVisible();
    await expect(this.errorLoginId).toHaveText(expectedError);
  }

  async assertLoginPasswordError(
    expectedError: string = LoginPage.DEFAULT_PASSWORD_ERROR,
  ): Promise<void> {
    await expect(this.errorLoginPassword).toBeVisible();
    await expect(this.errorLoginPassword).toHaveText(expectedError);
  }
}
