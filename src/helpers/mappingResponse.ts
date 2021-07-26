import {
  ICategoryResponse,
  IImageResponse,
  IOrderItemResponse,
  IOrderResponse,
  IPaymentMethodResponse,
  IProductResponse,
  IProductUnitResponse,
  ITraceLogResponse,
  IUserResponse
} from '../interfaces';
import {
  ICategory,
  IImage,
  IOrder,
  IOrderItem,
  IPaymentMethod,
  IProduct,
  IProductUnit,
  ITraceLog,
  IUser
} from '../interfaces/IDocument';

export const mapCategoryToResponse = (
  category: ICategory
): ICategoryResponse => {
  return {
    id: category._id,
    name: category.name,
    description: category.description,
    slug: category.slug
  };
};

export const mapImageToResponse = (image: IImage): IImageResponse => {
  return {
    id: image._id,
    url: image.url,
    publicId: image.publicId
  };
};

export const mapOrderToResponse = (order: IOrder): IOrderResponse => {
  return {
    id: order._id,
    deliveryEmail: order.deliveryEmail,
    deliveryFullName: order.deliveryFullName,
    deliveryPhone: order.deliveryPhone,
    deliveryAddress: order.deliveryAddress,
    deliveryDate: order.deliveryDate?.getTime(),
    paymentStatus: order.paymentStatus,
    orderDate: order.orderDate.getTime(),
    orderStatus: order.orderStatus,
    user: order.user && mapUserToResponse(order.user),
    paymentMethod:
      order.paymentMethod && mapPaymentMethodToResponse(order.paymentMethod),
    items: order.items && order.items.map(mapOrderItemToResponse)
  };
};

export const mapOrderItemToResponse = (
  orderItem: IOrderItem
): IOrderItemResponse => {
  return {
    id: orderItem._id,
    price: orderItem.price,
    qty: orderItem.qty,
    product: orderItem.product && {
      id: orderItem.product._id,
      name: orderItem.product.name,
      image: orderItem.product.images?.[0].url || ''
    }
  };
};

export const mapPaymentMethodToResponse = (
  paymentMethod: IPaymentMethod
): IPaymentMethodResponse => {
  return {
    id: paymentMethod._id,
    name: paymentMethod.name
  };
};

export const mapProductToResponse = (product: IProduct): IProductResponse => {
  return {
    id: product._id,
    name: product.name,
    price: product.price,
    description: product.description,
    status: product.status,
    longDescription: product.longDescription,
    unit: product.unit && mapProductUnitToResponse(product.unit),
    images: product.images && product.images.map(mapImageToResponse),
    category: product.category && mapCategoryToResponse(product.category)
  };
};

export const mapProductUnitToResponse = (
  productUnit: IProductUnit
): IProductUnitResponse => {
  return {
    id: productUnit._id,
    name: productUnit.name
  };
};

export const mapTraceLogToResponse = (
  traceLog: ITraceLog
): ITraceLogResponse => {
  return {
    id: traceLog._id,
    modelName: traceLog.modelName,
    victimId: traceLog.victimId.toString(),
    victim: traceLog.victim,
    action: traceLog.action,
    description: traceLog.description,
    time: traceLog.time.getTime(),
    user: traceLog.user && mapUserToResponse(traceLog.user)
  };
};

export const mapUserToResponse = (user: IUser): IUserResponse => {
  return {
    id: user._id,
    email: user.email,
    fullName: user.fullName,
    phone: user.phone,
    address: user.address,
    userType: user.userType
  };
};
