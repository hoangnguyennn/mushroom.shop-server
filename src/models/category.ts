import { model, Schema } from 'mongoose';
import { CollectionName } from '../interfaces/enums';
import { ICategory } from '../interfaces/IDocuments';

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
});

export default model<ICategory>(CollectionName.CATEGORY, categorySchema);
