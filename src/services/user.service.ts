import { FilterQuery } from 'mongoose';
import { getById, getList } from './base.service';
import { IUser } from '../interfaces/IDocument';
import { mapUserToResponse } from '../helpers/mappingResponse';
import UserModel from '../models/user.model';

const UserService = {
  getList: async (query: {
    limit?: number;
    skip?: number;
    filterQuery?: FilterQuery<IUser>;
  }) => {
    return getList({
      model: UserModel,
      mapper: mapUserToResponse,
      query
    });
  },
  getById: async (id: string) => {
    return getById({
      model: UserModel,
      mapper: mapUserToResponse,
      id
    });
  }
};

export default UserService;
