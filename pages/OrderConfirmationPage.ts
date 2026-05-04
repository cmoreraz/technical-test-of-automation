import { Page, TestInfo } from '@playwright/test';
import { attachPageScreenshot } from '../utils/ScreenshotReporter';
import { E2E_CART_PATH } from '../config/routes';

export class OrderConfirmationPage {
	constructor(private readonly page: Page) {}

	async finishOrder(testInfo?: TestInfo): Promise<void> {
		await this.page.locator('[data-test="finish"]').click();
		await this.page.waitForURL(E2E_CART_PATH);
		if (testInfo) {
			await attachPageScreenshot(this.page, testInfo, 'order-confirmation-opened');
		}
	}

	async getConfirmationMessage(): Promise<string> {
		return (await this.page.locator('.complete-header').textContent())?.trim() ?? '';
	}

	async captureScreenshot(testInfo: TestInfo, name: string): Promise<void> {
		await attachPageScreenshot(this.page, testInfo, name);
	}
}
