import { FilterQuery } from 'mongoose';
import { mapImageToResponse } from '../helpers/mappingResponse';
import { IImageCreate } from '../interfaces';
import { IImage } from '../interfaces/IDocument';
import ImageModel from '../models/image.model';
import { create, getById, getList } from './base.service';

const ImageService = {
  create: async (imageData: IImageCreate) => {
    const image: IImageCreate = {
      url: imageData.url,
      publicId: imageData.publicId
    };
    return create(ImageModel, mapImageToResponse, image);
  },
  getList: async (query: {
    limit?: number;
    skip?: number;
    filterQuery?: FilterQuery<IImage>;
  }) => {
    return getList(ImageModel, mapImageToResponse, query);
  },
  getById: async (id: string) => {
    return getById(ImageModel, mapImageToResponse, id);
  }
};

export default ImageService;
