import { FilterQuery } from 'mongoose';
import { create, getById, getList } from './base.service';
import { IOrder } from '../interfaces/IDocument';
import { IOrderCreate, IOrderRequest } from '../interfaces';
import { mapOrderToResponse } from '../helpers/mappingResponse';
import { orderPopulate } from '../helpers/mongoPopulate';
import { OrderStatus, PaymentStatus } from '../interfaces/enums';
import OrderItemModel from '../models/orderItem.model';
import OrderModel from '../models/order.model';
import ProductService from './product.service';
import { COMMON_MESSAGE, HttpError } from '../helpers/commonResponse';

const OrderService = {
  create: async (orderData: IOrderRequest, userId?: string) => {
    const productPromises = orderData.items.map(item => {
      return ProductService.getById(item.productId);
    });
    const products = await Promise.all(productPromises);
    const orderItems = await OrderItemModel.insertMany(
      orderData.items.map((item, index) => ({
        productId: products[index].id,
        price: products[index].price,
        qty: item.qty
      }))
    );

    const order: IOrderCreate = {
      userId,
      deliveryEmail: orderData.deliveryEmail,
      deliveryFullName: orderData.deliveryFullName,
      deliveryPhone: orderData.deliveryPhone,
      deliveryAddress: orderData.deliveryAddress,
      paymentMethodId: orderData.paymentMethodId,
      paymentStatus: PaymentStatus.UNPAID,
      orderDate: Date.now(),
      orderStatus: OrderStatus.ORDERED,
      itemsId: orderItems.map(item => item._id)
    };

    return create({
      model: OrderModel,
      mapper: mapOrderToResponse,
      data: order,
      populate: orderPopulate
    });
  },
  getList: async (query: {
    limit?: number;
    skip?: number;
    filterQuery?: FilterQuery<IOrder>;
  }) => {
    return getList({
      model: OrderModel,
      mapper: mapOrderToResponse,
      query,
      populate: orderPopulate
    });
  },
  getById: async (id: string) => {
    return getById({
      model: OrderModel,
      mapper: mapOrderToResponse,
      id,
      populate: orderPopulate
    });
  },
  payOrder: async (id: string) => {
    const order = await OrderModel.findOneAndUpdate(
      { _id: id },
      { $set: { paymentStatus: PaymentStatus.PAID } },
      { new: true }
    ).populate(orderPopulate);

    if (!order) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, 404);
    }

    return mapOrderToResponse(order);
  },
  updateStatus: async (id: string, status: OrderStatus) => {
    const order = await OrderModel.findOneAndUpdate(
      { _id: id },
      { $set: { orderStatus: status } },
      { new: true }
    ).populate(orderPopulate);

    if (!order) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, 404);
    }

    return mapOrderToResponse(order);
  }
};

export default OrderService;
