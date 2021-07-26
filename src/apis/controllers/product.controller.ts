import { Request, Response } from 'express';
import { success } from '../../helpers/commonResponse';
import { IProductRequest, ITraceLogCreate } from '../../interfaces';
import { CollectionName, DatabaseAction } from '../../interfaces/enums';
import ProductService from '../../services/product.service';
import TraceLogService from '../../services/traceLog.service';

const create = async (req: Request, res: Response) => {
  const productData: IProductRequest = req.body;
  const product = await ProductService.create(productData);
  const userId = req.user?.userId as string;
  const traceLog: ITraceLogCreate = {
    userId: userId,
    modelName: CollectionName.PRODUCT,
    victimId: product.id,
    victim: product,
    action: DatabaseAction.CREATE,
    description: 'Add a new product',
    time: Date.now()
  };
  await TraceLogService.create(traceLog);
  return success(res, product);
};

const getList = async (req: Request, res: Response) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);

  const products = await ProductService.getList({
    limit: pageSize,
    skip: (page - 1) * pageSize
  });
  return success(res, products);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductService.getById(id);
  return success(res, product);
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productData: IProductRequest = req.body;
  const product = await ProductService.update(id, productData);
  const userId = req.user?.userId as string;
  const traceLog: ITraceLogCreate = {
    userId: userId,
    modelName: CollectionName.PRODUCT,
    victimId: product.id,
    victim: product,
    action: DatabaseAction.UPDATE,
    description: 'Update product',
    time: Date.now()
  };
  await TraceLogService.create(traceLog);
  return success(res, product);
};

const getTrendingProducts = async (req: Request, res: Response) => {
  const products = await ProductService.getTrendingProducts();
  return success(res, products);
};

const updateStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const product = await ProductService.updateStatus(id, status);
  const userId = req.user?.userId as string;
  const traceLog: ITraceLogCreate = {
    userId: userId,
    modelName: CollectionName.PRODUCT,
    victimId: product.id,
    victim: product,
    action: DatabaseAction.CREATE,
    description: 'Update product status',
    time: Date.now()
  };
  await TraceLogService.create(traceLog);
  return success(res, product);
};

export default {
  create,
  getList,
  getById,
  update,
  getTrendingProducts,
  updateStatus
};
