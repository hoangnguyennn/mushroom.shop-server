import { FilterQuery, UpdateQuery } from 'mongoose';
import { getById, getList, update } from './base.service';
import { IUser } from '../interfaces/IDocument';
import { mapUserToResponse } from '../helpers/mappingResponse';
import UserModel from '../models/user.model';
import { IUserUpdate, IUserUpdateRequest } from '../interfaces';
import { removeFalsyFields } from '../utils';
import { getHashed } from '../utils/password';

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
  },
  update: async (id: string, userData: IUserUpdateRequest) => {
    await UserService.getById(id);
    const userUpdate: IUserUpdate = removeFalsyFields({
      passwordHashed: userData.password && (await getHashed(userData.password)),
      fullName: userData.fullName,
      phone: userData.phone,
      address: userData.address
    });

    console.log(userUpdate);

    const userUpdateQuery: UpdateQuery<IUser> = {
      $set: userUpdate
    };

    return update({
      model: UserModel,
      mapper: mapUserToResponse,
      id,
      data: userUpdateQuery
    });
  }
};

export default UserService;
