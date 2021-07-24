import {
  ICategoryResponse,
  IImageResponse,
  IProductUnitResponse,
  IUserResponse
} from '../interfaces';
import {
  ICategory,
  IImage,
  IProductUnit,
  IUser
} from '../interfaces/IDocument';

export const mapCategoryToResponse = (
  category: ICategory
): ICategoryResponse => {
  return {
    id: category._id,
    name: category.name,
    description: category.description,
    slug: category.slug
  };
};

export const mapImageToResponse = (image: IImage): IImageResponse => {
  return {
    id: image._id,
    url: image.url,
    publicId: image.publicId
  };
};

export const mapProductUnitToResponse = (
  productUnit: IProductUnit
): IProductUnitResponse => {
  return {
    id: productUnit._id,
    name: productUnit.name
  };
};

export const mapUserToResponse = (user: IUser): IUserResponse => {
  return {
    id: user._id,
    email: user.email,
    fullName: user.fullName,
    phone: user.phone,
    address: user.address,
    userType: user.userType
  };
};
