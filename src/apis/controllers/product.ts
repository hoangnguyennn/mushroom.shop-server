import { Request, Response } from 'express';
import {
  IProductCreate,
  IProductCreateRequest,
  IProductUpdateRequest
} from '../../interfaces';

import {
  mapProductToResponse,
  mapProductToResponseForAdmin
} from '../../helpers/mappingResponse';
import { success } from '../../helpers/commonResponse';
import { ProductStatus, UserType } from '../../interfaces/enums';
import ImageService from '../../services/image';
import mapQueryToMongoFilter from '../../helpers/mapQueryToMongoFilter';
import ProductService from '../../services/product';
import { IImage } from '../../interfaces/IDocuments';

const create = async (req: Request, res: Response) => {
  const productRequest: IProductCreateRequest = req.body;

  const imagesPromise = productRequest.images.map(image => {
    return ImageService.create({ url: image.url, publicId: image.publicId });
  });

  const images = await Promise.all(imagesPromise);
  const productCreate: IProductCreate = {
    ...productRequest,
    description: productRequest.description || '',
    imagesId: images.map(image => image._id)
  };

  const productCreated = await ProductService.create(productCreate);
  return success(res, mapProductToResponse(productCreated));
};

const get = async (req: Request, res: Response) => {
  const { userType } = res.locals;
  const filter = mapQueryToMongoFilter(req.query);
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 999;

  if (userType !== UserType.MANAGER) {
    filter.status = ProductStatus.SELLING;
  }

  const products = await ProductService.get(
    filter,
    (page - 1) * pageSize,
    pageSize
  );

  const productsCount = await ProductService.count();

  const mappingToResponse =
    userType === UserType.MANAGER
      ? mapProductToResponseForAdmin
      : mapProductToResponse;

  return success(res, {
    data: products.map(value => mappingToResponse(value)),
    total: productsCount
  });
};

const getById = async (req: Request, res: Response) => {
  const { userType } = res.locals;
  const { id } = req.params;
  const product = await ProductService.getById(id);

  const mappingToResponse =
    userType === UserType.MANAGER
      ? mapProductToResponseForAdmin
      : mapProductToResponse;

  return success(res, mappingToResponse(product));
};

const getTrending = async (req: Request, res: Response) => {
  const { userType } = res.locals;
  const products = await ProductService.getTrending();

  const mappingToResponse =
    userType === UserType.MANAGER
      ? mapProductToResponseForAdmin
      : mapProductToResponse;

  return success(
    res,
    products.map(value => mappingToResponse(value))
  );
};

const update = async (req: Request, res: Response) => {
  const { userType } = res.locals;
  const { id } = req.params;
  const productUpdateRequest: IProductUpdateRequest = req.body;

  const imagesPromise = productUpdateRequest.images.map((image: any) => {
    if (image.id) {
      return { _id: image.id } as IImage;
    } else {
      return ImageService.create({ url: image.url, publicId: image.publicId });
    }
  });

  const images = await Promise.all(imagesPromise);
  const productUpdate: IProductCreate = {
    ...productUpdateRequest,
    description: productUpdateRequest.description || '',
    imagesId: images.map(image => image._id)
  };

  const mappingToResponse =
    userType === UserType.MANAGER
      ? mapProductToResponseForAdmin
      : mapProductToResponse;

  const productUpdated = await ProductService.update(id, productUpdate);
  return success(res, mappingToResponse(productUpdated));
};

const updateStatus = async (req: Request, res: Response) => {
  const { userType } = res.locals;
  const { id } = req.params;
  const { status } = req.body;

  const mappingToResponse =
    userType === UserType.MANAGER
      ? mapProductToResponseForAdmin
      : mapProductToResponse;

  const productUpdated = await ProductService.updateStatus(id, status);
  return success(res, mappingToResponse(productUpdated));
};

export default {
  create,
  get,
  getById,
  getTrending,
  update,
  updateStatus
};
