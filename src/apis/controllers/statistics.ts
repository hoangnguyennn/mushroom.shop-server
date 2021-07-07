import { Request, Response } from 'express';
import { PaymentStatus } from '../../interfaces/enums';
import { startOfDay, endOfDay } from '../../utils';
import { success } from '../../helpers/commonResponse';
import OrderService from '../../services/order';

const ONE_DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000;

const statistic = async (req: Request, res: Response) => {
  const now = new Date().getTime();

  const ordersInDay = await OrderService.get({
    orderDate: { $gte: startOfDay(now), $lt: endOfDay(now) },
    paymentStatus: PaymentStatus.PAID
  });

  const ordersInPreviousDay = await OrderService.get({
    orderDate: {
      $gte: startOfDay(now - ONE_DAY_IN_MILISECONDS),
      $lt: endOfDay(now - ONE_DAY_IN_MILISECONDS)
    },
    paymentStatus: PaymentStatus.PAID
  });

  const revenueOfTheDay = ordersInDay.reduce((result, order) => {
    const orderTotal = order.items.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
    return result + orderTotal;
  }, 0);

  const numberOfOrders = ordersInDay.length;

  const revenueOfPreviousDay = ordersInPreviousDay.reduce((result, order) => {
    const orderTotal = order.items.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
    return result + orderTotal;
  }, 0);

  const numberOfOrdersOfPreviousDay = ordersInPreviousDay.length;

  return success(res, {
    revenueOfTheDay,
    revenueOfPreviousDay,
    numberOfOrders,
    numberOfOrdersOfPreviousDay
  });
};

export default { statistic };
