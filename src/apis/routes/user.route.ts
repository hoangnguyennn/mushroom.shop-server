import { Router } from 'express';

import { UserType } from '../../interfaces/enums';
import AuthMiddleware from '../../middlewares/auth.middleware';
import catcherWrapper from '../../helpers/catcherWrapper';
import UserController from '../controllers/user.controller';
import UserValidator from '../../validations/user.validate';

const router = Router();

router.get(
  '/',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.ADMIN, UserType.MANAGER]),
  UserValidator.getList,
  catcherWrapper(UserController.getList)
);

router.patch(
  '/:id',
  AuthMiddleware.checkAuth,
  UserValidator.update,
  catcherWrapper(UserController.update)
);

export default router;
