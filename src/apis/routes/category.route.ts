import { Router } from 'express';

import catcherWrapper from '../../helpers/catcherWrapper';
import CategoryController from '../controllers/category.controller';
import CategoryValidator from '../../validations/category.validate';
import AuthMiddleware from '../../middlewares/auth.middleware';
import { UserType } from '../../interfaces/enums';

const router = Router();

router.get(
  '/',
  CategoryValidator.getList,
  catcherWrapper(CategoryController.getList)
);

router.post(
  '/',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.ADMIN, UserType.MANAGER]),
  CategoryValidator.create,
  catcherWrapper(CategoryController.create)
);

router.get(
  '/:id',
  CategoryValidator.getById,
  catcherWrapper(CategoryController.getById)
);

router.put(
  '/:id',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.ADMIN, UserType.MANAGER]),
  CategoryValidator.update,
  catcherWrapper(CategoryController.update)
);

export default router;
