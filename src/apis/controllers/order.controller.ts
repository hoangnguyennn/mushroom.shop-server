import { Request, Response } from 'express';
import { success } from '../../helpers/commonResponse';
import { IOrderRequest, ITraceLogCreate } from '../../interfaces';
import { CollectionName, DatabaseAction } from '../../interfaces/enums';
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
