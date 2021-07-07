import { Router } from 'express';

import { UserType } from '../../interfaces/enums';
import AuthMiddleware from '../../middlewares/auth';
import catcherWrapper from '../../helpers/catcherWrapper';
import CategoryController from '../controllers/category';

const router = Router();

router.get('/', catcherWrapper(CategoryController.get));
router.get(
  '/slug/:slug/products',
  catcherWrapper(CategoryController.getProductsByCategorySlug)
);

router.post(
  '/',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.MANAGER]),
  catcherWrapper(CategoryController.create)
);

export default router;
