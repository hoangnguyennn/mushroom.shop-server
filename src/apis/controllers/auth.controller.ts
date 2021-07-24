import { Request, Response } from 'express';

import { ISignIn, ISignUp } from '../../interfaces';
import { success } from '../../helpers/commonResponse';
import AuthService from '../../services/auth.service';

const signUp = async (req: Request, res: Response) => {
  const signUpData: ISignUp = req.body;
  const user = await AuthService.signUp(signUpData);
  return success(res, user);
};

const signIn = async (req: Request, res: Response) => {
  const signInData: ISignIn = req.body;
  const { token, user } = await AuthService.signIn(signInData);
  return success(res, { token, user });
};

export default {
  signUp,
  signIn
};
