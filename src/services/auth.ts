import { COMMON_MESSAGE, HttpError } from '../helpers/commonResponse';
import { ILogin, IUserCreate } from '../interfaces';
import { IUser } from '../interfaces/IDocuments';
import { removeInvalidFields } from '../utils';
import UserModel from '../models/user';

const login = async (credential: ILogin): Promise<IUser> => {
  const user = await UserModel.findOne({ email: credential.email });

  if (!user) {
    throw new HttpError(COMMON_MESSAGE.NOT_FOUND, 404);
  }

  if (user.passwordHashed !== credential.password) {
    throw new HttpError(COMMON_MESSAGE.NOT_FOUND, 404);
  }

  return user;
};

const register = async (user: IUserCreate): Promise<IUser> => {
  const userLint = removeInvalidFields({
    email: user.email,
    passwordHashed: user.passwordHashed,
    fullName: user.fullName,
    phone: user.phone,
    userType: user.userType,
    isActivated: user.isActivated
  });

  return UserModel.create(userLint);
};

export default {
  login,
  register
};
