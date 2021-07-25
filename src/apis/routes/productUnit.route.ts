import { Router } from 'express';

import catcherWrapper from '../../helpers/catcherWrapper';
import { UserType } from '../../interfaces/enums';
import AuthMiddleware from '../../middlewares/auth.middleware';
import ProductUnitValidator from '../../validations/productUnit.validate';
import ProductUnitController from '../controllers/productUnit.controller';

const router = Router();

router.get(
  '/',
  ProductUnitValidator.getList,
  catcherWrapper(ProductUnitController.getList)
);

router.post(
  '/',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.ADMIN, UserType.MANAGER]),
  ProductUnitValidator.create,
  catcherWrapper(ProductUnitController.create)
);

router.get(
  '/:id',
  ProductUnitValidator.getById,
  catcherWrapper(ProductUnitController.getById)
);

router.put(
  '/:id',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.ADMIN, UserType.MANAGER]),
  ProductUnitValidator.update,
  catcherWrapper(ProductUnitController.update)
);

export default router;
