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

  get dashboardLinkField(): Locator {
    return this.dashboardLink;
  }
  get quickTransferLinkField(): Locator {
    return this.quickTransferLink;
  }
  get mobileTopUpLinkField(): Locator {
    return this.mobileTopUpLink;
  }
  get financeManagerLinkField(): Locator {
    return this.financeManagerLink;
  }
  get personalAccountsLinkField(): Locator {
    return this.personalAccountsLink;
  }
  get paymentsLinkField(): Locator {
    return this.paymentsLink;
  }
  get reportsLinkField(): Locator {
    return this.reportsLink;
  }

  async goToDashboard(): Promise<void> {
    await this.dashboardLink.click();
    await this.page.waitForLoadState('load');
  }
  async goToQuickTransfer(): Promise<void> {
    await this.quickTransferLink.click();
    await this.page.waitForLoadState('load');
  }
  async goToMobileTopUp(): Promise<void> {
    await this.mobileTopUpLink.click();
    await this.page.waitForLoadState('load');
  }
  async goToFinanceManager(): Promise<void> {
    await this.financeManagerLink.click();
    await this.page.waitForLoadState('load');
  }
  async goToPersonalAccounts(): Promise<void> {
    await this.personalAccountsLink.click();
    await this.page.waitForLoadState('load');
  }
  async goToPayments(): Promise<void> {
    await this.paymentsLink.click();
    await this.page.waitForLoadState('load');
  }
  async goToReports(): Promise<void> {
    await this.reportsLink.click();
    await this.page.waitForLoadState('load');
  }
}
