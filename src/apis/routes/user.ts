import { Router } from 'express';

import UserController from '../controllers/user';
import AuthMiddleware from '../../middlewares/auth';

const router = Router();

router.patch('/:id', AuthMiddleware.checkAuth, UserController.updateUserInfo);

export default router;
