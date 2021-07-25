import { HttpError } from '../helpers/commonResponse';
import { mapUserToResponse } from '../helpers/mappingResponse';
import { NOT_FOUND_FN } from '../helpers/commonMessage';
import UserModel from '../models/user.model';

const UserService = {
  getById: async (id: string) => {
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      throw new HttpError(NOT_FOUND_FN(UserModel.modelName), 404);
    }

    return mapUserToResponse(user);
  }
};

export default UserService;
