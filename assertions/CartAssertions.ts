import { expect } from '@playwright/test';
import { Product } from '../models/Product';

export class CartAssertions {
	static expectCartItemMatches(expected: Product, actual: Product): void {
		expect(actual.name).toBe(expected.name);
		expect(actual.price).toBe(expected.price);
	}
}
