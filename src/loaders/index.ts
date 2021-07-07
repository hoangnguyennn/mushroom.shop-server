import { Application } from 'express';

import mongooseLoader from './mongoose';
import expressLoader from './express';
import cron from '../cron';

export default async (app: Application) => {
  await mongooseLoader();
  await expressLoader(app);

  // register crons
  cron();
};
