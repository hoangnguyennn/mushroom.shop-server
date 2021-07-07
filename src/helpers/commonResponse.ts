import { NextFunction, Request, Response } from 'express';

const isDev = process.env.NODE !== 'production';

type HttpStatusCode = 200 | 400 | 401 | 403 | 404 | 500;

export enum COMMON_MESSAGE {
  BAD_REQUEST = 'bad request',
  FORBIDDEN = 'forbidden',
  INTERNAL_SERVER_ERROR = 'internal server error',
  INVALID_TOKEN = 'invalid token',
  NOT_FOUND = 'not found',
  SUCCESS = 'success',
  UNAUTHORIZED = 'unauthorized'
}

export class HttpError extends Error {
  httpStatusCode: HttpStatusCode;

  constructor(message: string, httpStatusCode: HttpStatusCode, stack?: any) {
    super(message);

    this.stack = stack;
    this.httpStatusCode = httpStatusCode;
  }
}

export const success = (res: Response, data: any = {}) => {
  return res.status(200).json(data);
};

export const badRequest = (
  next: NextFunction,
  message: string = COMMON_MESSAGE.BAD_REQUEST
) => {
  const error = new HttpError(message, 400);
  return next(error);
};

export const unauthorized = (
  next: NextFunction,
  message: string = COMMON_MESSAGE.UNAUTHORIZED
) => {
  const error = new HttpError(message, 401);
  return next(error);
};

export const forbidden = (
  next: NextFunction,
  message: string = COMMON_MESSAGE.FORBIDDEN
) => {
  const error = new HttpError(message, 403);
  return next(error);
};

export const notFound = (
  next: NextFunction,
  message: string = COMMON_MESSAGE.NOT_FOUND
) => {
  const error = new HttpError(message, 404);
  return next(error);
};

export const internalServerError = (
  next: NextFunction,
  message: string = COMMON_MESSAGE.INTERNAL_SERVER_ERROR
) => {
  const error = new HttpError(message, 500);
  return next(error);
};

export const handleError = (
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  return res.status(err.httpStatusCode || 500).json({
    message: err.message,
    stack: isDev ? err.stack : undefined
  });
};
