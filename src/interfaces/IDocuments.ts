import { Types, Document } from 'mongoose';
import { OrderStatus, PaymentStatus, ProductStatus, UserType } from './enums';

export interface ICategory extends Document {
  name: string;
  slug: string;
}

export interface IImage extends Document {
  url: string;
  publicId: string;
}

export interface IOrder extends Document {
  userId?: Types.ObjectId;
  deliveryFullName: string;
  deliveryAddress: string;
  deliveryPhone: string;
  deliveryEmail: string;
  deliveryDate?: number;
  paymentMethodId: Types.ObjectId;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  orderDate: number;
  itemsId: Types.ObjectId[];

  user?: IUser;
  paymentMethod?: IPaymentMethod;
  items: IOrderItem[];
}

export interface IOrderItem extends Document {
  productId: Types.ObjectId;
  price: number;
  qty: number;

  product?: IProduct;
}

export interface IPaymentMethod extends Document {
  name: string;
  imageUrl: string;
  accessKey?: string;
  secretKey?: string;
  publicKey?: string;
  host?: string;
  description?: string;
}

export interface IProduct extends Document {
  name: string;
  price: number;
  unitId: Types.ObjectId;
  description: string;
  status: ProductStatus;
  imagesId: Types.ObjectId[];
  categoryId: Types.ObjectId;
  nameNonUnicode: string;
  longDescription?: string;

  unit?: IProductUnit;
  images?: IImage[];
  category?: ICategory;
}

export interface IProductUnit extends Document {
  name: string;
}

export interface ITracking extends Document {
  orderId: Types.ObjectId;
  orderStatus: OrderStatus;
  dateTime: number;
  description?: string;
}

export interface IUser extends Document {
  email: string;
  passwordHashed: string;
  fullName: string;
  address: string;
  phone: string;
  userType: UserType;
  isActivated: boolean;
}
