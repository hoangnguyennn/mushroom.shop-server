import {
  ICategoryResponse,
  IImageResponse,
  IProductResponse,
  IProductUnitResponse,
  IUserResponse
} from '../interfaces';
import {
  ICategory,
  IImage,
  IProduct,
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

export const mapProductToResponse = (product: IProduct): IProductResponse => {
  return {
    id: product._id,
    name: product.name,
    price: product.price,
    description: product.description,
    status: product.status,
    longDescription: product.longDescription,
    unit: product.unit && mapProductUnitToResponse(product.unit),
    images: product.images && product.images.map(mapImageToResponse),
    category: product.category && mapCategoryToResponse(product.category)
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
