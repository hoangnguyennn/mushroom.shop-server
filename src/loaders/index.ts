import { Application } from 'express';

import mongooseLoader from './mongoose';
import expressLoader from './express';

export default async (app: Application) => {
  await mongooseLoader();
  await expressLoader(app);
};
