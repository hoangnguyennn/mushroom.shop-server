import { FilterQuery } from 'mongoose';
import { ONE_DAY } from '../constants';
import { PaymentStatus } from '../interfaces/enums';
import { IOrder } from '../interfaces/IDocument';
import { endOfDate, startOfDate } from '../utils';
import OrderService from './order.service';

const StatisticsService = {
  statistics: async () => {
    const now = Date.now();

    const ordersInDayFilter: FilterQuery<IOrder> = {
      orderDate: {
        $gte: startOfDate(now),
        $lt: endOfDate(now)
      },
      paymentStatus: PaymentStatus.PAID
    };
    const ordersInDay = await OrderService.getList({
      filterQuery: ordersInDayFilter
    });

    const ordersInPreviousDayFilter: FilterQuery<IOrder> = {
      orderDate: {
        $gte: startOfDate(now - ONE_DAY),
        $lt: endOfDate(now - ONE_DAY)
      },
      paymentStatus: PaymentStatus.PAID
    };
    const ordersInPreviousDay = await OrderService.getList({
      filterQuery: ordersInPreviousDayFilter
    });

    const numberOfOrders = ordersInDay.length;

    const revenueOfTheDay = ordersInDay.reduce((result, order) => {
      const orderTotal =
        order.items?.reduce(
          (total, item) => total + item.price * item.qty,
          0
        ) || 0;
      return result + orderTotal;
    }, 0);

    const revenueOfPreviousDay = ordersInPreviousDay.reduce((result, order) => {
      const orderTotal =
        order.items?.reduce(
          (total, item) => total + item.price * item.qty,
          0
        ) || 0;
      return result + orderTotal;
    }, 0);

    const numberOfOrdersOfPreviousDay = ordersInPreviousDay.length;

    return {
      revenueOfTheDay,
      revenueOfPreviousDay,
      numberOfOrders,
      numberOfOrdersOfPreviousDay
    };
  }
};

export default StatisticsService;
