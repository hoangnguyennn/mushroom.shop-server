import { Router } from 'express';

import catcherWrapper from '../../helpers/catcherWrapper';
import ImageController from '../controllers/image.controller';
import ImageValidator from '../../validations/image.validate';
import { UserType } from '../../interfaces/enums';
import AuthMiddleware from '../../middlewares/auth.middleware';

const router = Router();

router.get(
  '/',
  ImageValidator.getList,
  catcherWrapper(ImageController.getList)
);

router.post(
  '/',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.ADMIN, UserType.MANAGER]),
  ImageValidator.create,
  catcherWrapper(ImageController.create)
);

router.get(
  '/:id',
  ImageValidator.getById,
  catcherWrapper(ImageController.getById)
);

export default router;
