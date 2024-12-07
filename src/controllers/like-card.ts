import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';

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
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .orFail(() => new ErrorsConstructor(BAD_REQUEST, ERROR_WHEN_SETTING_A_LIKE))
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
