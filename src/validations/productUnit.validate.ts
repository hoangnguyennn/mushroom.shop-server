import { celebrate, Joi, Segments } from 'celebrate';
import { OBJECT_ID_REGEX } from '../constants';
import { IProductUnitCreate } from '../interfaces';

const create = celebrate({
  [Segments.BODY]: Joi.object<IProductUnitCreate>()
    .keys({
      name: Joi.string().required()
    })
    .unknown(true)
});

const getList = celebrate({
  [Segments.QUERY]: Joi.object()
    .keys({
      page: Joi.number().min(1),
      pageSize: Joi.number().min(1)
    })
    .unknown(true)
});

const getById = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().pattern(OBJECT_ID_REGEX).required()
  })
});

const update = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().pattern(OBJECT_ID_REGEX).required()
  }),
  [Segments.BODY]: Joi.object<IProductUnitCreate>()
    .keys({
      name: Joi.string().required()
    })
    .unknown(true)
});

export default { create, getList, getById, update };
