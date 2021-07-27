import { NextFunction, Request, Response } from 'express';

import { ISignIn, ISignUp } from '../../interfaces';
import { success, unauthorized } from '../../helpers/commonResponse';
import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';
import MailerService from '../../services/mailler.service';

const signUp = async (req: Request, res: Response) => {
  const signUpData: ISignUp = req.body;
  const user = await AuthService.signUp(signUpData);
  await MailerService.sendWelcomeMail({
    email: user.email,
    fullName: user.fullName
  });
  return success(res, user);
};

const signIn = async (req: Request, res: Response) => {
  const signInData: ISignIn = req.body;
  const { token, user } = await AuthService.signIn(signInData);
  return success(res, { token, user });
};

const currentUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.userId;

  if (!userId) {
    return unauthorized(next);
  }

  const user = await UserService.getById(userId);
  return success(res, user);
};

export default {
  signUp,
  signIn,
  currentUser
};
