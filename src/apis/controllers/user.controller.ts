import { Request, Response } from 'express';
import { success } from '../../helpers/commonResponse';
import UserService from '../../services/user.service';

const getList = async (req: Request, res: Response) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);

  const users = await UserService.getList({
    limit: pageSize,
    skip: (page - 1) * pageSize
  });
  return success(res, users);
};

export default { getList };
