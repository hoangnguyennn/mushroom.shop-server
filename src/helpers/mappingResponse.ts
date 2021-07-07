import {
  ICategoryResponse,
  ICategoryWithLength,
  IImageResponse,
  IOrderItemResponse,
  IOrderResponse,
  IPaymentMethodResponse,
  IProductResponse,
  IProductResponseForAdmin,
  IProductUnitResponse,
  IProductUnitWithLength,
  ITrackingResponse,
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
  ITracking,
  IUser
} from '../interfaces/IDocuments';

export const mapCategoryToResponse = (
  category: ICategory
): ICategoryResponse => {
  return {
    id: category._id,
    name: category.name,
    slug: category.slug
  };
};

export const mapCategoryWithProductListToResponse = (
  category: ICategoryWithLength
) => {
  return Object.assign(mapCategoryToResponse(category), {
    productsLength: category.productsLength
  });
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
    deliveryFullName: order.deliveryFullName,
    deliveryAddress: order.deliveryAddress,
    deliveryPhone: order.deliveryPhone,
    deliveryEmail: order.deliveryEmail,
    deliveryDate: order.deliveryDate,
    paymentStatus: order.paymentStatus,
    orderStatus: order.orderStatus,
    orderDate: order.orderDate,

    user: order.user ? mapUserToResponse(order.user) : undefined,
    paymentMethod: mapPaymentMethodToResponse(
      order.paymentMethod as IPaymentMethod
    ),
    items: order.items.map(mapOrderItemToResponse)
  };
};

export const mapOrderItemToResponse = (
  orderItem: IOrderItem
): IOrderItemResponse => {
  return {
    id: orderItem.id,
    productId: orderItem.productId,
    price: orderItem.price,
    qty: orderItem.qty,
    product: {
      name: orderItem.product?.name || '',
      image: orderItem.product?.images?.[0].url || ''
    }
  };
};

export const mapPaymentMethodToResponse = (
  paymentMethod: IPaymentMethod
): IPaymentMethodResponse => {
  return {
    id: paymentMethod._id,
    name: paymentMethod.name,
    imageUrl: paymentMethod.imageUrl
  };
};

export const mapProductToResponse = (product: IProduct): IProductResponse => {
  return {
    id: product._id,
    name: product.name,
    price: product.price,
    description: product.description,
    unit: product.unit?.name || '',
    images: product.images?.map(image => image.url) || [],
    status: product.status,
    category: product.category?.name || '',
    longDescription: product.longDescription || ''
  };
};

export const mapProductToResponseForAdmin = (
  product: IProduct
): IProductResponseForAdmin => {
  return {
    id: product._id,
    name: product.name,
    price: product.price,
    description: product.description,
    unit: product.unit ? mapProductUnitToResponse(product.unit) : undefined,
    images: product.images?.map(mapImageToResponse),
    status: product.status,
    category: product.category
      ? mapCategoryToResponse(product.category)
      : undefined,
    longDescription: product.longDescription || ''
  };
};

export const mapProductUnitToResponse = (
  productUnit: IProductUnit
): IProductUnitResponse => {
  return {
    id: productUnit._id,
    name: productUnit.name,
    description: ''
  };
};

export const mapProductUnitWithProductListToResponse = (
  productUnit: IProductUnitWithLength
) => {
  return Object.assign(mapProductUnitToResponse(productUnit), {
    productsLength: productUnit.productsLength
  });
};

export const mapTrackingToResponse = (
  tracking: ITracking
): ITrackingResponse => {
  return {
    id: tracking._id,
    orderId: String(tracking.orderId),
    orderStatus: tracking.orderStatus,
    dateTime: tracking.dateTime,
    description: tracking.description
  };
};

export const mapUserToResponse = (user: IUser): IUserResponse => {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    address: user.address,
    phone: user.phone,
    userType: user.userType
  };
};
