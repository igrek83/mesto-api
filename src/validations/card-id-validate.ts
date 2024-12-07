import { celebrate, Joi } from 'celebrate';

export default celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});
