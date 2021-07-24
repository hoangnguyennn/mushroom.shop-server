import { Router } from 'express';
import catcherWrapper from '../../helpers/catcherWrapper';
import ProductUnitValidator from '../../validations/productUnit.validate';
import ProductUnitController from '../controllers/productUnit.controller';

const router = Router();

router.get(
  '/',
  ProductUnitValidator.getList,
  catcherWrapper(ProductUnitController.getList)
);

router.post(
  '/',
  ProductUnitValidator.create,
  catcherWrapper(ProductUnitController.create)
);

router.get(
  '/:id',
  ProductUnitValidator.getById,
  catcherWrapper(ProductUnitController.getById)
);

router.put(
  '/:id',
  ProductUnitValidator.update,
  catcherWrapper(ProductUnitController.update)
);

export default router;
