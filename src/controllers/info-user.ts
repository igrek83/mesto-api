import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import {
  ErrorsMessages,
  ErrorsStatuses,
  SuccessStatuses,
} from '../types/enums';

import ErrorsConstructor from '../errors/errors-constructor';

const { USER_WAS_NOT_FOUND } = ErrorsMessages;
const { NOT_FOUND } = ErrorsStatuses;
const { SUCCESSFUL_REQUEST } = SuccessStatuses;

export default (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const { _id: userId } = req.user;
  User.findById(userId)
    .orFail(() => new ErrorsConstructor(NOT_FOUND, USER_WAS_NOT_FOUND))
    .then((user) => res.status(SUCCESSFUL_REQUEST).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorsConstructor(NOT_FOUND, USER_WAS_NOT_FOUND));
      } else {
        next();
      }
    });
};
