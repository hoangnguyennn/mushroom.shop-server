import { Application, json, urlencoded } from 'express';
import { errors } from 'celebrate';
import cors from 'cors';

import routers from '../apis/routes';
import { handleError, notFound } from '../helpers/commonResponse';
import logRequest from '../helpers/logRequest';

const isDev = process.env.NODE_ENV !== 'production';

export default async (app: Application) => {
  // load middlewares
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    return res.send('Hello');
  });

  isDev && app.use(logRequest());

  // load routes
  app.use(routers);

  // load error handler
  // celebrate error handler
  app.use(errors());

  // not found error handler
  app.use((req, res, next) => notFound(next));

  app.use(handleError);
};
