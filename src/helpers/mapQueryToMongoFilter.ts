import { FilterQuery } from 'mongoose';
import { IProduct } from '../interfaces/IDocument';
import { normalize } from '../utils';

export const productQueryToMongoFilter = (query: {
  [key: string]: any;
}): FilterQuery<IProduct> => {
  return Object.entries(query)
    .map(([key, value]) => {
      let tmp: any;
      switch (key) {
        case 'price':
          tmp = value.split('-');
          return {
            price: {
              $lte: Number(tmp[1]) || 0,
              $gte: Number(tmp[0]) || 0
            }
          } as FilterQuery<IProduct>;

        case 'name':
          tmp = normalize(value);
          return {
            nameNonUnicode: { $regex: new RegExp(tmp, 'i') }
          } as FilterQuery<IProduct>;

        case 'unit':
          return {
            unitId: value
          } as FilterQuery<IProduct>;

        default:
          return {} as FilterQuery<IProduct>;
      }
    })
    .reduce((result: FilterQuery<IProduct>, item: FilterQuery<IProduct>) => {
      return Object.assign(result, item);
    }, {} as FilterQuery<IProduct>);
};
