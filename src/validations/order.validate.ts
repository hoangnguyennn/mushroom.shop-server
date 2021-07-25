import { celebrate, Joi, Segments } from 'celebrate';
import { OBJECT_ID_REGEX } from '../constants';
import { IOrderItemRequest, IOrderRequest } from '../interfaces';

const create = celebrate({
  [Segments.BODY]: Joi.object<IOrderRequest>().keys({
    deliveryEmail: Joi.string().email().required(),
    deliveryFullName: Joi.string().required(),
    deliveryPhone: Joi.string().required(),
    deliveryAddress: Joi.string().required(),
    paymentMethodId: Joi.string().pattern(OBJECT_ID_REGEX).required(),
    items: Joi.array().items(
      Joi.object<IOrderItemRequest>().keys({
        productId: Joi.string().pattern(OBJECT_ID_REGEX).required(),
        qty: Joi.number().min(1).required()
      })
    )
  })
});

const getList = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1)
  })
});

const getById = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().pattern(OBJECT_ID_REGEX).required()
  })
});

export default { create, getList, getById };
