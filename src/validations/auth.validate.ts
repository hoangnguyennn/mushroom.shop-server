import { celebrate, Joi, Segments } from 'celebrate';

const signIn = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
});

const signUp = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    fullName: Joi.string().required(),
    phone: Joi.string().required()
  })
});

export default { signIn, signUp };
