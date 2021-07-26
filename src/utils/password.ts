import bcrypt from 'bcrypt';
import configs from '../configs';

export const getHashed = async (planText: string) => {
  const saltRounds = Math.round(Math.random() * configs.maxOfSalt);
  const hashed = await bcrypt.hash(planText, saltRounds);
  return hashed;
};

export const compareHash = async (planText: string, hashed: string) => {
  const result = await bcrypt.compare(planText, hashed);
  return result;
};
