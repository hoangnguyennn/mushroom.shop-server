import { model, Schema, Types } from 'mongoose';
import { CollectionName } from '../interfaces/enums';
import { IOrderItem } from '../interfaces/IDocuments';

const orderItemSchema = new Schema<IOrderItem>({
  productId: {
    type: Types.ObjectId,
    ref: CollectionName.PRODUCT,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  qty: {
    type: Number,
    required: true
  }
});

orderItemSchema.virtual('product', {
  ref: CollectionName.PRODUCT,
  localField: 'productId',
  foreignField: '_id',
  justOne: true
});

export default model<IOrderItem>(CollectionName.ORDER_ITEM, orderItemSchema);
