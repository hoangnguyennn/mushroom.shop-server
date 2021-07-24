import { NextFunction, Request, Response } from 'express';
import { badRequest, success } from '../../helpers/commonResponse';
import UploadService from '../../services/upload.service';

const uploadSingle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filePath = req.file?.path;
  if (!filePath) {
    return badRequest(next);
  }

  const uploadResponse = await UploadService.uploadSingle(filePath);
  return success(res, uploadResponse);
};

export default { uploadSingle };
