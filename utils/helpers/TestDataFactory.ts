import { faker } from '@faker-js/faker';
import { CheckoutCustomer } from '../../models/CheckoutCustomer';
import { TestDataFactory } from './TestDataFactoryInterface';

export class FakerTestDataFactory implements TestDataFactory {
  createCheckoutCustomer(): CheckoutCustomer {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode(),
    };
  }
}
