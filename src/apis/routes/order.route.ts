import { Router } from 'express';

import catcherWrapper from '../../helpers/catcherWrapper';
import OrderController from '../controllers/order.controller';
import OrderValidator from '../../validations/order.validate';
import AuthMiddleware from '../../middlewares/auth.middleware';
import { UserType } from '../../interfaces/enums';

const router = Router();

router.get(
  '/',
  AuthMiddleware.checkAuth,
  OrderValidator.getList,
  catcherWrapper(OrderController.getList)
);

router.post('/', OrderValidator.create, catcherWrapper(OrderController.create));

router.get(
  '/:id',
  AuthMiddleware.checkAuth,
  OrderValidator.getById,
  catcherWrapper(OrderController.getById)
);

router.get(
  '/:id/tracking',
  AuthMiddleware.checkAuth,
  OrderValidator.getOrderTracking,
  catcherWrapper(OrderController.getOrderTracking)
);

router.post(
  '/:id/pay',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.ADMIN, UserType.MANAGER]),
  OrderValidator.getById,
  catcherWrapper(OrderController.payOrder)
);

router.post(
  '/:id/update-status',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.ADMIN, UserType.MANAGER]),
  OrderValidator.updateStatus,
  catcherWrapper(OrderController.updateStatus)
);

export default router;
