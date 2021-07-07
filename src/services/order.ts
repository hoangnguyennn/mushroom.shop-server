import { COMMON_MESSAGE, HttpError } from '../helpers/commonResponse';
import { IOrder } from '../interfaces/IDocuments';
import { IOrderCreate } from '../interfaces';
import { orderPopulate } from '../helpers/populate';
import { OrderStatus, PaymentStatus } from '../interfaces/enums';
import { removeInvalidFields } from '../utils';
import OrderModel from '../models/order';

const create = async (order: IOrderCreate): Promise<IOrder> => {
  const orderLint = removeInvalidFields({
    userId: order.userId,
    deliveryFullName: order.deliveryFullName,
    deliveryAddress: order.deliveryAddress,
    deliveryPhone: order.deliveryPhone,
    deliveryEmail: order.deliveryEmail,
    deliveryDate: order.deliveryDate,
    orderDate: order.orderDate,
    paymentMethodId: order.paymentMethodId,
    paymentStatus: PaymentStatus.UNPAID,
    itemsId: order.itemsId
  });

  const orderCreated = await OrderModel.create(orderLint);

  return OrderModel.populate(orderCreated, orderPopulate);
};

const get = async (filter: any = {}): Promise<IOrder[]> => {
  const orderFilter: any = removeInvalidFields(filter);
  return OrderModel.find(orderFilter)
    .populate(orderPopulate)
    .sort({ orderDate: -1 });
};

const updateStatus = async (
  id: string,
  status: OrderStatus
): Promise<IOrder> => {
  let now;
  if (status === OrderStatus.DELIVERED) {
    now = new Date().getTime();
  }

  const orderUpdated = await OrderModel.findByIdAndUpdate(
    id,
    { $set: removeInvalidFields({ orderStatus: status, deliveryDate: now }) },
    { new: true }
  ).populate(orderPopulate);

  if (!orderUpdated) {
    throw new HttpError(COMMON_MESSAGE.NOT_FOUND, 404);
  }

  return orderUpdated;
};

const updatePaymentStatus = async (
  id: string,
  paymentStatus: PaymentStatus
): Promise<IOrder> => {
  const orderUpdated = await OrderModel.findByIdAndUpdate(
    id,
    { $set: { paymentStatus: paymentStatus } },
    { new: true }
  ).populate(orderPopulate);

  if (!orderUpdated) {
    throw new HttpError(COMMON_MESSAGE.NOT_FOUND, 404);
  }

  return orderUpdated;
};

export default {
  create,
  get,
  updateStatus,
  updatePaymentStatus
};
