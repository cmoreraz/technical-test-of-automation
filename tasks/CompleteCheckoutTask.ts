import { TestInfo } from '@playwright/test';
import { CartAssertions } from '../assertions/CartAssertions';
import { CheckoutAssertions } from '../assertions/CheckoutAssertions';
import { CheckoutCustomer } from '../models/CheckoutCustomer';
import { Product } from '../models/Product';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { ProductsPage } from '../pages/ProductsPage';

export class CompleteCheckoutTask {
	constructor(
		private readonly productsPage: ProductsPage,
		private readonly cartPage: CartPage,
		private readonly checkoutPage: CheckoutPage,
		private readonly orderConfirmationPage: OrderConfirmationPage,
	) {}

	async execute(expectedProduct: Product, customer: CheckoutCustomer, testInfo?: TestInfo): Promise<string> {
		await this.productsPage.openCart(testInfo);
		const cartProduct = await this.cartPage.getCartItemDetails(expectedProduct.name, testInfo);
		CartAssertions.expectCartItemMatches(expectedProduct, cartProduct);
		if (testInfo) {
			await this.cartPage.captureScreenshot(testInfo, 'cart-validation-passed');
		}

		await this.cartPage.proceedToCheckout(testInfo);
		await this.checkoutPage.completeCheckout(customer, testInfo);
		await this.orderConfirmationPage.finishOrder(testInfo);

		const confirmationMessage = await this.orderConfirmationPage.getConfirmationMessage();
		CheckoutAssertions.expectConfirmationMessage(confirmationMessage);
		if (testInfo) {
			await this.orderConfirmationPage.captureScreenshot(testInfo, 'order-confirmation-validated');
		}

		return confirmationMessage;
	}
}
