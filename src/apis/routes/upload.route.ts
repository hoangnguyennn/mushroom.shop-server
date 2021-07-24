import { Router } from 'express';
import multer from 'multer';
import catcherWrapper from '../../helpers/catcherWrapper';
import UploadController from '../controllers/upload.controller';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.post(
  '/single',
  upload.single('file'),
  catcherWrapper(UploadController.uploadSingle)
);

export default router;
