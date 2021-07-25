import { Router } from 'express';
import multer from 'multer';
import catcherWrapper from '../../helpers/catcherWrapper';
import { UserType } from '../../interfaces/enums';
import AuthMiddleware from '../../middlewares/auth.middleware';
import UploadController from '../controllers/upload.controller';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.post(
  '/single',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.ADMIN, UserType.MANAGER]),
  upload.single('file'),
  catcherWrapper(UploadController.uploadSingle)
);

export default router;
