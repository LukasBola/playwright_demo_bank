import { Page, Locator, expect } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PaymentPage {
  private readonly page: Page;
  private readonly transferRecipient: Locator;
  private readonly accountTransferInput: Locator;
  private readonly transferAmountInput: Locator;
  private readonly executeTransferButton: Locator;
  private readonly closeButton: Locator;
  private readonly showMessages: Locator;
  readonly sideMenu: SideMenuComponent;

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
    this.sideMenu = new SideMenuComponent(page);
  }

  get transferRecipientField(): Locator {
    return this.transferRecipient;
  }
  get accountTransferInputField(): Locator {
    return this.accountTransferInput;
  }
  get transferAmountInputField(): Locator {
    return this.transferAmountInput;
  }
  get executeTransferButtonField(): Locator {
    return this.executeTransferButton;
  }
  get closeButtonField(): Locator {
    return this.closeButton;
  }
  get showMessagesField(): Locator {
    return this.showMessages;
  }

  async fillTransferForm(
    recipient: string,
    account: string,
    amount: string,
  ): Promise<void> {
    await this.transferRecipient.fill(recipient);
    await this.accountTransferInput.fill(account);
    await this.transferAmountInput.fill(amount);
  }

  async submitTransfer(): Promise<void> {
    await this.executeTransferButton.click();
  }

  async closeConfirmation(): Promise<void> {
    await this.closeButton.click();
  }

  async assertTransferMessage(expectedMessage: string): Promise<void> {
    await expect(this.showMessages).toHaveText(expectedMessage);
  }
}
