import mongoose from 'mongoose';
import configs from '../configs';

export default async () => {
  await mongoose.connect(configs.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
};
