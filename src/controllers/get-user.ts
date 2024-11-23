import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import {
  ErrorsMessages,
  ErrorsStatuses,
  SuccessStatuses,
} from '../types/enums';
import errorHandler from '../middleware/error-handler';

const { USER_WAS_NOT_FOUND } = ErrorsMessages;
const { NOT_FOUND } = ErrorsStatuses;
const { SUCCESSFUL_REQUEST } = SuccessStatuses;

export default (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => new Error(USER_WAS_NOT_FOUND))
    .then((user) => res.status(SUCCESSFUL_REQUEST).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        errorHandler(res, next, USER_WAS_NOT_FOUND, NOT_FOUND);
      } else {
        next();
      }
    });
};
