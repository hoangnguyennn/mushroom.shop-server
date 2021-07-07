import { Request, Response, NextFunction } from 'express';
import { internalServerError } from './commonResponse';

interface AsyncFunction {
  (req: Request, res: Response, next: NextFunction): Promise<any>;
}

export default (fn: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => {
      console.log(err.stack ? err.stack : err);
      return internalServerError(next, err.message);
    });
  };
};
