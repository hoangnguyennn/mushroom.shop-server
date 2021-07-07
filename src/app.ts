import express from 'express';

import configs from './configs';
import loaders from './loaders';

const startServer = async () => {
  const app = express();
  const port = configs.port || 5000;

  await loaders(app);

  app.listen(port, () => console.log(`App was running at port ${port}`));
};

startServer();
