import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { ErrorsMessages, ErrorsStatuses } from '../types/enums';
import errorHandler from '../middleware/error-handler';
import testUser from '../test-user';

const { ERROR_UPDATING_USER_DATA } = ErrorsMessages;
const { BAD_REQUEST } = ErrorsStatuses;

export default (req: Request, res: Response, next: NextFunction) => {
  User.findByIdAndUpdate(
    testUser,
    { ...req.body },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        errorHandler(res, next, ERROR_UPDATING_USER_DATA, BAD_REQUEST);
      } else {
        next();
      }
    });
};
