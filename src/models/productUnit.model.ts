import { model, Schema } from 'mongoose';
import { CollectionName } from '../interfaces/enums';
import { IProductUnit } from '../interfaces/IDocument';

const productUnitSchema = new Schema<IProductUnit>({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

export default model<IProductUnit>(
  CollectionName.PRODUCT_UNIT,
  productUnitSchema
);
