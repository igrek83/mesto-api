import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import {
  ErrorsMessages,
  ErrorsStatuses,
  SuccessStatuses,
} from '../types/enums';

import ErrorsConstructor from '../errors/errors-constructor';

const { ERROR_WHEN_CREATING_A_CARD } = ErrorsMessages;
const { BAD_REQUEST } = ErrorsStatuses;
const { SUCCESSFUL_CREATION } = SuccessStatuses;

export default (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const { _id: owner } = req.user;

  Card.create({
    owner,
    ...req.body,
  })
    .then((card) => res.status(SUCCESSFUL_CREATION).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorsConstructor(BAD_REQUEST, ERROR_WHEN_CREATING_A_CARD));
      } else {
        next();
      }
    });
};
