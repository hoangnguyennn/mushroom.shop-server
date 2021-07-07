import { Request, Response } from 'express';
import { IProductUnitCreate, IProductUnitWithLength } from '../../interfaces';
import {
  mapProductUnitToResponse,
  mapProductUnitWithProductListToResponse
} from '../../helpers/mappingResponse';
import { success } from '../../helpers/commonResponse';

import ProductUnitService from '../../services/productUnit';
import ProductService from '../../services/product';
import CategoryService from '../../services/category';
import { ICategory, IProductUnit } from '../../interfaces/IDocuments';
import { removeInvalidFields } from '../../utils';
import mapQueryToMongoFilter from '../../helpers/mapQueryToMongoFilter';

const create = async (req: Request, res: Response) => {
  const productUnitCreate: IProductUnitCreate = req.body;
  const productUnitCreated = await ProductUnitService.create(productUnitCreate);
  return success(res, productUnitCreated);
};

const get = async (req: Request, res: Response) => {
  const { slug, ...rest } = req.query;
  const withProductLength = req.query['with-product-length'];
  const productUnits = await ProductUnitService.get();

  const filter = mapQueryToMongoFilter(rest);

  if (withProductLength === 'true') {
    let category: ICategory | null = null;
    if (slug) {
      category = await CategoryService.getBySlug(slug as string);
    }

    const productsPromises = productUnits.map(productUnit =>
      ProductService.get(
        removeInvalidFields({
          ...filter,
          unitId: productUnit._id,
          categoryId: category?._id
        })
      )
    );

    const productsList = await Promise.all(productsPromises);

    const productUnitsWithLength: IProductUnitWithLength[] = productUnits
      .map((productUnit, idx) => {
        return Object.assign<IProductUnit, { productsLength: number }>(
          Object.create(productUnit),
          { productsLength: productsList[idx].length }
        );
      })
      .filter(item => item.productsLength);

    return success(
      res,
      productUnitsWithLength.map(productUnit =>
        mapProductUnitWithProductListToResponse(productUnit)
      )
    );
  }

  return success(res, productUnits.map(mapProductUnitToResponse));
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productUnit = await ProductUnitService.getById(id);
  return success(res, mapProductUnitToResponse(productUnit));
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productUnitUpdate = req.body;
  const productUnitUpdated = await ProductUnitService.update(
    id,
    productUnitUpdate
  );

  return success(res, mapProductUnitToResponse(productUnitUpdated));
};

export default {
  create,
  get,
  getById,
  update
};
