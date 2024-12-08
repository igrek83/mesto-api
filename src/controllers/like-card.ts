import { NextFunction, Request, Response } from 'express';
import changingLikeCard from '../utils/changing-like-card';

import {
  ErrorsMessages,
  ErrorsStatuses,
  SuccessMessages,
  SuccessStatuses,
} from '../types/enums';

import ErrorsConstructor from '../errors/errors-constructor';

const { ERROR_WHEN_SETTING_A_LIKE } = ErrorsMessages;
const { BAD_REQUEST } = ErrorsStatuses;
const { SUCCESS_ADD_LIKE } = SuccessMessages;
const { SUCCESSFUL_REQUEST } = SuccessStatuses;

export default (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const { _id: userId } = req.user;
  changingLikeCard(req.params.cardId, userId, true)
    .then(() => res.status(SUCCESSFUL_REQUEST).send({ status: 'success', message: SUCCESS_ADD_LIKE }))
    .catch((err) => {
      if (err.name === 'Error') {
        next(new ErrorsConstructor(BAD_REQUEST, ERROR_WHEN_SETTING_A_LIKE));
      } else {
        next();
      }
    })
    .catch(next);
};
