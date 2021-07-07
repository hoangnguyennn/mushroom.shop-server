import { celebrate, Joi, Segments } from 'celebrate';

export const register = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required(),
    fullName: Joi.string().required(),
    phone: Joi.string()
      .max(20)
      .min(8)
      .required()
  })
});

export const login = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  })
});

export default {
  login,
  register
};
