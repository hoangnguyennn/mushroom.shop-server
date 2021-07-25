import { IPopulateOptions } from '../interfaces';

export const productPopulate: IPopulateOptions = 'unit images category';

export const orderPopulate: IPopulateOptions = [
  { path: 'user' },
  { path: 'paymentMethod' },
  {
    path: 'items',
    populate: { path: 'product', populate: { path: 'images' } }
  }
];
