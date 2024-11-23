import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { SuccessStatuses } from '../types/enums';

const { SUCCESSFUL_REQUEST } = SuccessStatuses;

export default (req: Request, res: Response, next: NextFunction) => {
  User.find()
    .then((users) => res.status(SUCCESSFUL_REQUEST).send({ users }))
    .catch(() => {
      next();
    });
};
