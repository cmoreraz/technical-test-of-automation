import { expect } from '@playwright/test';

export class CheckoutAssertions {
	static expectConfirmationMessage(message: string): void {
		expect(message).toBe('Thank you for your order!');
	}
}
