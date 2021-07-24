import { Router } from 'express';

import authRoute from './auth.route';
import categoryRoute from './category.route';
import productUnitRoute from './productUnit.route';

const router = Router();

router.use('/auth', authRoute);
router.use('/categories', categoryRoute);
router.use('/product-units', productUnitRoute);

export default router;
