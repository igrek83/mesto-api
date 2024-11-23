import { NextFunction, Request, Response } from 'express';
import User from '../models/user';

export default (req: Request, res: Response, next: NextFunction) => {
  User.find()
    .then((users) => res.status(200).send({ users }))
    .catch(() => {
      next();
    });
};
