import { Request, Response } from 'express';

import { generate } from '../../utils/token';
import {
  ILogin,
  ILoginResponse,
  IPayload,
  IUserCreate,
  IUserCreateRequest
} from '../../interfaces';
import { mapUserToResponse } from '../../helpers/mappingResponse';
import { success } from '../../helpers/commonResponse';
import { UserType } from '../../interfaces/enums';
import AuthService from '../../services/auth';
import UserService from '../../services/user';

const getCurrentUser = async (req: Request, res: Response) => {
  const { userId } = res.locals;

  const user = await UserService.getById(userId);
  return success(res, mapUserToResponse(user));
};

const login = async (req: Request, res: Response) => {
  const credential: ILogin = req.body;
  const user = await AuthService.login(credential);

  const payload: IPayload = {
    userId: user._id,
    userType: user.userType
  };

  const token = generate(payload);
  const loginResponse: ILoginResponse = {
    token,
    user: mapUserToResponse(user)
  };

  return success(res, loginResponse);
};

const register = async (req: Request, res: Response) => {
  const userCreateRequest: IUserCreateRequest = req.body;
  const userCreate: IUserCreate = {
    ...userCreateRequest,
    passwordHashed: userCreateRequest.password,
    userType: UserType.CUSTOMER,
    isActivated: true
  };

  const userCreated = await AuthService.register(userCreate);
  return success(res, mapUserToResponse(userCreated));
};

export default {
  getCurrentUser,
  login,
  register
};
