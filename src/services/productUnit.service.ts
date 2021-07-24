import { FilterQuery } from 'mongoose';
import { HttpError, COMMON_MESSAGE } from '../helpers/commonResponse';
import { mapProductUnitToResponse } from '../helpers/mappingResponse';
import { IProductUnitCreate } from '../interfaces';
import ProductUnitModel from '../models/productUnit.model';

const create = async (productUnitData: IProductUnitCreate) => {
  const productUnit = {
    name: productUnitData.name
  };
  const productUnitCreated = await ProductUnitModel.create(productUnit);
  return mapProductUnitToResponse(productUnitCreated);
};

const getList = async <T>({
  limit,
  skip,
  filterQuery
}: {
  limit?: number;
  skip?: number;
  filterQuery?: FilterQuery<T>;
}) => {
  const query = filterQuery
    ? ProductUnitModel.find(filterQuery)
    : ProductUnitModel.find();

  if (skip) {
    query.skip(skip);
  }

  if (limit) {
    query.limit(limit);
  }

  const productUnits = await query.exec();
  return productUnits.map(mapProductUnitToResponse);
};

const getById = async (id: string) => {
  const productUnit = await ProductUnitModel.findOne({ _id: id });

  if (!productUnit) {
    throw new HttpError(COMMON_MESSAGE.NOT_FOUND, 404);
  }

  return mapProductUnitToResponse(productUnit);
};

const update = async (id: string, productUnitData: IProductUnitCreate) => {
  const productUnit: IProductUnitCreate = {
    name: productUnitData.name
  };
  const productUnitUpdated = await ProductUnitModel.findOneAndUpdate(
    { _id: id },
    productUnit,
    { new: true }
  );

  if (!productUnitUpdated) {
    throw new HttpError(COMMON_MESSAGE.NOT_FOUND, 404);
  }

  return mapProductUnitToResponse(productUnitUpdated);
};

export default { create, getList, getById, update };
