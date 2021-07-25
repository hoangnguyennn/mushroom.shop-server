import { NextFunction, Request, Response } from 'express';
import {
  unauthorized,
  COMMON_MESSAGE,
  forbidden,
  notFound
} from '../helpers/commonResponse';
import { UserType } from '../interfaces/enums';
import { decodeToken } from '../utils/token';

const AuthMiddleware = {
  decodeToken: (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return next();
    }

    const token = String(bearerToken).split(' ')[1];
    const decoded = decodeToken(token);

    if (!decoded) {
      return next();
    }

    req.user = decoded;
    return next();
  },
  checkAuth: (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return unauthorized(next, COMMON_MESSAGE.UNAUTHORIZED);
    }

    const token = String(bearerToken).split(' ')[1];
    const decoded = decodeToken(token);

    if (!decoded) {
      return forbidden(next, COMMON_MESSAGE.INVALID_TOKEN);
    }

    req.user = decoded;
    return next();
  },

  checkRole: (roles: UserType[]) => {
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
  }
};

export default AuthMiddleware;
