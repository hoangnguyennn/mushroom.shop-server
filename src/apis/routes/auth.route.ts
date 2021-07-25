import { Router } from 'express';

import catcherWrapper from '../../helpers/catcherWrapper';
import AuthController from '../controllers/auth.controller';
import AuthValidator from '../../validations/auth.validate';
import AuthMiddleware from '../../middlewares/auth.middleware';

const router = Router();

router.post(
  '/sign-up',
  AuthValidator.signUp,
  catcherWrapper(AuthController.signUp)
);
router.post(
  '/sign-in',
  AuthValidator.signIn,
  catcherWrapper(AuthController.signIn)
);

router.post(
  '/me',
  AuthMiddleware.checkAuth,
  catcherWrapper(AuthController.currentUser)
);

export default router;
