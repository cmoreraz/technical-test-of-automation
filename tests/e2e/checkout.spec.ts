import { test } from '@playwright/test';
import { E2E_USERNAME, E2E_PASSWORD } from '../../config/credentials';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { LoginPage } from '../../pages/LoginPage';
import { OrderConfirmationPage } from '../../pages/OrderConfirmationPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { AddProductToCartTask } from '../../tasks/AddProductToCartTask';
import { CompleteCheckoutTask } from '../../tasks/CompleteCheckoutTask';
import { LoginTask } from '../../tasks/LoginTask';
import { FakerTestDataFactory } from '../../utils/helpers/TestDataFactory';

test.describe('E2E checkout flow', () => {
	test('purchase Sauce Labs Fleece Jacket from login to confirmation', async ({ page }, testInfo) => {
		const loginPage = new LoginPage(page);
		const productsPage = new ProductsPage(page);
		const cartPage = new CartPage(page);
		const checkoutPage = new CheckoutPage(page);
		const orderConfirmationPage = new OrderConfirmationPage(page);

		const loginTask = new LoginTask(loginPage);
		const addProductToCartTask = new AddProductToCartTask(productsPage);
		const completeCheckoutTask = new CompleteCheckoutTask(productsPage, cartPage, checkoutPage, orderConfirmationPage);
		const testDataFactory = new FakerTestDataFactory();

		await test.step('Login to Swag Labs', async () => {
			await loginTask.execute(E2E_USERNAME, E2E_PASSWORD, testInfo);
		});

		const product = await test.step('Capture and add the target product', async () => {
			return addProductToCartTask.execute('Sauce Labs Fleece Jacket', testInfo);
		});

		await test.step('Validate cart and finish checkout', async () => {
			const customer = testDataFactory.createCheckoutCustomer();
			await completeCheckoutTask.execute(product, customer, testInfo);
		});
	});
});
