import { Router } from 'express';

import catcherWrapper from '../../helpers/catcherWrapper';
import ProductController from '../controllers/product.controller';
import ProductValidator from '../../validations/product.validate';
import { UserType } from '../../interfaces/enums';
import AuthMiddleware from '../../middlewares/auth.middleware';

const router = Router();

router.get(
  '/',
  ProductValidator.getList,
  catcherWrapper(ProductController.getList)
);

router.post(
  '/',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.ADMIN, UserType.MANAGER]),
  ProductValidator.create,
  catcherWrapper(ProductController.create)
);

router.get('/trendings', catcherWrapper(ProductController.getTrendingProducts));

router.get(
  '/:id',
  ProductValidator.getById,
  catcherWrapper(ProductController.getById)
);

router.put(
  '/:id',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.ADMIN, UserType.MANAGER]),
  ProductValidator.update,
  catcherWrapper(ProductController.update)
);

router.post(
  '/:id/update-status',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.ADMIN, UserType.MANAGER]),
  ProductValidator.updateStatus,
  catcherWrapper(ProductController.updateStatus)
);

export default router;
