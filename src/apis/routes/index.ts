import { Router } from 'express';

import authRoute from './auth.route';
import categoryRoute from './category.route';
import productRoute from './product.route';
import productUnitRoute from './productUnit.route';
import uploadRoute from './upload.route';

const router = Router();

router.use('/auth', authRoute);
router.use('/categories', categoryRoute);
router.use('/product-units', productUnitRoute);
router.use('/products', productRoute);
router.use('/upload', uploadRoute);

export default router;
