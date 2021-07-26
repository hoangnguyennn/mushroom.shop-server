import { celebrate, Segments, Joi } from 'celebrate';
import { OBJECT_ID_REGEX } from '../constants';
import { IUserUpdateRequest } from '../interfaces';

const getList = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(1)
  })
});

const update = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().pattern(OBJECT_ID_REGEX).required()
  }),
  [Segments.BODY]: Joi.object<IUserUpdateRequest>().keys({
    password: Joi.string(),
    fullName: Joi.string(),
    phone: Joi.string(),
    address: Joi.string().empty('')
  })
});

export default { getList, update };
