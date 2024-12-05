import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export default (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  // @ts-ignore
  return User.findUserByCredentials(email, password)
    .then((user: { _id: any; }): void => {
      const token: string = jwt.sign({ _id: user._id }, 'user-secret-token', {
        expiresIn: '7d',
      });
      // res
        // .cookie('jwt', token, {
      // maxAge: 3600000,
      // httpOnly: true,
        // });
      res.send({
        token,
      });
    })
    .catch(next);
};
