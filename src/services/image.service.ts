import { mapImageToResponse } from '../helpers/mappingResponse';
import { IImageCreate } from '../interfaces';
import ImageModel from '../models/image.model';
import { create } from './base.service';

const ImageService = {
  create: async (imageData: IImageCreate) => {
    const image: IImageCreate = {
      url: imageData.url,
      publicId: imageData.publicId
    };
    return create(ImageModel, mapImageToResponse, image);
  }
};

export default ImageService;
