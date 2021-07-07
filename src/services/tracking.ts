import { ITrackingCreate } from '../interfaces';
import { ITracking } from '../interfaces/IDocuments';
import TrackingModel from '../models/tracking';
import { removeInvalidFields } from '../utils';

const create = async (tracking: ITrackingCreate) => {
  const trackingLint = removeInvalidFields({
    orderId: tracking.orderId,
    orderStatus: tracking.orderStatus,
    dateTime: tracking.dateTime,
    description: tracking.description
  });
  return TrackingModel.create(trackingLint);
};

const getByOrderId = async (orderId: string): Promise<ITracking[]> => {
  return TrackingModel.find({ orderId });
};

export default {
  create,
  getByOrderId
};
