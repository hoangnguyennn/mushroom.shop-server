import { Request, Response } from 'express';
import { success } from '../../helpers/commonResponse';
import { mapUserToResponse } from '../../helpers/mappingResponse';
import { IUserUpdate, IUserUpdateRequest } from '../../interfaces';
import UserService from '../../services/user';

const updateUserInfo = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const userInfoRequest: IUserUpdateRequest = req.body;

  const userInfo: IUserUpdate = {
    ...userInfoRequest,
    passwordHashed: userInfoRequest.password
  };

  const userUpdated = await UserService.update(userId, userInfo);
  return success(res, mapUserToResponse(userUpdated));
};

export default {
  updateUserInfo
};
