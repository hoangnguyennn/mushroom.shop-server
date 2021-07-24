import { FilterQuery, Model, Document } from 'mongoose';
import { HttpError, COMMON_MESSAGE } from '../helpers/commonResponse';

const create = async <T extends Document, D, N = any>(
  model: Model<T>,
  mapper: (doc: T) => N,
  data: D,
  populate?: string
) => {
  let documentCreated = await model.create(data);
  if (populate) {
    documentCreated = await model.populate(documentCreated, populate);
  }

  return mapper(documentCreated);
};

const getList = async <T extends Document, N = any>(
  model: Model<T>,
  mapper: (doc: T) => N,
  {
    limit,
    skip,
    filterQuery
  }: {
    limit?: number;
    skip?: number;
    filterQuery?: FilterQuery<T>;
  },
  populate?: string
) => {
  const query = filterQuery ? model.find(filterQuery) : model.find();

  if (skip) {
    query.skip(skip);
  }

  if (limit) {
    query.limit(limit);
  }

  if (populate) {
    query.populate(populate);
  }

  const documents = await query.exec();
  return documents.map(mapper);
};

const getById = async <T extends Document, N = any>(
  model: Model<T>,
  mapper: (doc: T) => N,
  id: string,
  populate?: string
) => {
  const filterQuery = { _id: id } as FilterQuery<T>;
  const query = model.findOne(filterQuery);

  if (populate) {
    query.populate(populate);
  }

  const document = await query.exec();
  if (!document) {
    throw new HttpError(COMMON_MESSAGE.NOT_FOUND, 404);
  }

  return mapper(document);
};

const update = async <T extends Document, D, N = any>(
  model: Model<T>,
  mapper: (doc: T) => N,
  id: string,
  data: D,
  populate?: string
) => {
  const filterQuery = { _id: id } as FilterQuery<T>;
  const query = model.findOneAndUpdate(filterQuery, data, {
    new: true
  });

  if (populate) {
    query.populate(populate);
  }

  const documentUpdated = await query.exec();
  if (!documentUpdated) {
    throw new HttpError(COMMON_MESSAGE.NOT_FOUND, 404);
  }

  return mapper(documentUpdated);
};

export { create, getList, getById, update };
export default { create, getList, getById, update };
