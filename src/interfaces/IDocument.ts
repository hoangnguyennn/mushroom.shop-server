import { Document } from 'mongoose';
import { UserType } from './enums';

export interface ICategory extends Document {
  name: string;
  description: string;
  slug: string;
}

export interface IProductUnit extends Document {
  name: string;
}

export interface IUser extends Document {
  email: string;
  passwordHashed: string;
  fullName: string;
  phone: string;
  address: string;
  userType: UserType;
  isActivated: boolean;
}
