import { model, Schema } from 'mongoose';
import { IUser } from '../interfaces/IDocuments';
import { CollectionName, UserType } from '../interfaces/enums';

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHashed: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: UserType,
    default: UserType.CUSTOMER
  },
  isActivated: {
    type: Boolean
  }
});

userSchema.pre('save', function(next) {
  const userType = this.userType || UserType.MANAGER;
  this.isActivated = userType === UserType.CUSTOMER;
  next();
});

export default model<IUser>(CollectionName.USER, userSchema);
