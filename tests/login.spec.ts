import { test, expect } from "@playwright/test";

test.describe("Login Tests", () => {

  test("successful login with correct credentials", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("lukaszbo");
    await page.getByTestId("password-input").fill("1345lsda");
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("user-name")).toBeVisible();
    await expect(page.getByTestId("user-name")).toHaveText("Jan Demobankowy");

    await page.getByTestId("user-name").click();
    await page.getByTestId("logout-button").click();
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("luksz");
    await page.getByTestId("login-input").blur();
    await page.getByTestId("error-login-id").isVisible();

    await expect(page.getByTestId("error-login-id")).toHaveText(
      "identyfikator ma min. 8 znaków"
    );
  });

  test("unsuccessful login with too short password", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("lukaszbo");
    await page.getByTestId("password-input").fill("134");
    await page.getByTestId("password-input").blur();
    
    await expect(page.getByTestId("error-login-password")).toHaveText("hasło ma min. 8 znaków");
  });
});
