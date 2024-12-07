import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import {
  ErrorsMessages,
  ErrorsStatuses,
  SuccessStatuses,
} from '../types/enums';

import ErrorsConstructor from '../errors/errors-constructor';

const { ERROR__UPDATING_THE_USERS_AVATAR } = ErrorsMessages;
const { BAD_REQUEST } = ErrorsStatuses;
const { SUCCESSFUL_REQUEST } = SuccessStatuses;

export default (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const { _id: userId } = req.user;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    userId,
    { $set: { avatar } },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(new ErrorsConstructor(BAD_REQUEST, ERROR__UPDATING_THE_USERS_AVATAR))
    .then((user) => res.status(SUCCESSFUL_REQUEST).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorsConstructor(BAD_REQUEST, ERROR__UPDATING_THE_USERS_AVATAR));
      } else {
        next();
      }
    });
};
