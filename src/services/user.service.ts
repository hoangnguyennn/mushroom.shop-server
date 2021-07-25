import { COMMON_MESSAGE, HttpError } from '../helpers/commonResponse';
import { mapUserToResponse } from '../helpers/mappingResponse';
import UserModel from '../models/user.model';

const UserService = {
  getById: async (id: string) => {
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, 404);
    }

    return mapUserToResponse(user);
  }
};

export default UserService;
