import { NextFunction, Request, Response } from 'express';
import updateUser from '../utils/update-user';
import {
  ErrorsMessages,
  ErrorsStatuses,
  SuccessStatuses,
} from '../types/enums';

import ErrorsConstructor from '../errors/errors-constructor';

const { ERROR_UPDATING_USER_DATA } = ErrorsMessages;
const { BAD_REQUEST } = ErrorsStatuses;
const { SUCCESSFUL_REQUEST } = SuccessStatuses;

export default (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const { _id: userId } = req.user;
  updateUser(userId, req.body)
    .then((user) => res.status(SUCCESSFUL_REQUEST).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorsConstructor(BAD_REQUEST, ERROR_UPDATING_USER_DATA));
      } else {
        next();
      }
    });
};
