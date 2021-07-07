import { Router } from 'express';

import { UserType } from '../../interfaces/enums';
import AuthMiddleware from '../../middlewares/auth';
import catcherWrapper from '../../helpers/catcherWrapper';
import PaymentMethodController from '../controllers/paymentMethod';

const router = Router();

router.get('/', catcherWrapper(PaymentMethodController.get));

router.post(
  '/',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.MANAGER]),
  catcherWrapper(PaymentMethodController.create)
);

export default router;
