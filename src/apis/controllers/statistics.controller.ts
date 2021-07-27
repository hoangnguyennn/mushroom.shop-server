import { Request, Response } from 'express';
import { success } from '../../helpers/commonResponse';
import StatisticsService from '../../services/statistics.service';

const statistics = async (req: Request, res: Response) => {
  const statistics = await StatisticsService.statistics();
  return success(res, statistics);
};

export default { statistics };
