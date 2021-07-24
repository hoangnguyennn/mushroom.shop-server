import { FilterQuery } from 'mongoose';
import { COMMON_MESSAGE, HttpError } from '../helpers/commonResponse';
import { mapCategoryToResponse } from '../helpers/mappingResponse';
import { ICategoryCreate } from '../interfaces';
import CategoryModel from '../models/category.model';

const create = async (categoryData: ICategoryCreate) => {
  const category: ICategoryCreate = {
    name: categoryData.name,
    description: categoryData.description,
    slug: categoryData.slug
  };
  const categoryCreated = await CategoryModel.create(category);
  return mapCategoryToResponse(categoryCreated);
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
    ? CategoryModel.find(filterQuery)
    : CategoryModel.find();

  if (skip) {
    query.skip(skip);
  }

  if (limit) {
    query.limit(limit);
  }

  const categories = await query.exec();
  return categories.map(mapCategoryToResponse);
};

const getById = async (id: string) => {
  const category = await CategoryModel.findOne({ _id: id });

  if (!category) {
    throw new HttpError(COMMON_MESSAGE.NOT_FOUND, 404);
  }

  return mapCategoryToResponse(category);
};

const update = async (id: string, categoryData: ICategoryCreate) => {
  const category: ICategoryCreate = {
    name: categoryData.name,
    description: categoryData.description,
    slug: categoryData.slug
  };
  const categoryUpdated = await CategoryModel.findOneAndUpdate(
    { _id: id },
    category,
    { new: true }
  );

  if (!categoryUpdated) {
    throw new HttpError(COMMON_MESSAGE.NOT_FOUND, 404);
  }

  return mapCategoryToResponse(categoryUpdated);
};

export default { create, getList, getById, update };
