import { model, Schema, Types } from 'mongoose';
import { CollectionName, OrderStatus } from '../interfaces/enums';
import { IOrderTracking } from '../interfaces/IDocument';

const orderTrackingSchema = new Schema<IOrderTracking>({
  orderId: {
    type: Types.ObjectId,
    required: true
  },
  orderStatus: {
    type: String,
    enum: OrderStatus,
    required: true
  },
  datetime: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  }
});

export default model<IOrderTracking>(
  CollectionName.ORDER_TRACKING,
  orderTrackingSchema
);
