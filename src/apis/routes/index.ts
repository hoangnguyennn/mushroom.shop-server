import { Router } from 'express';

import authRoute from './auth.route';
import categoryRoute from './category.route';
import imageRoute from './image.route';
import orderRoute from './order.route';
import paymentMethodRoute from './paymentMethod.route';
import productRoute from './product.route';
import productUnitRoute from './productUnit.route';
import uploadRoute from './upload.route';
import userRoute from './user.route';
import AuthMiddleware from '../../middlewares/auth.middleware';

const router = Router();

router.use(AuthMiddleware.decodeToken);

router.use('/auth', authRoute);
router.use('/categories', categoryRoute);
router.use('/images', imageRoute);
router.use('/orders', orderRoute);
router.use('/payment-methods', paymentMethodRoute);
router.use('/product-units', productUnitRoute);
router.use('/products', productRoute);
router.use('/upload', uploadRoute);
router.use('/users', userRoute);

export default router;
