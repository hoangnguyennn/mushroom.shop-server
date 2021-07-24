import express from 'express';

import configs from './configs';
import loaders from './loaders';

const startup = async () => {
  const app = express();
  const port = configs.port;

  await loaders(app);

  app.listen(port, () => console.log(`App was running on port ${port}`));
};

startup();
