import { FilterQuery, Model, Document } from 'mongoose';
import { HttpError, COMMON_MESSAGE } from '../helpers/commonResponse';

const create = async <T extends Document, D, N = any>(
  model: Model<T>,
  mapper: (doc: T) => N,
  data: D
) => {
  const documentCreated = await model.create(data);
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
  }
) => {
  const query = filterQuery ? model.find(filterQuery) : model.find();

  if (skip) {
    query.skip(skip);
  }

  if (limit) {
    query.limit(limit);
  }

  const documents = await query.exec();
  return documents.map(mapper);
};

const getById = async <T extends Document, N = any>(
  model: Model<T>,
  mapper: (doc: T) => N,
  id: string
) => {
  const filterQuery = { _id: id } as FilterQuery<T>;
  const document = await model.findOne(filterQuery);

  if (!document) {
    throw new HttpError(COMMON_MESSAGE.NOT_FOUND, 404);
  }

  return mapper(document);
};

const update = async <T extends Document, D, N = any>(
  model: Model<T>,
  mapper: (doc: T) => N,
  id: string,
  data: D
) => {
  const filterQuery = { _id: id } as FilterQuery<T>;
  const documentUpdated = await model.findOneAndUpdate(filterQuery, data, {
    new: true
  });

  if (!documentUpdated) {
    throw new HttpError(COMMON_MESSAGE.NOT_FOUND, 404);
  }

  return mapper(documentUpdated);
};

export { create, getList, getById, update };
export default { create, getList, getById, update };
