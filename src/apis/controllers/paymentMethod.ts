import { Request, Response } from 'express';

import { IPaymentMethodCreate } from '../../interfaces';
import { mapPaymentMethodToResponse } from '../../helpers/mappingResponse';
import { success } from '../../helpers/commonResponse';
import PaymentMethodService from '../../services/paymentMethod';

const create = async (req: Request, res: Response) => {
  const paymentMethodCreate: IPaymentMethodCreate = req.body;
  const paymentMethodCreated = await PaymentMethodService.create(
    paymentMethodCreate
  );
  return success(res, mapPaymentMethodToResponse(paymentMethodCreated));
};

const get = async (req: Request, res: Response) => {
  const paymentMethods = await PaymentMethodService.get();
  return success(res, paymentMethods.map(mapPaymentMethodToResponse));
};

export default {
  create,
  get
};
