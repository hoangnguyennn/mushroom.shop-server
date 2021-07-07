import { Router } from 'express';
import multer from 'multer';

import { uploadSingleFile } from '../../helpers/uploadFile';
import { UserType } from '../../interfaces/enums';
import AuthMiddleware from '../../middlewares/auth';
import catcherWrapper from '../../helpers/catcherWrapper';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.post(
  '/',
  AuthMiddleware.checkAuth,
  AuthMiddleware.checkRole([UserType.MANAGER]),
  upload.single('file'),
  catcherWrapper(uploadSingleFile)
);

export default router;
