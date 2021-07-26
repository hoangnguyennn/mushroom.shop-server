import { model, Schema, Types } from 'mongoose';
import { CollectionName, DatabaseAction } from '../interfaces/enums';
import { ITraceLog } from '../interfaces/IDocument';

const traceLogSchema = new Schema<ITraceLog>({
  userId: {
    type: Types.ObjectId,
    ref: CollectionName.USER,
    required: true
  },
  modelName: {
    type: String,
    enum: CollectionName,
    required: true
  },
  victimId: {
    type: Types.ObjectId,
    required: true
  },
  victim: {
    type: Schema.Types.Mixed,
    required: true
  },
  action: {
    type: String,
    enum: DatabaseAction,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});

traceLogSchema.virtual('user', {
  ref: CollectionName.USER,
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

export default model<ITraceLog>(CollectionName.TRACE_LOG, traceLogSchema);
