import { TestInfo } from '@playwright/test';
import { Product } from '../models/Product';
import { ProductsPage } from '../pages/ProductsPage';

export class AddProductToCartTask {
	constructor(private readonly productsPage: ProductsPage) {}

	async execute(productName: string, testInfo?: TestInfo): Promise<Product> {
		const product = await this.productsPage.getProductDetails(productName);
		if (testInfo) {
			await this.productsPage.captureScreenshot(testInfo, `product-${productName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-captured`);
		}
		await this.productsPage.addProductToCart(productName, testInfo);

		return product;
	}
}
