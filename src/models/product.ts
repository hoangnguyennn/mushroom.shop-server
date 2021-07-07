import { model, Schema, Types } from 'mongoose';
import { IProduct } from '../interfaces/IDocuments';
import { CollectionName, ProductStatus } from '../interfaces/enums';
import { normalize } from '../utils';

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  unitId: {
    type: Types.ObjectId,
    ref: CollectionName.PRODUCT_UNIT,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ProductStatus,
    required: true
  },
  imagesId: [
    {
      type: Types.ObjectId,
      ref: CollectionName.IMAGE,
      required: true
    }
  ],
  categoryId: {
    type: Types.ObjectId,
    ref: CollectionName.CATEGORY,
    required: true
  },
  nameNonUnicode: {
    type: String,
    required: true
  },
  longDescription: {
    type: String
  }
});

productSchema.pre('validate', function(next) {
  this.nameNonUnicode = normalize(this.name);
  next();
});

productSchema.pre('findOneAndUpdate', async function(next) {
  const data: any = this.getUpdate();
  if (!data) {
    return next();
  }

  const document = await this.findOne(this.getQuery());
  let nameNonUnicode = document.name;
  if (data['$set']) {
    if (data['$set'].name) {
      nameNonUnicode = normalize(data['$set'].name);
    }

    data['$set'].nameNonUnicode = normalize(nameNonUnicode);
  } else {
    if (data.name) {
      nameNonUnicode = data.name;
    }
    data.nameNonUnicode = nameNonUnicode;
  }

  this.setUpdate(data);
  next();
});

productSchema.virtual('unit', {
  ref: CollectionName.PRODUCT_UNIT,
  localField: 'unitId',
  foreignField: '_id',
  justOne: true
});

productSchema.virtual('images', {
  ref: CollectionName.IMAGE,
  localField: 'imagesId',
  foreignField: '_id'
});

productSchema.virtual('category', {
  ref: CollectionName.CATEGORY,
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true
});

export default model<IProduct>(CollectionName.PRODUCT, productSchema);
