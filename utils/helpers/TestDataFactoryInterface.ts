import { CheckoutCustomer } from '../../models/CheckoutCustomer';

export interface TestDataFactory {
  createCheckoutCustomer(): CheckoutCustomer;
}
