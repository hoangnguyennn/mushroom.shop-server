import { Request, Response } from 'express';
import { success } from '../../helpers/commonResponse';
import { IPaymentMethodCreate, ITraceLogCreate } from '../../interfaces';
import { CollectionName, DatabaseAction } from '../../interfaces/enums';
import PaymentMethodService from '../../services/paymentMethod.service';
import TraceLogService from '../../services/traceLog.service';

const create = async (req: Request, res: Response) => {
  const paymentMethodData: IPaymentMethodCreate = req.body;
  const paymentMethod = await PaymentMethodService.create(paymentMethodData);
  const userId = req.user?.userId as string;
  const traceLog: ITraceLogCreate = {
    userId: userId,
    modelName: CollectionName.PAYMENT_METHOD,
    victimId: paymentMethod.id,
    victim: paymentMethod,
    action: DatabaseAction.CREATE,
    description: 'Create a new payment method',
    time: Date.now()
  };
  await TraceLogService.create(traceLog);
  return success(res, paymentMethod);
};

const getList = async (req: Request, res: Response) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);

  const paymentMethods = await PaymentMethodService.getList({
    limit: pageSize,
    skip: (page - 1) * pageSize
  });
  return success(res, paymentMethods);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const paymentMethod = await PaymentMethodService.getById(id);
  return success(res, paymentMethod);
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const paymentMethodData: IPaymentMethodCreate = req.body;
  const paymentMethod = await PaymentMethodService.update(
    id,
    paymentMethodData
  );
  const userId = req.user?.userId as string;
  const traceLog: ITraceLogCreate = {
    userId: userId,
    modelName: CollectionName.PAYMENT_METHOD,
    victimId: paymentMethod.id,
    victim: paymentMethod,
    action: DatabaseAction.UPDATE,
    description: 'Update payment method',
    time: Date.now()
  };
  await TraceLogService.create(traceLog);
  return success(res, paymentMethod);
};

export default { create, getList, getById, update };
