import { ProductStatus, UserType } from './enums';

interface IResponse {
  id: string;
}

export interface ICategoryCreate {
  name: string;
  description: string;
  slug: string;
}

export interface ICategoryResponse extends IResponse {
  name: string;
  description: string;
  slug: string;
}

export interface IImageCreate {
  url: string;
  publicId: string;
}

export interface IImageResponse extends IResponse {
  url: string;
  publicId: string;
}

export interface IPayload {
  userId: string;
  userType: string;
}

export interface IPaymentMethodCreate {
  name: string;
}

export interface IPaymentMethodResponse extends IResponse {
  name: string;
}

export interface IProductRequest {
  name: string;
  price: number;
  unitId: string;
  description: string;
  status: ProductStatus;
  imagesId: ({ id: string } | IImageCreate)[];
  categoryId: string;
  longDescription: string;
}

export interface IProductCreate {
  name: string;
  price: number;
  unitId: string;
  description: string;
  status: ProductStatus;
  imagesId: string[];
  categoryId: string;
  longDescription: string;
}

export interface IProductResponse extends IResponse {
  name: string;
  price: number;
  description: string;
  status: ProductStatus;
  longDescription: string;
  unit?: IProductUnitResponse;
  images?: IImageResponse[];
  category?: ICategoryResponse;
}

export interface IProductUnitCreate {
  name: string;
}

export interface IProductUnitResponse extends IResponse {
  name: string;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignUp {
  email: string;
  password: string;
  fullName: string;
  phone: string;
}

export interface IUserCreate {
  email: string;
  passwordHashed: string;
  fullName: string;
  phone: string;
  address?: string;
  userType?: UserType;
  isActivated?: boolean;
}

export interface IUserResponse extends IResponse {
  email: string;
  fullName: string;
  phone: string;
  address: string;
  userType: UserType;
}
