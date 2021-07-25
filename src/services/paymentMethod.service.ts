import { FilterQuery } from 'mongoose';
import { mapPaymentMethodToResponse } from '../helpers/mappingResponse';
import { IPaymentMethodCreate } from '../interfaces';
import { IPaymentMethod } from '../interfaces/IDocument';
import PaymentMethodModel from '../models/paymentMethod.model';
import { create, getById, getList, update } from './base.service';

const PaymentMethodService = {
  create: async (paymentMethodData: IPaymentMethodCreate) => {
    const paymentMethod: IPaymentMethodCreate = {
      name: paymentMethodData.name
    };
    return create({
      model: PaymentMethodModel,
      mapper: mapPaymentMethodToResponse,
      data: paymentMethod
    });
  },
  getList: async (query: {
    limit?: number;
    skip?: number;
    filterQuery?: FilterQuery<IPaymentMethod>;
  }) => {
    return getList({
      model: PaymentMethodModel,
      mapper: mapPaymentMethodToResponse,
      query
    });
  },
  getById: async (id: string) => {
    return getById({
      model: PaymentMethodModel,
      mapper: mapPaymentMethodToResponse,
      id
    });
  },
  update: async (id: string, paymentMethodData: IPaymentMethodCreate) => {
    const paymentMethod: IPaymentMethodCreate = {
      name: paymentMethodData.name
    };
    return update({
      model: PaymentMethodModel,
      mapper: mapPaymentMethodToResponse,
      id,
      data: paymentMethod
    });
  }
};

export default PaymentMethodService;
