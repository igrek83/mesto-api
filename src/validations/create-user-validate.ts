import { celebrate, Joi } from 'celebrate';

export default celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    avatar: Joi.string().uri(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});
