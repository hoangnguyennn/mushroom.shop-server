export enum CollectionName {
  CATEGORY = 'categories',
  IMAGE = 'images',
  ORDER = 'orders',
  ORDER_ITEM = 'orderItems',
  ORDER_TRACKING = 'orderTracking',
  PAYMENT_METHOD = 'paymentMethods',
  PRODUCT = 'products',
  PRODUCT_UNIT = 'productUnits',
  TRACE_LOG = 'traceLogs',
  USER = 'users'
}

export enum DatabaseAction {
  CREATE = 'CREATE',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE'
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
