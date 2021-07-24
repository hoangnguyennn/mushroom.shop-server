import { Request, Response } from 'express';
import { success } from '../../helpers/commonResponse';
import { ICategoryCreate } from '../../interfaces';
import CategoryService from '../../services/category.service';

const create = async (req: Request, res: Response) => {
  const categoryData: ICategoryCreate = req.body;
  const category = await CategoryService.create(categoryData);
  return success(res, category);
};

const getList = async (req: Request, res: Response) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);

  const categories = await CategoryService.getList({
    limit: pageSize,
    skip: (page - 1) * pageSize
  });
  return success(res, categories);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await CategoryService.getById(id);
  return success(res, category);
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categoryData: ICategoryCreate = req.body;
  const category = await CategoryService.update(id, categoryData);
  return success(res, category);
};

export default { create, getList, getById, update };
