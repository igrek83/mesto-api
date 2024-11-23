import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import {
  ErrorsMessages,
  ErrorsStatuses,
  SuccessStatuses,
} from '../types/enums';
import errorHandler from '../middleware/error-handler';

const { ERROR_WHEN_CREATING_A_CARD } = ErrorsMessages;
const { BAD_REQUEST } = ErrorsStatuses;
const { SUCCESSFUL_CREATION } = SuccessStatuses;

export default (req: Request, res: Response, next: NextFunction) => {
  const owner = '6740c0c6194b0180f094dbb4';

  Card.create({
    owner,
    ...req.body,
  })
    .then((user) => res.status(SUCCESSFUL_CREATION).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        errorHandler(res, next, ERROR_WHEN_CREATING_A_CARD, BAD_REQUEST);
      } else {
        next();
      }
    });
};
