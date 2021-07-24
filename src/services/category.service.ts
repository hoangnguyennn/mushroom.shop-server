import { FilterQuery } from 'mongoose';
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
    return create(CategoryModel, mapCategoryToResponse, category);
  },
  getList: async (query: {
    limit?: number;
    skip?: number;
    filterQuery?: FilterQuery<ICategory>;
  }) => {
    return getList(CategoryModel, mapCategoryToResponse, query);
  },
  getById: async (id: string) => {
    return getById(CategoryModel, mapCategoryToResponse, id);
  },
  update: async (id: string, categoryData: ICategoryCreate) => {
    const category: ICategoryCreate = {
      name: categoryData.name,
      description: categoryData.description,
      slug: categoryData.slug
    };
    return update(CategoryModel, mapCategoryToResponse, id, category);
  }
};

export default CategoryService;
