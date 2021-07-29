import { celebrate, Joi, Segments } from 'celebrate';
import { ISignIn, ISignUp } from '../interfaces';

const signIn = celebrate({
  [Segments.BODY]: Joi.object<ISignIn>()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
    .unknown(true)
});

const signUp = celebrate({
  [Segments.BODY]: Joi.object<ISignUp>()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      fullName: Joi.string().required(),
      phone: Joi.string().required()
    })
    .unknown(true)
});

export default { signIn, signUp };
