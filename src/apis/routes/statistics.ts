import { Router } from 'express';

import { UserType } from '../../interfaces/enums';
import AuthMiddleware from '../../middlewares/auth';
import catcherWrapper from '../../helpers/catcherWrapper';
import StatisticsController from '../controllers/statistics';

const router = Router();

router.get(
  '/',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.MANAGER]),
  catcherWrapper(StatisticsController.statistic)
);

export default router;
