import { NextFunction, Request, Response } from 'express';
import { internalServerError } from './commonResponse';

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export default (controller: AsyncController) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    return controller(req, res, next).catch(error => {
      return internalServerError(next, error);
    });
  };
};
