import { Router } from 'express';

import catcherWrapper from '../../helpers/catcherWrapper';
import ImageController from '../controllers/image.controller';
import ImageValidator from '../../validations/image.validate';

const router = Router();

router.get(
  '/',
  ImageValidator.getList,
  catcherWrapper(ImageController.getList)
);

router.post('/', ImageValidator.create, catcherWrapper(ImageController.create));

router.get(
  '/:id',
  ImageValidator.getById,
  catcherWrapper(ImageController.getById)
);

export default router;
