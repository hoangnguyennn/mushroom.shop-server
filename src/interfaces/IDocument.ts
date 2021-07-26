import { Document, Types } from 'mongoose';
import {
  CollectionName,
  DatabaseAction,
  OrderStatus,
  PaymentStatus,
  ProductStatus,
  UserType
} from './enums';

export interface ICategory extends Document {
  name: string;
  description: string;
  slug: string;
}

export interface IImage extends Document {
  url: string;
  publicId: string;
}

export interface IOrder extends Document {
  userId?: Types.ObjectId;
  deliveryEmail: string;
  deliveryFullName: string;
  deliveryPhone: string;
  deliveryAddress: string;
  deliveryDate?: Date;
  paymentMethodId: Types.ObjectId;
  paymentStatus: PaymentStatus;
  orderDate: Date;
  orderStatus: OrderStatus;
  itemsId: Types.ObjectId;

  user?: IUser;
  paymentMethod?: IPaymentMethod;
  items?: IOrderItem[];
}

export interface IOrderItem extends Document {
  productId: Types.ObjectId;
  price: number;
  qty: number;

  product?: IProduct;
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

export interface ITraceLog extends Document {
  userId: Types.ObjectId;
  modelName: CollectionName;
  victimId: Types.ObjectId;
  victim: { [key: string]: any };
  action: DatabaseAction;
  description: string;
  time: Date;

  user?: IUser;
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
