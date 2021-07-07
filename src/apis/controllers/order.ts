import { Request, Response } from 'express';

import {
  IOrderCreate,
  IOrderCreateRequest,
  ITrackingCreate
} from '../../interfaces';
import {
  mapOrderToResponse,
  mapTrackingToResponse
} from '../../helpers/mappingResponse';
import { success } from '../../helpers/commonResponse';
import { OrderStatus, PaymentStatus, UserType } from '../../interfaces/enums';
import mapQueryToMongoFilter from '../../helpers/mapQueryToMongoFilter';
import OrderItemService from '../../services/orderItem';
import OrderService from '../../services/order';
import ProductService from '../../services/product';
import TrackingService from '../../services/tracking';

const create = async (req: Request, res: Response) => {
  const orderCreateRequest: IOrderCreateRequest = req.body;

  const orderItemCreateRequest = orderCreateRequest.items;
  const productPromises = orderItemCreateRequest.map(item =>
    ProductService.getById(item.productId)
  );
  const products = await Promise.all(productPromises);

  const orderItems = await OrderItemService.createMany(
    orderCreateRequest.items
      .filter(item => item !== null)
      .map((item, index) => ({
        ...item,
        price: products[index]?.price || 0
      }))
  );

  const now = new Date().getTime();
  const orderCreate: IOrderCreate = {
    ...orderCreateRequest,
    orderDate: now,
    itemsId: orderItems.map(item => item._id)
  };
  const orderCreated = await OrderService.create(orderCreate);

  const trackingCreate: ITrackingCreate = {
    orderId: orderCreated._id,
    orderStatus: OrderStatus.ORDERED,
    dateTime: now
  };
  await TrackingService.create(trackingCreate);

  return success(res, mapOrderToResponse(orderCreated));
};

const get = async (req: Request, res: Response) => {
  const { userId, userType } = res.locals;
  const filter = mapQueryToMongoFilter(req.query);

  if (userType === UserType.CUSTOMER) {
    filter.userId = userId;
  }

  const orders = await OrderService.get(filter);
  return success(res, orders.map(mapOrderToResponse));
};

const getTrackings = async (req: Request, res: Response) => {
  const { id } = req.params;
  const trackings = await TrackingService.getByOrderId(id);
  return success(res, trackings.map(mapTrackingToResponse));
};

const updateStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, message } = req.body;

  const orderUpdated = await OrderService.updateStatus(id, status);
  const now = new Date().getTime();
  const trackingCreate: ITrackingCreate = {
    orderId: orderUpdated._id,
    orderStatus: status,
    dateTime: now,
    description: message
  };
  await TrackingService.create(trackingCreate);
  return success(res, mapOrderToResponse(orderUpdated));
};

const payOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  const orderUpdated = await OrderService.updatePaymentStatus(
    id,
    PaymentStatus.PAID
  );
  return success(res, mapOrderToResponse(orderUpdated));
};

export default {
  create,
  get,
  getTrackings,
  payOrder,
  updateStatus
};
