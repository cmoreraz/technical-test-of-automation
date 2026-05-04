import { expect, Page, TestInfo } from '@playwright/test';
import { Product } from '../models/Product';
import { attachPageScreenshot } from '../utils/ScreenshotReporter';

export class CartPage {
	constructor(private readonly page: Page) {}

	async getCartItemDetails(productName: string, testInfo?: TestInfo): Promise<Product> {
		const item = this.getCartItem(productName);
		const name = await item.locator('.inventory_item_name').textContent();
		const price = await item.locator('.inventory_item_price').textContent();
		if (testInfo) {
			await attachPageScreenshot(this.page, testInfo, `cart-${this.slug(productName)}-details`);
		}

		return {
			name: this.normalizeText(name),
			price: this.normalizeText(price),
		};
	}

	async validateProduct(productName: string, price: string, testInfo?: TestInfo): Promise<void> {
		await expect(this.getCartItem(productName)).toBeVisible();
		await expect(this.getCartItem(productName).locator('.inventory_item_price')).toHaveText(price);
		if (testInfo) {
			await attachPageScreenshot(this.page, testInfo, `cart-${this.slug(productName)}-validated`);
		}
	}

	async proceedToCheckout(testInfo?: TestInfo): Promise<void> {
		await this.page.locator('[data-test="checkout"]').click();
		await this.page.waitForURL('**/checkout-step-one.html');
		if (testInfo) {
			await attachPageScreenshot(this.page, testInfo, 'checkout-step-one-opened');
		}
	}

	async captureScreenshot(testInfo: TestInfo, name: string): Promise<void> {
		await attachPageScreenshot(this.page, testInfo, name);
	}

	private getCartItem(productName: string) {
		return this.page.locator('.cart_item').filter({
			has: this.page.getByText(productName, { exact: true }),
		}).first();
	}

	private normalizeText(value: string | null): string {
		return value?.trim() ?? '';
	}

	private slug(value: string): string {
		return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
	}
}
