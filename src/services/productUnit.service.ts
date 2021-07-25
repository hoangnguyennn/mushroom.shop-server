import { FilterQuery } from 'mongoose';
import { mapProductUnitToResponse } from '../helpers/mappingResponse';
import { IProductUnitCreate } from '../interfaces';
import { IProductUnit } from '../interfaces/IDocument';
import ProductUnitModel from '../models/productUnit.model';
import { create, getList, getById, update } from './base.service';

const ProductUnitService = {
  create: async (productUnitData: IProductUnitCreate) => {
    const productUnit: IProductUnitCreate = { name: productUnitData.name };
    return create({
      model: ProductUnitModel,
      mapper: mapProductUnitToResponse,
      data: productUnit
    });
  },
  getList: async (query: {
    limit?: number;
    skip?: number;
    filterQuery?: FilterQuery<IProductUnit>;
  }) => {
    return getList({
      model: ProductUnitModel,
      mapper: mapProductUnitToResponse,
      query
    });
  },
  getById: async (id: string) => {
    return getById({
      model: ProductUnitModel,
      mapper: mapProductUnitToResponse,
      id
    });
  },
  update: async (id: string, productUnitData: IProductUnitCreate) => {
    const productUnit: IProductUnitCreate = { name: productUnitData.name };
    return update({
      model: ProductUnitModel,
      mapper: mapProductUnitToResponse,
      id,
      data: productUnit
    });
  }
};

export default ProductUnitService;
