import { model, Schema } from 'mongoose';
import { CollectionName } from '../interfaces/enums';
import { IProductUnit } from '../interfaces/IDocuments';

const productUnitSchema = new Schema<IProductUnit>({
  name: {
    type: String,
    required: true
  }
});

export default model<IProductUnit>(
  CollectionName.PRODUCT_UNIT,
  productUnitSchema
);
