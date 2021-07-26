import { Request, Response } from 'express';
import { success } from '../../helpers/commonResponse';
import TraceLogService from '../../services/traceLog.service';

const getList = async (req: Request, res: Response) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);

  const traceLogs = await TraceLogService.getList({
    limit: pageSize,
    skip: (page - 1) * pageSize
  });
  return success(res, traceLogs);
};

export default { getList };
