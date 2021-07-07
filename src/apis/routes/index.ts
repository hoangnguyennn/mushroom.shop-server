import { Router } from 'express';

import AuthMiddleware from '../../middlewares/auth';

import authRoute from './auth';
import categoryRoute from './category';
import orderRoute from './order';
import paymentMethodRoute from './paymentMethod';
import productRoute from './product';
import productUnitRoute from './productUnit';
import statisticsRoute from './statistics';
import uploadRoute from './upload';
import userRoute from './user';

const router = Router();

// decode token if they sent to server
router.use(AuthMiddleware.decodeToken);

router.use('/auth', authRoute);
router.use('/categories', categoryRoute);
router.use('/orders', orderRoute);
router.use('/payment-methods', paymentMethodRoute);
router.use('/product-units', productUnitRoute);
router.use('/products', productRoute);
router.use('/statistics', statisticsRoute);
router.use('/upload', uploadRoute);
router.use('/users', userRoute);

export default router;
