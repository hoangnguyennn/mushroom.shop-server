import { Router } from 'express';

import catcherWrapper from '../../helpers/catcherWrapper';
import OrderController from '../controllers/order';
import AuthMiddleware from '../../middlewares/auth';
import { UserType } from '../../interfaces/enums';

const router = Router();

router.get('/', AuthMiddleware.checkAuth, catcherWrapper(OrderController.get));
router.get('/:id/tracking', OrderController.getTrackings);

router.post('/', catcherWrapper(OrderController.create));

router.post(
  '/:id/update-status',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.MANAGER]),
  catcherWrapper(OrderController.updateStatus)
);

router.post(
  '/:id/pay',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.MANAGER]),
  catcherWrapper(OrderController.payOrder)
);

export default router;
