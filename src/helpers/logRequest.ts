import { NextFunction, Request, Response } from 'express';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('--------------------');
    console.log(`${req.method} ${req.url}`);
    console.log(req.body);
    return next();
  };
};
