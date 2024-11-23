import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { ErrorsMessages, ErrorsStatuses } from '../types/enums';
import errorHandler from '../middleware/error-handler';

const { ERROR_WHEN_CREATING_A_USER } = ErrorsMessages;
const { BAD_REQUEST } = ErrorsStatuses;

export default (req: Request, res: Response, next: NextFunction) => {
  User.create({ ...req.body })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        errorHandler(res, next, ERROR_WHEN_CREATING_A_USER, BAD_REQUEST);
      } else {
        next();
      }
    });
};
