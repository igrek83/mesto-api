import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import {
  ErrorsMessages,
  ErrorsStatuses,
  SuccessStatuses,
} from '../types/enums';
import errorHandler from '../middleware/error-handler';
import testUser from '../test-user';

const { ERROR__UPDATING_THE_USERS_AVATAR } = ErrorsMessages;
const { BAD_REQUEST } = ErrorsStatuses;
const { SUCCESSFUL_REQUEST } = SuccessStatuses;

export default (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    testUser,
    { $set: { avatar } },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => res.status(SUCCESSFUL_REQUEST).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        errorHandler(res, next, ERROR__UPDATING_THE_USERS_AVATAR, BAD_REQUEST);
      } else {
        next();
      }
    });
};
