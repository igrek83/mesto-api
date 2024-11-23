import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import testUser from '../test-user';
import {
  ErrorsMessages,
  ErrorsStatuses,
  SuccessMessages,
  SuccessStatuses,
} from '../types/enums';
import errorHandler from '../middleware/error-handler';

const { ERROR_WHEN_SETTING_A_LIKE } = ErrorsMessages;
const { BAD_REQUEST } = ErrorsStatuses;
const { SUCCESS_ADD_LIKE } = SuccessMessages;
const { SUCCESSFUL_REQUEST } = SuccessStatuses;

export default (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: testUser } },
    { new: true },
  )
    .then(() => res.status(SUCCESSFUL_REQUEST).send({ status: 'success', message: SUCCESS_ADD_LIKE }))
    .catch((err) => {
      if (err.name === 'CastError') {
        errorHandler(res, next, ERROR_WHEN_SETTING_A_LIKE, BAD_REQUEST);
      } else {
        next();
      }
    });
};
