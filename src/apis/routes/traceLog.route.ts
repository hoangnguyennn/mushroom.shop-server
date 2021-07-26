import { Router } from 'express';
import { UserType } from '../../interfaces/enums';
import AuthMiddleware from '../../middlewares/auth.middleware';
import catcherWrapper from '../../helpers/catcherWrapper';
import TraceLogController from '../controllers/traceLog.controller';
import TraceLogValidator from '../../validations/traceLog.validate';

const router = Router();

router.get(
  '/',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.ADMIN, UserType.MANAGER]),
  TraceLogValidator.getList,
  catcherWrapper(TraceLogController.getList)
);

export default router;
