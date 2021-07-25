import { FilterQuery, Model, Document } from 'mongoose';
import { HttpError } from '../helpers/commonResponse';
import { IPopulateOptions } from '../interfaces';
import { NOT_FOUND_FN } from '../helpers/commonMessage';

const create = async <T extends Document, D, N>({
  model,
  mapper,
  data,
  populate
}: {
  model: Model<T>;
  mapper: (doc: T) => N;
  data: D;
  populate?: IPopulateOptions;
}) => {
  let documentCreated = await model.create(data);
  if (populate) {
    documentCreated = await model.populate(documentCreated, populate);
  }

  return mapper(documentCreated);
};

const getList = async <T extends Document, N>({
  model,
  mapper,
  query,
  populate
}: {
  model: Model<T>;
  mapper: (doc: T) => N;
  query: {
    limit?: number;
    skip?: number;
    filterQuery?: FilterQuery<T>;
  };
  populate?: IPopulateOptions;
}) => {
  const { filterQuery, skip, limit } = query;
  const mongoQuery = filterQuery ? model.find(filterQuery) : model.find();

  if (skip) {
    mongoQuery.skip(skip);
  }

  if (limit) {
    mongoQuery.limit(limit);
  }

  if (populate) {
    mongoQuery.populate(populate);
  }

  const documents = await mongoQuery.exec();
  return documents.map(mapper);
};

const getById = async <T extends Document, N>({
  model,
  mapper,
  id,
  populate
}: {
  model: Model<T>;
  mapper: (doc: T) => N;
  id: string;
  populate?: IPopulateOptions;
}) => {
  const filterQuery = { _id: id } as FilterQuery<T>;
  const query = model.findOne(filterQuery);

  if (populate) {
    query.populate(populate);
  }

  const document = await query.exec();
  if (!document) {
    throw new HttpError(NOT_FOUND_FN(model.modelName), 404);
  }

  return mapper(document);
};

const update = async <T extends Document, D, N>({
  model,
  mapper,
  id,
  data,
  populate
}: {
  model: Model<T>;
  mapper: (doc: T) => N;
  id: string;
  data: D;
  populate?: IPopulateOptions;
}) => {
  const filterQuery = { _id: id } as FilterQuery<T>;
  const query = model.findOneAndUpdate(filterQuery, data, {
    new: true
  });

  if (populate) {
    query.populate(populate);
  }

  const documentUpdated = await query.exec();
  if (!documentUpdated) {
    throw new HttpError(NOT_FOUND_FN(model.modelName), 404);
  }

  return mapper(documentUpdated);
};

export { create, getList, getById, update };
export default { create, getList, getById, update };
