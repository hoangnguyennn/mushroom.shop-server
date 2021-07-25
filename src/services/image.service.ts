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
    return create({
      model: ImageModel,
      mapper: mapImageToResponse,
      data: image
    });
  },
  getList: async (query: {
    limit?: number;
    skip?: number;
    filterQuery?: FilterQuery<IImage>;
  }) => {
    return getList({
      model: ImageModel,
      mapper: mapImageToResponse,
      query
    });
  },
  getById: async (id: string) => {
    return getById({
      model: ImageModel,
      mapper: mapImageToResponse,
      id
    });
  }
};

export default ImageService;
