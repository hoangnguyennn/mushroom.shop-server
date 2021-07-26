import { Request, Response } from 'express';
import { success } from '../../helpers/commonResponse';
import { IImageCreate, ITraceLogCreate } from '../../interfaces';
import { CollectionName, DatabaseAction } from '../../interfaces/enums';
import ImageService from '../../services/image.service';
import TraceLogService from '../../services/traceLog.service';

const create = async (req: Request, res: Response) => {
  const imageData: IImageCreate = req.body;
  const image = await ImageService.create(imageData);
  const userId = req.user?.userId as string;
  const traceLog: ITraceLogCreate = {
    userId: userId,
    modelName: CollectionName.IMAGE,
    victimId: image.id,
    victim: image,
    action: DatabaseAction.CREATE,
    description: 'Create a new image',
    time: Date.now()
  };
  await TraceLogService.create(traceLog);
  return success(res, image);
};

const getList = async (req: Request, res: Response) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);

  const images = await ImageService.getList({
    limit: pageSize,
    skip: (page - 1) * pageSize
  });
  return success(res, images);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const image = await ImageService.getById(id);
  return success(res, image);
};

export default { create, getList, getById };
