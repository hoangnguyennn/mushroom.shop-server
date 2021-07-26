import { Request, Response } from 'express';
import { success } from '../../helpers/commonResponse';
import { IProductUnitCreate, ITraceLogCreate } from '../../interfaces';
import { CollectionName, DatabaseAction } from '../../interfaces/enums';
import ProductUnitService from '../../services/productUnit.service';
import TraceLogService from '../../services/traceLog.service';

const create = async (req: Request, res: Response) => {
  const productUnitData: IProductUnitCreate = req.body;
  const productUnit = await ProductUnitService.create(productUnitData);
  const userId = req.user?.userId as string;
  const traceLog: ITraceLogCreate = {
    userId: userId,
    modelName: CollectionName.PRODUCT_UNIT,
    victimId: productUnit.id,
    victim: productUnit,
    action: DatabaseAction.CREATE,
    description: 'Add a new product unit',
    time: Date.now()
  };
  await TraceLogService.create(traceLog);
  return success(res, productUnit);
};

const getList = async (req: Request, res: Response) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);

  const productUnits = await ProductUnitService.getList({
    limit: pageSize,
    skip: (page - 1) * pageSize
  });
  return success(res, productUnits);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productUnit = await ProductUnitService.getById(id);
  return success(res, productUnit);
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productUnitData: IProductUnitCreate = req.body;
  const productUnit = await ProductUnitService.update(id, productUnitData);
  const userId = req.user?.userId as string;
  const traceLog: ITraceLogCreate = {
    userId: userId,
    modelName: CollectionName.PRODUCT,
    victimId: productUnit.id,
    victim: productUnit,
    action: DatabaseAction.UPDATE,
    description: 'Update product unit',
    time: Date.now()
  };
  await TraceLogService.create(traceLog);
  return success(res, productUnit);
};

export default { create, getList, getById, update };
