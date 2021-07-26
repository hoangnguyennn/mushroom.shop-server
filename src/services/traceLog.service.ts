import { FilterQuery } from 'mongoose';
import { create, getList } from './base.service';
import { ITraceLog } from '../interfaces/IDocument';
import { ITraceLogCreate } from '../interfaces';
import { mapTraceLogToResponse } from '../helpers/mappingResponse';
import { traceLogPopulate } from '../helpers/mongoPopulate';
import TracelogModel from '../models/traceLog.model';

const TraceLogService = {
  create: async (traceLogData: ITraceLogCreate) => {
    const traceLog: ITraceLogCreate = {
      userId: traceLogData.userId,
      modelName: traceLogData.modelName,
      victimId: traceLogData.victimId,
      victim: traceLogData.victim,
      action: traceLogData.action,
      description: traceLogData.description,
      time: traceLogData.time
    };
    return create({
      model: TracelogModel,
      mapper: mapTraceLogToResponse,
      data: traceLog
    });
  },
  getList: async (query: {
    limit?: number;
    skip?: number;
    filterQuery?: FilterQuery<ITraceLog>;
  }) => {
    return getList({
      model: TracelogModel,
      mapper: mapTraceLogToResponse,
      query,
      populate: traceLogPopulate
    });
  }
};

export default TraceLogService;
