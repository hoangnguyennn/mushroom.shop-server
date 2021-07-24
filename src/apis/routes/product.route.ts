import { Router } from 'express';

import catcherWrapper from '../../helpers/catcherWrapper';
import ProductController from '../controllers/product.controller';
import ProductValidator from '../../validations/product.validate';

const router = Router();

router.get(
  '/',
  ProductValidator.getList,
  catcherWrapper(ProductController.getList)
);

router.post(
  '/',
  ProductValidator.create,
  catcherWrapper(ProductController.create)
);

router.get(
  '/:id',
  ProductValidator.getById,
  catcherWrapper(ProductController.getById)
);

router.put(
  '/:id',
  ProductValidator.update,
  catcherWrapper(ProductController.update)
);

export default router;
