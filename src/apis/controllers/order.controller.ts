import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { success } from '../../helpers/commonResponse';
import { IOrderRequest, ITraceLogCreate } from '../../interfaces';
import {
  CollectionName,
  DatabaseAction,
  UserType
} from '../../interfaces/enums';
import { IOrder } from '../../interfaces/IDocument';
import OrderService from '../../services/order.service';
import TraceLogService from '../../services/traceLog.service';

const create = async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const orderData: IOrderRequest = req.body;
  const order = await OrderService.create(orderData, userId);
  const traceLog: ITraceLogCreate = {
    userId: userId,
    modelName: CollectionName.ORDER,
    victimId: order.id,
    victim: order,
    action: DatabaseAction.CREATE,
    description: 'Create a new order',
    time: Date.now()
  };
  await TraceLogService.create(traceLog);
  return success(res, order);
};

const getList = async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const userType = req.user?.userType;
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);

  const filterQuery: FilterQuery<IOrder> = {};
  if (userType && ![UserType.ADMIN, UserType.MANAGER].includes(userType)) {
    filterQuery._id = userId;
  }

  const orders = await OrderService.getList({
    limit: pageSize,
    skip: (page - 1) * pageSize,
    filterQuery
  });
  return success(res, orders);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId as string;
  const userType = req.user?.userType;

  const filterQuery: FilterQuery<IOrder> = {};
  if (userType && ![UserType.ADMIN, UserType.MANAGER].includes(userType)) {
    filterQuery._id = userId;
  }

  const order = await OrderService.getById(id, filterQuery);
  return success(res, order);
};

const payOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await OrderService.payOrder(id);
  return success(res, order);
};

const updateStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await OrderService.updateStatus(id, status);
  const userId = req.user?.userId as string;
  const traceLog: ITraceLogCreate = {
    userId: userId,
    modelName: CollectionName.ORDER,
    victimId: order.id,
    victim: order,
    action: DatabaseAction.UPDATE,
    description: 'Update order status',
    time: Date.now()
  };
  await TraceLogService.create(traceLog);
  return success(res, order);
};

export default { create, getList, getById, payOrder, updateStatus };
