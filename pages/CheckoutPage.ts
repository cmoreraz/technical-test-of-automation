import { Page, TestInfo } from '@playwright/test';
import { CheckoutCustomer } from '../models/CheckoutCustomer';
import { attachPageScreenshot } from '../utils/ScreenshotReporter';

export class CheckoutPage {
	constructor(private readonly page: Page) {}

	async fillCustomerInformation(customer: CheckoutCustomer, testInfo?: TestInfo): Promise<void> {
		await this.page.locator('[data-test="firstName"]').fill(customer.firstName);
		if (testInfo) {
			await attachPageScreenshot(this.page, testInfo, 'checkout-first-name-filled');
		}
		await this.page.locator('[data-test="lastName"]').fill(customer.lastName);
		if (testInfo) {
			await attachPageScreenshot(this.page, testInfo, 'checkout-last-name-filled');
		}
		await this.page.locator('[data-test="postalCode"]').fill(customer.postalCode);
		if (testInfo) {
			await attachPageScreenshot(this.page, testInfo, 'checkout-postal-code-filled');
		}
	}

	async continueToOverview(testInfo?: TestInfo): Promise<void> {
		await this.page.locator('[data-test="continue"]').click();
		await this.page.waitForURL('**/checkout-step-two.html');
		if (testInfo) {
			await attachPageScreenshot(this.page, testInfo, 'checkout-overview-opened');
		}
	}

	async completeCheckout(customer: CheckoutCustomer, testInfo?: TestInfo): Promise<void> {
		await this.fillCustomerInformation(customer, testInfo);
		await this.continueToOverview(testInfo);
	}
}
