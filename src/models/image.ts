import { model, Schema } from 'mongoose';
import { CollectionName } from '../interfaces/enums';
import { IImage } from '../interfaces/IDocuments';

const imageSchema = new Schema<IImage>({
  url: {
    type: String,
    required: true
  },
  publicId: {
    type: String,
    required: true
  }
});

export default model<IImage>(CollectionName.IMAGE, imageSchema);
