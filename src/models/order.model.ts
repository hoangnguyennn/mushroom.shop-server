import { model, Schema, Types } from 'mongoose';
import {
  CollectionName,
  OrderStatus,
  PaymentStatus
} from '../interfaces/enums';
import { IOrder } from '../interfaces/IDocument';

const orderSchema = new Schema<IOrder>({
  userId: {
    type: Types.ObjectId,
    ref: CollectionName.USER
  },
  deliveryEmail: {
    type: String,
    required: true
  },
  deliveryFullName: {
    type: String,
    required: true
  },
  deliveryPhone: {
    type: String,
    required: true
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  deliveryDate: {
    type: Date
  },
  paymentMethodId: {
    type: Types.ObjectId,
    ref: CollectionName.PAYMENT_METHOD,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: PaymentStatus,
    default: PaymentStatus.UNPAID
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  orderStatus: {
    type: String,
    enum: OrderStatus,
    default: OrderStatus.ORDERED
  },
  itemsId: [
    {
      type: Types.ObjectId,
      ref: CollectionName.ORDER_ITEM,
      required: true
    }
  ]
});

orderSchema.virtual('user', {
  ref: CollectionName.USER,
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

orderSchema.virtual('paymentMethod', {
  ref: CollectionName.PAYMENT_METHOD,
  localField: 'paymentMethodId',
  foreignField: '_id',
  justOne: true
});

orderSchema.virtual('items', {
  ref: CollectionName.ORDER_ITEM,
  localField: 'itemsId',
  foreignField: '_id'
});

export default model<IOrder>(CollectionName.ORDER, orderSchema);
