import { model, Schema, Types } from 'mongoose';
import { IOrder } from '../interfaces/IDocuments';
import {
  CollectionName,
  OrderStatus,
  PaymentStatus
} from '../interfaces/enums';

const orderSchema = new Schema<IOrder>({
  userId: {
    type: Types.ObjectId,
    ref: CollectionName.USER
  },
  deliveryFullName: {
    type: String,
    required: true
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  deliveryPhone: {
    type: String,
    required: true
  },
  deliveryEmail: {
    type: String,
    required: true
  },
  deliveryDate: {
    type: Number
  },
  paymentMethodId: {
    type: Types.ObjectId,
    ref: CollectionName.PAYMENT_METHOD,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: PaymentStatus,
    required: true
  },
  orderStatus: {
    type: String,
    enum: OrderStatus,
    default: OrderStatus.ORDERED
  },
  orderDate: {
    type: Number,
    default: () => new Date().getTime()
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
