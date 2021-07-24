import { Router } from 'express';

import catcherWrapper from '../../helpers/catcherWrapper';
import CategoryController from '../controllers/category.controller';
import CategoryValidator from '../../validations/category.validate';

const router = Router();

router.get(
  '/',
  CategoryValidator.getList,
  catcherWrapper(CategoryController.getList)
);

router.post(
  '/',
  CategoryValidator.create,
  catcherWrapper(CategoryController.create)
);

router.get(
  '/:id',
  CategoryValidator.getById,
  catcherWrapper(CategoryController.getById)
);

router.put(
  '/:id',
  CategoryValidator.update,
  catcherWrapper(CategoryController.update)
);

export default router;
