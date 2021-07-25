import { Document, Types } from 'mongoose';
import { ProductStatus, UserType } from './enums';

export interface ICategory extends Document {
  name: string;
  description: string;
  slug: string;
}

export interface IImage extends Document {
  url: string;
  publicId: string;
}

export interface IPaymentMethod extends Document {
  name: string;
}

export interface IProduct extends Document {
  name: string;
  price: number;
  unitId: Types.ObjectId;
  description: string;
  status: ProductStatus;
  imagesId: Types.ObjectId[];
  categoryId: Types.ObjectId;
  longDescription: string;
  nameNonUnicode: string;

  unit?: IProductUnit;
  images?: IImage[];
  category?: ICategory;
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
