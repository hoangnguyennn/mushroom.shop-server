import { Router } from 'express';

import { UserType } from '../../interfaces/enums';
import AuthMiddleware from '../../middlewares/auth';
import catcherWrapper from '../../helpers/catcherWrapper';
import ProductController from '../controllers/product';

const router = Router();

router.get('/', catcherWrapper(ProductController.get));
router.get('/trending', catcherWrapper(ProductController.getTrending));
router.get('/:id', catcherWrapper(ProductController.getById));

router.post(
  '/',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.MANAGER]),
  catcherWrapper(ProductController.create)
);

router.patch(
  '/:id',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.MANAGER]),
  catcherWrapper(ProductController.update)
);

router.post(
  '/:id/update-status',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.MANAGER]),
  catcherWrapper(ProductController.updateStatus)
);

export default router;
