import { Request, Response } from 'express';
import { success } from '../../helpers/commonResponse';
import { IProductRequest } from '../../interfaces';
import ProductService from '../../services/product.service';

const create = async (req: Request, res: Response) => {
  const productData: IProductRequest = req.body;
  const product = await ProductService.create(productData);
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
  return success(res, product);
};

export default { create, getList, getById, update };
