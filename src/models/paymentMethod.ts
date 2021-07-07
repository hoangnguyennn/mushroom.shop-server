import { model, Schema } from 'mongoose';
import { CollectionName } from '../interfaces/enums';
import { IPaymentMethod } from '../interfaces/IDocuments';

const paymentMethodSchema = new Schema<IPaymentMethod>({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  accessKey: {
    type: String
  },
  secretKey: {
    type: String
  },
  publicKey: {
    type: String
  },
  host: {
    type: String
  },
  description: {
    type: String
  }
});

export default model<IPaymentMethod>(
  CollectionName.PAYMENT_METHOD,
  paymentMethodSchema
);
