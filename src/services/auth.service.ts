import { IPayload, ISignIn, ISignUp, IUserCreate } from '../interfaces';
import { mapUserToResponse } from '../helpers/mappingResponse';
import { UserType } from '../interfaces/enums';
import UserModel from '../models/user.model';
import { COMMON_MESSAGE, HttpError } from '../helpers/commonResponse';
import { generateToken } from '../utils/token';

const signUp = async (signUpData: ISignUp) => {
  const user: IUserCreate = {
    email: signUpData.email,
    passwordHashed: signUpData.password,
    fullName: signUpData.fullName,
    phone: signUpData.phone,
    address: '',
    userType: UserType.CUSTOMER,
    isActivated: true
  };
  const userCreated = await UserModel.create(user);
  return mapUserToResponse(userCreated);
};

const signIn = async (signInData: ISignIn) => {
  const user = await UserModel.findOne({ email: signInData.email });

  if (!user) {
    throw new HttpError(COMMON_MESSAGE.NOT_FOUND, 404);
  }

  if (user.passwordHashed !== signInData.password) {
    throw new HttpError(COMMON_MESSAGE.NOT_FOUND, 404);
  }

  const payload: IPayload = {
    userId: user._id,
    userType: user.userType
  };

  const token = generateToken(payload);
  return { token, user: mapUserToResponse(user) };
};

export default { signUp, signIn };
