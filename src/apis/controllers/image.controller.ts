import { Request, Response } from 'express';
import { success } from '../../helpers/commonResponse';
import { IImageCreate } from '../../interfaces';
import ImageService from '../../services/image.service';

const create = async (req: Request, res: Response) => {
  const imageData: IImageCreate = req.body;
  const image = await ImageService.create(imageData);
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
