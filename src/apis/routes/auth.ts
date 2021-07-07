import { Router } from 'express';

import AuthController from '../controllers/auth';
import AuthMiddleware from '../../middlewares/auth';
import catcherWrapper from '../../helpers/catcherWrapper';

const router = Router();

router.post('/login', catcherWrapper(AuthController.login));
router.post('/register', catcherWrapper(AuthController.register));
router.post(
  '/me',
  AuthMiddleware.checkAuth,
  catcherWrapper(AuthController.getCurrentUser)
);

export default router;
