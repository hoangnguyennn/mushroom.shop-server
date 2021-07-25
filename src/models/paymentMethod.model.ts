import { model, Schema } from 'mongoose';
import { CollectionName } from '../interfaces/enums';
import { IPaymentMethod } from '../interfaces/IDocument';

const paymentMethodSchema = new Schema<IPaymentMethod>({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

export default model<IPaymentMethod>(
  CollectionName.PAYMENT_METHOD,
  paymentMethodSchema
);
