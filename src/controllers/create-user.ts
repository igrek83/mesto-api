import { NextFunction, Request, Response } from 'express';
import { hash } from 'bcryptjs';
import User from '../models/user';
import {
  ErrorsMessages,
  ErrorsStatuses,
  SuccessStatuses,
} from '../types/enums';
import ErrorsConstructor from '../errors/errors-constructor';

const { THE_USER_WITH_THIS_EMAIL_ALREADY_EXISTS, ERROR_WHEN_CREATING_A_USER } = ErrorsMessages;
const { BAD_REQUEST, DUPLICATE_EMAIL } = ErrorsStatuses;
const { SUCCESSFUL_CREATION } = SuccessStatuses;

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.body.password.length < 8) {
    throw new ErrorsConstructor(BAD_REQUEST, ERROR_WHEN_CREATING_A_USER);
  }
  hash(req.body.password, 10)
    .then((hashPassword: string) => User.create({
      ...req.body,
      password: hashPassword,
    }))
    .then((user) => res.status(SUCCESSFUL_CREATION).send({
      _id: user.id, email: user.email, name: user.name, avatar: user.avatar,
    }))
    .catch((err) => {
      if ((err.code === 11000)) {
        next(new ErrorsConstructor(DUPLICATE_EMAIL, THE_USER_WITH_THIS_EMAIL_ALREADY_EXISTS));
      } else {
        next();
      }
    });
};
