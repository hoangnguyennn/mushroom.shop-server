import { Types } from 'mongoose';

import { COMMON_MESSAGE, HttpError } from '../helpers/commonResponse';
import { IProduct } from '../interfaces/IDocuments';
import { IProductCreate } from '../interfaces';
import { productPopulate } from '../helpers/populate';
import { ProductStatus } from '../interfaces/enums';
import { removeInvalidFields } from '../utils';
import ProductModel from '../models/product';

const create = async (product: IProductCreate): Promise<IProduct> => {
  const productLint = removeInvalidFields({
    name: product.name,
    price: product.price,
    unitId: product.unitId,
    description: product.description,
    status: product.status,
    imagesId: product.imagesId,
    categoryId: product.categoryId,
    longDescription: product.longDescription,
  });

  const productCreated = await ProductModel.create(productLint);

  return ProductModel.populate(productCreated, productPopulate);
};

const get = async (
  filter: { [key: string]: any } = {},
  skip?: number,
  limit?: number
): Promise<IProduct[]> => {
  const query = ProductModel.find(filter).sort({ _id: -1 });

  if (skip) {
    query.skip(skip);
  }

  if (limit) {
    query.limit(limit);
  }

  return query.populate(productPopulate);
};

const count = async (): Promise<number> => {
  return ProductModel.countDocuments();
};

const getById = async (id: string | Types.ObjectId): Promise<IProduct> => {
  const product = await ProductModel.findOne({ _id: id }).populate(
    productPopulate
  );

  if (!product) {
    throw new HttpError(COMMON_MESSAGE.NOT_FOUND, 404);
  }

  return product;
};

const getTrending = async (): Promise<IProduct[]> => {
  return ProductModel.find({ status: ProductStatus.SELLING })
    .sort({ _id: -1 })
    .limit(8)
    .populate(productPopulate);
};

const update = async (id: string, product: IProductCreate) => {
  const productLint = removeInvalidFields({
    name: product.name,
    price: product.price,
    unitId: product.unitId,
    description: product.description,
    status: product.status,
    imagesId: product.imagesId,
    categoryId: product.categoryId,
    longDescription: product.longDescription,
  });

  const productUpdated = await ProductModel.findByIdAndUpdate(
    id,
    { $set: productLint },
    { new: true }
  ).populate(productPopulate);

  if (!productUpdated) {
    throw new HttpError(COMMON_MESSAGE.NOT_FOUND, 404);
  }

  return productUpdated;
};

const updateStatus = async (
  id: string,
  newStatus: ProductStatus
): Promise<IProduct> => {
  const productUpdated = await ProductModel.findByIdAndUpdate(
    id,
    { $set: { status: newStatus } },
    { new: true }
  ).populate(productPopulate);

  if (!productUpdated) {
    throw new HttpError(COMMON_MESSAGE.NOT_FOUND, 404);
  }

  return productUpdated;
};

export default {
  count,
  create,
  get,
  getById,
  getTrending,
  update,
  updateStatus,
};
