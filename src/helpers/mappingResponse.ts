import { ICategoryResponse, IUserResponse } from '../interfaces';
import { ICategory, IUser } from '../interfaces/IDocument';

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
