import { Router } from 'express';

import catcherWrapper from '../../helpers/catcherWrapper';
import AuthController from '../controllers/auth.controller';
import AuthValidator from '../../validations/auth.validate';

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

export default router;
