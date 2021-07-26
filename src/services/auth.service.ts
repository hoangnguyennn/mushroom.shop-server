import { generateToken } from '../utils/token';
import { HttpError } from '../helpers/commonResponse';
import { IPayload, ISignIn, ISignUp, IUserCreate } from '../interfaces';
import { mapUserToResponse } from '../helpers/mappingResponse';
import { NOT_FOUND_FN } from '../helpers/commonMessage';
import { UserType } from '../interfaces/enums';
import UserModel from '../models/user.model';
import { compareHash, getHashed } from '../utils/password';

const signUp = async (signUpData: ISignUp) => {
  const user: IUserCreate = {
    email: signUpData.email,
    passwordHashed: await getHashed(signUpData.password),
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
    throw new HttpError(NOT_FOUND_FN(UserModel.modelName), 404);
  }

  const result = await compareHash(signInData.password, user.passwordHashed);
  if (!result) {
    throw new HttpError(NOT_FOUND_FN(UserModel.modelName), 404);
  }

  const payload: IPayload = {
    userId: user._id,
    userType: user.userType
  };

  const token = generateToken(payload);
  return { token, user: mapUserToResponse(user) };
};

export default { signUp, signIn };
