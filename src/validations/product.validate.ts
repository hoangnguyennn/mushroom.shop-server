import { celebrate, Joi, Segments } from 'celebrate';
import { OBJECT_ID_REGEX } from '../constants';
import { IImageCreate, IProductRequest } from '../interfaces';
import { ProductStatus } from '../interfaces/enums';

const create = celebrate({
  [Segments.BODY]: Joi.object<IProductRequest>().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    unitId: Joi.string().pattern(OBJECT_ID_REGEX).required(),
    description: Joi.string().required(),
    status: Joi.string()
      .valid(...Object.values(ProductStatus))
      .required(),
    imagesId: Joi.array()
      .items(
        Joi.object().keys({
          id: Joi.string().pattern(OBJECT_ID_REGEX).required()
        }),
        Joi.object<IImageCreate>().keys({
          url: Joi.string().required(),
          publicId: Joi.string().required()
        })
      )
      .required(),
    categoryId: Joi.string().pattern(OBJECT_ID_REGEX).required(),
    longDescription: Joi.string().required()
  })
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
  [Segments.BODY]: Joi.object<IProductRequest>().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    unitId: Joi.string().pattern(OBJECT_ID_REGEX).required(),
    description: Joi.string().required(),
    status: Joi.string()
      .valid(...Object.values(ProductStatus))
      .required(),
    imagesId: Joi.array()
      .items(
        Joi.object().keys({
          id: Joi.string().pattern(OBJECT_ID_REGEX).required()
        }),
        Joi.object<IImageCreate>().keys({
          url: Joi.string().required(),
          publicId: Joi.string().required()
        })
      )
      .required(),
    categoryId: Joi.string().pattern(OBJECT_ID_REGEX).required(),
    longDescription: Joi.string().required()
  })
});

const updateStatus = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().pattern(OBJECT_ID_REGEX).required()
  }),
  [Segments.BODY]: Joi.object().keys({
    status: Joi.string()
      .valid(...Object.values(ProductStatus))
      .required()
  })
});

export default { create, getList, getById, update, updateStatus };
