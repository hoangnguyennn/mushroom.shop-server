import { Router } from 'express';

import catcherWrapper from '../../helpers/catcherWrapper';
import StatisticsController from '../controllers/statistics.controller';

const router = Router();

router.get('/', catcherWrapper(StatisticsController.statistics));

export default router;
