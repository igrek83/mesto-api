import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { ErrorsMessages, ErrorsStatuses } from '../types/enums';
import errorHandler from '../middleware/error-handler';

const { ERROR_WHEN_CREATING_A_CARD } = ErrorsMessages;
const { BAD_REQUEST } = ErrorsStatuses;

export default (req: Request, res: Response, next: NextFunction) => {
  const owner = '6740c0c6194b0180f094dbb4';

  Card.create({
    owner,
    ...req.body,
  })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        errorHandler(res, next, ERROR_WHEN_CREATING_A_CARD, BAD_REQUEST);
      } else {
        next();
      }
    });
};
