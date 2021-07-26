import { config } from 'dotenv';

const envLoaded = config();

if (!envLoaded) {
  throw new Error('.env not found!!!');
}

export default {
  port: Number(process.env.PORT),
  mongoUri: String(process.env.MONGO_URI),
  tokenSecret: String(process.env.TOKEN_SECRET),
  tokenExpiresIn: String(process.env.TOKEN_EXPIRES_IN),
  cloudName: String(process.env.CLOUDINARY_NAME),
  cloudKey: String(process.env.CLOUDINARY_KEY),
  cloudSecret: String(process.env.CLOUDINARY_SECRET),
  mailtrapHost: String(process.env.MAILTRAP_HOST),
  mailtrapPort: String(process.env.MAILTRAP_PORT),
  mailtrapUser: String(process.env.MAILTRAP_USER),
  mailtrapPass: String(process.env.MAILTRAP_PASS),
  maxOfSalt: Number(process.env.MAX_OF_SALT)
};
