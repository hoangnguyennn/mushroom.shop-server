import { FilterQuery } from 'mongoose';
import { IImageCreate, IProductCreate, IProductRequest } from '../interfaces';
import { create, getList, getById, update } from './base.service';
import { IProduct } from '../interfaces/IDocument';
import { mapProductToResponse } from '../helpers/mappingResponse';
import ImageService from './image.service';
import ProductModel from '../models/product.model';
import { productPopulate } from '../helpers/mongoPopulate';

const ProductService = {
  create: async (productData: IProductRequest) => {
    const oldImages: string[] = [];
    const newImages: IImageCreate[] = [];
    productData.imagesId.forEach((image: any) => {
      if (image.id) {
        oldImages.push(image.id);
      } else {
        newImages.push(image);
      }
    });

    const imagePromises = newImages.map(ImageService.create);
    const images = await Promise.all(imagePromises);
    const imagesIdCombine: string[] = [
      ...oldImages,
      ...images.map(image => image['id'])
    ];

    const product: IProductCreate = {
      name: productData.name,
      price: productData.price,
      unitId: productData.unitId,
      description: productData.description,
      status: productData.status,
      imagesId: imagesIdCombine,
      categoryId: productData.categoryId,
      longDescription: productData.longDescription
    };
    return create({
      model: ProductModel,
      mapper: mapProductToResponse,
      data: product,
      populate: productPopulate
    });
  },
  getList: async (query: {
    limit?: number;
    skip?: number;
    filterQuery?: FilterQuery<IProduct>;
  }) => {
    return getList({
      model: ProductModel,
      mapper: mapProductToResponse,
      query,
      populate: productPopulate
    });
  },
  getById: async (id: string) => {
    return getById({
      model: ProductModel,
      mapper: mapProductToResponse,
      id,
      populate: productPopulate
    });
  },
  update: async (id: string, productData: IProductRequest) => {
    const oldImages: string[] = [];
    const newImages: IImageCreate[] = [];
    productData.imagesId.forEach((image: any) => {
      if (image.id) {
        oldImages.push(image.id);
      } else {
        newImages.push(image);
      }
    });

    const imagePromises = newImages.map(ImageService.create);
    const images = await Promise.all(imagePromises);
    const imagesIdCombine: string[] = [
      ...oldImages,
      ...images.map(image => image['id'])
    ];

    const product: IProductCreate = {
      name: productData.name,
      price: productData.price,
      unitId: productData.unitId,
      description: productData.description,
      status: productData.status,
      imagesId: imagesIdCombine,
      categoryId: productData.categoryId,
      longDescription: productData.longDescription
    };
    return update({
      model: ProductModel,
      mapper: mapProductToResponse,
      id,
      data: product,
      populate: productPopulate
    });
  },
  getTrendingProducts: async () => {
    const products = await ProductModel.find()
      .sort({ _id: -1 })
      .limit(8)
      .populate(productPopulate);
    return products.map(mapProductToResponse);
  }
};

export default ProductService;
