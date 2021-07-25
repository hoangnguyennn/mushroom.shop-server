import express, { Application } from 'express';
import cors from 'cors';

import apiRoutes from '../apis/routes';
import { notFound, handleError } from '../helpers/commonResponse';
import logger from '../helpers/logger';

const isDev = process.env.NODE_ENV !== 'production';

export default async (app: Application) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  isDev && app.use(logger());

  app.get('/', (req, res) => {
    return res.send('Hello');
  });

  app.use(apiRoutes);

  app.use((req, res, next) => notFound(next, `Endpoint ${req.url} not found`));

  app.use(handleError);
};
