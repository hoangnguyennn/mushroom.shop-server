import { Router } from 'express';

import catcherWrapper from '../../helpers/catcherWrapper';
import PaymentMethodController from '../controllers/paymentMethod.controller';
import PaymentMethodValidator from '../../validations/paymentMethod.validate';
import { UserType } from '../../interfaces/enums';
import AuthMiddleware from '../../middlewares/auth.middleware';

const router = Router();

router.get(
  '/',
  PaymentMethodValidator.getList,
  catcherWrapper(PaymentMethodController.getList)
);

router.post(
  '/',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.ADMIN, UserType.MANAGER]),
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
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.ADMIN, UserType.MANAGER]),
  PaymentMethodValidator.update,
  catcherWrapper(PaymentMethodController.update)
);

export default router;
