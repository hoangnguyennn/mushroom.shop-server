import { Router } from 'express';

import catcherWrapper from '../../helpers/catcherWrapper';
import PaymentMethodController from '../controllers/paymentMethod.controller';
import PaymentMethodValidator from '../../validations/paymentMethod.validate';

const router = Router();

router.get(
  '/',
  PaymentMethodValidator.getList,
  catcherWrapper(PaymentMethodController.getList)
);

router.post(
  '/',
  PaymentMethodValidator.create,
  catcherWrapper(PaymentMethodController.create)
);

router.get(
  '/:id',
  PaymentMethodValidator.getById,
  catcherWrapper(PaymentMethodController.getById)
);

router.put(
  '/:id',
  PaymentMethodValidator.update,
  catcherWrapper(PaymentMethodController.update)
);

export default router;
