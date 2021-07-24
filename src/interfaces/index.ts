import { UserType } from './enums';

export interface ICategoryCreate {
  name: string;
  description: string;
  slug: string;
}

export interface ICategoryResponse {
  id: string;
  name: string;
  description: string;
  slug: string;
}

export interface IImageCreate {
  url: string;
  publicId: string;
}

export interface IImageResponse {
  id: string;
  url: string;
  publicId: string;
}

export interface IPayload {
  userId: string;
  userType: string;
}

export interface IProductUnitCreate {
  name: string;
}

export interface IProductUnitResponse {
  id: string;
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

export interface IUserResponse {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  userType: UserType;
}
