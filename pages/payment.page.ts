import { Page, Locator, expect } from '@playwright/test';

export class PaymentPage {
  private readonly page: Page;
  private readonly transferRecipient: Locator;
  private readonly accountTransferInput: Locator;
  private readonly transferAmountInput: Locator;
  private readonly executeTransferButton: Locator;
  private readonly closeButton: Locator;
  private readonly showMessages: Locator;

  constructor(page: Page) {
    this.page = page;
    this.transferRecipient = page.getByTestId('transfer_receiver');
    this.accountTransferInput = page.getByTestId('form_account_to');
    this.transferAmountInput = page.getByTestId('form_amount');
    this.executeTransferButton = page.getByRole('button', {
      name: 'wykonaj przelew',
    });
    this.closeButton = page.getByTestId('close-button');
    this.showMessages = page.locator('#show_messages');
  }

  get transferRecipientField() {
    return this.transferRecipient;
  }
  get accountTransferInputField() {
    return this.accountTransferInput;
  }
  get transferAmountInputField() {
    return this.transferAmountInput;
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

  async fillTransferForm(recipient: string, account: string, amount: string) {
    await this.transferRecipient.fill(recipient);
    await this.accountTransferInput.fill(account);
    await this.transferAmountInput.fill(amount);
  }

  async submitTransfer() {
    await this.executeTransferButton.click();
  }

  async closeConfirmation() {
    await this.closeButton.click();
  }

  async assertTransferMessage(expectedMessage: string) {
    await expect(this.showMessages).toHaveText(expectedMessage);
  }
}
