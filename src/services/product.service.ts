import { FilterQuery } from 'mongoose';
import { IImageCreate, IProductCreate, IProductRequest } from '../interfaces';
import { create, getList, getById, update } from './base.service';
import { IProduct } from '../interfaces/IDocument';
import { mapProductToResponse } from '../helpers/mappingResponse';
import ImageService from './image.service';
import ProductModel from '../models/product.model';

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
    return create(ProductModel, mapProductToResponse, product);
  },
  getList: async (query: {
    limit?: number;
    skip?: number;
    filterQuery?: FilterQuery<IProduct>;
  }) => {
    return getList(ProductModel, mapProductToResponse, query);
  },
  getById: async (id: string) => {
    return getById(ProductModel, mapProductToResponse, id);
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
    return update(ProductModel, mapProductToResponse, id, product);
  }
};

export default ProductService;
