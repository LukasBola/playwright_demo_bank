import { test, expect } from "@playwright/test";

// constants
const BASE_URL = "https://demo-bank.vercel.app/";
const LOGIN = "lukaszbo";
const PASSWORD = "1345lsda";
const SHORT_LOGIN = "luksz";
const SHORT_PASSWORD = "134";
const EXPECTED_USER_NAME = "Jan Demobankowy";
const EXPECTED_LOGIN_ERROR = "identyfikator ma min. 8 znaków";
const EXPECTED_PASSWORD_ERROR = "hasło ma min. 8 znaków";

// locators
const LOGIN_INPUT_LOCATOR = "login-input";
const PASSWORD_INPUT_LOCATOR = "password-input";
const LOGIN_BUTTON_LOCATOR = "login-button";
const USER_NAME_LOCATOR = "user-name";
const LOGOUT_BUTTON_LOCATOR = "logout-button";
const ERROR_LOGIN_ID_LOCATOR = "error-login-id";
const ERROR_LOGIN_PASSWORD_LOCATOR = "error-login-password";

test.describe("Login Tests", () => {
  test("successful login with correct credentials", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByTestId(LOGIN_INPUT_LOCATOR).fill(LOGIN);
    await page.getByTestId(PASSWORD_INPUT_LOCATOR).fill(PASSWORD);
    await page.getByTestId(LOGIN_BUTTON_LOCATOR).click();

    await expect(page.getByTestId(USER_NAME_LOCATOR)).toBeVisible();
    await expect(page.getByTestId(USER_NAME_LOCATOR)).toHaveText(EXPECTED_USER_NAME);

    await page.getByTestId(USER_NAME_LOCATOR).click();
    await page.getByTestId(LOGOUT_BUTTON_LOCATOR).click();
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByTestId(LOGIN_INPUT_LOCATOR).fill(SHORT_LOGIN);
    await page.getByTestId(LOGIN_INPUT_LOCATOR).blur();
    await page.getByTestId(ERROR_LOGIN_ID_LOCATOR).isVisible();

    await expect(page.getByTestId(ERROR_LOGIN_ID_LOCATOR)).toHaveText(EXPECTED_LOGIN_ERROR);
  });

  test("unsuccessful login with too short password", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByTestId(LOGIN_INPUT_LOCATOR).fill(LOGIN);
    await page.getByTestId(PASSWORD_INPUT_LOCATOR).fill(SHORT_PASSWORD);
    await page.getByTestId(PASSWORD_INPUT_LOCATOR).blur();
    
    await expect(page.getByTestId(ERROR_LOGIN_PASSWORD_LOCATOR)).toHaveText(EXPECTED_PASSWORD_ERROR);
  });
});
