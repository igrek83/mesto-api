import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line consistent-return
export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима' });
  }

  const token: string = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'user-secret-token');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  // @ts-ignore
  console.log(payload);
  // @ts-ignore
  req.user = payload;
  next();
};
