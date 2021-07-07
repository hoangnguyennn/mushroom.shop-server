import { Request, Response } from 'express';

import {
  mapCategoryToResponse,
  mapCategoryWithProductListToResponse,
  mapProductToResponse
} from '../../helpers/mappingResponse';
import { ICategory } from '../../interfaces/IDocuments';
import { ICategoryWithLength } from '../../interfaces';
import { success } from '../../helpers/commonResponse';
import CategoryService from '../../services/category';
import mapQueryToMongoFilter from '../../helpers/mapQueryToMongoFilter';
import ProductService from '../../services/product';
import { removeInvalidFields } from '../../utils';

const create = async (req: Request, res: Response) => {
  const categoryRequest = req.body;
  const categoryCreated = await CategoryService.create(categoryRequest);
  return success(res, mapCategoryToResponse(categoryCreated));
};

const get = async (req: Request, res: Response) => {
  const withProductLength = req.query['with-product-length'];
  const categories: ICategory[] = await CategoryService.get();

  const filter = mapQueryToMongoFilter(req.query);

  if (withProductLength === 'true') {
    const productsPromises = categories.map(category =>
      ProductService.get(
        removeInvalidFields({
          ...filter,
          categoryId: category.id
        })
      )
    );

    const productsList = await Promise.all(productsPromises);
    const categoriesWithProductsLength: ICategoryWithLength[] = categories.map(
      (category, idx) => {
        return Object.assign<ICategory, { productsLength: number }>(
          Object.create(category),
          { productsLength: productsList[idx].length }
        );
      }
    );

    return success(
      res,
      categoriesWithProductsLength.map(category =>
        mapCategoryWithProductListToResponse(category)
      )
    );
  }

  return success(res, categories.map(mapCategoryToResponse));
};

const getProductsByCategorySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;

  const filter = mapQueryToMongoFilter(req.query);

  const category = await CategoryService.getBySlug(slug);
  const products = await ProductService.get({
    categoryId: category._id,
    ...filter
  });

  return success(res, products.map(mapProductToResponse));
};

export default {
  create,
  get,
  getProductsByCategorySlug
};
