import { Page, Locator, expect } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
  private readonly page: Page;
  private readonly transferReceiver: Locator;
  private readonly transferAmount: Locator;
  private readonly transferTitle: Locator;
  private readonly executeTransferButton: Locator;
  private readonly closeButton: Locator;
  private readonly showMessages: Locator;
  private readonly topUpReceiver: Locator;
  private readonly topUpAmount: Locator;
  private readonly topUpButton: Locator;
  private readonly topUpCheckbox: Locator;
  private readonly moneyValue: Locator;
  private readonly paymentsLink: Locator;
  readonly sideMenu: SideMenuComponent;

  constructor(page: Page) {
    this.page = page;
    this.transferReceiver = page.locator('#widget_1_transfer_receiver');
    this.transferAmount = page.locator('#widget_1_transfer_amount');
    this.transferTitle = page.locator('#widget_1_transfer_title');
    this.executeTransferButton = page.getByRole('button', { name: 'wykonaj' });
    this.closeButton = page.getByTestId('close-button');
    this.showMessages = page.locator('#show_messages');
    this.topUpReceiver = page.locator('#widget_1_topup_receiver');
    this.topUpAmount = page.locator('#widget_1_topup_amount');
    this.topUpButton = page.getByRole('button', { name: 'doładuj telefon' });
    this.topUpCheckbox = page.getByRole('checkbox', {
      name: ' zapoznałem się z regulaminem i akceptuję warunki',
    });
    this.moneyValue = page.locator('#money_value');
    this.paymentsLink = page.getByRole('link', { name: 'płatności' });
    this.sideMenu = new SideMenuComponent(page);
  }

  get transferReceiverField() {
    return this.transferReceiver;
  }
  get transferAmountField() {
    return this.transferAmount;
  }
  get transferTitleField() {
    return this.transferTitle;
  }
  get executeTransferButtonField() {
    return this.executeTransferButton;
  }
  get closeButtonField() {
    return this.closeButton;
  }
  get showMessagesField() {
    return this.showMessages;
  }
  get topUpReceiverField() {
    return this.topUpReceiver;
  }
  get topUpAmountField() {
    return this.topUpAmount;
  }
  get topUpButtonField() {
    return this.topUpButton;
  }
  get topUpCheckboxField() {
    return this.topUpCheckbox;
  }
  get moneyValueField() {
    return this.moneyValue;
  }
  get paymentsLinkField() {
    return this.paymentsLink;
  }

  async fillQuickPayment(receiverId: string, amount: string, title: string) {
    await this.transferReceiver.selectOption(receiverId);
    await this.transferAmount.fill(amount);
    await this.transferTitle.fill(title);
  }

  async submitQuickPayment() {
    await this.executeTransferButton.click();
  }

  async fillMobileTopUp(receiver: string, amount: string) {
    await this.topUpReceiver.selectOption(receiver);
    await this.topUpAmount.fill(amount);
  }

  async acceptTopUpAgreement() {
    await this.topUpCheckbox.check();
  }

  async submitMobileTopUp() {
    await this.topUpButton.click();
  }

  async closePopup() {
    await this.closeButton.click();
  }

  async assertTransferMessage(expectedMessage: string) {
    await expect(this.showMessages).toHaveText(expectedMessage);
  }

  async assertTopUpMessage(expectedMessage: string) {
    await expect(this.showMessages).toHaveText(expectedMessage);
  }

  async getBalance(): Promise<number> {
    const text = await this.moneyValue.innerText();
    return Number(text.replace(/[^\d]/g, ''));
  }

  async assertBalance(expected: number) {
    await expect(this.moneyValue).toHaveText(`${expected}`);
  }

  async executeTopUpTransaction(receiver: string, amount: string) {
    await this.fillMobileTopUp(receiver, amount);
    await this.submitMobileTopUp();
    await this.acceptTopUpAgreement();
    await this.submitMobileTopUp();
    await this.closePopup();
  }
}
