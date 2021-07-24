import jwt from 'jsonwebtoken';
import { IPayload } from '../interfaces';
import configs from '../configs';

export const generateToken = (payload: IPayload) => {
  return jwt.sign(payload, configs.tokenSecret, {
    expiresIn: configs.tokenExpiresIn
  });
};

export const decodeToken = (token: string): IPayload | null => {
  try {
    const decoded = jwt.verify(token, configs.tokenSecret) as IPayload;
    return decoded;
  } catch {
    return null;
  }
};
