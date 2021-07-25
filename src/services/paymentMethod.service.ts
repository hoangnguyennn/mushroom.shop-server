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
    return create(
      PaymentMethodModel,
      mapPaymentMethodToResponse,
      paymentMethod
    );
  },
  getList: async (query: {
    limit?: number;
    skip?: number;
    filterQuery?: FilterQuery<IPaymentMethod>;
  }) => {
    return getList(PaymentMethodModel, mapPaymentMethodToResponse, query);
  },
  getById: async (id: string) => {
    return getById(PaymentMethodModel, mapPaymentMethodToResponse, id);
  },
  update: async (id: string, paymentMethodData: IPaymentMethodCreate) => {
    const paymentMethod: IPaymentMethodCreate = {
      name: paymentMethodData.name
    };
    return update(
      PaymentMethodModel,
      mapPaymentMethodToResponse,
      id,
      paymentMethod
    );
  }
};

export default PaymentMethodService;
