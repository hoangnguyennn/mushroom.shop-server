import { Request, Response } from 'express';
import { success } from '../../helpers/commonResponse';
import { ICategoryCreate, ITraceLogCreate } from '../../interfaces';
import { CollectionName, DatabaseAction } from '../../interfaces/enums';
import CategoryService from '../../services/category.service';
import TraceLogService from '../../services/traceLog.service';

const create = async (req: Request, res: Response) => {
  const categoryData: ICategoryCreate = req.body;
  const category = await CategoryService.create(categoryData);

  const userId = req.user?.userId as string;
  const traceLog: ITraceLogCreate = {
    userId: userId,
    modelName: CollectionName.CATEGORY,
    victimId: category.id,
    victim: category,
    action: DatabaseAction.CREATE,
    description: 'Add a new category',
    time: Date.now()
  };
  await TraceLogService.create(traceLog);
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

  const userId = req.user?.userId as string;
  const traceLog: ITraceLogCreate = {
    userId: userId,
    modelName: CollectionName.CATEGORY,
    victimId: category.id,
    victim: category,
    action: DatabaseAction.UPDATE,
    description: 'Update category',
    time: Date.now()
  };
  await TraceLogService.create(traceLog);
  return success(res, category);
};

const getBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const category = await CategoryService.getBySlug(slug);
  return success(res, category);
};

export default { create, getList, getById, update, getBySlug };
