import { Request, Response } from 'express';
import { success } from '../../helpers/commonResponse';
import { IOrderRequest } from '../../interfaces';
import OrderService from '../../services/order.service';

const create = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const orderData: IOrderRequest = req.body;
  const order = await OrderService.create(orderData, userId);
  return success(res, order);
};

const getList = async (req: Request, res: Response) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);

  const orders = await OrderService.getList({
    limit: pageSize,
    skip: (page - 1) * pageSize
  });
  return success(res, orders);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await OrderService.getById(id);
  return success(res, order);
};

export default { create, getList, getById };
