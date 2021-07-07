import mongoose from 'mongoose';

import configs from '../configs';

export default async () => {
  await mongoose.connect(configs.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;
  db.on('error', () => {
    console.error('Connection error');
  });

  db.once('open', () => {
    console.log('MongoDB connected');
  });
};
