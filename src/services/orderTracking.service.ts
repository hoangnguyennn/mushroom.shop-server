import { FilterQuery } from 'mongoose';
import { mapOrderTrackingToResponse } from '../helpers/mappingResponse';
import { IOrderTrackingCreate } from '../interfaces';
import { IOrderTracking } from '../interfaces/IDocument';
import OrderTrackingModel from '../models/orderTracking.model';
import { create, getList } from './base.service';

const OrderTrackingService = {
  create: async (orderTrackingData: IOrderTrackingCreate) => {
    const orderTracking: IOrderTrackingCreate = {
      orderId: orderTrackingData.orderId,
      orderStatus: orderTrackingData.orderStatus,
      datetime: orderTrackingData.datetime,
      description: orderTrackingData.description
    };
    return create({
      model: OrderTrackingModel,
      mapper: mapOrderTrackingToResponse,
      data: orderTracking
    });
  },
  getList: async (query: {
    limit?: number;
    skip?: number;
    filterQuery?: FilterQuery<IOrderTracking>;
  }) => {
    return getList({
      model: OrderTrackingModel,
      mapper: mapOrderTrackingToResponse,
      query
    });
  }
};

export default OrderTrackingService;
