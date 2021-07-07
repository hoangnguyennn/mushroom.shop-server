export enum CollectionName {
  CATEGORY = 'categories',
  IMAGE = 'images',
  ORDER = 'orders',
  ORDER_ITEM = 'orderItems',
  PAYMENT_METHOD = 'paymentMethods',
  PRODUCT = 'products',
  PRODUCT_UNIT = 'productUnits',
  TRACKING = 'trackings',
  USER = 'users'
}

export enum OrderStatus {
  CANCEL = 'CANCEL',
  DELIVERED = 'DELIVERED',
  DELIVERING = 'DELIVERING',
  ORDERED = 'ORDERED',
  VERIFIED = 'VERIFIED'
}

export enum PaymentStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID'
}

export enum ProductStatus {
  NOT_SELLING = 'NOT_SELLING',
  SELLING = 'SELLING'
}

export enum UserType {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  MANAGER = 'MANAGER'
}
