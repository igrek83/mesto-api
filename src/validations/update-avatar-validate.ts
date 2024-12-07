import { celebrate, Joi } from 'celebrate';

export default celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
});
