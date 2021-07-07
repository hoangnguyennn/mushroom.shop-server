import { sign, verify } from 'jsonwebtoken';
import { IPayload } from '../interfaces';
import configs from '../configs';

export const generate = (payload: IPayload) => {
  return sign(payload, configs.tokenSecret, {
    expiresIn: configs.tokenExpiresIn
  });
};

export const decode = (token: string): IPayload | null => {
  try {
    const decoded = verify(token, configs.tokenSecret) as IPayload;
    return decoded;
  } catch {
    return null;
  }
};
