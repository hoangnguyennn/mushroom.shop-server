import { Router } from 'express';

import { UserType } from '../../interfaces/enums';
import AuthMiddleware from '../../middlewares/auth';
import catcherWrapper from '../../helpers/catcherWrapper';
import ProductUnitController from '../controllers/productUnit';

const router = Router();

router.get('/', catcherWrapper(ProductUnitController.get));
router.get('/:id', catcherWrapper(ProductUnitController.getById));

router.post(
  '/',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.MANAGER]),
  catcherWrapper(ProductUnitController.create)
);

router.patch(
  '/:id',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.MANAGER]),
  catcherWrapper(ProductUnitController.update)
);

export default router;
