import { expect, Page, TestInfo } from '@playwright/test';
import { Product } from '../models/Product';
import { attachPageScreenshot } from '../utils/ScreenshotReporter';

export class ProductsPage {
	constructor(private readonly page: Page) {}

	async getProductDetails(productName: string): Promise<Product> {
		const card = this.getProductCard(productName);
		const name = await card.locator('.inventory_item_name').textContent();
		const price = await card.locator('.inventory_item_price').textContent();

		return {
			name: this.normalizeText(name),
			price: this.normalizeText(price),
		};
	}

	async addProductToCart(productName: string, testInfo?: TestInfo): Promise<void> {
		await this.getProductCard(productName).getByRole('button', { name: 'Add to cart' }).click();
		if (testInfo) {
			await attachPageScreenshot(this.page, testInfo, `product-${this.slug(productName)}-added-to-cart`);
		}
	}

	async openCart(testInfo?: TestInfo): Promise<void> {
		await this.page.locator('[data-test="shopping-cart-link"]').click();
		await this.page.waitForURL('**/cart.html');
		if (testInfo) {
			await attachPageScreenshot(this.page, testInfo, 'cart-opened');
		}
	}

	async expectProductVisible(productName: string, testInfo?: TestInfo): Promise<void> {
		await expect(this.getProductCard(productName)).toBeVisible();
		if (testInfo) {
			await attachPageScreenshot(this.page, testInfo, `product-${this.slug(productName)}-visible`);
		}
	}

	async captureScreenshot(testInfo: TestInfo, name: string): Promise<void> {
		await attachPageScreenshot(this.page, testInfo, name);
	}

	private getProductCard(productName: string) {
		return this.page.locator('.inventory_item').filter({
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
