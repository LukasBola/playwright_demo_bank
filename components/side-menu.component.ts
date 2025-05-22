import { Page, Locator } from '@playwright/test';

export class SideMenuComponent {
  private readonly page: Page;
  private readonly dashboardLink: Locator;
  private readonly quickTransferLink: Locator;
  private readonly mobileTopUpLink: Locator;
  private readonly financeManagerLink: Locator;
  private readonly personalAccountsLink: Locator;
  private readonly paymentsLink: Locator;
  private readonly reportsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardLink = page.getByRole('link', { name: 'mój pulpit' });
    this.quickTransferLink = page.getByRole('link', { name: 'szybki przelew' });
    this.mobileTopUpLink = page.getByRole('link', {
      name: 'doładowanie telefonu',
    });
    this.financeManagerLink = page.getByRole('link', {
      name: 'manager finansowy',
    });
    this.personalAccountsLink = page.getByRole('link', {
      name: 'konta osobiste',
    });
    this.paymentsLink = page.getByRole('link', { name: 'płatności' });
    this.reportsLink = page.getByRole('link', { name: 'raporty', exact: true });
  }

  get dashboardLinkField() {
    return this.dashboardLink;
  }
  get quickTransferLinkField() {
    return this.quickTransferLink;
  }
  get mobileTopUpLinkField() {
    return this.mobileTopUpLink;
  }
  get financeManagerLinkField() {
    return this.financeManagerLink;
  }
  get personalAccountsLinkField() {
    return this.personalAccountsLink;
  }
  get paymentsLinkField() {
    return this.paymentsLink;
  }
  get reportsLinkField() {
    return this.reportsLink;
  }

  async goToDashboard() {
    await this.dashboardLink.click();
    await this.page.waitForLoadState('load');
  }
  async goToQuickTransfer() {
    await this.quickTransferLink.click();
    await this.page.waitForLoadState('load');
  }
  async goToMobileTopUp() {
    await this.mobileTopUpLink.click();
    await this.page.waitForLoadState('load');
  }
  async goToFinanceManager() {
    await this.financeManagerLink.click();
    await this.page.waitForLoadState('load');
  }
  async goToPersonalAccounts() {
    await this.personalAccountsLink.click();
    await this.page.waitForLoadState('load');
  }
  async goToPayments() {
    await this.paymentsLink.click();
    await this.page.waitForLoadState('load');
  }
  async goToReports() {
    await this.reportsLink.click();
    await this.page.waitForLoadState('load');
  }
}
