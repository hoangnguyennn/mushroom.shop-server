import { Request, Response } from 'express';
import { success } from '../../helpers/commonResponse';
import { IUserUpdateRequest } from '../../interfaces';
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

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userData: IUserUpdateRequest = req.body;
  const user = await UserService.update(id, userData);
  return success(res, user);
};

export default { getList, update };
