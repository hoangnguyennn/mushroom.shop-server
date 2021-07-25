import { Router } from 'express';

import catcherWrapper from '../../helpers/catcherWrapper';
import OrderController from '../controllers/order.controller';
import OrderValidator from '../../validations/order.validate';

const router = Router();

router.get(
  '/',
  OrderValidator.getList,
  catcherWrapper(OrderController.getList)
);

router.post('/', OrderValidator.create, catcherWrapper(OrderController.create));

router.get(
  '/:id',
  OrderValidator.getById,
  catcherWrapper(OrderController.getById)
);

export default router;
