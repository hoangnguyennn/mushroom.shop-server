import { Request, Response, NextFunction } from 'express';
import {
  COMMON_MESSAGE,
  forbidden,
  notFound,
  unauthorized
} from '../helpers/commonResponse';
import { decode } from '../utils/token';
import { UserType } from '../interfaces/enums';

const decodeToken = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return next();
  }

  const token = String(bearerToken).split(' ')[1];
  const decoded = decode(token);

  if (!decoded) {
    return next();
  }

  res.locals.userId = decoded.userId;
  res.locals.userType = decoded.userType;
  return next();
};

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return unauthorized(next, COMMON_MESSAGE.UNAUTHORIZED);
  }

  const token = String(bearerToken).split(' ')[1];
  const decoded = decode(token);

  if (!decoded) {
    return forbidden(next, COMMON_MESSAGE.INVALID_TOKEN);
  }

  res.locals.userId = decoded.userId;
  res.locals.userType = decoded.userType;
  return next();
};

const checkRole = (roles: UserType[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userId, userType } = res.locals;

    if (!userId) {
      return notFound(next);
    }

    if (!roles.includes(userType)) {
      return forbidden(next);
    }

    return next();
  };
};

export default {
  decodeToken,
  checkAuth,
  checkRole
};
