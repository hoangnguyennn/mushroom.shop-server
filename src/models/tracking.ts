import { model, Schema, Types } from 'mongoose';
import { CollectionName, OrderStatus } from '../interfaces/enums';
import { ITracking } from '../interfaces/IDocuments';

const trackingSchema = new Schema<ITracking>({
  orderId: {
    type: Types.ObjectId,
    required: true
  },
  orderStatus: {
    type: String,
    enum: OrderStatus,
    default: OrderStatus.ORDERED
  },
  dateTime: {
    type: Number,
    default: () => new Date().getTime()
  },
  description: {
    type: String
  }
});

export default model<ITracking>(CollectionName.TRACKING, trackingSchema);
