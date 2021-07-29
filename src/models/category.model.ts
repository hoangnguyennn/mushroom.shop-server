import { model, Schema } from 'mongoose';
import { CollectionName } from '../interfaces/enums';
import { ICategory } from '../interfaces/IDocument';

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
});

export default model<ICategory>(CollectionName.CATEGORY, categorySchema);
