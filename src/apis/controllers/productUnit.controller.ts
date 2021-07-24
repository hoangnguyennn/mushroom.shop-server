import { Request, Response } from 'express';
import { success } from '../../helpers/commonResponse';
import { IProductUnitCreate } from '../../interfaces';
import ProductUnitService from '../../services/productUnit.service';

const create = async (req: Request, res: Response) => {
  const productUnitData: IProductUnitCreate = req.body;
  const productUnit = await ProductUnitService.create(productUnitData);
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
  const productUnitData = req.body;
  const productUnit = await ProductUnitService.update(id, productUnitData);
  return success(res, productUnit);
};

export default { create, getList, getById, update };
