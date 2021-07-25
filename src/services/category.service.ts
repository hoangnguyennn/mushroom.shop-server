import { FilterQuery } from 'mongoose';
import { COMMON_MESSAGE, HttpError } from '../helpers/commonResponse';
import { mapCategoryToResponse } from '../helpers/mappingResponse';
import { ICategoryCreate } from '../interfaces';
import { ICategory } from '../interfaces/IDocument';
import CategoryModel from '../models/category.model';
import { create, getList, getById, update } from './base.service';

const CategoryService = {
  create: async (categoryData: ICategoryCreate) => {
    const category: ICategoryCreate = {
      name: categoryData.name,
      description: categoryData.description,
      slug: categoryData.slug
    };
    return create({
      model: CategoryModel,
      mapper: mapCategoryToResponse,
      data: category
    });
  },
  getList: async (query: {
    limit?: number;
    skip?: number;
    filterQuery?: FilterQuery<ICategory>;
  }) => {
    return getList({
      model: CategoryModel,
      mapper: mapCategoryToResponse,
      query
    });
  },
  getById: async (id: string) => {
    return getById({
      model: CategoryModel,
      mapper: mapCategoryToResponse,
      id
    });
  },
  update: async (id: string, categoryData: ICategoryCreate) => {
    const category: ICategoryCreate = {
      name: categoryData.name,
      description: categoryData.description,
      slug: categoryData.slug
    };
    return update({
      model: CategoryModel,
      mapper: mapCategoryToResponse,
      id,
      data: category
    });
  },
  getBySlug: async (slug: string) => {
    const category = await CategoryModel.findOne({ slug });

    if (!category) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, 404);
    }

    return mapCategoryToResponse(category);
  }
};

export default CategoryService;
