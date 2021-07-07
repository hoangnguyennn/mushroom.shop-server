export const productPopulate = 'unit images category';

export const orderPopulate = [
  { path: 'user' },
  { path: 'paymentMethod' },
  {
    path: 'items',
    populate: { path: 'product', populate: { path: 'images' } }
  }
];
