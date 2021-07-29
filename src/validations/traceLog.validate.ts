import { celebrate, Segments, Joi } from 'celebrate';

const getList = celebrate({
  [Segments.QUERY]: Joi.object()
    .keys({
      page: Joi.number().min(1),
      pageSize: Joi.number().min(1)
    })
    .unknown(true)
});

export default { getList };
